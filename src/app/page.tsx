import { Contact } from "@/components/sections/contact";
import { Example } from "@/components/sections/example";
import { Fit } from "@/components/sections/fit";
import { Gap } from "@/components/sections/gap";
import { Get } from "@/components/sections/get";
import { Hero } from "@/components/sections/hero";
import { How } from "@/components/sections/how";
import { Shift } from "@/components/sections/shift";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Shift />
        <Gap />
        <Example />
        <Get />
        <How />
        <Fit />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
