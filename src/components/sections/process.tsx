"use client";

import { motion } from "motion/react";
import { Search, PenTool, Hammer, Rocket, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";

const ease = [0.22, 1, 0.36, 1] as const;

type Step = {
  n: string;
  title: string;
  copy: string;
  icon: LucideIcon;
  tone: string;
};

const steps: Step[] = [
  {
    n: "01",
    title: "Discover",
    copy: "We listen, map how you work today and agree exactly what success looks like.",
    icon: Search,
    tone: "bg-mint text-[#0b1310]",
  },
  {
    n: "02",
    title: "Design",
    copy: "Screens and structure drawn with intent — clear, considered and shaped around your team.",
    icon: PenTool,
    tone: "bg-blue text-white",
  },
  {
    n: "03",
    title: "Build",
    copy: "Engineered in-house, tested as we go, delivered on the schedule we promised.",
    icon: Hammer,
    tone: "bg-mint text-[#0b1310]",
  },
  {
    n: "04",
    title: "Launch",
    copy: "We ship it, measure it and stay on afterwards — improving as you grow.",
    icon: Rocket,
    tone: "bg-blue text-white",
  },
];

export function Process() {
  return (
    <section
      id="process"
      className="relative flex min-h-screen items-center border-t border-[var(--line)] px-5 py-24 sm:px-6 lg:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        <Reveal className="max-w-2xl">
          <SectionLabel>How we work</SectionLabel>
          <h2 className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            A clear, unhurried process.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            No mystery, no disappearing for months. You&apos;ll always know
            which stage we&apos;re in and what comes next.
          </p>
        </Reveal>

        <div className="relative mt-14">
          {/* connecting line, drawn in as the section arrives */}
          <motion.div
            className="absolute left-0 right-0 top-6 hidden h-px origin-left bg-[var(--line-strong)] lg:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease }}
            aria-hidden
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease, delay: 0.15 + i * 0.12 }}
                className="group relative"
              >
                <div className="relative mb-6 flex items-center gap-3">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-105 ${s.tone}`}
                  >
                    <s.icon size={19} strokeWidth={2} />
                  </span>
                  <span className="text-xs font-semibold tracking-[0.1em] text-muted/70">
                    {s.n}
                  </span>
                </div>
                <h3 className="mb-2.5 text-xl font-bold tracking-tight text-foreground">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{s.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
