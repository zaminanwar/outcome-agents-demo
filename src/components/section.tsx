import { Flag } from "@/components/outcome/review";
import { cn } from "@/lib/utils";

/** One section of the page: heading column, optional lede, then content. */
export function Section({
  id,
  title,
  lede,
  flag,
  children,
  className,
  muted,
}: {
  id: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  /** Judgment-call id attached to the heading. */
  flag?: string;
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-14 border-t", muted && "bg-muted/40", className)}
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-2xl">
          <h2
            className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
            data-flag={flag}
          >
            {title}
            {flag ? <Flag id={flag} /> : null}
          </h2>
          {lede ? (
            <p className="mt-4 text-lg text-pretty text-muted-foreground">
              {lede}
            </p>
          ) : null}
        </div>
        <div className="mt-10 sm:mt-12">{children}</div>
      </div>
    </section>
  );
}
