"use client";

import { useRef, useState } from "react";
import { CopyIcon, MailIcon, PenLineIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT_EMAIL } from "@/lib/outcome";

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}

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
    <div className="grid items-start gap-6 lg:grid-cols-2">
      <Card>
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            compose();
          }}
        >
          <CardHeader className="border-b">
            <CardTitle>About the process</CardTitle>
            <CardDescription>
              Rough answers are fine. Everything is editable in the draft.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 pt-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="name" label="Your name">
                <Input
                  id="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Field>
              <Field id="company" label="Company and role">
                <Input
                  id="company"
                  autoComplete="organization"
                  placeholder="e.g. Head of Bids, mid-size insurer"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </Field>
            </div>
            <Field id="estate" label="Your estate">
              <NativeSelect
                id="estate"
                value={estate}
                onChange={(e) => setEstate(e.target.value)}
              >
                <NativeSelectOption value="Microsoft 365">Microsoft 365</NativeSelectOption>
                <NativeSelectOption value="Mostly Microsoft, some other systems">
                  Mostly Microsoft, some other systems
                </NativeSelectOption>
                <NativeSelectOption value="Not Microsoft">Not Microsoft</NativeSelectOption>
              </NativeSelect>
            </Field>
            <Field id="process" label="The process, in a few sentences">
              <Textarea
                id="process"
                rows={4}
                placeholder="What starts it, who touches it, where it stalls, what system it ends up in."
                value={process}
                onChange={(e) => setProcess(e.target.value)}
              />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="volume" label="Roughly how many items a month">
                <Input
                  id="volume"
                  placeholder="A number or a range is fine"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                />
              </Field>
              <Field id="owner" label="Who owns the number today">
                <Input
                  id="owner"
                  placeholder="Role or name"
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                />
              </Field>
            </div>
            <Field id="want" label="What would make a first conversation worth your time">
              <Textarea
                id="want"
                rows={3}
                value={want}
                onChange={(e) => setWant(e.target.value)}
              />
            </Field>
          </CardContent>
          <CardFooter className="flex-wrap gap-3">
            <Button type="submit">
              <PenLineIcon data-icon="inline-start" />
              Compose email draft
            </Button>
            <span className="text-xs text-muted-foreground">
              Nothing leaves this page until you send it yourself.
            </span>
          </CardFooter>
        </form>
      </Card>

      {showDraft ? (
        <Card id="draft-box" className="scroll-mt-20">
          <CardHeader className="border-b">
            <CardTitle>Your draft</CardTitle>
            <CardDescription>
              To <span className="font-mono text-foreground">{CONTACT_EMAIL}</span>. Edit
              anything you like before you send.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 pt-5">
            <Field id="subject" label="Subject">
              <Input
                id="subject"
                value={draftSubject}
                onChange={(e) => setDraftSubject(e.target.value)}
              />
            </Field>
            <Field id="body" label="Body">
              <Textarea
                id="body"
                ref={bodyRef}
                rows={16}
                className="font-mono text-xs leading-relaxed"
                value={draftBody}
                onChange={(e) => setDraftBody(e.target.value)}
              />
            </Field>
          </CardContent>
          <CardFooter className="flex-wrap gap-3">
            <Button asChild>
              <a href={mailto}>
                <MailIcon data-icon="inline-start" />
                Open in your mail app
              </a>
            </Button>
            <Button type="button" variant="outline" onClick={copyDraft}>
              <CopyIcon data-icon="inline-start" />
              Copy draft
            </Button>
            <span className="text-xs text-muted-foreground" aria-live="polite">
              {status}
            </span>
          </CardFooter>
        </Card>
      ) : (
        <div className="hidden rounded-xl border border-dashed p-8 text-sm text-muted-foreground lg:block">
          <p className="font-medium text-foreground">What happens when you press compose</p>
          <ol className="mt-3 list-decimal space-y-2 pl-5">
            <li>A plain-text email is drafted from your answers, here, in the browser.</li>
            <li>You read it and change anything you like.</li>
            <li>You open it in your own mail app, or copy it. This page sends nothing.</li>
          </ol>
        </div>
      )}
    </div>
  );
}
