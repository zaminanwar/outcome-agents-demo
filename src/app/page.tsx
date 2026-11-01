import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Flag } from "@/components/outcome/review";
import { ContactForm } from "@/components/outcome/contact-form";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Primitives                                                           */
/* ------------------------------------------------------------------ */

function Section({
  id,
  title,
  lede,
  flag,
  children,
  className,
}: {
  id: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  flag?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-20 border-t border-border", className)}>
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
        <h2 className="display text-3xl sm:text-4xl" data-flag={flag}>
          {title}
          {flag ? <Flag id={flag} /> : null}
        </h2>
        {lede ? <p className="lede mt-5 max-w-[58ch]">{lede}</p> : null}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Content                                                              */
/* ------------------------------------------------------------------ */

const GAP: Array<[string, string, string]> = [
  ["Starts when", "Someone remembers to open Copilot", "The document arrives"],
  ["Reads", "Whatever that person pastes in or can see", "Your approved content, permission-trimmed"],
  ["When it doesn’t know", "Writes something plausible", "Writes “gap” and names the owner"],
  ["Checked by", "The same person, if at all", "Code first, then against your expert’s past cases"],
  ["Approved", "Implicitly, by pasting it onward", "Explicitly, on the exact text, by a named person"],
  ["Ends up", "In a chat window, then a copy-paste", "In the system of record, committed by a person"],
  ["What you can measure", "Licences assigned", "Recall, unsupported claims, review minutes, per case"],
];

const VERBS = [
  {
    n: "1",
    verb: "Drop the pack in",
    body: "An RFP lands in the SharePoint folder. Nobody opens an agent. The case starts itself.",
  },
  {
    n: "2",
    verb: "See every requirement answered or flagged",
    body: "One row per obligation. Each answer comes from your approved library and cites it. No approved answer means the row says “gap” and goes to its owner.",
  },
  {
    n: "3",
    verb: "Approve the exact text",
    body: "Section owners get a card with the answer and its sources. Approval is tied to that exact text. Edit it and it goes back for approval.",
  },
  {
    n: "4",
    verb: "Press submit",
    body: "Approved rows land in the proposal as suggestions. Submission stays a human button. The agent has no path to the broker.",
  },
];

const STEPS = [
  "Trigger",
  "Decompose",
  "Retrieve",
  "Draft",
  "Check",
  "Approve",
  "Write",
  "Record",
];

const PROCESSES = [
  "Insurance claims",
  "Supplier onboarding packs",
  "Support tickets",
  "Contract review",
  "KYC and due diligence",
  "Vendor document review",
];

const GET = [
  [
    "A process that runs, not a tool people might use",
    "Triggered by the work arriving, in your tenant, on the Microsoft platform you already run. Your identity, your permissions, your audit.",
  ],
  [
    "A named person on every consequential write",
    "The agent drafts and checks. A person approves the exact text and commits every change. Nothing is sent or submitted on its own.",
  ],
  [
    "A number, before and after",
    "We baseline the process with its owner before building, and measure the same number after. Scored on recall and unsupported claims, never on speed.",
  ],
  [
    "Everything handed over",
    "Code, runbooks, the approved-content rules, the test set your team can rerun. A bounded 90-day tune, not a dependency.",
  ],
];

const HOW = [
  ["Qualify", "One short conversation against a fixed set of gates. “Don’t build yet” is a real answer, given in writing."],
  ["Discover and baseline", "Fixed price, credited into the build. Map the process, baseline the number, test the permissions, collect 20 to 50 real past cases."],
  ["Build, pilot, hand over", "Fixed price, acceptance criteria agreed up front. Pilot with an internal team first. Your team runs the test set unaided before we leave."],
];

const YOU = [
  "You run Microsoft 365, and some of your people already use Copilot.",
  "One process that arrives as documents and ends in a system of record.",
  "A library of approved content that process should draw from, even if it is messy today.",
  "Someone who owns the number for that process and will sign the baseline.",
];

/* ------------------------------------------------------------------ */
/* Illustration: the RFP case at a glance                              */
/* ------------------------------------------------------------------ */

function Pane({
  label,
  children,
  signal,
}: {
  label: string;
  children: React.ReactNode;
  signal?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col border border-border bg-card p-3",
        signal && "border-signal"
      )}
    >
      <p className={cn("kicker", signal && "text-signal")}>{label}</p>
      <div className="mt-2 flex-1 space-y-1.5 text-[11px] leading-snug">{children}</div>
    </div>
  );
}

