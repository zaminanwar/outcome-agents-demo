import Link from "next/link";

import { MobileNav } from "@/components/mobile-nav";
import { Flag } from "@/components/outcome/review";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { href: "/#how", label: "How it runs" },
  { href: "/#case", label: "One case" },
  { href: "/#engagement", label: "Engagement" },
  { href: "/#fit", label: "Fit" },
  { href: "/#questions", label: "Questions" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/92 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-baseline gap-2.5">
          <span className="font-serif text-lg tracking-tight">
            Outcome Agents
          </span>
          <span
            data-flag="name"
            className="hidden text-[11px] text-muted-foreground sm:inline"
          >
            working name
            <Flag id="name" />
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
          >
            Start a conversation
          </Link>
        </nav>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <MobileNav
            links={[
              ...navLinks,
              { href: "/#contact", label: "Start a conversation" },
            ]}
          />
        </div>
      </div>
    </header>
  );
}
