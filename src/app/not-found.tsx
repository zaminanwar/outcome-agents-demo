import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pt-24 pb-24 sm:px-6">
        <Badge variant="outline" className="font-mono">404</Badge>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
          Nothing here to approve.
        </h1>
        <p className="mt-4 max-w-md text-lg text-muted-foreground">
          This page does not exist. The whole site is one page; everything is on it.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">
            <ArrowLeftIcon data-icon="inline-start" />
            Back to the page
          </Link>
        </Button>
      </main>
      <SiteFooter />
    </>
  );
}
