import { Mail, MapPin, Clock } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { StartProjectButton } from "@/components/start-project";
import { SectionLabel } from "@/components/section-label";
import { Aurora, wash } from "@/components/aurora";
import { Magnetic } from "@/components/magnetic";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative flex min-h-screen items-center overflow-hidden border-t border-[var(--line)] px-5 py-24 sm:px-6"
    >
      <Aurora
        blobs={[
          { className: "-left-[8%] top-[12%] h-[34rem] w-[34rem]", color: wash("mint", 0.45) },
          { className: "-right-[8%] bottom-[10%] h-[34rem] w-[34rem]", color: wash("violet", 0.45), delay: "-9s" },
        ]}
      />

      {/* perspective floor, echoing the hero so the page closes as it opened */}
      <div
        className="grid-floor pointer-events-none absolute inset-x-0 bottom-0 h-[34vh] opacity-25"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-3xl text-center">
        <Reveal>
          <SectionLabel className="justify-center">Get in touch</SectionLabel>
        </Reveal>
        <Reveal delay={0.08}>
          <h2
            id="contact-heading"
            className="mt-5 text-3xl font-bold leading-[1.12] tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
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
            <Magnetic className="w-full sm:w-auto">
              <StartProjectButton variant="solid" size="lg" className="w-full sm:w-auto" />
            </Magnetic>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <a href="mailto:hello@kmsolutions.mv">Email us instead</a>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="glass mx-auto mt-12 flex w-fit flex-col items-center justify-center gap-4 rounded-2xl px-6 py-4 text-sm text-muted sm:flex-row sm:gap-8">
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
