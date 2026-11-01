import {
  Archive,
  ArrowDown,
  Bot,
  Calculator,
  Check,
  Database,
  Fingerprint,
  Gauge,
  Layers,
  Mail,
  MessageCircle,
  PenLine,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Table,
  FileCheck,
  Workflow,
  Zap,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Flag, ReviewStrip } from "@/components/outcome/review";
import { CtaButtons } from "@/components/outcome/cta-buttons";
import { Walkthrough } from "@/components/outcome/walkthrough";
import { Estimator } from "@/components/outcome/estimator";
import { ContactForm } from "@/components/outcome/contact-form";
import { AnimatedGradientText } from "@/components/velora/animated-gradient-text";
import { AuroraBackground } from "@/components/velora/aurora-background";
import { BentoCard, BentoGrid } from "@/components/velora/bento-grid";
import { BlurFade } from "@/components/velora/blur-fade";
import { BorderBeam } from "@/components/velora/border-beam";
import { Dock, DockIcon } from "@/components/velora/dock";
import { DotPattern, GridPattern } from "@/components/velora/grid-pattern";
import { Marquee } from "@/components/velora/marquee";
import { Meteors } from "@/components/velora/meteors";
import { NumberTicker } from "@/components/velora/number-ticker";
import { OrbitingCircles } from "@/components/velora/orbiting-circles";
import { Particles } from "@/components/velora/particles";
import { RetroGrid } from "@/components/velora/retro-grid";
import { ScrollProgress } from "@/components/velora/scroll-progress";
import { SpotlightCard } from "@/components/velora/spotlight-card";
import { TextReveal } from "@/components/velora/text-reveal";
import { Typewriter } from "@/components/velora/typewriter";
import { cn } from "@/lib/utils";
import type { TagKind } from "@/lib/outcome";

/** Small pill used for the bought / built / human legend. */
function Tag({ kind, children }: { kind: TagKind; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        kind === "bought" && "border-border text-muted-foreground",
        kind === "built" &&
          "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400",
        kind === "human" &&
          "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      )}
    >
      {kind === "built" && <span className="size-1.5 rounded-full bg-amber-500" />}
      {kind === "human" && (
        <span className="size-1.5 rounded-full bg-emerald-500" />
      )}
      {children}
    </span>
  );
}

/** Centered section head in the template's style, with an optional flag. */
function Head({
  title,
  sub,
  flag,
}: {
  title: React.ReactNode;
  sub?: React.ReactNode;
  flag?: string;
}) {
  return (
    <BlurFade>
      <h2 className="mx-auto max-w-2xl text-center text-3xl font-semibold tracking-tight text-balance lg:text-5xl">
        {title}
      </h2>
      {sub ? (
        <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
          {sub}
          {flag ? <Flag id={flag} /> : null}
        </p>
      ) : null}
    </BlurFade>
  );
}

const PLATFORMS = [
  "SharePoint",
  "Dataverse",
  "Power Automate",
  "Copilot Studio",
  "Entra ID",
  "Purview",
  "Teams",
  "Azure Functions",
  "Temporal",
  "LangGraph",
  "Postgres",
  "Langfuse",
];

const HERO_STAGES = [
  { icon: Zap, label: "Trigger" },
  { icon: Table, label: "Decompose" },
  { icon: Database, label: "Retrieve" },
  { icon: PenLine, label: "Draft" },
  { icon: ShieldCheck, label: "Eval gate" },
  { icon: Fingerprint, label: "Approve" },
  { icon: Archive, label: "Write" },
  { icon: FileCheck, label: "Audit" },
];

const BEAM_NODES = [
  {
    icon: Database,
    title: "Approved evidence",
    sub: "Owner-tagged, valid-through",
  },
  {
    icon: Workflow,
    title: "Control plane + bounded model",
    sub: "The flow owns sequence",
  },
  {
    icon: Fingerprint,
    title: "Human approval, hash-bound",
    sub: "Exact text, hash-bound",
  },
  {
    icon: Archive,
    title: "System of record + run record",
    sub: "Suggestions first",
  },
];

