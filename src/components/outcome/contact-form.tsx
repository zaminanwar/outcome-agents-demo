"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT_EMAIL } from "@/lib/outcome";

const labelClass = "text-sm font-medium";
const fieldClass =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm";

export function ContactForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [estate, setEstate] = useState("Microsoft 365");
  const [process, setProcess] = useState("");
  const [volume, setVolume] = useState("");
  const [owner, setOwner] = useState("");
  const [want, setWant] = useState("");

  const [draftSubject, setDraftSubject] = useState("");
  const [draftBody, setDraftBody] = useState("");
  const [showDraft, setShowDraft] = useState(false);
  const [status, setStatus] = useState("");
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const compose = () => {
    const n = name.trim() || "(your name)";
    const c = company.trim() || "(company and role)";
    const p =
      process.trim() ||
      "(describe the process: what starts it, who touches it, where it stalls, what system it ends up in)";
    const v = volume.trim() || "(roughly how many a month)";
    const o = owner.trim() || "(who owns the number today)";
    const w =
      want.trim() || "(what would make a first conversation worth your time)";

    setDraftSubject(
      `Process agent conversation: ${company.trim() ? company.trim() : n}`
    );
    setDraftBody(
      [
        "Hello,",
        "",
        `I'm ${n}, ${c}.`,
        "",
        `Estate: ${estate}`,
        "",
        "The process that hurts:",
        p,
        "",
        `Volume: ${v}`,
        `Owner of the number today: ${o}`,
        "",
        "What I'd want from a first conversation:",
        w,
        "",
        'I understand this would start with qualification against your five gates, and that "not yet" is a possible answer.',
        "",
        "Regards,",
        n,
      ].join("\n")
    );
    setStatus("");
    setShowDraft(true);
    requestAnimationFrame(() => {
      document
        .getElementById("draft-box")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const mailto = `mailto:${encodeURIComponent(CONTACT_EMAIL)}?subject=${encodeURIComponent(draftSubject)}&body=${encodeURIComponent(draftBody)}`;

  const copyDraft = async () => {
    const text = `To: ${CONTACT_EMAIL}\nSubject: ${draftSubject}\n\n${draftBody}`;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setStatus("Copied.");
      } else {
        throw new Error("no clipboard");
      }
    } catch {
      bodyRef.current?.focus();
      bodyRef.current?.select();
      try {
        document.execCommand("copy");
        setStatus("Body copied. Add the subject by hand.");
      } catch {
        setStatus("Copy failed. Select the text and copy it manually.");
      }
    }
  };

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <form
        className="space-y-5"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          compose();
        }}
      >
        <label className="block space-y-1.5">
          <span className={labelClass}>Your name</span>
          <Input
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="block space-y-1.5">
          <span className={labelClass}>Company and role</span>
          <Input
            type="text"
            autoComplete="organization"
            placeholder="e.g. Head of Bids, mid-size insurer"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </label>
        <label className="block space-y-1.5">
          <span className={labelClass}>Your estate</span>
          <select
            value={estate}
            onChange={(e) => setEstate(e.target.value)}
            className={fieldClass}
          >
            <option value="Microsoft 365">Microsoft 365</option>
            <option value="Mostly Microsoft, some other systems">
              Mostly Microsoft, some other systems
            </option>
            <option value="Not Microsoft">Not Microsoft</option>
          </select>
        </label>
        <label className="block space-y-1.5">
          <span className={labelClass}>The process, in a few sentences</span>
          <Textarea
            rows={4}
            placeholder="What starts it, who touches it, where it stalls, what system it ends up in."
            value={process}
            onChange={(e) => setProcess(e.target.value)}
          />
        </label>
        <label className="block space-y-1.5">
          <span className={labelClass}>Roughly how many items a month</span>
          <Input
            type="text"
            placeholder="A number or a range is fine"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          />
        </label>
        <label className="block space-y-1.5">
          <span className={labelClass}>Who owns the number today</span>
          <Input
            type="text"
            placeholder="Role or name"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </label>
        <label className="block space-y-1.5">
          <span className={labelClass}>
            What would make a first conversation worth your time
          </span>
          <Textarea
            rows={3}
            value={want}
            onChange={(e) => setWant(e.target.value)}
          />
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit">Compose email draft</Button>
          <span className="text-sm text-muted-foreground">
            Nothing leaves this page until you send it yourself.
          </span>
        </div>
      </form>

      {showDraft && (
        <div id="draft-box" className="space-y-5">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">Your draft</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Sending to <code>{CONTACT_EMAIL}</code>. Edit anything you like
              before you send.
            </p>
          </div>
          <label className="block space-y-1.5">
            <span className={labelClass}>Subject</span>
            <Input
              type="text"
              value={draftSubject}
              onChange={(e) => setDraftSubject(e.target.value)}
            />
          </label>
          <label className="block space-y-1.5">
            <span className={labelClass}>Body</span>
            <Textarea
              ref={bodyRef}
              rows={16}
              value={draftBody}
              onChange={(e) => setDraftBody(e.target.value)}
            />
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild>
              <a href={mailto}>Open in your mail app</a>
            </Button>
            <Button type="button" variant="outline" onClick={copyDraft}>
              Copy draft
            </Button>
            <span className="text-sm text-muted-foreground">{status}</span>
          </div>
        </div>
      )}
    </div>
  );
}
