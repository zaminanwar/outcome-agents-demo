import Link from "next/link";

import { MobileNav } from "@/components/mobile-nav";
import { Flag } from "@/components/outcome/review";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { href: "/#gap", label: "The gap" },
  { href: "/#example", label: "One example" },
  { href: "/#get", label: "What you get" },
  { href: "/#how", label: "How we work" },
  { href: "/#you", label: "Is this you?" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/92 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-baseline gap-2.5">
          <span className="font-serif text-lg tracking-tight">Outcome Agents</span>
          <span data-flag="name" className="hidden text-[11px] text-muted-foreground sm:inline">
            working name
            <Flag id="name" />
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
          >
            Tell us about the process
          </Link>
        </nav>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <MobileNav links={[...navLinks, { href: "/#contact", label: "Tell us about the process" }]} />
        </div>
      </div>
    </header>
  );
}