const FEED = [
  { icon: Zap, title: "Case opened", body: "Trigger fired, case ID issued" },
  { icon: Table, title: "Matrix built", body: "Every obligation has a row" },
  { icon: Database, title: "Evidence retrieved", body: "Approved items only" },
  { icon: PenLine, title: "Draft written", body: "Claims linked to sources" },
  { icon: ShieldCheck, title: "Gate passed", body: "No unsupported claims" },
  { icon: Fingerprint, title: "Approved", body: "Hash bound to exact text" },
  { icon: Archive, title: "Written", body: "Suggestions only" },
  { icon: FileCheck, title: "Record sealed", body: "One audit trail" },
];

const METHOD = [
  {
    week: "Week 1",
    title: "Qualify",
    gate: "Signed sheet — or “don't build yet”.",
  },
  {
    week: "Weeks 2–4",
    title: "Discover and baseline",
    gate: "Map, baseline, permission test, rubric.",
  },
  {
    week: "Weeks 4–7",
    title: "Build the control plane",
    gate: "Golden set green, zero unsupported claims.",
  },
  {
    week: "Weeks 7–8",
    title: "Evaluate offline",
    gate: "Expert-signed report, not a vendor score.",
  },
  {
    week: "Weeks 8–9",
    title: "Pilot",
    gate: "Go / no-go decided by the number owner.",
  },
  {
    week: "Week 10 + 90 days",
    title: "Hand over and tune",
    gate: "Your team runs the golden set unaided.",
  },
];

const FIT_YES = [
  "Work that arrives as documents, tickets, or structured forms",
  "Evidence exists in documents, systems, or records",
  "A named owner can sign off on the number",
  "Volume is high enough that hand-off is the bottleneck",
];

const FIT_NO = [
  "Outcomes the business cannot define in advance",
  "Evidence that does not exist or cannot be retrieved",
  "No one willing to own the number",
  "Pure creative work where “good” is taste",
];

const DECIDED = [
  "One process, one owner, one number",
  "Pilot-first, handover-first, fixed-price discovery",
  "Approval bound to the exact text reviewed",
  "First engagements write suggestions only",
];

const OPEN = [
  "The exact first problem",
  "The final technical shape",
  "Pricing model — per-outcome is open, not offered",
  "Microsoft-first vs estate-neutral, as a principle",
  "Positioning against Microsoft's services arm",
];

const FAQS = [
  {
    q: "Is this a chatbot?",
    a: "No. A chatbot answers questions when asked. This owns a case from trigger to completion: it retrieves approved evidence, drafts, passes a gate, gets a human approval, and writes into the system of record.",
    flag: undefined,
  },
  {
    q: "What does the agent actually write?",
    a: "On a first engagement, suggestions only. A person commits every consequential change. The agent never submits, sends, or changes state on its own.",
    flag: undefined,
  },
  {
    q: "Where does it run, and who sees the data?",
    a: "In your tenant, under your identity and permissions, with Purview visibility. The agent sees only what the process owner can see — permission trimming is a platform feature, not a promise.",
    flag: undefined,
  },
  {
    q: "Who is building this?",
    a: "One person, for now. That's why qualification is strict: one process, one owner, one number, pilot-first. If the process doesn't fit, the answer is “don't build yet”.",
    flag: "solo",
  },
  {
    q: "Do you charge per outcome?",
    a: "Not yet. Discovery is fixed-price and credited into a fixed-price build; tuning is a fixed fee for 90 days. Per-outcome pricing is open: it becomes contractible only when a finance contact can verify the outcome and the measurement is agreed in advance.",
    flag: undefined,
  },
  {
    q: "Microsoft already does this. Why you?",
    a: "Microsoft's forward-deployed services arm does outcome work at enterprise scale. The current lane here is narrower: mid-size companies, one process, pilot-first, handover-first. Whether that lane holds as positioning is still an open question, stated here rather than settled.",
    flag: "frontier",
  },
];

