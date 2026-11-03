import { cn } from "@/lib/utils";

/** Wordmark: a ring in a square, the loop that closes on a person. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <span
        aria-hidden
        className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground"
      >
        <span className="size-2.5 rounded-full border-2 border-current" />
      </span>
      <span className="font-semibold tracking-tight whitespace-nowrap">Outcome Agents</span>
    </span>
  );
}
