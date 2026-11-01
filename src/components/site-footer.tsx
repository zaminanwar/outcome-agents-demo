import Link from "next/link";
import { SparklesIcon } from "lucide-react";

const groups = [
  {
    title: "Sections",
    links: [
      { text: "How a run works", href: "/#walkthrough" },
      { text: "Anatomy", href: "/#anatomy" },
      { text: "Method", href: "/#method" },
      { text: "Estimator", href: "/#estimator" },
      { text: "Fit", href: "/#fit" },
      { text: "FAQ", href: "/#faq" },
      { text: "Start a conversation", href: "/#contact" },
    ],
  },
  {
    title: "This page",
    links: [
      { text: "What's decided, what isn't", href: "/#status" },
      { text: "Template: Velora UI (MIT)", href: "https://github.com/ColorlibHQ/velora-ui" },
    ],
  },
];

const headingId = (title: string) =>
  `footer-${title.toLowerCase().replace(/[^a-z]+/g, "-")}`;

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 py-14">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-8 gap-y-10 px-4 md:grid-cols-3 lg:grid-cols-[1.4fr_repeat(2,1fr)] lg:px-8">
        <div className="col-span-2 md:col-span-3 lg:col-span-1">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <SparklesIcon className="size-5 text-primary" />
            Outcome Agents
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            <strong className="text-foreground">Outcome Agents</strong> is a
            working name for a consultancy that does not exist yet. This page
            is a demo concept for discussion, not a live company site. No
            clients, metrics, testimonials or prices appear on it because
            there are none to show.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            Static page. No backend, no analytics, no cookies.
          </p>
        </div>
        {groups.map((group) => (
          <nav key={group.title} aria-labelledby={headingId(group.title)}>
            <h2 id={headingId(group.title)} className="text-sm font-semibold">
              {group.title}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {group.links.map((link) => (
                <li key={link.text}>
                  {/^https?:/.test(link.href) ? (
                    <a
                      href={link.href}
                      rel="noopener"
                      target="_blank"
                      className="transition-colors hover:text-foreground"
                    >
                      {link.text}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-foreground"
                    >
                      {link.text}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-2 border-t border-border/40 px-4 pt-6 text-center text-xs text-muted-foreground md:flex-row md:text-left lg:px-8">
        <span>
          Built with Velora UI (MIT). Product names belong to their owners;
          nothing here implies any vendor endorses or ships what we build on
          top of their tooling.
        </span>
        <span>Every animation respects prefers-reduced-motion.</span>
      </div>
    </footer>
  );
}
