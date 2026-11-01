"use client";

import { useState } from "react";

import { PROCESSES, STAGES, type TagKind } from "@/lib/outcome";
import { cn } from "@/lib/utils";

const tagLabel: Record<TagKind, string> = {
  bought: "Platform supplies",
  built: "We build",
  human: "A person decides",
};

const markClass: Record<TagKind, string> = {
  bought: "mark",
  built: "mark mark-built",
  human: "mark mark-human",
};

/**
 * One case, end to end. Laid out as a ledger: the stage list on the left,
 * the current stage on the right. Same content and stage model as before.
 */
export function Walkthrough() {
  const [proc, setProc] = useState(0);
  const [step, setStep] = useState(0);

  const process = PROCESSES[proc];
  const stage = STAGES[step];
  const current = process.steps[stage.key];
  const isLastStage = step === STAGES.length - 1;

  const next = () => {
    if (!isLastStage) {
      setStep(step + 1);
    } else {
      setProc((proc + 1) % PROCESSES.length);
      setStep(0);
    }
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Example processes"
        className="flex flex-wrap gap-x-6 gap-y-2 border-b border-border pb-3 text-sm"
      >
        {PROCESSES.map((p, i) => (
          <button
            key={p.name}
            type="button"
            role="tab"
            aria-selected={i === proc}
            onClick={() => {
              setProc(i);
              setStep(0);
            }}
            className={cn(
              "relative pb-1 transition-colors",
              i === proc
                ? "text-foreground after:absolute after:inset-x-0 after:-bottom-[13px] after:h-px after:bg-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {p.name}
          </button>
        ))}
      </div>

      <p className="prose-memo mt-5 text-muted-foreground">{process.intro}</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[15rem_1fr] lg:gap-12">
        <ol
          role="tablist"
          aria-label="Stages"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
              if (step < STAGES.length - 1) setStep(step + 1);
            }
            if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
              if (step > 0) setStep(step - 1);
            }
          }}
          className="-mx-5 flex gap-1 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0"
        >
          {STAGES.map((s, i) => (
            <li key={s.key} className="shrink-0 lg:border-t lg:border-border lg:last:border-b">
              <button
                type="button"
                role="tab"
                aria-selected={i === step}
                onClick={() => setStep(i)}
                className={cn(
                  "flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors lg:px-1 lg:py-2.5",
                  "border border-border lg:border-0",
                  i === step
                    ? "bg-foreground text-background lg:bg-transparent lg:text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="w-4 font-mono text-[11px] tabular-nums opacity-70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "flex-1",
                    i === step && "lg:font-medium"
                  )}
                >
                  {s.label}
                </span>
                {s.kind ? (
                  <span aria-hidden className={markClass[s.kind]} />
                ) : null}
              </button>
            </li>
          ))}
        </ol>

        <div role="tabpanel" aria-live="polite" className="min-w-0">
          <p className="kicker">
            Stage {step + 1} of {STAGES.length} · {stage.label}
          </p>
          <h3 className="display mt-3 text-2xl sm:text-3xl">{current.title}</h3>
          <p className="prose-memo mt-4">{current.body}</p>

          <dl className="mt-6 border-t border-border text-sm">
            {current.tags.map(([kind, text]) => (
              <div
                key={`${kind}-${text}`}
                className="grid gap-1 border-b border-border py-2.5 sm:grid-cols-[11rem_1fr] sm:gap-4"
              >
                <dt className="flex items-center gap-2 text-muted-foreground">
                  <span aria-hidden className={markClass[kind]} />
                  {tagLabel[kind]}
                </dt>
                <dd className={cn(kind === "human" && "text-signal")}>{text}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <button
              type="button"
              onClick={() => step > 0 && setStep(step - 1)}
              disabled={step === 0}
              className="underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Previous
            </button>
            <button
              type="button"
              onClick={next}
              className="underline decoration-foreground underline-offset-4"
            >
              {isLastStage
                ? proc < PROCESSES.length - 1
                  ? "Next process →"
                  : "Back to the first process →"
                : "Next stage →"}
            </button>
          </div>
        </div>
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        Illustrative only. These are not client engagements. The case details,
        document types and systems are placeholders for what a discovery would
        map in your business.
      </p>
    </div>
  );
}
