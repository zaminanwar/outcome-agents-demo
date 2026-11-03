import { CircleCheckIcon } from "lucide-react";

import { Flag } from "@/components/outcome/review";
import { Section } from "@/components/section";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HOW, TIMELINE } from "@/lib/content";

export function How() {
  return (
    <Section
      id="how"
      title="How we work."
      lede={
        <span data-flag="pricing">
          Three steps, each fixed-price, each with a gate your side signs. No
          prices on this page: quotes follow qualification.
          <Flag id="pricing" />
        </span>
      }
    >
      <ol className="grid gap-4 md:grid-cols-3">
        {HOW.map((step, i) => (
          <li key={step.title} className="flex">
            <Card className="w-full">
              <CardHeader>
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{step.body}</CardContent>
              <CardFooter className="gap-2 text-xs">
                <CircleCheckIcon className="size-3.5 shrink-0 text-signal" aria-hidden />
                <span>
                  <span className="font-medium">Gate.</span>{" "}
                  <span className="text-muted-foreground">{step.gate}</span>
                </span>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ol>
      <p className="mt-6 max-w-2xl text-sm text-pretty text-muted-foreground" data-flag="timeline">
        {TIMELINE}
        <Flag id="timeline" />
      </p>
    </Section>
  );
}
