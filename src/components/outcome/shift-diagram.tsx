"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * The shift, drawn. Two states of the same process:
 *   Today — the person sits in the lane and pulls from everything
 *           (Copilot window, approved content, records, colleagues).
 *   Agent — the agent sits in the lane; Copilot moves inside it; the
 *           person moves to the approval seat and the process pushes to
 *           them. Same nodes, moved; arrows flip direction.
 * Plays once when scrolled into view, then a toggle hands over control.
 */

type State = "today" | "agent";
type NodeId =
  | "arrive"
  | "content"
  | "records"
  | "colleagues"
  | "copilot"
  | "person"
  | "agent"
  | "output";

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
  scale?: number;
  hidden?: boolean;
}

type Side = "top" | "right" | "bottom" | "left";

interface Arrow {
  from: NodeId;
  to: NodeId;
  label?: string;
  shift?: number; // perpendicular offset for parallel pairs
  fromSide?: Side; // force the exit edge; `along` slides it along that edge
  toSide?: Side;
  along?: number;
  dashed?: boolean;
  signal?: boolean;
}

interface Layout {
  viewBox: [number, number];
  nodes: Record<State, Record<NodeId, Rect>>;
  arrows: Record<State, Arrow[]>;
  labelOffset: number;
}

const W = 140;
const H = 64;

/* Desktop: a horizontal lane, left to right. */
const WIDE: Layout = {
  viewBox: [1000, 460],
  labelOffset: 12,
  nodes: {
    today: {
      arrive: { x: 40, y: 198, w: W, h: H },
      content: { x: 250, y: 44, w: W, h: H },
      records: { x: 610, y: 44, w: W, h: H },
      colleagues: { x: 610, y: 352, w: W, h: H },
      copilot: { x: 430, y: 352, w: W, h: H },
      person: { x: 430, y: 194, w: W, h: 72 },
      agent: { x: 330, y: 186, w: 340, h: 88, hidden: true },
      output: { x: 820, y: 198, w: W, h: H },
    },
    agent: {
      arrive: { x: 40, y: 198, w: W, h: H },
      content: { x: 330, y: 44, w: W, h: H },
      records: { x: 530, y: 44, w: W, h: H },
      colleagues: { x: 530, y: 352, w: W, h: H },
      copilot: { x: 556, y: 208, w: W, h: H, scale: 0.72 },
      person: { x: 760, y: 44, w: W, h: 72 },
      agent: { x: 330, y: 186, w: 340, h: 88 },
      output: { x: 820, y: 198, w: W, h: H },
    },
  },
  arrows: {
    today: [
      { from: "arrive", to: "person", label: "lands on them" },
      { from: "person", to: "copilot", label: "prompt", shift: -14 },
      { from: "copilot", to: "person", label: "paste", shift: 14 },
      { from: "person", to: "content", label: "searches" },
      { from: "person", to: "records", label: "looks up" },
      { from: "person", to: "colleagues", label: "asks around" },
      { from: "person", to: "output", label: "pastes in" },
    ],
    agent: [
      { from: "arrive", to: "agent", label: "triggers" },
      { from: "content", to: "agent", label: "approved only" },
      { from: "records", to: "agent" },
      { from: "agent", to: "person", label: "approve the exact text?", signal: true, fromSide: "right", along: -26, toSide: "left" },
      { from: "person", to: "output", label: "commits", signal: true },
      { from: "agent", to: "output", label: "as a suggestion", dashed: true },
      { from: "agent", to: "colleagues", label: "gaps, to a named owner", dashed: true },
    ],
  },
};

