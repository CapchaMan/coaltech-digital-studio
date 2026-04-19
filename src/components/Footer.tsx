import { Link } from "@tanstack/react-router";
import { Linkedin, Instagram, Twitter, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30 mt-24">
      <div className="container mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary shadow-glow" />
            <span className="font-display text-xl font-bold">Coaltech</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Building digital experiences that inspire — through code, design, and craft.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold mb-4 uppercase tracking-wider text-muted-foreground">
            Navigate
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-primary transition-smooth">About</Link></li>
            <li><Link to="/skills" className="hover:text-primary transition-smooth">Skills</Link></li>
            <li><Link to="/portfolio" className="hover:text-primary transition-smooth">Portfolio</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-smooth">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold mb-4 uppercase tracking-wider text-muted-foreground">
            Get in touch
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-primary" />
              <a href="mailto:coaltech91@gmail.com" className="hover:text-foreground transition-smooth">
                coaltech91@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-primary" />
              <a href="tel:+2347080143370" className="hover:text-foreground transition-smooth">
                +234 708 014 3370
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-primary" />
              <a href="tel:+2348137429301" className="hover:text-foreground transition-smooth">
                +234 813 742 9301
              </a>
            </li>
          </ul>
          <div className="flex gap-3 mt-5">
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
                className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-gradient-primary hover:text-primary-foreground hover:scale-110 transition-smooth"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border/50 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Coaltech. Crafted with passion.
      </div>
    </footer>
  );
}
