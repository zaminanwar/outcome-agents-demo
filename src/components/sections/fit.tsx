import { CircleCheckIcon } from "lucide-react";

import { Flag } from "@/components/outcome/review";
import { Section } from "@/components/section";
import { Card, CardContent } from "@/components/ui/card";
import { SOLO, YOU } from "@/lib/content";

export function Fit() {
  return (
    <Section
      id="you"
      title="Is this you?"
      lede="Four things we look for. If the fourth is missing, we will say so rather than build."
      muted
    >
      <Card className="max-w-3xl">
        <CardContent>
          <ol className="divide-y">
            {YOU.map((y, i) => (
              <li key={y} className="flex items-start gap-4 py-4 first:pt-1 last:pb-1">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-xs text-muted-foreground">
                  {i + 1}
                </span>
                <p className="flex-1 text-pretty">{y}</p>
                <CircleCheckIcon aria-hidden className="mt-0.5 size-4 shrink-0 text-muted-foreground/60" />
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
      <p className="mt-6 max-w-2xl text-sm text-pretty text-muted-foreground" data-flag="solo">
        {SOLO}
        <Flag id="solo" />
      </p>
    </Section>
  );
}
