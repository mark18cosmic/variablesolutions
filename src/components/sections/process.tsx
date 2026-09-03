"use client";

import { motion } from "motion/react";
import { Search, PenTool, Hammer, Rocket, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { Aurora, wash } from "@/components/aurora";

const ease = [0.22, 1, 0.36, 1] as const;

type Step = {
  n: string;
  title: string;
  copy: string;
  icon: LucideIcon;
  tone: string;
  glow: string;
};

const steps: Step[] = [
  {
    n: "01",
    title: "Discover",
    copy: "We listen, map how you work today and agree exactly what success looks like.",
    icon: Search,
    tone: "bg-gradient-to-br from-mint to-[#17d295] text-[#0b1310]",
    glow: "rgba(46,230,168,0.45)",
  },
  {
    n: "02",
    title: "Design",
    copy: "Screens and structure drawn with intent — clear, considered and shaped around your team.",
    icon: PenTool,
    tone: "bg-gradient-to-br from-blue to-violet text-white",
    glow: "rgba(99,102,241,0.45)",
  },
  {
    n: "03",
    title: "Build",
    copy: "Engineered in-house, tested as we go, delivered on the schedule we promised.",
    icon: Hammer,
    tone: "bg-gradient-to-br from-mint to-[#17d295] text-[#0b1310]",
    glow: "rgba(46,230,168,0.45)",
  },
  {
    n: "04",
    title: "Launch",
    copy: "We ship it, measure it and stay on afterwards — improving as you grow.",
    icon: Rocket,
    tone: "bg-gradient-to-br from-blue to-violet text-white",
    glow: "rgba(99,102,241,0.45)",
  },
];

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative flex min-h-screen items-center overflow-hidden border-t border-[var(--line)] px-5 py-24 sm:px-6 lg:px-10"
    >
      <Aurora
        blobs={[
          { className: "left-[2%] bottom-[6%] h-[28rem] w-[28rem]", color: wash("blue", 0.35) },
          { className: "right-[6%] top-[6%] h-[26rem] w-[26rem]", color: wash("mint", 0.32), delay: "-10s" },
        ]}
      />

      <div className="relative mx-auto w-full max-w-7xl">
        <Reveal className="max-w-3xl">
          <SectionLabel>How we work</SectionLabel>
          <h2
            id="process-heading"
            className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            A clear, <span className="text-gradient">unhurried</span> process.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            No mystery, no disappearing for months. You&apos;ll always know
            which stage we&apos;re in and what comes next.
          </p>
        </Reveal>

        <div className="relative mt-14">
          {/* connecting line, drawn in as the section arrives */}
          <motion.div
            className="absolute left-0 right-0 top-6 hidden h-px origin-left bg-gradient-to-r from-mint via-blue to-violet opacity-70 lg:block"
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
                  <span className="relative flex shrink-0">
                    <span
                      className="absolute inset-0 rounded-full blur-lg transition-opacity duration-500 group-hover:opacity-100 opacity-60"
                      style={{ background: s.glow }}
                      aria-hidden
                    />
                    <span
                      className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-110 ${s.tone}`}
                    >
                      <s.icon size={19} strokeWidth={2} />
                    </span>
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
