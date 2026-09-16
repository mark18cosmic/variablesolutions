import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";

const stats = [
  { value: "100%", label: "Built in-house", copy: "Design and engineering under one roof — no handoffs, no subcontractors." },
  { value: "0", label: "Off-the-shelf templates", copy: "Every project is designed for the business it belongs to." },
  { value: "1", label: "Team, every layer", copy: "The same people from the first call through to launch and after." },
  { value: "24/7", label: "Care after launch", copy: "We stay on once it's live — monitoring, fixes and improvements." },
];

export function Studio() {
  return (
    <section
      id="studio"
      aria-labelledby="studio-heading"
      className="border-b border-[var(--line)] px-5 py-20 sm:px-6 sm:py-24 lg:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        <Reveal className="max-w-2xl">
          <SectionLabel>Why us</SectionLabel>
          <h2
            id="studio-heading"
            className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl"
          >
            Small enough to care, built to deliver.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Based in Malé and working with clients wherever they are.
          </p>
        </Reveal>

        <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-background p-7">
              <dd className="text-3xl font-semibold tracking-tight text-foreground">
                {s.value}
              </dd>
              <dt className="mt-2 text-sm font-medium text-foreground">{s.label}</dt>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.copy}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
