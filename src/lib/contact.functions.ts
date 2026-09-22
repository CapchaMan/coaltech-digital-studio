import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  service: z.string().trim().max(80).optional().or(z.literal("")),
  subject: z.string().trim().min(3, "Please enter a subject").max(150),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
  // Honeypot — must stay empty.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactResult = {
  ok: true;
  emailSent: boolean;
  name: string;
};

const clean = (value?: string) => {
  const trimmed = (value ?? "").trim();
  return trimmed.length ? trimmed.replace(/[\u0000-\u001f\u007f]/g, "") : null;
};

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }): Promise<ContactResult> => {
    if (data.website) {
      // Honeypot filled → silently reject spam bots.
      throw new Error("Your submission could not be processed.");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const bucket = `contact:${data.email.toLowerCase()}`;
    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    const { count } = await supabaseAdmin
      .from("rate_limit_hits")
      .select("id", { count: "exact", head: true })
      .eq("bucket", bucket)
      .gte("created_at", since);

    if ((count ?? 0) >= 3) {
      throw new Error(
        "You've already sent a few messages recently. Please wait a little before sending another.",
      );
    }

    const { data: duplicate } = await supabaseAdmin
      .from("contact_messages")
      .select("id")
      .eq("email", data.email.toLowerCase())
      .eq("message", data.message)
      .gte("created_at", new Date(Date.now() - 10 * 60 * 1000).toISOString())
      .maybeSingle();

    if (duplicate) {
      throw new Error("Looks like you've already sent this message. We received it.");
    }

    const { data: inserted, error } = await supabaseAdmin
      .from("contact_messages")
      .insert({
        name: clean(data.name)!,
        email: data.email.toLowerCase(),
        phone: clean(data.phone),
        company: clean(data.company),
        service: clean(data.service),
        subject: clean(data.subject)!,
        message: clean(data.message)!,
        status: "new",
      })
      .select("id, created_at")
      .single();

    if (error || !inserted) {
      console.error("contact_messages insert failed:", error);
      throw new Error("We couldn't save your message right now. Please try again shortly.");
    }

    await supabaseAdmin.from("rate_limit_hits").insert({ bucket });

    const {
      isEmailConfigured,
      sendEmail,
      adminNotificationEmail,
      clientConfirmationEmail,
    } = await import("./email.server");

    if (!isEmailConfigured()) {
      console.warn("Email provider not configured — message stored without notifications.");
      return { ok: true, emailSent: false, name: data.name };
    }

    const inquiry = {
      name: data.name,
      email: data.email,
      phone: clean(data.phone),
      company: clean(data.company),
      service: clean(data.service),
      subject: data.subject,
      message: data.message,
      createdAt: new Date(inserted.created_at),
    };

    const contactEmail = process.env["CONTACT_EMAIL"] ?? "coaltech91@gmail.com";

    try {
      const admin = adminNotificationEmail(inquiry);
      await sendEmail({
        to: contactEmail,
        subject: admin.subject,
        html: admin.html,
        replyTo: data.email,
      });

      const confirmation = clientConfirmationEmail(inquiry);
      await sendEmail({
        to: data.email,
        subject: confirmation.subject,
        html: confirmation.html,
      });

      return { ok: true, emailSent: true, name: data.name };
    } catch (emailError) {
      console.error("Contact email delivery failed:", emailError);
      return { ok: true, emailSent: false, name: data.name };
    }
  });
