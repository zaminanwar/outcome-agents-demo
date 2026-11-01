import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col">
      <SiteHeader />
      <section className="mx-auto w-full max-w-5xl flex-1 px-5 pt-24 pb-20 sm:px-8">
        <p className="kicker">404 · Page not found</p>
        <h1 className="display mt-6 text-4xl sm:text-5xl">
          Nothing here to approve.
        </h1>
        <p className="lede mt-6 max-w-[48ch]">
          This page does not exist. The whole site is one page; everything is
          on it.
        </p>
        <p className="mt-8 text-sm">
          <Link
            href="/"
            className="underline decoration-foreground underline-offset-4"
          >
            ← Back to the page
          </Link>
        </p>
      </section>
      <SiteFooter />
    </main>
  );
}
