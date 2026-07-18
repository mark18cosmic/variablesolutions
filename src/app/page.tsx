import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Proof } from "@/components/sections/proof";
import { Process } from "@/components/sections/process";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <Services />
        <Proof />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
