/**
 * Page copy. Every claim here was carried over unchanged from the previous
 * edition; see CALLS in ./outcome.ts for the judgment calls behind them.
 * Plain data so Server and Client Components can both import it.
 */

export const NAV = [
  { href: "/#shift", label: "The shift" },
  { href: "/#gap", label: "The gap" },
  { href: "/#example", label: "One example" },
  { href: "/#get", label: "What you get" },
  { href: "/#how", label: "How we work" },
  { href: "/#you", label: "Is this you?" },
] as const;

export const CTA = { href: "/#contact", label: "Tell us about the process" } as const;

export const HERO = {
  eyebrow: "For companies on Microsoft 365 where people already use Copilot",
  title: "Your people have Copilot. Your processes don’t.",
  lede:
    "Employees use it one prompt at a time, each on their own. A draft here, a summary there. Meanwhile the RFP, the claim, the supplier pack still move the way they always did. We take one of those processes and make it run: started by the work arriving, grounded in your approved content, checked, approved by a named person, written to the system of record. In your tenant, on the platform you already have.",
} as const;

/** The gap table: [row label, Copilot one person at a time, a process agent]. */
export const GAP: ReadonlyArray<readonly [string, string, string]> = [
  ["Starts when", "Someone remembers to open Copilot", "The document arrives"],
  ["Reads", "Whatever that person pastes in or can see", "Your approved content, permission-trimmed"],
  ["When it doesn’t know", "Fills the gap with its best guess", "Writes “gap” and names the owner"],
  ["Checked by", "The same person who prompted", "Code first, then against your expert’s past cases"],
  ["Approved", "By whoever pastes it onward", "Explicitly, on the exact text, by a named person"],
  ["Ends up", "In a chat window, then a copy-paste", "In the system of record, committed by a person"],
  ["What you can measure", "Licences assigned", "Recall, unsupported claims, review minutes, per case"],
];

export const VERBS = [
  {
    verb: "Drop the pack in",
    body: "An RFP lands in the SharePoint folder. Nobody opens an agent. The case starts itself.",
  },
  {
    verb: "See every requirement answered or flagged",
    body: "One row per obligation. Each answer comes from your approved library and cites it. No approved answer means the row says “gap” and goes to its owner.",
  },
  {
    verb: "Approve the exact text",
    body: "Section owners get a card with the answer and its sources. Approval is tied to that exact text. Edit it and it goes back for approval.",
  },
  {
    verb: "Press submit",
    body: "Approved rows land in the proposal as suggestions. Submission stays a human button. The agent has no path to the broker.",
  },
] as const;

/** The eight steps under every case. `check` is code; `approve` is a person. */
export const STEPS = [
  { label: "Trigger" },
  { label: "Decompose" },
  { label: "Retrieve" },
  { label: "Draft" },
  { label: "Check", kind: "code" },
  { label: "Approve", kind: "human" },
  { label: "Write" },
  { label: "Record" },
] as const;

export const OTHER_PROCESSES = [
  "Insurance claims",
  "Supplier onboarding packs",
  "Support tickets",
  "Contract review",
  "KYC and due diligence",
  "Vendor document review",
] as const;

export const GET = [
  {
    icon: "workflow",
    title: "A process that runs, not a tool people might use",
    body: "Triggered by the work arriving, in your tenant, on the Microsoft platform you already run. Your identity, your permissions, your audit.",
  },
  {
    icon: "user-check",
    title: "A named person on every consequential write",
    body: "The agent drafts and checks. A person approves the exact text and commits every change. Nothing is sent or submitted on its own.",
  },
  {
    icon: "gauge",
    title: "A number, before and after",
    body: "We baseline the process with its owner before building, and measure the same number after. Scored on recall and unsupported claims, never on speed.",
  },
  {
    icon: "package-check",
    title: "Everything handed over",
    body: "Code, runbooks, the approved-content rules, the test set your team can rerun. A bounded 90-day tune, not a dependency.",
  },
] as const;

export const HOW = [
  {
    title: "Qualify",
    body: "One short conversation against a fixed set of gates. “Don’t build yet” is a real answer, given in writing.",
    gate: "Your side decides whether to continue",
  },
  {
    title: "Discover and baseline",
    body: "Fixed price, credited into the build. Map the process, baseline the number, test the permissions, collect 20 to 50 real past cases.",
    gate: "The process owner signs the baseline",
  },
  {
    title: "Build, pilot, hand over",
    body: "Fixed price, acceptance criteria agreed up front. Pilot with an internal team first. Your team runs the test set unaided before we leave.",
    gate: "Acceptance criteria met, test set rerun by your team",
  },
] as const;

export const TIMELINE =
  "Typically 8 to 10 weeks when the gates pass cleanly; longer with a new integration or a formal security review. Your risk assessment is the critical path, not the build.";

export const YOU = [
  "You run Microsoft 365, and some of your people already use Copilot.",
  "One process that arrives as documents and ends in a system of record.",
  "A library of approved content that process should draw from, even if it is messy today.",
  "Someone who owns the number for that process and will sign the baseline.",
] as const;

export const SOLO =
  "One person builds this, for now. That is why it is one process at a time, piloted with an internal team first, and handed over.";

export const FOOTER_DISCLOSURE =
  "A working name for a consultancy that does not exist yet. This page is a demo concept for discussion, not a live company site. No clients, metrics, testimonials or prices appear on it because there are none to show.";
