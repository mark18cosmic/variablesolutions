import { ArrowRight, Mail, MapPin } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { SectionLabel } from "@/components/section-label";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-[var(--hairline)] py-32 lg:py-40">
      <div className="guilloche pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[56px] border border-[rgba(214,184,92,0.08)]" aria-hidden />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <SectionLabel className="justify-center">Get in touch</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-7 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
            Let&apos;s build the{" "}
            <span className="text-gold-gradient italic">solution</span> your
            business deserves.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-sage sm:text-lg">
            Tell us what you&apos;re trying to solve. We&apos;ll bring the
            strategy, craft and engineering to make it real.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild variant="solid" size="lg" className="group">
              <a href="mailto:hello@variablesolutions.mv">
                Start a project
                <ArrowRight size={18} className="transition-transform duration-500 group-hover:translate-x-1" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="mailto:hello@variablesolutions.mv">Book a consultation</a>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-14 flex flex-col items-center justify-center gap-4 text-sm text-sage sm:flex-row sm:gap-10">
            <a href="mailto:hello@variablesolutions.mv" className="inline-flex items-center gap-2 transition-colors hover:text-sage-gold">
              <Mail size={15} strokeWidth={1.5} />
              hello@variablesolutions.mv
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin size={15} strokeWidth={1.5} />
              Malé, Republic of Maldives
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
