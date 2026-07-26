import { Mail, MapPin } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { StartProjectButton } from "@/components/start-project";
import { SectionLabel } from "@/components/section-label";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-[var(--line)] py-32 lg:py-40">
      <div className="dot-grid-mint pointer-events-none absolute inset-0 opacity-60" aria-hidden />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <SectionLabel className="justify-center">Get in touch</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-7 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
            Let&apos;s build the <span className="text-mint">solution</span>{" "}
            your business deserves.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Tell us what you&apos;re trying to solve. We&apos;ll bring the
            strategy, craft and engineering to make it real.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <StartProjectButton variant="solid" size="lg" />
            <Button asChild variant="outline" size="lg">
              <a href="mailto:hello@kmsolutions.mv">Book a consultation</a>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-14 flex flex-col items-center justify-center gap-4 text-sm text-muted sm:flex-row sm:gap-10">
            <a href="mailto:hello@kmsolutions.mv" className="inline-flex items-center gap-2 transition-colors hover:text-mint">
              <Mail size={15} strokeWidth={1.5} />
              hello@kmsolutions.mv
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
