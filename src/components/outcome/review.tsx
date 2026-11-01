"use client";

import { useEffect, useState } from "react";

import { CALLS } from "@/lib/outcome";
import { cn } from "@/lib/utils";

// Judgment calls with a data-flag target on the page. The rest cover the
// whole page and get no jump link.
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
  "byline",
]);

/** Inline "decision" marker, shown only while the notes toggle is on. */
export function Flag({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const call = CALLS.find((c) => c.id === id);
  if (!call) return null;
  return (
    <span className="flag-wrap relative inline-block">
      <button
        type="button"
        className="flag-mark ml-2 rounded-sm border border-signal/60 px-1.5 py-0.5 align-middle font-sans text-[10px] font-medium tracking-wide text-signal uppercase"
        aria-expanded={open}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((v) => !v);
        }}
      >
        note
      </button>
      {open && (
        <div
          role="note"
          className="absolute left-0 top-full z-50 mt-2 w-[min(32rem,90vw)] border border-border bg-popover p-4 text-left font-sans text-sm font-normal leading-relaxed tracking-normal normal-case shadow-lg"
        >
          <strong>Judgment call: </strong>
          {call.title} {call.body}
        </div>
      )}
    </span>
  );
}

/**
 * Founder-facing notes: a small footer control that opens the drawer of
 * judgment calls and toggles the inline markers. Out of the buyer's way so
 * the page can be judged as a page.
 */
export function ReviewNotes() {
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

  // Deep link: /#notes opens the drawer.
  useEffect(() => {
    if (window.location.hash !== "#notes") return;
    const t = window.setTimeout(() => setDrawerOpen(true), 0);
    return () => window.clearTimeout(t);
  }, []);

  const jumpTo = (id: string) => {
    setDrawerOpen(false);
    setShowFlags(true);
    document
      .querySelector(`[data-flag="${id}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <button
          type="button"
          id="notes"
          onClick={() => setDrawerOpen(true)}
          className="underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
        >
          Notes for the founder ({CALLS.length})
        </button>
        <label className="flex cursor-pointer items-center gap-2 text-muted-foreground">
          <input
            type="checkbox"
            checked={showFlags}
            onChange={(e) => setShowFlags(e.target.checked)}
            className="accent-signal"
          />
          Mark them on the page
        </label>
      </div>

      {drawerOpen && (
        <>
          <div
            aria-hidden
            className="fixed inset-0 z-[60] bg-foreground/30"
            onClick={() => setDrawerOpen(false)}
          />
          <aside
            aria-label="Judgment calls made on this page"
            className="fixed inset-y-0 right-0 z-[61] w-[min(36rem,92vw)] overflow-y-auto border-l border-border bg-background p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl tracking-tight">
                  Judgment calls
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Things the page decides that the founder has not said in so
                  many words. Newest first. Shoot at them.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setDrawerOpen(false)}
                className="border border-border px-2.5 py-1 text-lg leading-none transition-colors hover:bg-muted"
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
                        "font-medium underline underline-offset-4",
                        "hover:text-signal"
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
