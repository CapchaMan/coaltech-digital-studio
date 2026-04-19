import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import workWebsite from "@/assets/work-website.jpg";
import workDating from "@/assets/work-dating.jpg";
import workBanking from "@/assets/work-banking.jpg";
import workUiux from "@/assets/work-uiux.jpg";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Coaltech" },
      {
        name: "description",
        content:
          "Featured works by Coaltech: modern business websites, custom software, and engaging UI/UX projects.",
      },
      { property: "og:title", content: "Portfolio — Coaltech" },
      {
        property: "og:description",
        content: "Sleek websites, secure software, and user-centric mobile interfaces.",
      },
      { property: "og:image", content: workWebsite },
    ],
  }),
  component: Portfolio,
});

const works = [
  {
    img: workWebsite,
    tag: "Web Development",
    title: "Modern Business Website",
    desc: "Sleek, professional, and fully responsive — designed to convert visitors into customers.",
  },
  {
    img: workDating,
    tag: "Software Development",
    title: "Dating Mobile App",
    desc: "A vibrant matchmaking experience with smart recommendations, real-time chat, and secure profiles.",
  },
  {
    img: workBanking,
    tag: "Software Development",
    title: "Banking Mobile App",
    desc: "A secure fintech app for balances, transfers, and analytics — built with end-to-end encryption.",
  },
  {
    img: workUiux,
    tag: "UI/UX Design",
    title: "Mobile App Interface",
    desc: "Engaging mobile experience built around user-centric principles and clean visual hierarchy.",
  },
];

function Portfolio() {
  return (
    <section className="container mx-auto px-6 py-20 md:py-28 max-w-6xl">
      <div className="max-w-2xl mb-16">
        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-medium mb-5">
          Featured Works
        </span>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Selected <span className="text-gradient">projects</span>
        </h1>
        <p className="mt-5 text-muted-foreground">
          A glimpse into recent work — each project a partnership shaped around real goals.
        </p>
      </div>

      <div className="space-y-10">
        {works.map((w, i) => (
          <article
            key={w.title}
            className={`grid gap-8 md:grid-cols-2 items-center p-6 md:p-8 rounded-3xl bg-gradient-card border border-border/60 hover:border-primary/40 transition-smooth ${
              i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
            }`}
          >
            <div className="overflow-hidden rounded-2xl shadow-elegant">
              <img
                src={w.img}
                alt={w.title}
                width={1024}
                height={768}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-smooth duration-700"
              />
            </div>
            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                {w.tag}
              </span>
              <h2 className="mt-2 text-2xl md:text-3xl font-bold">{w.title}</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{w.desc}</p>
              <Link
                to="/contact"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-3 transition-smooth"
              >
                Start a similar project <ArrowUpRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
