import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Code2, Palette, Cpu, Sparkles, Quote, Star } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Coaltech — Building Digital Experiences That Inspire" },
      {
        name: "description",
        content:
          "Coaltech crafts modern websites, custom software, and intuitive UI/UX. Functional, beautiful, scalable.",
      },
      { property: "og:title", content: "Coaltech — Building Digital Experiences That Inspire" },
      {
        property: "og:description",
        content:
          "Web development, software development, and UI/UX design that inspires and converts.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <img
          src={heroBg}
          alt=""
          aria-hidden
          width={1920}
          height={1280}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative container mx-auto px-6 py-28 md:py-40 max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium mb-6">
            <Sparkles size={14} /> Web · Software · UI/UX
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            Building <span className="text-gradient">Digital Experiences</span>
            <br /> That Inspire
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Coaltech is a technology studio combining technical expertise with creative
            design to deliver products that are functional and visually engaging.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-105 transition-smooth"
            >
              See our work <ArrowRight size={18} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-border bg-card/50 backdrop-blur text-foreground font-semibold hover:bg-card transition-smooth"
            >
              Start a project
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">What we <span className="text-gradient">craft</span></h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Three disciplines, one obsession: building products that work beautifully.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { Icon: Code2, title: "Web Development", desc: "Responsive, scalable, and secure websites built for performance." },
            { Icon: Cpu, title: "Software Development", desc: "Custom applications tailored precisely to client needs." },
            { Icon: Palette, title: "UI/UX Design", desc: "Intuitive, user-friendly interfaces that boost engagement." },
          ].map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="group relative p-8 rounded-2xl bg-gradient-card border border-border/60 hover:border-primary/50 shadow-soft hover:shadow-glow transition-smooth"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-5 shadow-glow group-hover:scale-110 transition-smooth">
                <Icon className="text-primary-foreground" size={22} />
              </div>
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-medium mb-5">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold">
            Trusted by <span className="text-gradient">visionary teams</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            What our clients say after shipping with Coaltech.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              quote:
                "Coaltech rebuilt our website from scratch and conversions doubled within a month. Pixel-perfect, lightning fast, and shipped on time.",
              name: "Amaka Okafor",
              role: "Founder, Lumen Studio",
              initials: "AO",
            },
            {
              quote:
                "The custom dashboard they built for us replaced three legacy tools. Our team finally has one place to work — clean, secure, and a joy to use.",
              name: "David Mensah",
              role: "COO, NorthFleet Logistics",
              initials: "DM",
            },
            {
              quote:
                "Their UI/UX process is world-class. Every screen felt intentional. Our app store rating jumped from 3.6 to 4.8 after the redesign.",
              name: "Priya Raman",
              role: "Product Lead, Flowbank",
              initials: "PR",
            },
          ].map(({ quote, name, role, initials }) => (
            <figure
              key={name}
              className="relative p-8 rounded-2xl bg-gradient-card border border-border/60 hover:border-primary/50 shadow-soft hover:shadow-glow transition-smooth flex flex-col"
            >
              <Quote
                className="absolute top-6 right-6 text-primary/20"
                size={36}
                aria-hidden
              />
              <div className="flex gap-0.5 text-primary mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <blockquote className="text-sm text-foreground/90 leading-relaxed flex-1">
                "{quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 pt-5 border-t border-border/60">
                <div className="w-11 h-11 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-glow">
                  {initials}
                </div>
                <div>
                  <div className="font-semibold text-sm">{name}</div>
                  <div className="text-xs text-muted-foreground">{role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="container mx-auto px-6 pb-12">
        <div className="rounded-3xl bg-gradient-card border border-border p-10 md:p-14 text-center shadow-elegant">
          <h2 className="text-3xl md:text-4xl font-bold">Have an idea worth building?</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Let's turn it into a polished, performant product your users will love.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:scale-105 transition-smooth"
          >
            Let's talk <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
