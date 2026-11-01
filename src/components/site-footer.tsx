import Link from "next/link";

import { Flag, ReviewNotes } from "@/components/outcome/review";

const links = [
  { text: "How it runs", href: "/#how" },
  { text: "One case, end to end", href: "/#case" },
  { text: "Built and bought", href: "/#parts" },
  { text: "The engagement", href: "/#engagement" },
  { text: "Reviewer load", href: "/#estimator" },
  { text: "Fit", href: "/#fit" },
  { text: "Decided and open", href: "/#status" },
  { text: "Questions", href: "/#questions" },
  { text: "Start a conversation", href: "/#contact" },
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
