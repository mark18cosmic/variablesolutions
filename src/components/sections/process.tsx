import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";

const steps = [
  {
    n: "01",
    title: "Discover",
    copy: "We listen, map how you work today and agree exactly what success looks like.",
  },
  {
    n: "02",
    title: "Design",
    copy: "Screens and structure drawn with intent — clear, considered and shaped around your team.",
  },
  {
    n: "03",
    title: "Build",
    copy: "Engineered in-house, tested as we go, delivered on the schedule we promised.",
  },
  {
    n: "04",
    title: "Launch",
    copy: "We ship it, measure it and stay on afterwards — improving as you grow.",
  },
];

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="border-b border-[var(--line)] px-5 py-20 sm:px-6 sm:py-24 lg:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        <Reveal className="max-w-2xl">
          <SectionLabel>How we work</SectionLabel>
          <h2
            id="process-heading"
            className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl"
          >
            A clear, unhurried process.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            No mystery, no disappearing for months. You&apos;ll always know
            which stage we&apos;re in and what comes next.
          </p>
        </Reveal>

        <ol className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="border-t border-[var(--line-strong)] pt-5">
              <span className="text-xs font-medium tracking-wider text-mint-ink">
                {s.n}
              </span>
              <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
