import Link from "next/link";

import { Logo } from "@/components/logo";
import { Flag, ReviewNotes } from "@/components/outcome/review";
import { Separator } from "@/components/ui/separator";
import { CTA, FOOTER_DISCLOSURE, NAV } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <div className="max-w-md">
            <Logo />
            <p data-flag="byline" className="mt-4 text-sm text-pretty text-muted-foreground">
              {FOOTER_DISCLOSURE}
              <Flag id="byline" />
            </p>
            <div className="mt-6">
              <ReviewNotes />
            </div>
          </div>
          <nav aria-label="Sections">
            <p className="text-sm font-medium">On this page</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {[...NAV, CTA].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <Separator className="my-8" />
        <p className="text-xs text-muted-foreground">
          Static page. No backend, no analytics, no cookies. Built with shadcn/ui on Next.js.
        </p>
      </div>
    </footer>
  );
}
