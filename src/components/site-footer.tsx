import Link from "next/link";

import { Flag, ReviewNotes } from "@/components/outcome/review";

const links = [
  { text: "The shift", href: "/#shift" },
  { text: "The gap", href: "/#gap" },
  { text: "One example", href: "/#example" },
  { text: "What you get", href: "/#get" },
  { text: "How we work", href: "/#how" },
  { text: "Is this you?", href: "/#you" },
  { text: "Tell us about the process", href: "/#contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-5xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr]">
        <div className="max-w-md">
          <p className="font-serif text-lg tracking-tight">Outcome Agents</p>
          <p data-flag="byline" className="mt-3 text-sm text-muted-foreground">
            A working name for a consultancy that does not exist yet. This page
            is a demo concept for discussion, not a live company site. No
            clients, metrics, testimonials or prices appear on it because
            there are none to show.
            <Flag id="byline" />
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            Static page. No backend, no analytics, no cookies.
          </p>
          <div className="mt-6">
            <ReviewNotes />
          </div>
        </div>
        <nav aria-label="Sections">
          <p className="kicker">On this page</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-foreground"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
