import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";

const steps = [
  {
    n: "01",
    title: "Discover",
    copy: "We listen, map your operation and define exactly what success looks like.",
    color: "bg-mint text-[#0a0a0a]",
  },
  {
    n: "02",
    title: "Design",
    copy: "Interfaces and architecture drawn with intent — clean, considered, yours.",
    color: "bg-blue text-white",
  },
  {
    n: "03",
    title: "Build",
    copy: "Engineered in-house with rigor, tested continuously, delivered on schedule.",
    color: "bg-mint text-[#0a0a0a]",
  },
  {
    n: "04",
    title: "Launch",
    copy: "We ship, measure and stay on — refining as your business grows.",
    color: "bg-blue text-white",
  },
];

export function Process() {
  return (
    <section id="process" className="relative border-t border-[var(--line)] py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <SectionLabel>How we work</SectionLabel>
          <h2 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            A precise, unhurried process.
          </h2>
        </Reveal>

        <div className="relative mt-20">
          <div
            className="absolute left-0 right-0 top-[26px] hidden h-px bg-[var(--line-strong)] lg:block"
            aria-hidden
          />
          <Stagger className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <StaggerItem key={s.n} className="relative">
                <div className="relative mb-7 flex h-[52px] items-center">
                  <span
                    className={`flex h-13 w-13 items-center justify-center rounded-full px-4 py-3 text-sm font-bold tracking-widest ${s.color}`}
                  >
                    {s.n}
                  </span>
                </div>
                <h3 className="mb-3 text-2xl font-bold tracking-tight text-foreground">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{s.copy}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
