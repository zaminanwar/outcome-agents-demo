/**
 * Outcome Agents content — memo edition, 2026-11-01.
 * Walkthrough content, stages and tags are unchanged from the concise port.
 * Judgment calls are listed newest first; the "memo" entry covers this
 * redesign. Plain serializable data, safe to import from Server or Client
 * Components.
 */

// The founder sets this. Placeholder until then (flagged on page).
export const CONTACT_EMAIL = "hello@outcome-agents.example";

export type TagKind = "bought" | "built" | "human";

export interface JudgmentCall {
  id: string;
  title: string;
  body: string;
}

export const CALLS: JudgmentCall[] = [
  {
    id: "memo",
    title: "Rebuilt the page as a written memo, not a product launch.",
    body: "The SaaS template (typewriter headline, marquee, bento, number tickers, meteors, dock, aurora) sold software to self-serve signups; this firm sells one engagement to one careful reader. The page is now a numbered document on paper: serif display, hairline rules, tables for the parts, the engagement and the gates, one signal colour reserved for the human-decides mark. Light by default, dark available. Every claim, number, gate, price statement and open question is carried over or tightened; none is new. The handover\u2019s own rule for a public page is the brief: a distilled excerpt of the playbook, doctrine plus offer ladder. No data-flag target: this entry covers the whole page.",
  },
  {
    id: "hero",
    title: "Hero now leads with the thesis, not the product.",
    body: "\u201cThe model is not the hard part\u201d states the last-mile thesis in the buyer\u2019s terms, then the lede lists the five things that are hard (mapping, permissions, grounding, proving, owning) and closes on what the firm does about them. The previous hero (\u201cAn agent that owns a business outcome\u201d) read as a software claim. Two alternates if you want to compare: \u201cYou already have the models. You don\u2019t have the process.\u201d and \u201cCapability has outrun adoption.\u201d Your call.",
  },
  {
    id: "byline",
    title: "No byline, on purpose.",
    body: "A founder-led boutique would normally sign its page. Nothing goes out under your name without your say-so on the exact wording, so the page says \u201cone person, for now\u201d in the questions and leaves the signature off. Add your name and one line about you when you are ready; the footer is where it goes.",
  },
  {
    id: "notes",
    title: "Moved the review strip out of the buyer\u2019s way.",
    body: "The demo banner, the judgment-call toggle and the drawer used to sit above the hero, so the page could never be judged as a page. They now live in the footer (and at /#notes). The demo-concept disclosure stays in the footer text and in the page metadata (noindex, robots disallow). Nothing was removed; it was moved.",
  },
  {
    id: "method",
    title: "Showed all ten engagement stages (0 to 9) as a table instead of six cards.",
    body: "The concise page compressed the playbook\u2019s ten steps into six cards. A table carries ten rows without getting long, so the stages, windows and the gate your side signs are now listed as the playbook has them. Week numbers are the clean-case ranges.",
  },
  {
    id: "name",
    title: "Kept the working name Outcome Agents, labelled provisional.",
    body: "No alternative is adopted on the page. Two candidates if you want to compare: “Last Mile Agents” (names the thesis directly) and “Trigger to Record” (names the shape of a run). Your decision, not the page’s.",
  },
  {
    id: "open-problem",
    title: "Said on the page that the problem statement and technical shape are unsettled.",
    body: "A client-facing page normally hides this. The brief asked for it to stay visibly open, so it is stated once here and again in “What’s decided, what isn’t”.",
  },
  {
    id: "bought-built",
    title: "Added a Platform-supplies / We-build / Human-decides legend throughout.",
    body: "This is how the page keeps “built versus claimed” honest without a paragraph of caveats. Hash-bound approval, the multi-day reviewer queue and the write-blocking eval gate are tagged as our build everywhere, and the anatomy says explicitly that no vendor ships them.",
  },
  {
    id: "timeline",
    title: "Published planning ranges for timelines.",
    body: "8 to 10 weeks clean, 3 to 6 months with integration or a security audit, 9+ months regulated, plus the golden-set size of 20 to 50 cases. These come from the playbook’s evidenced bands and are labelled as planning ranges from published implementer experience, not promises. Remove if you’d rather quote nothing.",
  },
  {
    id: "ms-first",
    title: "Microsoft-first presented as a default, with estate-neutrality named as open.",
    body: "The off-estate stack is shown as the alternative, not the pitch, and named with the components from the playbook (Temporal, LangGraph with PydanticAI nodes, Postgres/pgvector, Langfuse).",
  },
  {
    id: "estimator",
    title: "Rebuilt the estimator around reviewer load, not savings.",
    body: "It computes hours today, reviewer hours with the agent, approvals per day and queue hours per reviewer from the visitor’s own inputs. It never claims a saving; it shows the approval bottleneck. Defaults (120 items, 90 minutes, 100% review, 12 reviewer minutes) are placeholders, not benchmarks.",
  },
  {
    id: "pricing",
    title: "No prices anywhere; said so explicitly.",
    body: "The page says quotes follow qualification and that per-outcome pricing is open, not offered. The FAQ includes the finance-contact verification question from the playbook as the test for whether per-outcome could ever be contractible.",
  },
  {
    id: "status",
    title: "Listed the open questions on the page, except the endgame.",
    body: "Problem statement, technical shape, pricing model, Microsoft-first versus estate-neutral, and positioning against Microsoft’s services arm are listed as open. Build-to-last versus build-to-be-bought is left off: it is your question, not a prospect’s.",
  },
  {
    id: "solo",
    title: "FAQ says “one person, for now”.",
    body: "Honest, and it explains why qualification is strict. Nothing else about staffing, history or plans appears anywhere. Soften or remove if it reads as a weakness to the audience you have in mind.",
  },
  {
    id: "frontier",
    title: "Named Microsoft’s forward-deployed services in the FAQ without resolving positioning.",
    body: "The answer states the current lane (mid-size, one process, pilot-first, handover) and says the positioning question is open. It does not claim differentiation beyond that.",
  },
  {
    id: "contact",
    title: "Contact address is a placeholder constant.",
    body: "CONTACT_EMAIL in the contact component is set to hello@outcome-agents.example. Replace it with the address you want prospects to use. The form composes a draft, offers copy and a mailto link, and sends nothing.",
  },
  {
    id: "polish",
    title: "Design polish pass with the Impeccable skill, no copy claims changed.",
    body: "Removed the small eyebrow labels above every heading (the skill's craft floor bans them outright) and folded the hero's Microsoft 365 line into the lede sentence instead. Strengthened the type scale so headings step clearly above body text, replaced thick side and top accent borders with 1px treatments, drew the not-a-fit crosses in CSS instead of a glyph character, and themed text selection, scrollbars and the text caret from the palette. The detector went from 12 findings to zero; the padding flags cleared once the content wrapper used explicit pixel padding instead of a fluid clamp the detector could not read. No claims, prices, examples or the contact placeholder were touched.",
  },
  {
    id: "redesign",
    title: "Redesigned the visual world and reframed the page as a story, in steps, after the Claude Code route kept looping on approvals.",
    body: "World: operations console / run record — deep ink, hairline rules, oversized tight display type, teal as a signal only, light label pills. The hero now opens on the scene every prospect recognises (a case arrives, then waits), the walkthrough is framed as the spine of the story, and the anatomy and method sections pick up from the case above. Section order and every claim, number, gate, price statement, and open question are unchanged; the only copy changes are the hero lede, one CTA label, and three section transitions. All text pairs in the new palette were checked at 4.5:1 or better. No data-flag target: this entry covers the whole page.",
  },
  {
    id: "mobile",
    title: "Mobile fixes after the redesign looked bad on small screens.",
    body: "The display type was sized for desktop: the headline bottomed out at 2.75rem and section heads at 1.9rem, so on a phone they wrapped to a word or two per line. Both now scale with viewport width (headline from 2rem, section heads from 1.6rem). The sticky review strip, which stacked to three rows on a phone and stayed pinned, now scrolls away below 520px, secondary nav links hide on small screens leaving just the call to action, and section and card padding tighten up. No copy, claims, or layout structure changed. No data-flag target: this entry covers the whole page.",
  },
  {
    id: "template",
    title: "Rebuilt the page on the Velora UI template (MIT), cutting its placeholder content.",
    body: "The previous hand-rolled page was replaced with a tuned version of Colorlib's Velora UI SaaS template, MIT-licensed, so the design comes from a real design system instead of custom CSS. Every Velora placeholder — testimonials, statistics, pricing, client logos, and all non-home pages — was cut, not filled in. The content is the same claims as before, and the contact form still composes a draft only. Velora's default blue brand tokens and dark-first theme were kept; the previous teal-on-ink palette went with the hand-rolled CSS. No data-flag target: this entry covers the whole page.",
  },
  {
    id: "concise",
    title: "Cut the page to short copy and let visuals carry it.",
    body: "After the Velora rebuild the founder said the verbatim port was too wordy. This version keeps the SaaS template's own sections and shortens every section to a line or two plus a diagram, widget, or timeline; the walkthrough bodies, method, stack, fit, status, and FAQ answers are all condensed from the previous version. No claim, number, gate, or open question changed — only the length. The full detail lives in the playbook, not on the page. No data-flag target: this entry covers the whole page.",
  },
];

