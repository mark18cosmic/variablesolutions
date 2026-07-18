import { Reveal, Stagger, StaggerItem } from "@/components/reveal";

const stats = [
  { value: "60+", label: "Products shipped" },
  { value: "8", label: "Industries served" },
  { value: "100%", label: "Built in-house" },
  { value: "24/7", label: "Support & care" },
];

const clients = [
  "Resorts",
  "Retail",
  "Hospitality",
  "Fintech",
  "Logistics",
  "Government",
];

export function Proof() {
  return (
    <section id="proof" className="relative border-t border-[var(--hairline)] py-24">
      <div className="engrave-lines pointer-events-none absolute inset-0 opacity-30" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Stagger className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem key={s.label} className="text-center">
              <div className="font-serif text-5xl font-semibold tracking-tight text-gold-gradient sm:text-6xl">
                {s.value}
              </div>
              <div className="mt-3 text-xs font-medium uppercase tracking-[0.28em] text-sage">
                {s.label}
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.15} className="mt-20">
          <p className="text-center text-[0.7rem] font-medium uppercase tracking-[0.4em] text-sage/70">
            Trusted across
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {clients.map((c) => (
              <span
                key={c}
                className="text-lg font-medium tracking-[0.15em] text-sage-gold/55 transition-colors duration-500 hover:text-sage-gold"
              >
                {c}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
