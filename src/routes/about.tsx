import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Layers, Users, Zap } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Coaltech" },
      {
        name: "description",
        content:
          "Coaltech is a dynamic technology brand crafting impactful digital solutions through web, software, and UI/UX design.",
      },
      { property: "og:title", content: "About — Coaltech" },
      {
        property: "og:description",
        content: "Our philosophy: clean design, scalable code, and client-focused solutions.",
      },
    ],
  }),
  component: About,
});

const values = [
  { Icon: Sparkles, title: "Clean & Modern", desc: "Aesthetics that breathe — minimalism with intention." },
  { Icon: Zap, title: "Seamless UX", desc: "Friction-free interactions that feel inevitable." },
  { Icon: Layers, title: "Scalable Code", desc: "Maintainable foundations built to evolve." },
  { Icon: Users, title: "Client-Focused", desc: "Solutions tailored to your goals, not templates." },
];

function About() {
  return (
    <section className="container mx-auto px-6 py-20 md:py-28 max-w-6xl">
      <div className="max-w-3xl">
        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-medium mb-5">
          About Coaltech
        </span>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          A studio that turns ideas into <span className="text-gradient">digital craft</span>.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          Coaltech is a dynamic and innovative technology brand specializing in web development,
          software development, and UI/UX design. With a passion for creating impactful digital
          solutions, we combine technical expertise with creative design to deliver products that
          are both functional and visually engaging.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {values.map(({ Icon, title, desc }) => (
          <div
            key={title}
            className="p-6 rounded-2xl bg-gradient-card border border-border/60 hover:border-primary/40 transition-smooth"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 shadow-glow">
              <Icon size={20} className="text-primary-foreground" />
            </div>
            <h3 className="font-bold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 grid gap-10 md:grid-cols-3 text-center">
        {[
          { stat: "100%", label: "Client-focused delivery" },
          { stat: "3+", label: "Core disciplines mastered" },
          { stat: "∞", label: "Pixels obsessed over" },
        ].map((s) => (
          <div key={s.label}>
            <div className="text-5xl md:text-6xl font-bold text-gradient">{s.stat}</div>
            <p className="mt-2 text-sm text-muted-foreground uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