export interface Stage {
  key: string;
  label: string;
  kind?: TagKind;
}

export const STAGES: Stage[] = [
  { key: "trigger", label: "Trigger" },
  { key: "decompose", label: "Decompose" },
  { key: "retrieve", label: "Retrieve" },
  { key: "draft", label: "Draft" },
  { key: "gate", label: "Eval gate", kind: "built" },
  { key: "approve", label: "Approve", kind: "human" },
  { key: "write", label: "Write" },
  { key: "audit", label: "Audit" },
];

export interface WalkthroughStep {
  title: string;
  body: string;
  tags: Array<[TagKind, string]>;
}

export interface Process {
  name: string;
  intro: string;
  steps: Record<string, WalkthroughStep>;
}

export const PROCESSES: Process[] = [
  {
    name: "Insurance RFP response",
    intro:
      "Illustrative: a mid-size insurer answering a broker's RFP from an approved answer library. One case = one RFP pack.",
    steps: {
      trigger: {
        title: "An RFP pack lands in a SharePoint folder",
        body: "The flow starts on file arrival, issues a case ID, and posts one Teams message to the bid owner. Nobody opens an agent or types a prompt. Incomplete pack? The flow stops and says so.",
        tags: [
          ["bought", "SharePoint trigger, Power Automate agent flow"],
          ["built", "Case ID and idempotency key per step"],
        ],
      },
      decompose: {
        title: "One compliance-matrix row per obligation",
        body: "A deterministic parse turns every requirement — sub-questions included — into one matrix row with its page reference. The matrix is what the bid owner sees first. Nothing is written until every obligation has a row.",
        tags: [
          ["bought", "Dataverse table for the matrix"],
          ["built", "Parser, matrix schema"],
        ],
      },
      retrieve: {
        title: "Approved answers first, nothing without provenance",
        body: "Exact lookup in the approved library first, then lexical, then semantic only where it adds something. Every candidate carries owner, approval status, valid-through date, and allowed usage. No provenance, not retrievable.",
        tags: [
          ["bought", "SharePoint permission trimming, Dataverse lookup"],
          ["built", "Library rules, retrieval order, index job"],
        ],
      },
      draft: {
        title: "The model fills a row from evidence, or writes “gap”",
        body: "Each row is drafted from retrieved items only, quoting verbatim where it claims anything. No approved evidence means the output is “gap”, routed to the section owner. The model never invents, never submits.",
        tags: [
          ["bought", "Copilot Studio autonomous agent, topic per stage"],
          ["built", "Versioned instructions, template binding"],
        ],
      },
      gate: {
        title: "Deterministic second pass before anyone reviews",
        body: "Code checks every row: claims linked, sub-questions covered, no conflicts, nothing past valid-through. A failed check sends the row back to “gap”, never forward. Scored on recall and unsupported claims — never speed.",
        tags: [
          ["bought", "Azure Functions, Copilot Studio evaluations for the test set"],
          ["built", "Validation rules, golden set of 20–50 past RFP rows graded by your bid expert"],
        ],
      },
      approve: {
        title: "Section owners approve the exact text and sources",
        body: "Each owner gets a Teams card with the exact answer and its evidence. Approval records a hash of that text, plus prompt version, model ID, approver, timestamp. Edit after approval and the hash breaks — approval void, row returns. Three days unanswered times out to cancel, never approve.",
        tags: [
          ["bought", "Power Automate approvals, Teams Adaptive Cards"],
          ["built", "Hash binding, reviewer queue with multi-day hold"],
          ["human", "Section owner decides"],
        ],
      },
      write: {
        title: "Approved rows go into the proposal workspace as suggestions",
        body: "Approved rows enter the bid document and the matrix status as suggestions. Submitting the proposal stays a human button-press. The agent has no path to the broker.",
        tags: [
          ["bought", "Connector to the proposal workspace"],
          ["built", "Suggestion-only write mode, kill switch"],
          ["human", "Bid owner submits"],
        ],
      },
      audit: {
        title: "One run record for the whole case",
        body: "One run record: case ID, prompt and model versions, retrieval snapshot hash, approvers, outcome, reviewer minutes. The baseline for tuning — and the evidence if compliance asks later.",
        tags: [
          ["bought", "Dataverse run record, Purview"],
          ["built", "Run-record schema"],
        ],
      },
    },
  },
  {
    name: "Support knowledge",
    intro:
      "Illustrative: a service desk answering from an approved knowledge base, a support agent approving every reply. One case = one ticket.",
    steps: {
      trigger: {
        title: "A ticket opens in a routed queue",
        body: "The flow starts when a ticket opens in an opted-in queue. Other queues are untouched. The ticket ID becomes the case ID.",
        tags: [
          ["bought", "Service-desk connector, Power Automate agent flow"],
          ["built", "Queue scope, idempotency"],
        ],
      },
      decompose: {
        title: "Classify, then check entitlement in code",
        body: "The agent classifies product and intent. Code checks entitlement and tier against the system of record. Billing disputes, legal threats, outages — anything policy says a human must handle — exits to a person here.",
        tags: [
          ["bought", "Copilot Studio autonomous agent, Dataverse lookup"],
          ["built", "Never-automated list enforced in the flow"],
        ],
      },
      retrieve: {
        title: "Approved articles only, trimmed to what the customer may see",
        body: "Only published articles the customer's plan allows. Drafts, internal notes, and past-review-date items are excluded by rule, not by hope.",
        tags: [
          ["bought", "SharePoint permission trimming"],
          ["built", "Article metadata rules, exclusion filters"],
        ],
      },
      draft: {
        title: "A reply drafted from articles, with article IDs cited",
        body: "A reply drafted from retrieved articles only, each article ID cited inline. No covering article means “no approved answer” and the ticket goes to the human queue with its classification.",
        tags: [
          ["bought", "Copilot Studio autonomous agent"],
          ["built", "Versioned instructions, reply template"],
        ],
      },
      gate: {
        title: "Every sentence traceable, no commitments outside policy",
        body: "Code checks every statement maps to a cited article, no refund, credit, date, or SLA is promised beyond the articles, and no other customer's data leaked in. Failures go to a human with the failing check named.",
        tags: [
          ["built", "Validation rules, golden set of 20–50 past tickets graded by a senior agent"],
        ],
      },
      approve: {
        title: "The support agent approves, edits or rejects in their own queue",
        body: "The draft lands in the support agent's queue with its cited articles. Approval binds to a hash of the exact reply; an edit re-checks before it can be approved. Nothing reaches a customer without a person pressing approve.",
        tags: [
          ["bought", "Power Automate approvals, Teams Adaptive Cards"],
          ["built", "Hash binding, re-check on edit"],
          ["human", "Support agent decides"],
        ],
      },
      write: {
        title: "Reply posted to the ticket by the system, under the agent’s name",
        body: "The approved reply is posted to the ticket. On a first engagement it lands as a ready-to-send draft — the final send is still the support agent's click.",
        tags: [
          ["bought", "Service-desk connector"],
          ["built", "Suggestion-only write mode"],
          ["human", "Support agent sends"],
        ],
      },
      audit: {
        title: "Per-ticket run record, plus the regression loop",
        body: "Per-ticket run record, plus a regression loop: every rejected or heavily edited draft becomes a row a senior agent grades, so the golden set grows from real failures.",
        tags: [
          ["bought", "Dataverse run record, Purview"],
          ["built", "Failure-to-regression promotion"],
        ],
      },
    },
  },
  {
    name: "Vendor document review",
    intro:
      "Illustrative: procurement reviewing a supplier onboarding pack against a checklist. One case = one supplier pack.",
    steps: {
      trigger: {
        title: "A supplier uploads a pack to the onboarding folder",
        body: "The flow starts on upload, matches the supplier to its procurement record, and issues a case ID. No record, no run — the owner is told.",
        tags: [
          ["bought", "SharePoint trigger, Power Automate agent flow"],
          ["built", "Supplier match rule, idempotency"],
        ],
      },
      decompose: {
        title: "Checklist by supplier category, decided in code",
        body: "Required documents and fields come from a table the procurement owner maintains, keyed by category and spend band. Code applies it. The model has no say in what is required.",
        tags: [
          ["bought", "Dataverse checklist table"],
          ["built", "Checklist logic"],
        ],
      },
      retrieve: {
        title: "Extract fields and look up thresholds and history",
        body: "Expiry dates, coverage amounts, signatories, and attestation scopes are extracted per document. Code looks up policy thresholds and the supplier's previous submissions.",
        tags: [
          ["bought", "Content processing, Dataverse lookup"],
          ["built", "Field schema per document type"],
        ],
      },
      draft: {
        title: "A findings list, every finding with a page reference",
        body: "One finding per checklist item — present, missing, expired, below threshold, or unclear — each with a page reference. “Unclear” is valid. Guessing is not.",
        tags: [
          ["bought", "Copilot Studio autonomous agent"],
          ["built", "Findings template, versioned instructions"],
        ],
      },
      gate: {
        title: "Dates parsed, thresholds compared, conflicts flagged",
        body: "Code re-parses every date and amount, compares against thresholds, fails any finding without a page reference, and flags contradictions between documents. The status (approve, conditional, reject) is computed by rule, not written by the model.",
        tags: [
          ["built", "Validation rules, status logic, golden set of 20–50 past packs graded by procurement"],
        ],
      },
      approve: {
        title: "The procurement owner approves findings and status",
        body: "A card shows findings, computed status, and page references. Approval binds to a hash of the findings. A corrected upload re-runs the case and voids the previous approval by construction.",
        tags: [
          ["bought", "Power Automate approvals, Teams Adaptive Cards"],
          ["built", "Hash binding, multi-day hold"],
          ["human", "Procurement owner decides"],
        ],
      },
      write: {
        title: "Findings written to the supplier record; status change proposed",
        body: "Findings go to the supplier record. The status change is proposed as a pending change a person commits. On a first engagement, nothing changes state without that click.",
        tags: [
          ["bought", "Procurement system connector"],
          ["built", "Suggestion-only write mode, kill switch"],
          ["human", "Owner commits status"],
        ],
      },
      audit: {
        title: "Run record per pack, usable in an audit",
        body: "One run record per pack. When an auditor asks why a supplier was approved in March, the answer is a record, not a recollection.",
        tags: [
          ["bought", "Dataverse run record, Purview"],
          ["built", "Run-record schema"],
        ],
      },
    },
  },
];
