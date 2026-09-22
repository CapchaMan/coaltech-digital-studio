import { createFileRoute } from "@tanstack/react-router";
import { useState, FormEvent } from "react";
import { Mail, Phone, Linkedin, Instagram, Twitter, Send, MessageCircle } from "lucide-react";

const WhatsAppIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);
import { useServerFn } from "@tanstack/react-start";
import { contactSchema, submitContactMessage } from "@/lib/contact.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Coaltech" },
      {
        name: "description",
        content:
          "Get in touch with Coaltech to start your next web, software, or design project.",
      },
      { property: "og:title", content: "Contact — Coaltech" },
      {
        property: "og:description",
        content: "Reach out via email, phone, or our contact form.",
      },
    ],
  }),
  component: Contact,
});

const TO_EMAIL = "coaltech91@gmail.com";
const WHATSAPP_NUMBER = "2348137429301";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(150),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    const { name, email, subject, message } = parsed.data;
    const body = `Name: ${name}%0AEmail: ${email}%0A%0A${encodeURIComponent(message)}`;
    window.location.href = `mailto:${TO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  return (
    <section className="container mx-auto px-6 py-20 md:py-28 max-w-6xl">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-medium mb-5">
          Contact
        </span>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Let's build something <span className="text-gradient">remarkable</span>
        </h1>
        <p className="mt-5 text-muted-foreground">
          Tell us about your project — we usually respond within a day.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-5">
        {/* Info */}
        <aside className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-card border border-border/60">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <Mail size={18} className="text-primary-foreground" />
              </div>
              <h3 className="font-bold">Email</h3>
            </div>
            <a
              href={`mailto:${TO_EMAIL}`}
              className="text-sm text-muted-foreground hover:text-primary transition-smooth break-all"
            >
              {TO_EMAIL}
            </a>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-card border border-border/60">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <Phone size={18} className="text-primary-foreground" />
              </div>
              <h3 className="font-bold">Phone</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="tel:+2347080143370" className="hover:text-primary transition-smooth">
                  +234 708 014 3370
                </a>
              </li>
              <li className="flex items-center gap-3 flex-wrap">
                <span>+234 813 742 9301</span>
                <a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  aria-label="Call +234 813 742 9301"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-smooth"
                >
                  <Phone size={12} /> Call
                </a>
                <a
                  href={`https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&type=phone_number&app_absent=0`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp +${WHATSAPP_NUMBER}`}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-smooth"
                >
                  <MessageCircle size={12} /> WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <a
            href="https://api.whatsapp.com/send/?phone=2347080143370&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Coaltech on WhatsApp"
            className="flex items-center gap-4 p-6 rounded-2xl bg-gradient-card border border-border/60 hover:border-[#25D366]/60 hover:shadow-glow hover:scale-[1.02] transition-smooth group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center text-white shadow-glow group-hover:scale-110 transition-smooth shrink-0">
              <WhatsAppIcon size={20} />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold">WhatsApp</h3>
              <p className="text-sm text-muted-foreground truncate">
                Chat with us instantly
              </p>
            </div>
          </a>

          <div className="p-6 rounded-2xl bg-gradient-card border border-border/60">
            <h3 className="font-bold mb-3">Follow us</h3>
            <div className="flex gap-3">
              {[
                { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-gradient-primary hover:text-primary-foreground hover:scale-110 transition-smooth"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </aside>

        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="lg:col-span-3 p-8 rounded-2xl bg-gradient-card border border-border/60 shadow-elegant space-y-5"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Your Name">
              <input
                type="text"
                required
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input"
                placeholder="Jane Doe"
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                required
                maxLength={255}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input"
                placeholder="jane@company.com"
              />
            </Field>
          </div>
          <Field label="Subject">
            <input
              type="text"
              required
              maxLength={150}
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="input"
              placeholder="A new website for my brand"
            />
          </Field>
          <Field label="Message">
            <textarea
              required
              maxLength={2000}
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="input resize-none"
              placeholder="Tell us about your project, goals, timeline..."
            />
          </Field>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-105 transition-smooth"
          >
            Send message <Send size={16} />
          </button>
          <p className="text-xs text-muted-foreground">
            This opens your email client pre-filled with your message.
          </p>

          <style>{`
            .input {
              width: 100%;
              padding: 0.75rem 1rem;
              border-radius: 0.75rem;
              background-color: var(--color-input);
              border: 1px solid var(--color-border);
              color: var(--color-foreground);
              font-size: 0.9rem;
              outline: none;
              transition: all 0.2s;
            }
            .input:focus {
              border-color: var(--color-primary);
              box-shadow: 0 0 0 3px oklch(0.74 0.18 50 / 0.15);
            }
            .input::placeholder {
              color: var(--color-muted-foreground);
              opacity: 0.6;
            }
          `}</style>
        </form>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}
