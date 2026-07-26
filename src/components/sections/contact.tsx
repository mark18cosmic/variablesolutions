import { Mail, MapPin, Clock } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { StartProjectButton } from "@/components/start-project";
import { SectionLabel } from "@/components/section-label";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative flex min-h-screen items-center overflow-hidden border-t border-[var(--line)] px-5 py-24 sm:px-6"
    >
      {/* soft brand shapes, low contrast */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-16 top-1/4 h-56 w-56 rounded-full bg-mint/[0.06]" />
        <div className="absolute -right-12 bottom-1/4 h-64 w-64 rounded-full bg-blue/[0.06]" />
      </div>

      <div className="relative mx-auto w-full max-w-3xl text-center">
        <Reveal>
          <SectionLabel className="justify-center">Get in touch</SectionLabel>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-5 text-3xl font-bold leading-[1.12] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Let&apos;s build the <span className="text-mint-ink">solution</span>{" "}
            your business deserves.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Tell us what you&apos;re trying to solve. No pitch needed — a few
            lines is plenty, and we read every one.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <StartProjectButton variant="solid" size="lg" className="w-full sm:w-auto" />
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <a href="mailto:hello@kmsolutions.mv">Email us instead</a>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 text-sm text-muted sm:flex-row sm:gap-8">
            <a
              href="mailto:hello@kmsolutions.mv"
              className="inline-flex items-center gap-2 transition-colors hover:text-mint-ink"
            >
              <Mail size={15} strokeWidth={1.8} />
              hello@kmsolutions.mv
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin size={15} strokeWidth={1.8} />
              Malé, Maldives
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock size={15} strokeWidth={1.8} />
              Replies within a day
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