/* Phone: a vertical lane, top to bottom. */
const NW = 130;
const NH = 60;
const NARROW: Layout = {
  viewBox: [440, 720],
  labelOffset: 10,
  nodes: {
    today: {
      arrive: { x: 155, y: 16, w: NW, h: NH },
      content: { x: 8, y: 170, w: NW, h: NH },
      records: { x: 302, y: 170, w: NW, h: NH },
      person: { x: 155, y: 310, w: NW, h: 72 },
      copilot: { x: 155, y: 470, w: NW, h: NH },
      colleagues: { x: 302, y: 470, w: NW, h: NH },
      agent: { x: 60, y: 300, w: 320, h: 96, hidden: true },
      output: { x: 155, y: 640, w: NW, h: NH },
    },
    agent: {
      arrive: { x: 155, y: 16, w: NW, h: NH },
      content: { x: 8, y: 170, w: NW, h: NH },
      records: { x: 302, y: 170, w: NW, h: NH },
      person: { x: 302, y: 470, w: NW, h: 72 },
      copilot: { x: 270, y: 326, w: NW, h: NH, scale: 0.72 },
      colleagues: { x: 8, y: 470, w: NW, h: NH },
      agent: { x: 60, y: 300, w: 320, h: 96 },
      output: { x: 155, y: 640, w: NW, h: NH },
    },
  },
  arrows: {
    today: [
      { from: "arrive", to: "person", label: "lands on them" },
      { from: "person", to: "copilot", label: "prompt", shift: -12 },
      { from: "copilot", to: "person", label: "paste", shift: 12 },
      { from: "person", to: "content", label: "searches" },
      { from: "person", to: "records", label: "looks up" },
      { from: "person", to: "colleagues", label: "asks" },
      { from: "person", to: "output", label: "pastes in", shift: 0 },
    ],
    agent: [
      { from: "arrive", to: "agent", label: "triggers" },
      { from: "content", to: "agent", label: "approved only" },
      { from: "records", to: "agent" },
      { from: "agent", to: "person", label: "approve?", signal: true },
      { from: "person", to: "output", label: "commits", signal: true },
      { from: "agent", to: "output", label: "suggestion", dashed: true },
      { from: "agent", to: "colleagues", label: "gaps", dashed: true },
    ],
  },
};

const LABELS: Record<NodeId, [string, string?]> = {
  arrive: ["Work arrives", "request, pack, ticket"],
  content: ["Approved content", "policies, answers"],
  records: ["Systems of record", "CRM, ERP, cases"],
  colleagues: ["Colleagues", "the ones who know"],
  copilot: ["Copilot", "a window to visit"],
  person: ["The person", ""],
  agent: ["Process agent", "reads · drafts · checks"],
  output: ["Done", "in the record"],
};

/* Geometry ------------------------------------------------------------ */

function visualRect(r: Rect): Rect {
  const s = r.scale ?? 1;
  return { x: r.x, y: r.y, w: r.w * s, h: r.h * s };
}

function anchor(r: Rect, tx: number, ty: number, shift = 0) {
  const cx = r.x + r.w / 2;
  const cy = r.y + r.h / 2;
  const dx = tx - cx;
  const dy = ty - cy;
  if (Math.abs(dx) * r.h > Math.abs(dy) * r.w) {
    return { x: dx > 0 ? r.x + r.w : r.x, y: cy + shift, horizontal: true };
  }
  return { x: cx + shift, y: dy > 0 ? r.y + r.h : r.y, horizontal: false };
}

function onSide(r: Rect, side: Side, along = 0) {
  const cx = r.x + r.w / 2;
  const cy = r.y + r.h / 2;
  switch (side) {
    case "top":
      return { x: cx + along, y: r.y };
    case "bottom":
      return { x: cx + along, y: r.y + r.h };
    case "left":
      return { x: r.x, y: cy + along };
    default:
      return { x: r.x + r.w, y: cy + along };
  }
}

function arrowGeometry(a: Rect, b: Rect, ar: Pick<Arrow, "shift" | "fromSide" | "toSide" | "along">) {
  const shift = ar.shift ?? 0;
  const ra = visualRect(a);
  const rb = visualRect(b);
  const bc = { x: rb.x + rb.w / 2, y: rb.y + rb.h / 2 };
  const ac = { x: ra.x + ra.w / 2, y: ra.y + ra.h / 2 };
  const p1 = ar.fromSide ? onSide(ra, ar.fromSide, ar.along) : anchor(ra, bc.x, bc.y, shift);
  const p2 = ar.toSide ? onSide(rb, ar.toSide) : anchor(rb, ac.x, ac.y, shift);
  // Shorten slightly so the head sits off the box edge.
  const ang = Math.atan2(p2.y - p1.y, p2.x - p1.x);
  const gap = 4;
  const sx = p1.x + Math.cos(ang) * gap;
  const sy = p1.y + Math.sin(ang) * gap;
  const ex = p2.x - Math.cos(ang) * gap;
  const ey = p2.y - Math.sin(ang) * gap;
  const head = 8;
  const hx1 = ex - Math.cos(ang - 0.45) * head;
  const hy1 = ey - Math.sin(ang - 0.45) * head;
  const hx2 = ex - Math.cos(ang + 0.45) * head;
  const hy2 = ey - Math.sin(ang + 0.45) * head;
  const mx = (sx + ex) / 2;
  const my = (sy + ey) / 2;
  // Label sits beside the line, on the side away from the perpendicular.
  const nx = -Math.sin(ang);
  const ny = Math.cos(ang);
  return { sx, sy, ex, ey, head: `${ex},${ey} ${hx1},${hy1} ${hx2},${hy2}`, mx, my, nx, ny, ang };
}

