import Link from "next/link";
import { ArrowDownIcon } from "lucide-react";

import { CaseRecord } from "@/components/outcome/case-record";
import { Flag } from "@/components/outcome/review";
import { Button } from "@/components/ui/button";
import { HERO } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Dot grid, fading out towards the bottom. Decorative only. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-[size:22px_22px] [mask-image:linear-gradient(to_bottom,black_20%,transparent_90%)]"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-16 pb-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pt-24 lg:pb-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border bg-background/80 py-1 pr-3 pl-1.5 text-xs text-muted-foreground">
            <span className="size-1.5 shrink-0 rounded-full bg-signal" aria-hidden />
            {HERO.eyebrow}
          </p>
          <h1
            data-flag="hero"
            className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl xl:text-6xl"
          >
            {HERO.title}
            <Flag id="hero" />
          </h1>
          <p className="mt-6 max-w-xl text-lg text-pretty text-muted-foreground">
            {HERO.lede}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href="#shift">
                See the shift
                <ArrowDownIcon data-icon="inline-end" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#you">Is this you?</Link>
            </Button>
          </div>
        </div>
        <CaseRecord className="lg:justify-self-end lg:w-full lg:max-w-md" />
      </div>
    </section>
  );
}
