"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function fmt(n: number, digits?: number): string {
  if (!isFinite(n)) return "—";
  const d = digits === undefined ? (n >= 100 ? 0 : 1) : digits;
  return n.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: d,
  });
}

function num(value: string, fallback: number): number {
  const v = parseFloat(value);
  return isFinite(v) && v >= 0 ? v : fallback;
}

const labelClass = "text-sm font-medium";
const hintClass = "text-xs text-muted-foreground";

export function Estimator() {
  const [items, setItems] = useState("120");
  const [mins, setMins] = useState("90");
  const [share, setShare] = useState("100");
  const [review, setReview] = useState("12");
  const [days, setDays] = useState("21");
  const [reviewers, setReviewers] = useState("1");

  const itemCount = num(items, 0);
  const minsPerItem = num(mins, 0);
  const shareFrac = num(share, 100) / 100;
  const reviewMins = num(review, 0);
  const dayCount = Math.max(1, num(days, 21));
  const reviewerCount = Math.max(1, num(reviewers, 1));

  const todayHours = (itemCount * minsPerItem) / 60;
  const reviewHours = (itemCount * shareFrac * reviewMins) / 60;
  const delta = todayHours - reviewHours;
  const perDay = (itemCount * shareFrac) / dayCount;
  const queueHoursPerReviewer = reviewHours / dayCount / reviewerCount;

  let verdict = "";
  let verdictTone = "muted";
  if (itemCount === 0) {
    verdict = "Enter a monthly volume to see the arithmetic.";
  } else if (delta < 0) {
    verdict =
      "On these inputs reviewing costs more than doing. That happens when review minutes approach today’s handling minutes. Either the process is already fast, or the review surface needs to show less and link more. Worth a conversation, not a build.";
    verdictTone = "warn";
  } else if (queueHoursPerReviewer > 4) {
    verdict = `Each reviewer would spend about ${fmt(queueHoursPerReviewer, 1)} hours a day in the approval queue. That’s a bottleneck, not a design. More reviewers, or a narrower scope for the first process.`;
    verdictTone = "warn";
  } else if (queueHoursPerReviewer > 2) {
    verdict = `About ${fmt(queueHoursPerReviewer, 1)} queue hours per reviewer per day is carryable for a pilot if the reviewers know it’s coming. Review minutes per item is the number the pilot measures and the number that decides whether this scales.`;
  } else {
    verdict = `About ${fmt(queueHoursPerReviewer, 1)} queue hours per reviewer per day. On these inputs the approval queue is carryable. The remaining question is whether your baseline numbers are real, and that is what discovery establishes.`;
    verdictTone = "ok";
  }

  const stats = [
    { label: "Hours per month today", value: `${fmt(todayHours)} h` },
    {
      label: "Reviewer hours per month with the agent",
      value: `${fmt(reviewHours)} h`,
    },
    {
      label: "Hours that move from doing to reviewing",
      value: `${delta < 0 ? "−" : ""}${fmt(Math.abs(delta))} h`,
      accent: true,
    },
    { label: "Approvals per working day", value: fmt(perDay, 1) },
    {
      label: "Queue hours per reviewer per day",
      value: `${fmt(queueHoursPerReviewer, 1)} h`,
    },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form
        className="space-y-5"
        autoComplete="off"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="block space-y-1.5">
          <span className={labelClass}>Items per month</span>
          <Input
            type="number"
            min="0"
            step="1"
            inputMode="numeric"
            value={items}
            onChange={(e) => setItems(e.target.value)}
          />
          <span className={cn(hintClass, "block")}>
            RFPs, tickets, supplier packs, claims. Whatever one case is.
          </span>
        </label>
        <label className="block space-y-1.5">
          <span className={labelClass}>People-minutes per item today</span>
          <Input
            type="number"
            min="0"
            step="1"
            inputMode="numeric"
            value={mins}
            onChange={(e) => setMins(e.target.value)}
          />
          <span className={cn(hintClass, "block")}>
            Total hands-on time across everyone who touches it.
          </span>
        </label>
        <label className="block space-y-1.5">
          <span className={labelClass}>
            Share of items a human still reviews
          </span>
          <span className="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={share}
              onChange={(e) => setShare(e.target.value)}
              className="w-full accent-primary"
            />
            <output className="w-12 shrink-0 text-right text-sm font-medium">
              {Math.round(shareFrac * 100)}%
            </output>
          </span>
          <span className={cn(hintClass, "block")}>
            On a first engagement this is 100%: every consequential write is
            approved by a person.
          </span>
        </label>
        <label className="block space-y-1.5">
          <span className={labelClass}>Reviewer minutes per item</span>
          <Input
            type="number"
            min="0"
            step="1"
            inputMode="numeric"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <span className={cn(hintClass, "block")}>
            Time to read the exact text and its sources and press approve,
            edit or reject.
          </span>
        </label>
        <label className="block space-y-1.5">
          <span className={labelClass}>Working days per month</span>
          <Input
            type="number"
            min="1"
            max="31"
            step="1"
            inputMode="numeric"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
        </label>
        <label className="block space-y-1.5">
          <span className={labelClass}>Reviewers available</span>
          <Input
            type="number"
            min="1"
            step="1"
            inputMode="numeric"
            value={reviewers}
            onChange={(e) => setReviewers(e.target.value)}
          />
        </label>
      </form>

      <div aria-live="polite" className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {stats.map((s) => (
            <div
              key={s.label}
              className={cn(
                "rounded-xl border bg-card p-4",
                s.accent && "border-primary/40"
              )}
            >
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight">
                {s.value}
              </p>
            </div>
          ))}
        </div>
        <p
          className={cn(
            "rounded-xl border p-4 text-sm leading-relaxed",
            verdictTone === "ok" &&
              "border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300",
            verdictTone === "warn" &&
              "border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300",
            verdictTone === "muted" && "bg-muted/50 text-muted-foreground"
          )}
        >
          {verdict}
        </p>
        <p className="text-sm text-muted-foreground">
          If the queue hours are more than a reviewer actually has, the honest
          fixes are more reviewers or a narrower scope. Lowering the review
          share is not one of them on a first engagement.
        </p>
      </div>
    </div>
  );
}
