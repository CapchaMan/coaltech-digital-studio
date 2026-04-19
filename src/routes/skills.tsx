import { createFileRoute } from "@tanstack/react-router";
import { Code2, Cpu, Palette, Check } from "lucide-react";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Coaltech" },
      {
        name: "description",
        content:
          "Web development, software development, and UI/UX design — Coaltech's core expertise.",
      },
      { property: "og:title", content: "Skills — Coaltech" },
      {
        property: "og:description",
        content: "Responsive websites, custom software, and intuitive interfaces.",
      },
    ],
  }),
  component: Skills,
});

const skills = [
  {
    Icon: Code2,
    title: "Web Development",
    desc: "Responsive, scalable, and secure websites built with modern frameworks.",
    points: ["Responsive layouts", "Performance optimization", "SEO-ready", "Secure architecture"],
  },
  {
    Icon: Cpu,
    title: "Software Development",
    desc: "Custom applications tailored precisely to client requirements and workflows.",
    points: ["Tailored solutions", "Clean architecture", "API integrations", "Long-term maintainability"],
  },
  {
    Icon: Palette,
    title: "UI/UX Design",
    desc: "Intuitive, user-friendly interfaces that enhance engagement and delight.",
    points: ["User research", "Wireframing & prototyping", "Design systems", "Accessibility-first"],
  },
];

function Skills() {
  return (
    <section className="container mx-auto px-6 py-20 md:py-28 max-w-6xl">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-medium mb-5">
          Our Expertise
        </span>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Skills <span className="text-gradient">finely tuned</span>
        </h1>
        <p className="mt-5 text-muted-foreground">
          Three core disciplines we've spent years sharpening — applied to every project.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {skills.map(({ Icon, title, desc, points }) => (
          <article
            key={title}
            className="relative p-8 rounded-2xl bg-gradient-card border border-border/60 hover:border-primary/50 hover:shadow-glow transition-smooth"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 shadow-glow">
              <Icon size={26} className="text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-3">{title}</h2>
            <p className="text-sm text-muted-foreground mb-6">{desc}</p>
            <ul className="space-y-2">
              {points.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm">
                  <Check size={16} className="text-primary" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
