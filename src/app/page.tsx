import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Flag } from "@/components/outcome/review";
import { Walkthrough } from "@/components/outcome/walkthrough";
import { Estimator } from "@/components/outcome/estimator";
import { ContactForm } from "@/components/outcome/contact-form";
import { cn } from "@/lib/utils";
import type { TagKind } from "@/lib/outcome";

/* ------------------------------------------------------------------ */
/* Small document primitives                                           */
/* ------------------------------------------------------------------ */

function Section({
  id,
  n,
  title,
  lede,
  flag,
  wide = false,
  children,
}: {
  id: string;
  n: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  flag?: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-6 md:grid-cols-[6rem_1fr]">
          <p className="kicker pt-2">{n}</p>
          <div className="min-w-0">
            <h2 className="display text-3xl sm:text-4xl" data-flag={flag}>
              {title}
              {flag ? <Flag id={flag} /> : null}
            </h2>
            {lede ? <p className="lede mt-5 max-w-[56ch]">{lede}</p> : null}
            <div className={cn("mt-10", wide && "md:-ml-[7.5rem]")}>{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Mark({ kind }: { kind: TagKind }) {
  return (
    <span
      aria-hidden
      className={cn(
        "mark",
        kind === "built" && "mark-built",
        kind === "human" && "mark-human"
      )}
    />
  );
}

function Legend({ className }: { className?: string }) {
  return (
    <ul
      className={cn(
        "flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground",
        className
      )}
    >
      <li className="flex items-center gap-2">
        <Mark kind="bought" /> Platform supplies
      </li>
      <li className="flex items-center gap-2">
        <Mark kind="built" /> We build
      </li>
      <li className="flex items-center gap-2 text-signal">
        <Mark kind="human" /> A person decides
      </li>
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Content                                                              */
/* ------------------------------------------------------------------ */

const OWNERS = [
  {
    who: "Code",
    owns: "the transaction",
    items: [
      "Sequence, retries, timeouts, state",
      "What is required, decided by rule",
      "Every write to a system of record",
      "The kill switch",
    ],
  },
  {
    who: "The model",
    owns: "judgment, inside bounded steps",
    items: [
      "Reads, classifies, extracts",
      "Drafts from approved evidence only",
      "Says “gap” when nothing covers it",
      "Never submits, never sends",
    ],
  },
  {
    who: "A person",
    owns: "the consequences",
    items: [
      "Approves the exact text and its sources",
      "Commits every consequential change",
      "Owns the number the process is measured on",
      "Can stop it at any time",
    ],
    human: true,
  },
];

const PARTS: Array<{
  part: string;
  bought: string;
  built: string;
  human?: string;
}> = [
  {
    part: "Control plane",
    bought: "Agent flows, Dataverse state",
    built: "Idempotency per step, crash replay, kill switch",
  },
  {
    part: "Grounded retrieval",
    bought: "SharePoint permission trimming, Dataverse lookup",
    built: "Library rules, retrieval order, provenance on every item",
    human: "Content owner approves the library",
  },
  {
    part: "Model in bounded steps",
    bought: "Copilot Studio autonomous agent, a topic per stage",
    built: "Versioned instructions, templates, the “gap” output",
  },
  {
    part: "Eval gate",
    bought: "Copilot Studio evaluations, Azure Functions",
    built: "Deterministic checks that block the write; golden set of 20–50 of your cases",
    human: "Your expert grades the golden set",
  },
  {
    part: "Approval",
    bought: "Power Automate approvals, Teams cards",
    built: "Approval bound to a hash of the exact text; multi-day hold; timeout cancels, never approves",
    human: "Section owner approves",
  },
  {
    part: "Writes and run record",
    bought: "Connectors, Dataverse, Purview",
    built: "Suggestion-only write mode, run-record schema",
    human: "Owner commits the write",
  },
];

const STAGES_TABLE = [
  ["0", "Qualify", "Week 1", "Signed sheet, or a written “don’t build yet”"],
  ["1", "Map the process", "Weeks 2–3", "Process owner signs the map"],
  ["2", "Baseline", "Weeks 2–3", "Owner of the number signs the baseline. No build without it"],
  ["3", "Content readiness", "Weeks 2–4", "IT and security sign the permission test"],
  ["4", "Golden set and rubric", "Weeks 3–4", "Rubric agreed before build; 20–50 real cases"],
  ["5", "Build the control plane", "Weeks 4–7", "Golden set green on recall; zero unsupported claims"],
  ["6", "Evaluate offline", "Weeks 7–8", "Eval report signed by your expert, not by us"],
  ["7", "Pilot", "Weeks 8–9", "Go or no-go by the owner of the number; rollback live"],
  ["8", "Hand over", "Week 10", "Your team runs the golden set unaided and passes"],
  ["9", "Tune", "90 days", "Written continue, expand or stop"],
];

const GATES = [
  "The system of record has an API or a supported connector.",
  "The content already lives in a governed store. If not, that is a data project first, not an agent project.",
  "One named person owns the number.",
  "One expert will grade the golden set, and one person owns the content.",
  "An IT or security contact will run the permission test.",
  "An internal team is willing to pilot first.",
  "You want a baseline and a gap list, not a demo.",
];

const NOT_FIT = [
  "Outcomes the business cannot define in advance.",
  "Evidence that does not exist or cannot be retrieved.",
  "No one willing to own the number.",
  "Creative work where “good” is a matter of taste.",
];

const DECIDED = [
  "A systems integrator, forward-deployed, at boutique scale. No proprietary platform.",
  "One process, one owner, one number.",
  "Fixed-price discovery credited into a fixed-price build, then a fixed-fee 90-day tune.",
  "Approval bound to the exact text reviewed.",
  "First engagements write suggestions only.",
  "Refusal is part of the method.",
];

const OPEN = [
  "The exact first process. RFP response is the leading candidate, not the decision.",
  "The final technical shape. The method is closer to settled than the technology.",
  "The pricing model. Per-outcome is open, not offered.",
  "Microsoft-first as a default, or estate-neutral as a principle.",
  "Positioning against Microsoft’s own forward-deployed services arm.",
];

const FAQS: Array<{ q: string; a: string; flag?: string }> = [
  {
    q: "Is this a chatbot?",
    a: "No. A chatbot answers questions when asked. This owns a case from trigger to completion: it retrieves approved evidence, drafts, passes a gate, gets a person’s approval, and writes into the system of record.",
  },
  {
    q: "What does the agent actually write?",
    a: "On a first engagement, suggestions only. A person commits every consequential change. The agent never submits, sends, or changes state on its own.",
  },
  {
    q: "Where does it run, and who sees the data?",
    a: "In your tenant, under your identity and permissions, with Purview visibility. The agent sees only what the process owner can see. Permission trimming is a platform feature, not a promise.",
  },
  {
    q: "Who is building this?",
    a: "One person, for now. That is why qualification is strict: one process, one owner, one number, pilot first. If the process does not fit, the answer is “don’t build yet”, in writing.",
    flag: "solo",
  },
  {
    q: "Do you charge per outcome?",
    a: "Not yet. Discovery is fixed-price and credited into a fixed-price build; tuning is a fixed fee for 90 days. Per-outcome pricing becomes contractible only when your finance contact can verify the count from your own system and the measurement is agreed in advance.",
  },
  {
    q: "Microsoft already does this. Why you?",
    a: "Microsoft’s forward-deployed services arm does outcome work at enterprise scale. The lane here is narrower: mid-size companies, one process, pilot first, handover first. Whether that lane holds as positioning is an open question, stated here rather than settled.",
    flag: "frontier",
  },
];

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <main className="relative">
      <SiteHeader />

      {/* Hero: the thesis, in the buyer's terms */}
      <section className="mx-auto max-w-5xl px-5 pt-20 pb-16 sm:px-8 sm:pt-28 sm:pb-20">
        <p className="kicker">
          Process agents for Microsoft 365 estates · One process at a time
        </p>
        <h1
          data-flag="hero"
          className="display mt-6 max-w-[18ch] text-[clamp(2.6rem,2rem+3.2vw,4.75rem)]"
        >
          The model is not the hard part.
          <Flag id="hero" />
        </h1>
        <p className="lede mt-8 max-w-[58ch]">
          You already have the models. What you don’t have is a business
          process that runs on them: mapped with its exceptions and approvals,
          scoped to the right identities and permissions, grounded in records
          you trust, proven on your own cases, and owned by someone when it
          runs. That last mile is the work. We do it inside your tenant, for
          one process, and hand it over.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
          <Link
            href="#case"
            className="underline decoration-foreground underline-offset-4"
          >
            Follow one case through ↓
          </Link>
          <Link
            href="#fit"
            className="underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
          >
            Check whether you qualify ↓
          </Link>
        </div>

        <dl className="mt-16 grid gap-x-8 border-t border-border text-sm sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Where it runs", "Your Microsoft 365 tenant, under your identity"],
            ["What you keep", "Code, runbooks, decision store, eval harness"],
            ["Who approves writes", "A named person, on the exact text"],
            ["How it is priced", "Fixed, quoted after qualification. No prices here"],
          ].map(([k, v]) => (
            <div key={k} className="border-b border-border py-4 lg:border-b-0">
              <dt className="kicker">{k}</dt>
              <dd className="mt-2">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 01 What we sell */}
      <Section
        id="what"
        n="01"
        title="What we sell."
        lede="A working agent that owns one business process outcome inside your tenant. Not advice. Not a demo. A process you can measure, govern, hand over, and price on output."
      >
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            [
              "Measured",
              "Against a baseline your owner of the number signs before anything is built. Scored on recall and unsupported claims, never on speed.",
            ],
            [
              "Governed",
              "Your identity, your permissions, your audit. Every consequential write goes through a person. Every case leaves one run record.",
            ],
            [
              "Handed over",
              "Your team runs the golden set unaided before we leave. Then a bounded 90-day tune, not an indefinite dependency.",
            ],
          ].map(([h, b]) => (
            <div key={h} className="border-t border-foreground pt-4">
              <h3 className="font-serif text-xl">{h}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {b}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 02 How it runs */}
      <Section
        id="how"
        n="02"
        title="How it runs: three owners, one loop."
        lede="The model does not run the process. A deterministic control plane does; the model works inside it; a person owns what happens."
      >
        <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
          {OWNERS.map((o) => (
            <div key={o.who} className="bg-background p-5 sm:p-6">
              <p className="kicker flex items-center gap-2">
                {o.human ? <Mark kind="human" /> : <Mark kind="built" />}
                {o.who} owns
              </p>
              <h3
                className={cn(
                  "font-serif mt-2 text-2xl",
                  o.human && "text-signal"
                )}
              >
                {o.owns}
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {o.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="prose-memo mt-8">
          One loop. Every run is measured. Every failure becomes a test. Every
          approved correction becomes a rule. The agent gets better the way a
          process does, not the way a prompt does.
        </p>
        <p className="prose-memo mt-4 text-muted-foreground">
          From the user’s side there are four verbs: drop the document in, fill
          the gaps, approve the exact text, press submit. Nobody opens an agent.
          Nobody writes a prompt. The work comes to where work already lives.
        </p>
      </Section>

      {/* 03 One case */}
      <Section
        id="case"
        n="03"
        title="One case, end to end."
        lede="Eight stages, whatever the process. Pick one of three illustrative processes and step through a single case."
        wide
      >
        <Legend className="mb-8" />
        <Walkthrough />
      </Section>

      {/* 04 Built and bought */}
      <Section
        id="parts"
        n="04"
        title="Six parts. Most are bought. Three are built."
        lede="Identity, permissions, approvals and audit come with the platform you already pay for. The parts that make it trustworthy do not."
        flag="bought-built"
        wide
      >
        <Legend className="mb-6" />
        <div className="hidden text-sm md:block">
          <div className="grid grid-cols-[11rem_1fr_1fr_1fr] gap-4 border-b border-foreground pb-2">
            <span className="kicker">Part</span>
            <span className="kicker flex items-center gap-2">
              <Mark kind="bought" /> Platform supplies
            </span>
            <span className="kicker flex items-center gap-2">
              <Mark kind="built" /> We build
            </span>
            <span className="kicker flex items-center gap-2 text-signal">
              <Mark kind="human" /> A person decides
            </span>
          </div>
          {PARTS.map((p) => (
            <div
              key={p.part}
              className="grid grid-cols-[11rem_1fr_1fr_1fr] gap-4 border-b border-border py-3"
            >
              <span className="font-medium">{p.part}</span>
              <span className="text-muted-foreground">{p.bought}</span>
              <span>{p.built}</span>
              <span className="text-signal">{p.human ?? "—"}</span>
            </div>
          ))}
        </div>
        <dl className="text-sm md:hidden">
          {PARTS.map((p) => (
            <div key={p.part} className="border-t border-border py-4 last:border-b">
              <dt className="font-medium">{p.part}</dt>
              <dd className="mt-2 flex gap-2 text-muted-foreground">
                <Mark kind="bought" />
                <span className="-mt-0.5">{p.bought}</span>
              </dd>
              <dd className="mt-1.5 flex gap-2">
                <Mark kind="built" />
                <span className="-mt-0.5">{p.built}</span>
              </dd>
              {p.human ? (
                <dd className="mt-1.5 flex gap-2 text-signal">
                  <Mark kind="human" />
                  <span className="-mt-0.5">{p.human}</span>
                </dd>
              ) : null}
            </div>
          ))}
        </dl>
        <div className="prose-memo mt-8 md:ml-[7.5rem]">
          <p>
            No vendor we know of ships approval bound to a hash of the content
            reviewed, an eval gate that blocks the write on your own golden
            set, or a reviewer queue that holds for days and cancels on
            timeout. Those are designs we implement, not patterns we copy.
          </p>
          <p data-flag="ms-first" className="text-muted-foreground">
            Microsoft-first is the default because that is where identity,
            approvals and audit already live for most mid-size companies. The
            same shape runs off-estate (Temporal, LangGraph, Postgres,
            Langfuse) with the same gates and different parts. Whether to stay
            estate-neutral as a principle is still open.
            <Flag id="ms-first" />
          </p>
        </div>
      </Section>

      {/* 05 Engagement */}
      <Section
        id="engagement"
        n="05"
        title="The engagement, gate by gate."
        lede={
          <span data-flag="pricing">
            Fixed-price discovery, credited into a fixed-price build, then a
            fixed-fee 90-day tune. No prices on this page: quotes follow
            qualification, and per-outcome pricing is open, not offered.
            <Flag id="pricing" />
          </span>
        }
        flag="method"
        wide
      >
        <div className="text-sm">
          <div className="hidden grid-cols-[2.5rem_12rem_7rem_1fr] gap-4 border-b border-foreground pb-2 sm:grid">
            <span className="kicker">#</span>
            <span className="kicker">Stage</span>
            <span className="kicker">Window</span>
            <span className="kicker">Gate, signed on your side</span>
          </div>
          {STAGES_TABLE.map(([n, stage, window, gate]) => (
            <div
              key={n}
              className="grid gap-x-4 gap-y-1 border-b border-border py-3 sm:grid-cols-[2.5rem_12rem_7rem_1fr]"
            >
              <span className="font-mono text-xs text-muted-foreground sm:pt-0.5">
                {n}
              </span>
              <span className="font-medium">{stage}</span>
              <span className="text-muted-foreground">{window}</span>
              <span>{gate}</span>
            </div>
          ))}
        </div>
        <div className="prose-memo mt-8 md:ml-[7.5rem]">
          <p>
            Your side signs each gate, not ours. The eval report is signed by
            your expert. Go or no-go is called by the owner of the number.
            “Don’t build yet” is a legitimate result of stage 0, and we say it
            in writing.
          </p>
          <p data-flag="timeline" className="text-muted-foreground">
            Planning ranges, from published implementer experience, not
            promises: 8 to 10 weeks when the gates pass cleanly; 3 to 6 months
            with a new system-of-record integration or a real security audit;
            9 months or more for regulated decisions. Your risk assessment is
            the critical path, not the build.
            <Flag id="timeline" />
          </p>
        </div>
      </Section>

      {/* 06 Estimator */}
      <Section
        id="estimator"
        n="06"
        title="Will your reviewers keep up?"
        lede="A process agent moves work from doing to reviewing. The question is not time saved. It is whether your reviewers can carry the approval queue. Arithmetic on your inputs, nothing more."
        flag="estimator"
        wide
      >
        <Estimator />
      </Section>

      {/* 07 Fit */}
      <Section
        id="fit"
        n="07"
        title="Who it is for."
        lede="Seven gates. All must pass before we sign. A vacant role is a qualification failure, not a preference."
      >
        <ol className="text-sm">
          {GATES.map((g, i) => (
            <li
              key={g}
              className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-border py-3 last:border-b"
            >
              <span className="font-mono text-xs text-muted-foreground pt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{g}</span>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <p className="kicker">Not a fit, when</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {NOT_FIT.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 08 Status */}
      <Section
        id="status"
        n="08"
        title="What is decided, and what is not."
        lede="The second list usually stays hidden. You should see it before a first conversation, not during one."
        flag="status"
      >
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <p className="kicker">Decided</p>
            <ul className="mt-3 space-y-3 text-sm">
              {DECIDED.map((d) => (
                <li key={d} className="border-t border-border pt-3">
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div data-flag="open-problem">
            <p className="kicker">
              Still open
              <Flag id="open-problem" />
            </p>
            <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
              {OPEN.map((o) => (
                <li key={o} className="border-t border-border pt-3">
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 09 Questions */}
      <Section id="questions" n="09" title="Questions we expect.">
        <dl className="max-w-[62ch]">
          {FAQS.map((f) => (
            <div key={f.q} className="border-t border-border py-5 last:border-b">
              <dt className="font-serif text-xl" data-flag={f.flag}>
                {f.q}
                {f.flag ? <Flag id={f.flag} /> : null}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* 10 Contact */}
      <Section
        id="contact"
        n="10"
        title="Start a conversation."
        lede={
          <span data-flag="contact">
            Tell us about the process that hurts. One process, one owner, one
            number. This form sends nothing: it composes a draft you copy or
            open in your mail app. No backend, no tracking.
            <Flag id="contact" />
          </span>
        }
        wide
      >
        <ContactForm />
      </Section>

      <SiteFooter />
    </main>
  );
}
