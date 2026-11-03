import { ChevronRightIcon, FileTextIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const MATRIX = [
  ["R-01", "Cyber cover limits"],
  ["R-02", "Claims SLA"],
  ["R-03", "Data residency"],
  ["R-04", "Sub-limits, flood"],
] as const;

const ANSWERS = [
  ["R-01", "Lib/CY-14"],
  ["R-02", "Lib/OPS-3"],
  ["R-03", null],
  ["R-04", "Lib/UW-9"],
] as const;

function Pane({
  n,
  title,
  signal,
  children,
}: {
  n: number;
  title: string;
  signal?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li className="relative flex min-w-0">
      <Card
        size="sm"
        className={cn("w-full", signal && "ring-signal/40")}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xs">
            <span
              className={cn(
                "font-mono text-[10px] text-muted-foreground",
                signal && "text-signal"
              )}
            >
              0{n}
            </span>
            <span className={cn(signal && "text-signal")}>{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs">{children}</CardContent>
      </Card>
      <ChevronRightIcon
        aria-hidden
        className="absolute top-1/2 -right-3.5 hidden size-4 -translate-y-1/2 text-muted-foreground/50 lg:block [li:last-child_&]:hidden"
      />
    </li>
  );
}

function Lines({ widths }: { widths: string[] }) {
  return (
    <div className="space-y-1" aria-hidden>
      {widths.map((w, i) => (
        <div key={i} className={cn("h-1.5 rounded-sm bg-foreground/15", w)} />
      ))}
    </div>
  );
}

/** The RFP case at a glance: five panes, placeholder data. */
export function CaseIllustration() {
  return (
    <figure aria-label="Illustration: an RFP pack becomes a compliance matrix, gaps are flagged, the exact text is approved, and a person submits.">
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
        <Pane n={1} title="Pack arrives">
          <div className="flex items-center gap-2 rounded-md border bg-muted/40 p-2">
            <FileTextIcon className="size-4 shrink-0 text-muted-foreground" />
            <span className="truncate font-mono text-[11px]">RFP_2026_Broker.pdf</span>
          </div>
          <p className="text-muted-foreground">Folder trigger. Case 0412 opened.</p>
        </Pane>

        <Pane n={2} title="Matrix built">
          <ul className="divide-y rounded-md border">
            {MATRIX.map(([id, t]) => (
              <li key={id} className="flex gap-2 px-2 py-1">
                <span className="font-mono text-[11px] text-muted-foreground">{id}</span>
                <span className="truncate">{t}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground">One row per obligation.</p>
        </Pane>

        <Pane n={3} title="Answered or gap">
          <ul className="space-y-1">
            {ANSWERS.map(([id, src]) => (
              <li key={id} className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] text-muted-foreground">{id}</span>
                {src ? (
                  <Badge variant="secondary" className="h-5 font-mono text-[10px]">
                    cites {src}
                  </Badge>
                ) : (
                  <Badge className="h-5 border-signal/40 bg-signal/10 text-[10px] text-signal">
                    Gap · owner: Legal
                  </Badge>
                )}
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground">Nothing invented. Gaps go to a person.</p>
        </Pane>

        <Pane n={4} title="Approve exact text" signal>
          <div className="rounded-md border border-signal/30 p-2">
            <Lines widths={["w-full", "w-11/12", "w-2/3"]} />
            <p className="mt-2 font-mono text-[10px] text-muted-foreground">
              sha256 · 9f3a…c21e
            </p>
          </div>
          <p className="text-signal">Section owner approves. Edit voids it.</p>
        </Pane>

        <Pane n={5} title="Person submits">
          <div className="rounded-md border bg-muted/40 p-2">
            <p className="font-medium">Proposal workspace</p>
            <p className="text-muted-foreground">4 suggestions · 1 pending</p>
          </div>
          <p className="text-muted-foreground">Submit is a human button. Record kept per case.</p>
        </Pane>
      </ol>
      <figcaption className="mt-3 text-xs text-muted-foreground">
        Illustrative. Case numbers, library references and requirement text are placeholders, not a client.
      </figcaption>
    </figure>
  );
}
