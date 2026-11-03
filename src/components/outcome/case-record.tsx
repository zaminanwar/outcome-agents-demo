import { CheckIcon, CircleDashedIcon, UserCheckIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Status = "done" | "waiting" | "pending";

const ROWS: Array<{ stage: string; detail: string; status: Status }> = [
  { stage: "Trigger", detail: "RFP_2026_Broker.pdf landed in the bids folder", status: "done" },
  { stage: "Decompose", detail: "4 obligations, one matrix row each", status: "done" },
  { stage: "Retrieve", detail: "Approved library only, permission-trimmed", status: "done" },
  { stage: "Draft", detail: "3 answered with citations · 1 gap, to Legal", status: "done" },
  { stage: "Check", detail: "Code pass: claims linked, nothing expired", status: "done" },
  { stage: "Approve", detail: "Section owner · the exact text · sha256 9f3a…c21e", status: "waiting" },
  { stage: "Write", detail: "Suggestions into the proposal workspace", status: "pending" },
  { stage: "Record", detail: "One run record for the case", status: "pending" },
];

function StatusIcon({ status }: { status: Status }) {
  if (status === "done") {
    return (
      <span className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <CheckIcon className="size-3" strokeWidth={3} />
      </span>
    );
  }
  if (status === "waiting") {
    return (
      <span className="flex size-5 items-center justify-center rounded-full bg-signal text-signal-foreground">
        <UserCheckIcon className="size-3" strokeWidth={2.5} />
      </span>
    );
  }
  return (
    <span className="flex size-5 items-center justify-center text-muted-foreground/60">
      <CircleDashedIcon className="size-4" />
    </span>
  );
}

/**
 * Hero illustration: one case, mid-run, waiting on a person. Static and
 * labelled illustrative; the data are the same placeholders as the example
 * section below (case 0412, R-03 gap, truncated hash).
 */
export function CaseRecord({ className }: { className?: string }) {
  return (
    <Card
      className={cn("shadow-sm", className)}
      aria-label="Illustration: run record for case 0412, five steps done, waiting on a section owner to approve the exact text"
    >
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2 font-mono text-sm font-medium">
          Case 0412
          <Badge variant="secondary" className="font-sans">RFP response</Badge>
        </CardTitle>
        <CardDescription>Started by a file arriving. Nobody opened an agent.</CardDescription>
        <CardAction>
          <Badge variant="outline" className="border-signal/40 bg-signal/10 text-signal">
            <span className="size-1.5 rounded-full bg-signal" />
            Waiting on a person
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ol className="-my-1">
          {ROWS.map((row) => (
            <li
              key={row.stage}
              className={cn(
                "flex items-start gap-3 border-b py-2.5 last:border-b-0",
                row.status === "waiting" && "-mx-2 rounded-md border-b-0 bg-signal/5 px-2 ring-1 ring-signal/20",
                row.status === "pending" && "text-muted-foreground"
              )}
            >
              <StatusIcon status={row.status} />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <p className={cn("font-medium", row.status === "waiting" && "text-signal")}>
                    {row.stage}
                  </p>
                  {row.status === "waiting" ? (
                    <span className="font-mono text-[11px] text-signal">a person decides</span>
                  ) : row.status === "done" ? (
                    <span className="font-mono text-[11px] text-muted-foreground">code</span>
                  ) : null}
                </div>
                <p className="truncate text-xs text-muted-foreground">{row.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </CardContent>
      <CardFooter className="justify-between gap-4 text-xs text-muted-foreground">
        <span>Illustrative. Placeholder data, not a client.</span>
        <span className="font-mono whitespace-nowrap">run 0412 · 1 of 1</span>
      </CardFooter>
    </Card>
  );
}
