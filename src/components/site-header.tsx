import Link from "next/link";
import { SparklesIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";
import { Flag } from "@/components/outcome/review";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { href: "/#walkthrough", label: "How a run works" },
  { href: "/#anatomy", label: "Anatomy" },
  { href: "/#method", label: "Method" },
  { href: "/#estimator", label: "Estimator" },
  { href: "/#fit", label: "Fit" },
  { href: "/#faq", label: "FAQ" },
] as const;

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <SparklesIcon className="size-5 text-primary" />
          Outcome Agents
        </Link>
        <span
          data-flag="name"
          className="hidden rounded-full border px-2 py-0.5 text-xs text-muted-foreground sm:inline"
        >
          working name
          <Flag id="name" />
        </span>
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
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button size="sm" asChild className="hidden sm:inline-flex">
            <Link href="/#contact">Start a conversation</Link>
          </Button>
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
