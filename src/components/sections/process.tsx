import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";

const steps = [
  {
    n: "01",
    title: "Discover",
    copy: "We listen, map your operation and define exactly what success looks like.",
  },
  {
    n: "02",
    title: "Design",
    copy: "Interfaces and architecture drawn with intent — clean, considered, yours.",
  },
  {
    n: "03",
    title: "Build",
    copy: "Engineered in-house with rigor, tested continuously, delivered on schedule.",
  },
  {
    n: "04",
    title: "Launch",
    copy: "We ship, measure and stay on — refining as your business grows.",
  },
];

export function Process() {
  return (
    <section id="process" className="relative border-t border-[var(--hairline)] py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <SectionLabel>How we work</SectionLabel>
          <h2 className="mt-6 font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            A precise, unhurried process.
          </h2>
        </Reveal>

        <div className="relative mt-20">
          {/* connecting gold hairline */}
          <div
            className="absolute left-0 right-0 top-[26px] hidden h-px bg-gradient-to-r from-transparent via-[rgba(214,184,92,0.35)] to-transparent lg:block"
            aria-hidden
          />
          <Stagger className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <StaggerItem key={s.n} className="relative">
                <div className="relative mb-7 flex h-[52px] items-center">
                  <span className="flex h-13 w-13 items-center justify-center rounded-full border border-[var(--hairline-strong)] bg-[var(--background)] px-4 py-3 font-serif text-sm font-semibold tracking-widest text-sage-gold">
                    {s.n}
                  </span>
                </div>
                <h3 className="mb-3 font-serif text-2xl font-semibold tracking-tight text-foreground">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-sage">{s.copy}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