/* Glyphs -------------------------------------------------------------- */

function PersonGlyph({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="0" cy="-6" r="5" />
      <path d="M-9 10c0-5 4-8 9-8s9 3 9 8" />
    </g>
  );
}

function DocGlyph({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M-6-9h8l5 5v13h-13z" />
      <path d="M2-9v5h5" />
    </g>
  );
}

function SparkGlyph({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="currentColor">
      <path d="M0-8l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
    </g>
  );
}

/* Diagram ------------------------------------------------------------- */

function Diagram({
  layout,
  state,
  instant,
  className,
}: {
  layout: Layout;
  state: State;
  instant: boolean;
  className?: string;
}) {
  const nodes = layout.nodes[state];
  const [vw, vh] = layout.viewBox;
  const t = instant ? { duration: 0 } : { type: "spring" as const, stiffness: 90, damping: 18 };
  const fade = (i: number) =>
    instant ? { duration: 0 } : { duration: 0.35, delay: 0.55 + i * 0.07 };

  const order: NodeId[] = [
    "agent",
    "arrive",
    "content",
    "records",
    "colleagues",
    "output",
    "copilot",
    "person",
  ];

  return (
    <svg
      viewBox={`0 0 ${vw} ${vh}`}
      className={cn("h-auto w-full text-foreground", className)}
      role="img"
      aria-label={
        state === "today"
          ? "Today: work lands on one person, who pulls from a Copilot window, approved content, systems of record and colleagues, then pastes the result in."
          : "With a process agent: work triggers the agent, which reads approved content and records, drafts and checks, then pushes the exact text to the person to approve. The person commits the result."
      }
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {/* The lane */}
      <line
        x1={vw > vh ? nodes.arrive.x + nodes.arrive.w : vw / 2}
        y1={vw > vh ? nodes.arrive.y + nodes.arrive.h / 2 : nodes.arrive.y + nodes.arrive.h}
        x2={vw > vh ? nodes.output.x : vw / 2}
        y2={vw > vh ? nodes.output.y + nodes.output.h / 2 : nodes.output.y}
        stroke="var(--border)"
        strokeWidth="1"
        strokeDasharray="2 4"
      />

      {/* Arrows, both sets, crossfaded */}
      {(["today", "agent"] as State[]).map((s) =>
        layout.arrows[s].map((ar, i) => {
          const g = arrowGeometry(layout.nodes[s][ar.from], layout.nodes[s][ar.to], ar);
          const active = s === state;
          const colour = ar.signal ? "var(--signal)" : "var(--foreground)";
          const lx = g.mx + g.nx * layout.labelOffset;
          const ly = g.my + g.ny * layout.labelOffset;
          return (
            <motion.g
              key={`${s}-${ar.from}-${ar.to}`}
              initial={false}
              animate={{ opacity: active ? 1 : 0 }}
              transition={active ? fade(i) : { duration: instant ? 0 : 0.2 }}
              style={{ pointerEvents: "none" }}
            >
              <line
                x1={g.sx}
                y1={g.sy}
                x2={g.ex}
                y2={g.ey}
                stroke={colour}
                strokeWidth={ar.signal ? 1.8 : 1.3}
                strokeDasharray={ar.dashed ? "4 4" : undefined}
                opacity={ar.dashed ? 0.7 : 1}
              />
              <polygon points={g.head} fill={colour} />
              {ar.label ? (
                <text
                  x={lx}
                  y={ly}
                  fontSize="11"
                  fill={ar.signal ? "var(--signal)" : "var(--muted-foreground)"}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ paintOrder: "stroke", stroke: "var(--background)", strokeWidth: 4 }}
                >
                  {ar.label}
                </text>
              ) : null}
            </motion.g>
          );
        })
      )}

      {/* Nodes */}
      {order.map((id) => {
        const r = nodes[id];
        const [title, sub] = LABELS[id];
        const isAgent = id === "agent";
        const isPerson = id === "person";
        const isCopilot = id === "copilot";
        const scale = r.scale ?? 1;
        const subText =
          isCopilot && state === "agent" ? "inside the agent" : isPerson && state === "agent" ? "approves, commits" : isPerson ? "the integration" : sub;
        return (
          <motion.g
            key={id}
            initial={false}
            animate={{ x: r.x, y: r.y, scale, opacity: r.hidden ? 0 : 1 }}
            transition={t}
            style={{ transformOrigin: "0px 0px" }}
          >
            <rect
              width={r.w}
              height={r.h}
              fill={isAgent ? "var(--background)" : "var(--card)"}
              stroke={isPerson && state === "agent" ? "var(--signal)" : "var(--foreground)"}
              strokeWidth={isAgent || isPerson ? 1.4 : 1}
              strokeDasharray={isCopilot && state === "agent" ? "3 3" : undefined}
            />
            {isPerson ? (
              <g style={{ color: state === "agent" ? "var(--signal)" : "currentColor" }}>
                <PersonGlyph x={20} y={r.h / 2} />
              </g>
            ) : null}
            {id === "arrive" ? <DocGlyph x={20} y={r.h / 2} /> : null}
            {isCopilot ? <SparkGlyph x={20} y={r.h / 2} /> : null}
            <text
              x={isPerson || id === "arrive" || isCopilot ? 36 : 12}
              y={sub || isPerson ? r.h / 2 - 4 : r.h / 2}
              fontSize={isAgent ? 15 : 13}
              fontWeight={500}
              fill={isPerson && state === "agent" ? "var(--signal)" : "var(--foreground)"}
              dominantBaseline="middle"
            >
              {title}
            </text>
            {subText ? (
              <text
                x={isPerson || id === "arrive" || isCopilot ? 36 : 12}
                y={r.h / 2 + 12}
                fontSize="11"
                fill="var(--muted-foreground)"
                dominantBaseline="middle"
              >
                {subText}
              </text>
            ) : null}
          </motion.g>
        );
      })}
    </svg>
  );
}

