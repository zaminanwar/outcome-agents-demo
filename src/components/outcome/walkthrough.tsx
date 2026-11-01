"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { PROCESSES, STAGES, type TagKind } from "@/lib/outcome";
import { cn } from "@/lib/utils";

const tagLabel: Record<TagKind, string> = {
  bought: "Platform supplies: ",
  built: "We build: ",
  human: "Human decides: ",
};

const tagClass: Record<TagKind, string> = {
  bought: "border-primary/30 bg-primary/10 text-primary",
  built: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  human:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
};

const dotClass: Record<string, string> = {
  built: "bg-amber-500",
  human: "bg-emerald-500",
};

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
        className="flex flex-wrap gap-2"
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
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              i === proc
                ? "border-primary bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            {p.name}
          </button>
        ))}
      </div>

      <p className="mt-4 max-w-3xl text-muted-foreground">{process.intro}</p>

      <div
        role="tablist"
        aria-label="Stages"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" && step < STAGES.length - 1) setStep(step + 1);
          if (e.key === "ArrowLeft" && step > 0) setStep(step - 1);
        }}
        className="mt-6 flex gap-2 overflow-x-auto pb-1"
      >
        {STAGES.map((s, i) => (
          <button
            key={s.key}
            type="button"
            role="tab"
            aria-selected={i === step}
            onClick={() => setStep(i)}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors",
              i === step
                ? "border-primary bg-primary text-primary-foreground"
                : i < step
                  ? "border-primary/40 text-primary"
                  : "hover:bg-muted"
            )}
          >
            <span
              aria-hidden
              className={cn(
                "size-2 rounded-full",
                dotClass[s.kind ?? ""] ?? "bg-muted-foreground"
              )}
            />
            {i + 1}. {s.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        aria-live="polite"
        className="mt-4 rounded-2xl border bg-card p-6 md:p-8"
      >
        <p className="text-sm text-muted-foreground">
          Stage {step + 1} of {STAGES.length} · {stage.label}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight md:text-2xl">
          {current.title}
        </h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          {current.body}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {current.tags.map(([kind, text]) => (
            <span
              key={`${kind}-${text}`}
              className={cn(
                "rounded-full border px-3 py-1 text-xs",
                tagClass[kind]
              )}
            >
              {tagLabel[kind]}
              {text}
            </span>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => step > 0 && setStep(step - 1)}
            disabled={step === 0}
          >
            ← Previous
          </Button>
          <Button type="button" onClick={next}>
            {isLastStage
              ? proc < PROCESSES.length - 1
                ? "Next process →"
                : "Back to the first process"
              : "Next stage →"}
          </Button>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Illustrative only. These are not client engagements. The case details,
        document types and systems are placeholders for what a discovery would
        map in your business.
      </p>
    </div>
  );
}