function Line({ w = "100%", muted }: { w?: string; muted?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn("block h-1.5", muted ? "bg-border" : "bg-foreground/70")}
      style={{ width: w }}
    />
  );
}

function CaseIllustration() {
  return (
    <figure aria-label="Illustration: an RFP pack becomes a compliance matrix, gaps are flagged, the exact text is approved, and a person submits.">
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        <Pane label="Pack arrives">
          <div className="border border-border p-2">
            <p className="font-mono text-[10px]">RFP_2026_Broker.pdf</p>
            <Line w="80%" muted />
            <Line w="60%" muted />
          </div>
          <p className="text-muted-foreground">Folder trigger. Case 0412 opened.</p>
        </Pane>
        <Pane label="Matrix built">
          {[
            ["R-01", "Cyber cover limits"],
            ["R-02", "Claims SLA"],
            ["R-03", "Data residency"],
            ["R-04", "Sub-limits, flood"],
          ].map(([id, t]) => (
            <div key={id} className="flex gap-2 border-b border-border pb-1">
              <span className="whitespace-nowrap font-mono text-[10px] text-muted-foreground">{id}</span>
              <span className="truncate">{t}</span>
            </div>
          ))}
          <p className="text-muted-foreground">One row per obligation.</p>
        </Pane>
        <Pane label="Answered or gap">
          <div className="flex gap-2">
            <span className="whitespace-nowrap font-mono text-[10px] text-muted-foreground">R-01</span>
            <span>Answered · cites Lib/CY-14</span>
          </div>
          <div className="flex gap-2">
            <span className="whitespace-nowrap font-mono text-[10px] text-muted-foreground">R-02</span>
            <span>Answered · cites Lib/OPS-3</span>
          </div>
          <div className="flex gap-2 text-signal">
            <span className="whitespace-nowrap font-mono text-[10px]">R-03</span>
            <span>Gap · owner: Legal</span>
          </div>
          <div className="flex gap-2">
            <span className="whitespace-nowrap font-mono text-[10px] text-muted-foreground">R-04</span>
            <span>Answered · cites Lib/UW-9</span>
          </div>
          <p className="text-muted-foreground">Nothing invented. Gaps go to a person.</p>
        </Pane>
        <Pane label="Approve exact text" signal>
          <div className="border border-border p-2">
            <Line w="100%" />
            <Line w="92%" />
            <Line w="70%" />
            <p className="mt-1.5 font-mono text-[10px] text-muted-foreground">
              sha256 · 9f3a…c21e
            </p>
          </div>
          <p className="text-signal">Section owner approves. Edit voids it.</p>
        </Pane>
        <Pane label="Person submits">
          <div className="border border-border p-2">
            <p>Proposal workspace</p>
            <p className="text-muted-foreground">4 suggestions · 1 pending</p>
          </div>
          <p className="text-muted-foreground">Submit is a human button. Record kept per case.</p>
        </Pane>
      </div>
      <figcaption className="mt-3 text-xs text-muted-foreground">
        Illustrative. Case numbers, library references and requirement text are placeholders, not a client.
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <main className="relative">
      <SiteHeader />

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-5 pt-20 pb-16 sm:px-8 sm:pt-28 sm:pb-20">
        <p className="kicker">
          For companies on Microsoft 365 where people already use Copilot
        </p>
        <h1
          data-flag="hero"
          className="display mt-6 max-w-[16ch] text-[clamp(2.6rem,2rem+3.2vw,4.75rem)]"
        >
          Your people have Copilot. Your processes don’t.
          <Flag id="hero" />
        </h1>
        <p className="lede mt-8 max-w-[58ch]">
          Employees use it one prompt at a time, each on their own. A draft
          here, a summary there. Meanwhile the RFP, the claim, the supplier
          pack still move the way they always did. We take one of those
          processes and make it run: started by the work arriving, grounded in
          your approved content, checked, approved by a named person, written
          to the system of record. In your tenant, on the platform you already
          have.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
          <Link href="#example" className="underline decoration-foreground underline-offset-4">
            See one example ↓
          </Link>
          <Link
            href="#you"
            className="underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
          >
            Is this you? ↓
          </Link>
        </div>
      </section>

      {/* The gap */}
      <Section
        id="gap"
        title="The gap between a licence and a process."
        lede="Individual Copilot use helps individuals. It does not change how the process behaves, who owns its output, or what you can measure. Side by side:"
        flag="gap"
      >
        <div className="text-sm">
          <div className="hidden grid-cols-[11rem_1fr_1fr] gap-6 border-b border-foreground pb-2 sm:grid">
            <span className="kicker">&nbsp;</span>
            <span className="kicker">Copilot, one person at a time</span>
            <span className="kicker text-foreground">A process agent</span>
          </div>
          {GAP.map(([k, a, b]) => (
            <div
              key={k}
              className="grid gap-x-6 gap-y-1 border-b border-border py-3 sm:grid-cols-[11rem_1fr_1fr]"
            >
              <span className="font-medium">{k}</span>
              <span className="text-muted-foreground">
                <span className="kicker mr-2 sm:hidden">Today</span>
                {a}
              </span>
              <span>
                <span className="kicker mr-2 sm:hidden">Agent</span>
                {b}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* One example */}
      <Section
        id="example"
        title="One example: answering an RFP."
        lede="From the bid team’s side there are four things to do. Everything else happens underneath, the same way every time."
        flag="example"
      >
        <ol className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {VERBS.map((v) => (
            <li key={v.n} className="bg-background p-5">
              <p className="kicker">{v.n}</p>
              <h3 className="font-serif mt-2 text-xl leading-snug">{v.verb}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10">
          <CaseIllustration />
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="kicker">Underneath, every time</p>
            <ol className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-sm">
              {STEPS.map((s, i) => (
                <li key={s} className="flex items-center gap-2">
                  <span className={cn(i === 5 && "text-signal", i === 4 && "font-medium")}>{s}</span>
                  {i < STEPS.length - 1 ? (
                    <span aria-hidden className="text-border">→</span>
                  ) : null}
                </li>
              ))}
            </ol>
            <p className="mt-3 text-sm text-muted-foreground">
              Code runs the sequence. The model works inside bounded steps. A
              person owns the consequences.
            </p>
          </div>
          <div>
            <p className="kicker">Same shape, any process that arrives as documents</p>
            <ul className="mt-3 flex flex-wrap gap-2 text-sm">
              {PROCESSES.map((p) => (
                <li key={p} className="border border-border px-3 py-1">
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-muted-foreground">
              The RFP is the worked example because its evidence, its approvals
              and its gaps are easy to see. The parts swap; the shape does not.
            </p>
          </div>
        </div>
      </Section>

      {/* What you get */}
      <Section id="get" title="What you get.">
        <div className="grid gap-8 sm:grid-cols-2">
          {GET.map(([h, b]) => (
            <div key={h} className="border-t border-foreground pt-4">
              <h3 className="font-serif text-xl leading-snug">{h}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* How we work */}
      <Section
        id="how"
        title="How we work."
        lede={
          <span data-flag="pricing">
            Three steps, each fixed-price, each with a gate your side signs.
            No prices on this page: quotes follow qualification.
            <Flag id="pricing" />
          </span>
        }
      >
        <ol className="text-sm">
          {HOW.map(([h, b], i) => (
            <li
              key={h}
              className="grid gap-x-6 gap-y-1 border-t border-border py-4 last:border-b sm:grid-cols-[2.5rem_12rem_1fr]"
            >
              <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              <span className="font-medium">{h}</span>
              <span className="text-muted-foreground">{b}</span>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-[62ch] text-sm text-muted-foreground" data-flag="timeline">
          Typically 8 to 10 weeks when the gates pass cleanly; longer with a new
          integration or a formal security review. Your risk assessment is the
          critical path, not the build.
          <Flag id="timeline" />
        </p>
      </Section>

      {/* Is this you */}
      <Section
        id="you"
        title="Is this you?"
        lede="Four things we look for. If the fourth is missing, we will say so rather than build."
      >
        <ol className="text-sm">
          {YOU.map((y, i) => (
            <li
              key={y}
              className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-border py-3 last:border-b"
            >
              <span className="font-mono text-xs text-muted-foreground pt-0.5">0{i + 1}</span>
              <span>{y}</span>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-[62ch] text-sm text-muted-foreground" data-flag="solo">
          One person builds this, for now. That is why it is one process at a
          time, piloted with an internal team first, and handed over.
          <Flag id="solo" />
        </p>
      </Section>

      {/* Contact */}
      <Section
        id="contact"
        title="Tell us about the process."
        lede={
          <span data-flag="contact">
            Which process, roughly how many a month, and who owns the number
            today. This form sends nothing: it composes a draft you copy or open
            in your mail app.
            <Flag id="contact" />
          </span>
        }
      >
        <ContactForm />
      </Section>

      <SiteFooter />
    </main>
  );
}
