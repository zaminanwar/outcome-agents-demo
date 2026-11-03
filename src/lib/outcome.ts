/**
 * Outcome Agents: the founder-facing record of judgment calls, newest first,
 * plus the contact placeholder. Page copy lives in ./content.ts. Plain
 * serializable data, safe to import from Server or Client Components.
 */

// The founder sets this. Placeholder until then (flagged on page).
export const CONTACT_EMAIL = "hello@outcome-agents.example";

export interface JudgmentCall {
  id: string;
  title: string;
  body: string;
}

export const CALLS: JudgmentCall[] = [
  {
    id: "shadcn",
    title: "Rebuilt the page on shadcn/ui, replacing the Velora UI template and the memo styling.",
    body: "Same single page, same section order, same claims. The visual world is now shadcn/ui on Next.js and Tailwind: the neutral token set, Geist for everything, cards, a real table for the gap, tabs on the diagram, a sheet for these notes, popovers for the markers, and one signal colour kept for the moments a person decides. Two additions, both illustrative and labelled so: a run-record card beside the headline showing case 0412 waiting on a section owner, and a one-line gate under each of the three steps in How we work, taken from the existing copy. Everything Velora shipped that the page never used (about 450 files of components, blocks, docs and a registry) is deleted along with the unused walkthrough and estimator components; the memo edition is the previous commit on main if you want it back. No copy, price statement, timeline, or the contact placeholder changed.",
  },
  {
    id: "diagram",
    title: "Drew the shift as one animated diagram with two states of the same process.",
    body: "Generalised nouns from the founder\u2019s answers on 2026-11-01: work arrives, approved content, systems of record, colleagues, Copilot, the person, done. Today: the person sits in the lane and pulls from everything. With a process agent: the agent takes the seat, Copilot moves inside it (his answer: it moves into the agent, not kept beside the person), the person moves to the approval seat (move, not remove), and the arrows flip from pull to push (his pick: direction). Plays once when half in view, then a Today / With a process agent toggle. Reduced-motion users get instant switches. Three words in the agent box; the eight steps stay on the example section below. No real product, tenant or client is depicted.",
  },
  {
    id: "focus",
    title: "Reopened D8: the page now leads with individual Copilot use versus a process that runs.",
    body: "The founder said on 2026-11-01 that the ideal customer is a company whose employees already use Copilot individually, and that the pain of that versus the value of a process agent should be the whole page. That is the individual-vs-process angle tabled as D8 on 2026-10-31. The copy here is written fresh from his words that day; neither tabled version (v1 claims, v2 RFP worked example) was reused. If this angle is not what he meant, the memo edition on the previous commit of main is the fallback. No data-flag target: covers the whole page.",
  },
  {
    id: "hidden",
    title: "Hid the playbook: no ten-gate table, no six-part anatomy, no three-owners section, no estimator, no decided/open lists, no FAQ.",
    body: "The founder said the detail does not serve a purpose on the page and to stick to the value proposition and pain points. The components still exist in the repo (walkthrough, estimator) and the content is in the playbook. The open decisions are no longer on the page; they are listed in the next note so the honesty survives in the drawer.",
  },
  {
    id: "open",
    title: "Open questions now live here, not on the page.",
    body: "Still open as of 2026-11-01: the exact first process (RFP is the leading candidate); the final technical shape; the pricing model (per-outcome open, not offered); Microsoft-first as a default versus estate-neutral as a principle; positioning against Microsoft\u2019s own forward-deployed services arm. The page states Microsoft-first and the RFP example as if settled for a reader; the drawer says they are not.",
  },
  {
    id: "gap",
    title: "The before/after table characterises individual Copilot use from the process side.",
    body: "Seven rows: starts when, reads, when it doesn\u2019t know, checked by, approved, ends up, what you can measure. The left column describes ungrounded, unapproved individual use in neutral terms (\u201cwrites something plausible\u201d, \u201cimplicitly, by pasting it onward\u201d). No adoption statistics are cited because none in the research base are independently audited. Soften any row that reads as a dig at Microsoft rather than a description of the gap.",
  },
  {
    id: "example",
    title: "One worked example, the RFP, drawn as five panes with placeholder data.",
    body: "Case 0412, requirement IDs R-01 to R-04, library references like Lib/CY-14 and a truncated hash are all invented placeholders and the caption says so. The four verbs (drop in, see answered or flagged, approve exact text, press submit) are the playbook\u2019s end-user UX. The eight steps underneath are shown as a single line, not explained. Other processes are named as a list, not described.",
  },
  {
    id: "hero",
    title: "Hero: \u201cYour people have Copilot. Your processes don\u2019t.\u201d",
    body: "States the gap the founder named as the ideal customer\u2019s situation. The lede ends on \u201con the platform you already have\u201d rather than \u201con licences you already pay for\u201d because Copilot Studio usage is metered and the no-charge path for M365 Copilot-licensed users is not verified in-tenant. Alternates: \u201cCopilot for one person is a tool. For a process, it is a system.\u201d or the previous \u201cThe model is not the hard part.\u201d",
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
    id: "name",
    title: "Kept the working name Outcome Agents, labelled provisional.",
    body: "No alternative is adopted on the page. Two candidates if you want to compare: “Last Mile Agents” (names the thesis directly) and “Trigger to Record” (names the shape of a run). Your decision, not the page’s.",
  },
  {
    id: "timeline",
    title: "Published planning ranges for timelines.",
    body: "8 to 10 weeks clean, 3 to 6 months with integration or a security audit, 9+ months regulated, plus the golden-set size of 20 to 50 cases. These come from the playbook’s evidenced bands and are labelled as planning ranges from published implementer experience, not promises. Remove if you’d rather quote nothing.",
  },
  {
    id: "pricing",
    title: "No prices anywhere; said so explicitly.",
    body: "The page says quotes follow qualification and that per-outcome pricing is open, not offered. The FAQ includes the finance-contact verification question from the playbook as the test for whether per-outcome could ever be contractible.",
  },
  {
    id: "solo",
    title: "FAQ says “one person, for now”.",
    body: "Honest, and it explains why qualification is strict. Nothing else about staffing, history or plans appears anywhere. Soften or remove if it reads as a weakness to the audience you have in mind.",
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
