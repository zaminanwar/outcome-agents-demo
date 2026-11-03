import Link from "next/link";

import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";
import { Flag } from "@/components/outcome/review";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTA, NAV } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex shrink-0 items-center gap-3">
          <Link href="/" aria-label="Outcome Agents, home">
            <Logo />
          </Link>
          <Badge
            variant="outline"
            data-flag="name"
            className="hidden font-normal text-muted-foreground sm:inline-flex"
          >
            working name
            <Flag id="name" />
          </Badge>
        </div>

        <nav aria-label="Sections" className="hidden items-center gap-0.5 xl:flex">
          {NAV.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              size="sm"
              asChild
              className="text-muted-foreground hover:text-foreground"
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <Button size="sm" asChild className="hidden md:inline-flex">
            <Link href={CTA.href}>{CTA.label}</Link>
          </Button>
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
