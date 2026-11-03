"use client";

import { useEffect, useState } from "react";
import { NotebookPenIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { CALLS } from "@/lib/outcome";

// Judgment calls with a data-flag target on the page. The rest cover the
// whole page and get no jump link.
const FLAG_TARGETS = new Set([
  "name",
  "hero",
  "diagram",
  "gap",
  "example",
  "timeline",
  "pricing",
  "solo",
  "contact",
  "byline",
]);

/** Inline "note" marker, shown only while the notes toggle is on. */
export function Flag({ id }: { id: string }) {
  const call = CALLS.find((c) => c.id === id);
  if (!call) return null;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flag-mark ml-2 h-5 items-center rounded-full border border-signal/50 bg-signal/10 px-2 align-middle font-sans text-[10px] font-medium tracking-wide text-signal uppercase transition-colors hover:bg-signal/20"
        >
          note
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[min(32rem,90vw)] text-left font-sans text-sm leading-relaxed font-normal tracking-normal normal-case"
      >
        <p className="text-xs font-medium tracking-wide text-signal uppercase">Judgment call</p>
        <p className="mt-2 text-balance font-medium">{call.title}</p>
        <p className="mt-2 text-muted-foreground">{call.body}</p>
      </PopoverContent>
    </Popover>
  );
}

/**
 * Founder-facing notes: a footer control that opens the sheet of judgment
 * calls and a switch that reveals the inline markers. Out of the buyer's way
 * so the page can be judged as a page.
 */
export function ReviewNotes() {
  const [showFlags, setShowFlags] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("flags-on", showFlags);
    if (!showFlags) return;
    return () => {
      document.body.classList.remove("flags-on");
    };
  }, [showFlags]);

  // Deep link: /#notes opens the sheet.
  useEffect(() => {
    if (window.location.hash !== "#notes") return;
    const t = window.setTimeout(() => setOpen(true), 0);
    return () => window.clearTimeout(t);
  }, []);

  const jumpTo = (id: string) => {
    setOpen(false);
    setShowFlags(true);
    window.setTimeout(() => {
      document
        .querySelector(`[data-flag="${id}"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
  };

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      <Sheet open={open} onOpenChange={setOpen}>
        <Button id="notes" variant="outline" size="sm" onClick={() => setOpen(true)}>
          <NotebookPenIcon data-icon="inline-start" />
          Notes for the founder
          <Badge variant="secondary" className="ml-1 px-1.5 font-mono">
            {CALLS.length}
          </Badge>
        </Button>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-xl">
          <SheetHeader>
            <SheetTitle className="text-lg">Judgment calls</SheetTitle>
            <SheetDescription>
              Things the page decides that the founder has not said in so many
              words. Newest first. Shoot at them.
            </SheetDescription>
          </SheetHeader>
          <div className="flex items-center gap-2 px-4">
            <Switch
              id="flags-in-sheet"
              checked={showFlags}
              onCheckedChange={setShowFlags}
            />
            <Label htmlFor="flags-in-sheet" className="text-muted-foreground">
              Mark them on the page
            </Label>
          </div>
          <ol className="divide-y px-4 pb-6">
            {CALLS.map((call, i) => (
              <li key={call.id} className="py-4 text-sm leading-relaxed">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 font-mono text-xs text-muted-foreground">
                    {String(CALLS.length - i).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-medium">{call.title}</p>
                    <p className="mt-1 text-muted-foreground">{call.body}</p>
                    {FLAG_TARGETS.has(call.id) && (
                      <Button
                        variant="link"
                        size="sm"
                        className="mt-1 h-auto px-0 text-signal"
                        onClick={() => jumpTo(call.id)}
                      >
                        Jump to it on the page
                      </Button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </SheetContent>
      </Sheet>
      <div className="flex items-center gap-2">
        <Switch id="flags" checked={showFlags} onCheckedChange={setShowFlags} />
        <Label htmlFor="flags" className="font-normal text-muted-foreground">
          Mark them on the page
        </Label>
      </div>
    </div>
  );
}
