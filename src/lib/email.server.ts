/**
 * Server-only email delivery helper.
 * Secrets are read inside the function — never exposed to the browser.
 */

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

export type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

export function isEmailConfigured() {
  return Boolean(process.env["RESEND_API_KEY"] && process.env["LOVABLE_API_KEY"]);
}

export async function sendEmail({ to, subject, html, replyTo }: SendEmailInput) {
  const resendKey = process.env["RESEND_API_KEY"];
  const lovableKey = process.env["LOVABLE_API_KEY"];
  if (!resendKey || !lovableKey) {
    throw new Error("Email provider is not configured (missing RESEND_API_KEY)");
  }

  const fromName = process.env["FROM_NAME"] ?? "Coaltech";
  const fromEmail = process.env["FROM_EMAIL"] ?? "onboarding@resend.dev";

  const res = await fetch(`${GATEWAY_URL}/emails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": resendKey,
    },
    body: JSON.stringify({
      from: `${fromName} <${fromEmail}>`,
      to: [to],
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error(`Email send failed [${res.status}]: ${body}`);
    throw new Error(`Email send failed [${res.status}]`);
  }

  return (await res.json()) as { id?: string };
}

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const shell = (title: string, inner: string) => `
<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#0f0f11;font-family:Helvetica,Arial,sans-serif;color:#e8e8ea;">
    <table role="presentation" width="100%" style="max-width:600px;margin:0 auto;background:#17171a;border:1px solid #2a2a2f;border-radius:14px;">
      <tr>
        <td style="padding:22px 26px;border-bottom:1px solid #2a2a2f;">
          <span style="font-size:18px;font-weight:700;color:#ff7a18;">Coaltech</span>
          <div style="font-size:12px;color:#9a9aa2;margin-top:4px;">${escape(title)}</div>
        </td>
      </tr>
      <tr><td style="padding:24px 26px;font-size:14px;line-height:1.65;">${inner}</td></tr>
      <tr>
        <td style="padding:18px 26px;border-top:1px solid #2a2a2f;font-size:12px;color:#9a9aa2;">
          Coaltech — Building Digital Experiences That Inspire<br />
          coaltech91@gmail.com · +234 708 014 3370
        </td>
      </tr>
    </table>
  </body>
</html>`;

export type Inquiry = {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  subject: string;
  message: string;
  createdAt: Date;
};

export function adminNotificationEmail(i: Inquiry) {
  const row = (label: string, value?: string | null) =>
    value
      ? `<tr><td style="padding:6px 0;color:#9a9aa2;width:110px;">${label}</td><td style="padding:6px 0;">${escape(value)}</td></tr>`
      : "";

  return {
    subject: `New portfolio contact: ${i.subject}`,
    html: shell(
      "New portfolio contact message",
      `
      <table role="presentation" style="width:100%;font-size:14px;">
        ${row("Name", i.name)}
        ${row("Email", i.email)}
        ${row("Phone", i.phone)}
        ${row("Company", i.company)}
        ${row("Service", i.service)}
        ${row("Subject", i.subject)}
        ${row("Date", i.createdAt.toISOString().slice(0, 10))}
        ${row("Time", i.createdAt.toISOString().slice(11, 19) + " UTC")}
      </table>
      <div style="margin-top:18px;padding:14px 16px;background:#1f1f24;border-radius:10px;white-space:pre-wrap;">${escape(i.message)}</div>
      <p style="margin-top:20px;">
        <a href="mailto:${escape(i.email)}?subject=Re: ${encodeURIComponent(i.subject)}"
           style="display:inline-block;padding:10px 18px;background:#ff7a18;color:#111;border-radius:999px;text-decoration:none;font-weight:700;">
          Reply to ${escape(i.name)}
        </a>
      </p>`,
    ),
  };
}

export function clientConfirmationEmail(i: Inquiry) {
  return {
    subject: "Thank you for contacting Coaltech",
    html: shell(
      "We received your message",
      `
      <p>Hello ${escape(i.name)},</p>
      <p>Thank you for contacting Coaltech. We have received your message successfully and will review your inquiry. We will get back to you as soon as possible.</p>
      <p style="color:#9a9aa2;font-size:13px;">Your message</p>
      <div style="padding:14px 16px;background:#1f1f24;border-radius:10px;white-space:pre-wrap;">${escape(i.message)}</div>
      <p style="margin-top:18px;">If you need to add anything, simply reply to this email.</p>
      <p>— The Coaltech Team</p>`,
    ),
  };
}