export default function Home() {
  return (
    <main className="relative pt-16">
      <ScrollProgress />
      <SiteHeader />
      <ReviewStrip />

      {/* Hero — template structure, centered, aurora + grid */}
      <section className="relative overflow-hidden py-16 lg:py-20">
        <AuroraBackground intensity="subtle" />
        <GridPattern
          width={48}
          height={48}
          className="fill-transparent stroke-border/60 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
        />
        <div className="relative mx-auto max-w-6xl px-4 text-center lg:px-8">
          <BlurFade delay={0} direction="down">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-1.5 text-sm backdrop-blur">
              <Sparkles className="size-3.5 text-primary" />
              <span className="font-medium">Demo concept · Provisional name</span>
            </span>
          </BlurFade>

          <h1
            data-flag="hero"
            className="mx-auto mt-8 max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-7xl"
          >
            <TextReveal text="An agent that owns a business outcome," />{" "}
            <AnimatedGradientText>
              <Typewriter
                words={[
                  "from trigger to completion.",
                  "with approval bound to the text.",
                  "with an audit trail.",
                ]}
              />
            </AnimatedGradientText>
            <Flag id="hero" />
          </h1>

          {/* Not faded in: this is the Largest Contentful Paint element, and
              hiding it until hydration costs seconds of LCP on mobile. */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-pretty">
            It starts when a case arrives — a pack, a ticket, a supplier
            upload — and works it to the system of record: approved evidence
            only, an eval gate before any write, a human approving the exact
            text.
          </p>

          <BlurFade delay={0.5}>
            <CtaButtons
              className="mt-10"
              primaryLabel="Follow one case through"
              primaryTarget="walkthrough"
              secondaryLabel="Check if you're a fit"
              secondaryTarget="fit"
            />
          </BlurFade>

          <BlurFade delay={0.6}>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              {[
                "Built in your Microsoft 365 tenant",
                "You keep the code, runbooks, decision store",
                "Human approves every consequential write",
                "Demo concept — name provisional",
              ].map((fact) => (
                <li key={fact} className="flex items-center gap-1.5">
                  <Check className="size-4 text-primary" />
                  {fact}
                </li>
              ))}
            </ul>
          </BlurFade>

          {/* Run diagram, not a product screenshot: the eight stages of a case */}
          <BlurFade delay={0.75} offset={32}>
            <div className="mx-auto mt-16 max-w-4xl rounded-2xl border bg-card/80 p-4 text-left backdrop-blur sm:p-6">
              <div className="flex items-center gap-2 border-b pb-3">
                <span className="size-2.5 rounded-full bg-muted-foreground/40" />
                <span className="size-2.5 rounded-full bg-muted-foreground/40" />
                <span className="size-2.5 rounded-full bg-muted-foreground/40" />
                <span className="ml-3 text-xs text-muted-foreground">
                  One case, end to end · Illustrative diagram
                </span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-8">
                {HERO_STAGES.map((stage, i) => (
                  <div
                    key={stage.label}
                    className="flex flex-col items-center gap-1.5 rounded-xl border bg-background/60 px-2 py-3 text-center"
                  >
                    <span className="text-[10px] font-medium text-muted-foreground">
                      {i + 1}
                    </span>
                    <stage.icon className="size-5 text-primary" />
                    <span className="text-xs font-medium">{stage.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                  Eval gate: write-blocking
                </span>
                <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                  Approval: hash-bound
                </span>
                <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                  Writes: suggestions first
                </span>
              </div>
            </div>
          </BlurFade>

          {/* Stats — method facts, not performance claims */}
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              { value: 8, suffix: "", label: "Stages in every case" },
              { value: 6, suffix: "", label: "Anatomy parts" },
              { value: 3, suffix: "", label: "Parts no vendor ships" },
              { value: 90, suffix: "-day", label: "Tune window" },
            ].map((stat, i) => (
              <BlurFade key={stat.label} delay={i * 0.1}>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-4xl font-semibold tracking-tight">
                    <NumberTicker value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Platform marquee — names, not logos */}
      <section className="border-y border-border/40 py-12">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <p className="mb-8 text-center text-sm text-muted-foreground">
            Built on the stack you already own
          </p>
          <Marquee pauseOnHover className="[--duration:30s]">
            {PLATFORMS.map((name) => (
              <span
                key={name}
                className="mx-8 text-lg font-semibold tracking-tight text-muted-foreground transition-colors hover:text-foreground"
              >
                {name}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* Anatomy — template bento */}
      <section id="anatomy" className="relative scroll-mt-24 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <Head
            title={
              <>
                Six parts.{" "}
                <span className="text-primary">Three nobody sells.</span>
              </>
            }
            sub={
              <>
                Most of it is bought — identity, permissions, approvals,
                audit. The trust parts are built.{" "}
                <span data-flag="bought-built" className="inline-flex gap-2">
                  <Tag kind="bought">Platform supplies</Tag>
                  <Tag kind="built">We build</Tag>
                  <Tag kind="human">Human decides</Tag>
                </span>
              </>
            }
            flag="bought-built"
          />

          <BlurFade delay={0.15}>
            <BentoGrid className="mt-16">
              <BentoCard
                name="Control plane"
                description="The flow owns sequence, retries, timeouts, state. Platform: agent flows, Dataverse. We build: idempotency, crash-replay."
                icon={<Workflow className="size-5 text-primary" />}
                className="md:col-span-1"
                background={
                  <div className="relative flex size-full items-center justify-center pb-20">
                    <Zap className="size-8 text-primary" />
                    <OrbitingCircles radius={90} iconSize={28} duration={24}>
                      <Workflow className="size-5 text-muted-foreground" />
                      <Database className="size-5 text-muted-foreground" />
                      <ShieldCheck className="size-5 text-muted-foreground" />
                    </OrbitingCircles>
                  </div>
                }
              />
              <BentoCard
                name="Grounded retrieval"
                description="Approved evidence only, every item owner-, status-, and date-tagged. No provenance, not retrievable."
                icon={<Database className="size-5 text-primary" />}
                className="md:col-span-2"
                background={
                  <div className="absolute inset-6 rounded-xl border bg-card/50">
                    <BorderBeam size={72} duration={7} />
                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                      owner · approved · valid-through
                    </div>
                  </div>
                }
              />
              <BentoCard
                name="Model in bounded steps"
                description="A Copilot Studio autonomous agent judges inside bounded steps — never invents, never submits."
                icon={<Bot className="size-5 text-primary" />}
                className="md:col-span-2"
                background={
                  <div className="absolute inset-x-10 top-4 bottom-24">
                    <Marquee
                      vertical
                      pauseOnHover
                      className="h-full [--duration:24s]"
                    >
                      {[
                        "Answer only from evidence",
                        "Quote verbatim where it claims",
                        "Output “gap” where nothing covers it",
                        "Never submit, never send",
                      ].map((rule) => (
                        <div
                          key={rule}
                          className="rounded-xl border bg-card/80 p-4 text-sm text-muted-foreground"
                        >
                          {rule}
                        </div>
                      ))}
                    </Marquee>
                  </div>
                }
              />
              <BentoCard
                name="Eval gate"
                description="Deterministic checks first, always. A golden set of 20–50 of your cases decides go-live."
                icon={<ShieldCheck className="size-5 text-primary" />}
                className="md:col-span-1 border-primary/40"
                background={
                  <div className="absolute inset-0">
                    <DotPattern className="[mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
                    <Meteors number={10} />
                  </div>
                }
              />
              <BentoCard
                name="Hash-bound approval"
                description="Approver sees exact text + sources. Approval = hash of what was reviewed. Edit voids it."
                icon={<Fingerprint className="size-5 text-primary" />}
                className="md:col-span-1 border-primary/40"
                background={
                  <div className="absolute inset-0 flex items-center justify-center pb-20">
                    <span className="rounded-full border bg-card/80 px-4 py-2 font-mono text-xs text-muted-foreground">
                      approval = hash(exact text)
                    </span>
                  </div>
                }
              />
              <BentoCard
                name="Writes + audit"
                description="First engagements write suggestions only. Every case leaves one run record."
                icon={<Archive className="size-5 text-primary" />}
                className="md:col-span-2"
                background={
                  <div className="absolute inset-0">
                    <DotPattern className="[mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
                  </div>
                }
              />
            </BentoGrid>
          </BlurFade>

          <BlurFade delay={0.2}>
            <p className="mx-auto mt-12 max-w-xl text-center text-muted-foreground">
              Handover is part of the design: you keep the code, runbooks,
              decision store, and the evaluation harness your team can run.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Shape of a run — template integrations section */}
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <BlurFade direction="right">
            <div>
              <span className="text-sm font-medium text-primary">
                The shape of a run
              </span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance lg:text-4xl">
                From arrival to audit,{" "}
                <span className="text-primary">in eight stages.</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                A case moves through the same eight stages whatever the
                process. The walkthrough below opens each one.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Starts on a trigger, not a prompt",
                  "Stops for a human at the judgment points",
                  "Leaves one run record per case",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex size-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check className="size-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p
                data-flag="open-problem"
                className="mt-6 text-sm text-muted-foreground"
              >
                Two things are still unsettled on our side: the exact first
                problem and the final technical shape. The method is closer to
                settled than the technology.
                <Flag id="open-problem" />
              </p>
            </div>
          </BlurFade>
          <BlurFade direction="left" delay={0.15}>
            <div className="flex flex-col items-stretch gap-1">
              {BEAM_NODES.map((node, i) => (
                <div key={node.title}>
                  <div className="flex items-center gap-4 rounded-2xl border bg-card p-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <node.icon className="size-5" />
                    </span>
                    <span>
                      <span className="block font-medium">{node.title}</span>
                      <span className="block text-sm text-muted-foreground">
                        {node.sub}
                      </span>
                    </span>
                  </div>
                  {i < BEAM_NODES.length - 1 ? (
                    <ArrowDown className="mx-auto my-1 size-4 text-muted-foreground" />
                  ) : null}
                </div>
              ))}
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Walkthrough */}
      <section id="walkthrough" className="scroll-mt-24 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <BlurFade>
            <h2 className="text-3xl font-semibold tracking-tight text-balance lg:text-5xl">
              Pick a process.{" "}
              <span className="text-primary">Walk one case through it.</span>
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Three illustrative processes, eight stages each. The tags say
              who supplies what.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Tag kind="bought">Platform supplies</Tag>
              <Tag kind="built">We build</Tag>
              <Tag kind="human">Human decides</Tag>
            </div>
          </BlurFade>
          <div className="mt-12">
            <Walkthrough />
          </div>
        </div>
      </section>

      {/* Run record — template live-activity section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <RetroGrid />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <BlurFade direction="right" className="order-2 lg:order-1">
            <div className="rounded-2xl border bg-card p-4 sm:p-6">
              <p className="mb-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Illustrative run record — not a real case
              </p>
              <ul className="space-y-1">
                {FEED.map((item, i) => (
                  <BlurFade key={item.title} delay={i * 0.06}>
                    <li className="flex items-center gap-3 rounded-xl px-2 py-2">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <item.icon className="size-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-medium">
                          {item.title}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {item.body}
                        </span>
                      </span>
                    </li>
                  </BlurFade>
                ))}
              </ul>
            </div>
          </BlurFade>
          <BlurFade
            direction="left"
            delay={0.15}
            className="order-1 lg:order-2"
          >
            <div>
              <span className="text-sm font-medium text-primary">
                The audit trail
              </span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance lg:text-4xl">
                A record, <span className="text-primary">not a recollection.</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                When an auditor asks why a supplier was approved in March, the
                answer is a record.
              </p>
              <p className="mt-4 text-muted-foreground">
                Case ID, prompt and model versions, retrieval snapshot,
                approvers, outcome, reviewer minutes — for every case.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Engagement — template spotlight cards */}
      <section id="engagement" className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <Head
            title="How engagements work."
            sub={
              <>
                No prices on this page. Quotes follow qualification;
                per-outcome pricing is open, not offered.{" "}
                <span data-flag="pricing" />
              </>
            }
            flag="pricing"
          />
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <Search className="size-6" />,
                title: "Discovery",
                price: "Fixed price, credited into the build.",
                body: "Map, baseline, feasibility on held-back cases, go / no-go.",
              },
              {
                icon: <Rocket className="size-6" />,
                title: "Build & pilot",
                price: "Fixed price, acceptance criteria.",
                body: "Control plane, gate, approval surface, pilot with rollback live.",
              },
              {
                icon: <Gauge className="size-6" />,
                title: "Tune",
                price: "Fixed fee, 90 days, bounded.",
                body: "Weekly sample, regression rows, monthly report, continue / expand / stop.",
              },
            ].map((card, i) => (
              <BlurFade key={card.title} delay={i * 0.12}>
                <SpotlightCard className="h-full p-8">
                  <div className="mb-4 w-fit rounded-xl bg-primary/10 p-3 text-primary">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <p className="mt-1 text-sm font-medium text-primary">
                    {card.price}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {card.body}
                  </p>
                </SpotlightCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Estimator */}
      <section id="estimator" className="scroll-mt-24 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <Head
            title="Will your reviewers keep up?"
            sub={
              <>
                A process agent moves work from doing to reviewing. The
                question isn’t time saved — it’s whether reviewers can carry
                the approval queue. Arithmetic on your inputs, nothing more.{" "}
                <span data-flag="estimator" />
              </>
            }
            flag="estimator"
          />
          <div className="mt-12">
            <Estimator />
          </div>
        </div>
      </section>

      {/* Method */}
      <section id="method" className="scroll-mt-24 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <Head
            title="Six stages, each signed on your side."
            sub={
              <>
                Fixed-price discovery, credited into a fixed-price build,
                then a bounded tune. “Don’t build yet” is a legitimate
                stage-one result.{" "}
                <span data-flag="method" />
              </>
            }
            flag="method"
          />
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {METHOD.map((stage, i) => (
              <BlurFade key={stage.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border bg-card p-6">
                  <p className="font-mono text-xs text-muted-foreground">
                    {stage.week}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">{stage.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Gate: {stage.gate}
                  </p>
                </div>
              </BlurFade>
            ))}
          </div>
          <BlurFade delay={0.2}>
            <p
              data-flag="timeline"
              className="mx-auto mt-12 max-w-xl text-center text-muted-foreground"
            >
              Planning ranges: 8–10 weeks clean, 3–6 months with integration
              or a security audit, 9+ months regulated. Golden set: 20–50
              cases.
              <Flag id="timeline" />
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Stack */}
      <section id="stack" className="scroll-mt-24 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <Head
            title="Microsoft-first, by default."
            sub={
              <>
                You already own identity, permissions, approvals, audit.
                Estate-neutrality as a principle is still open.{" "}
                <span data-flag="ms-first" />
              </>
            }
            flag="ms-first"
          />
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <BlurFade>
              <div className="h-full rounded-2xl border bg-card p-8">
                <h3 className="text-lg font-semibold">
                  Microsoft 365 estates
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Copilot Studio autonomous agent — triggers, topics</li>
                  <li>Power Automate agent flows + approvals</li>
                  <li>SharePoint + Dataverse as truth</li>
                  <li>Azure Functions for deterministic steps</li>
                  <li>Entra Agent ID, Agent 365, Purview visibility</li>
                </ul>
              </div>
            </BlurFade>
            <BlurFade delay={0.12}>
              <div className="h-full rounded-2xl border bg-card p-8">
                <h3 className="text-lg font-semibold">Off-estate swap</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Temporal — the transaction owner</li>
                  <li>LangGraph with PydanticAI nodes</li>
                  <li>Postgres + pgvector for state and memory</li>
                  <li>Langfuse for evaluation</li>
                  <li>Same shape, same gates, different parts</li>
                </ul>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Fit */}
      <section id="fit" className="scroll-mt-24 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <Head title="When it fits, and when it doesn’t." />
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <BlurFade>
              <div className="h-full rounded-2xl border bg-card p-8">
                <h3 className="text-lg font-semibold">A fit, when</h3>
                <ul className="mt-4 space-y-3 text-sm">
                  {FIT_YES.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </BlurFade>
            <BlurFade delay={0.12}>
              <div className="h-full rounded-2xl border bg-card p-8">
                <h3 className="text-lg font-semibold">Not a fit, when</h3>
                <ul className="mt-4 space-y-3 text-sm">
                  {FIT_NO.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="not-a-fit-cross mt-0.5" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Status */}
      <section id="status" className="scroll-mt-24 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <Head
            title="What’s decided, what isn’t."
            sub={
              <>
                The second column usually stays hidden. You should see it
                before a first conversation, not during one.{" "}
                <span data-flag="status" />
              </>
            }
            flag="status"
          />
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <BlurFade>
              <div className="h-full rounded-2xl border bg-card p-8">
                <h3 className="text-lg font-semibold">Decided</h3>
                <ul className="mt-4 space-y-3 text-sm">
                  {DECIDED.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </BlurFade>
            <BlurFade delay={0.12}>
              <div className="h-full rounded-2xl border bg-card p-8">
                <h3 className="text-lg font-semibold">Still open</h3>
                <ul className="mt-4 space-y-3 text-sm">
                  {OPEN.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-muted-foreground" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* FAQ — template section */}
      <section id="faq" className="scroll-mt-24 py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <Head title="Frequently asked questions" />
          <BlurFade delay={0.15}>
            <Accordion type="single" collapsible className="mt-12">
              {FAQS.map((faq) => (
                <AccordionItem key={faq.q} value={faq.q}>
                  <AccordionTrigger className="text-left text-base">
                    <span data-flag={faq.flag}>{faq.q}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                    {faq.flag ? <Flag id={faq.flag} /> : null}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </BlurFade>
        </div>
      </section>

      {/* CTA — template section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <AuroraBackground intensity="subtle" />
        <Particles quantity={50} />
        <div className="relative mx-auto max-w-4xl px-4 text-center lg:px-8">
          <BlurFade>
            <h2 className="text-4xl font-semibold tracking-tight text-balance lg:text-6xl">
              Tell us about <span className="text-primary">the process</span>{" "}
              that hurts.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              One process, one owner, one number. Start with qualification —
              “not yet” is a possible answer.
            </p>
            <div className="mt-10">
              <CtaButtons
                large
                primaryLabel="Start a conversation"
                primaryTarget="contact"
                secondaryLabel="Check if you're a fit"
                secondaryTarget="fit"
              />
            </div>
          </BlurFade>
          <BlurFade delay={0.2}>
            <div className="mt-16">
              <p className="mb-4 text-xs text-muted-foreground">
                Jump to a section
              </p>
              <Dock>
                <DockIcon label="Walkthrough" href="#walkthrough">
                  <Workflow className="size-5" />
                </DockIcon>
                <DockIcon label="Anatomy" href="#anatomy">
                  <Layers className="size-5" />
                </DockIcon>
                <DockIcon label="Estimator" href="#estimator">
                  <Calculator className="size-5" />
                </DockIcon>
                <DockIcon label="FAQ" href="#faq">
                  <MessageCircle className="size-5" />
                </DockIcon>
                <DockIcon label="Contact" href="#contact">
                  <Mail className="size-5" />
                </DockIcon>
              </Dock>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-24 py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <Head
            title="Start a conversation."
            sub={
              <>
                This form sends nothing. It composes a draft you copy or open
                in your mail app. No backend, no database, no tracking.{" "}
                <span data-flag="contact" />
              </>
            }
            flag="contact"
          />
          <div className="mt-12">
            <ContactForm />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
