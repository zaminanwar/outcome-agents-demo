"use client";

import { Button } from "@/components/ui/button";
import { ShimmerButton } from "@/components/velora/shimmer-button";
import { cn } from "@/lib/utils";

/** Template-style CTA row: shimmer primary + ghost secondary, scrolling to
 * in-page sections. Client-only because it scrolls on click. */
export function CtaButtons({
  primaryLabel,
  primaryTarget,
  secondaryLabel,
  secondaryTarget,
  large = false,
  className,
}: {
  primaryLabel: string;
  primaryTarget: string;
  secondaryLabel: string;
  secondaryTarget: string;
  large?: boolean;
  className?: string;
}) {
  const scroll = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-4",
        className
      )}
    >
      <ShimmerButton
        onClick={() => scroll(primaryTarget)}
        className={large ? "h-14 px-10 text-base" : undefined}
      >
        {primaryLabel}
      </ShimmerButton>
      <Button variant="ghost" size="lg" onClick={() => scroll(secondaryTarget)}>
        {secondaryLabel}
      </Button>
    </div>
  );
}
