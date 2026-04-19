import { createFileRoute } from "@tanstack/react-router";
import { useState, FormEvent } from "react";
import { Mail, Phone, Linkedin, Instagram, Twitter, Send } from "lucide-react";
import { z } from "zod";

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

const TO_EMAIL = "ogohchineduanthony@gmail.com";

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
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>
                <a href="tel:+2347080143370" className="hover:text-primary transition-smooth">
                  +234 708 014 3370
                </a>
              </li>
              <li>
                <a href="tel:+2348137429301" className="hover:text-primary transition-smooth">
                  +234 813 742 9301
                </a>
              </li>
            </ul>
          </div>

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
