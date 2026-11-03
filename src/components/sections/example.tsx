import { ChevronRightIcon } from "lucide-react";

import { CaseIllustration } from "@/components/outcome/case-illustration";
import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OTHER_PROCESSES, STEPS, VERBS } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Example() {
  return (
    <Section
      id="example"
      title="One example: answering an RFP."
      lede="From the bid team’s side there are four things to do. Everything else happens underneath, the same way every time."
      flag="example"
    >
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {VERBS.map((v, i) => (
          <li key={v.verb}>
            <Card className="h-full">
              <CardHeader>
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                <CardTitle className="text-lg leading-snug text-balance">{v.verb}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{v.body}</CardContent>
            </Card>
          </li>
        ))}
      </ol>

      <div className="mt-12">
        <CaseIllustration />
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
        <div>
          <h3 className="font-medium">Underneath, every time</h3>
          <ol className="mt-3 flex flex-wrap items-center gap-y-2">
            {STEPS.map((s, i) => {
              const kind = "kind" in s ? s.kind : undefined;
              return (
                <li key={s.label} className="flex items-center">
                  <Badge
                    variant={kind === "human" ? "default" : kind === "code" ? "outline" : "secondary"}
                    className={cn(
                      "font-mono",
                      kind === "human" && "bg-signal text-signal-foreground",
                      kind === "code" && "border-foreground/40"
                    )}
                  >
                    {s.label}
                  </Badge>
                  {i < STEPS.length - 1 ? (
                    <ChevronRightIcon aria-hidden className="mx-0.5 size-3.5 text-muted-foreground/60" />
                  ) : null}
                </li>
              );
            })}
          </ol>
          <p className="mt-3 text-sm text-muted-foreground">
            Code runs the sequence. The model works inside bounded steps. A person owns the consequences.
          </p>
        </div>
        <div>
          <h3 className="font-medium">Same shape, any process that arrives as documents</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {OTHER_PROCESSES.map((p) => (
              <li key={p}>
                <Badge variant="outline" className="h-7 px-3 text-sm font-normal">
                  {p}
                </Badge>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">
            The RFP is the worked example because its evidence, its approvals and its gaps are easy to see. The parts swap; the shape does not.
          </p>
        </div>
      </div>
    </Section>
  );
}