/* Controller ---------------------------------------------------------- */

export function ShiftDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: true });
  const reduced = useReducedMotion();
  const [state, setState] = useState<State>("today");
  const [played, setPlayed] = useState(false);

  // Play once, when the reader has seen the "today" state for a beat.
  useEffect(() => {
    if (!inView || played) return;
    const delay = reduced ? 0 : 1600;
    const id = window.setTimeout(() => {
      setState("agent");
      setPlayed(true);
    }, delay);
    return () => window.clearTimeout(id);
  }, [inView, played, reduced]);

  const instant = !!reduced;

  return (
    <div ref={ref}>
      <div className="border border-border bg-background p-3 sm:p-6">
        <Diagram layout={WIDE} state={state} instant={instant} className="hidden md:block" />
        <Diagram layout={NARROW} state={state} instant={instant} className="md:hidden" />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <div role="tablist" aria-label="Diagram state" className="flex text-sm">
          {(
            [
              ["today", "Today"],
              ["agent", "With a process agent"],
            ] as Array<[State, string]>
          ).map(([s, label]) => (
            <button
              key={s}
              type="button"
              role="tab"
              aria-selected={state === s}
              onClick={() => {
                setPlayed(true);
                setState(s);
              }}
              className={cn(
                "border border-border px-3 py-1.5 transition-colors first:border-r-0",
                state === s
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="font-serif text-lg" aria-live="polite">
          {state === "today"
            ? "The person is the integration."
            : "The person is the approver."}
        </p>
      </div>
    </div>
  );
}
