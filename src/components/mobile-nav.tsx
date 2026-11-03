"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuIcon } from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CTA, NAV } from "@/lib/content";

/** Slide-over nav below the xl breakpoint; the desktop nav is `hidden xl:flex`. */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="xl:hidden" aria-label="Open menu">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
          <SheetDescription className="sr-only">Site navigation</SheetDescription>
        </SheetHeader>
        <nav aria-label="Sections" className="flex flex-col gap-1 px-2">
          {NAV.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              size="lg"
              asChild
              className="justify-start text-base text-muted-foreground"
            >
              <Link href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            </Button>
          ))}
          <Button size="lg" asChild className="mt-3 justify-center">
            <Link href={CTA.href} onClick={() => setOpen(false)}>
              {CTA.label}
            </Link>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
