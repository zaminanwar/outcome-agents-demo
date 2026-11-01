"use client";

import { useEffect, useState } from "react";

import { CALLS } from "@/lib/outcome";
import { cn } from "@/lib/utils";

// Judgment calls with a data-flag target on the page. The rest (polish,
// redesign, mobile, template) cover the whole page and get no jump link.
const FLAG_TARGETS = new Set([
  "name",
  "hero",
  "open-problem",
  "bought-built",
  "method",
  "timeline",
  "ms-first",
  "estimator",
  "pricing",
  "status",
  "solo",
  "frontier",
  "contact",
]);

/** Inline "decision" marker, shown only while the strip toggle is on. */
export function Flag({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const call = CALLS.find((c) => c.id === id);
  if (!call) return null;
  return (
    <span className="flag-wrap relative inline-block">
      <button
        type="button"
        className="flag-mark ml-2 rounded-full border border-primary/40 px-2 py-0.5 align-middle text-[11px] font-medium text-primary"
        aria-expanded={open}
        onClick={(e) => {
          // Inside a <summary> or button-adjacent spot: never toggle anything else.
          e.preventDefault();
          e.stopPropagation();
          setOpen((v) => !v);
        }}
      >
        decision
      </button>
      {open && (
        <div
          role="note"
          className="absolute left-0 top-full z-50 mt-2 w-[min(32rem,90vw)] rounded-lg border bg-card p-4 text-left text-sm font-normal shadow-xl"
        >
          <strong>Judgment call: </strong>
          {call.title} {call.body}
        </div>
      )}
    </span>
  );
}

export function ReviewStrip() {
  const [showFlags, setShowFlags] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("flags-on", showFlags);
    if (!showFlags) return;
    return () => {
      document.body.classList.remove("flags-on");
    };
  }, [showFlags]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  const jumpTo = (id: string) => {
    setDrawerOpen(false);
    setShowFlags(true);
    document
      .querySelector(`[data-flag="${id}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      <div
        role="region"
        aria-label="Demo review strip"
        className="border-b border-border/40 bg-muted/50"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 lg:px-8">
          <span className="rounded-full border px-2.5 py-0.5 text-xs font-medium">
            Demo concept
          </span>
          <span className="flex-1 text-sm text-muted-foreground">
            Not a live company site. The name is provisional. Every example on
            this page is illustrative. Nothing here is a client, a metric, or
            a price.
          </span>
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showFlags}
              onChange={(e) => setShowFlags(e.target.checked)}
              className="accent-primary"
            />
            Show judgment calls ({CALLS.length})
          </label>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="rounded-full border px-3 py-1 text-sm font-medium transition-colors hover:bg-muted"
          >
            List them
          </button>
        </div>
      </div>

      {drawerOpen && (
        <>
          <div
            aria-hidden
            className="fixed inset-0 z-[60] bg-black/50"
            onClick={() => setDrawerOpen(false)}
          />
          <aside
            aria-label="Judgment calls made on this page"
            className="fixed inset-y-0 right-0 z-[61] w-[min(36rem,92vw)] overflow-y-auto border-l bg-background p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">
                  Judgment calls
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Things the page decides that the founder has not said in so
                  many words. Shoot at them.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setDrawerOpen(false)}
                className="rounded-md border px-2.5 py-1 text-lg leading-none transition-colors hover:bg-muted"
              >
                ×
              </button>
            </div>
            <ol className="mt-6 space-y-5">
              {CALLS.map((call) => (
                <li key={call.id} className="text-sm leading-relaxed">
                  <strong>{call.title}</strong> {call.body}{" "}
                  {FLAG_TARGETS.has(call.id) && (
                    <button
                      type="button"
                      onClick={() => jumpTo(call.id)}
                      className={cn(
                        "font-medium text-primary underline underline-offset-4",
                        "hover:text-primary/80"
                      )}
                    >
                      Jump to it
                    </button>
                  )}
                </li>
              ))}
            </ol>
          </aside>
        </>
      )}
    </>
  );
}
