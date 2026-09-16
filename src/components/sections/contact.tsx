import { Mail, MapPin, Clock } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { StartProjectButton } from "@/components/start-project";
import { SectionLabel } from "@/components/section-label";
import { Magnetic } from "@/components/magnetic";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="px-5 py-20 sm:px-6 sm:py-28 lg:px-10"
    >
      <div className="mx-auto w-full max-w-2xl text-center">
        <Reveal>
          <SectionLabel className="justify-center">Get in touch</SectionLabel>
          <h2
            id="contact-heading"
            className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl"
          >
            Let&apos;s build the solution your business deserves.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
            Tell us what you&apos;re trying to solve. No pitch needed — a few
            lines is plenty, and we read every one.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Magnetic className="w-full sm:w-auto">
              <StartProjectButton variant="solid" size="lg" className="w-full" />
            </Magnetic>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <a href="mailto:hello@kmsolutions.mv">Email us instead</a>
            </Button>
          </div>

          <div className="mx-auto mt-12 flex flex-col items-center justify-center gap-4 text-sm text-muted sm:flex-row sm:gap-8">
            <a
              href="mailto:hello@kmsolutions.mv"
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
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
