"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  animate,
  useReducedMotion,
} from "motion/react";
import { Reveal } from "@/components/reveal";

const ease = [0.22, 1, 0.36, 1] as const;

const stats = [
  { value: 100, suffix: "%", label: "Built in-house" },
  { value: 0, suffix: "", label: "Off-the-shelf templates" },
  { value: 1, suffix: "", label: "Studio, every layer" },
  { value: 24, suffix: "/7", label: "Care after launch" },
];

const marquee = [
  "HR Systems",
  "Point of Sale",
  "Marketing Platforms",
  "Websites",
  "Mobile Apps",
  "Custom Software",
  "Branding",
  "E-commerce",
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.4,
      ease,
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref} className="text-gold-gradient">
      {val}
      {suffix}
    </span>
  );
}

export function Studio() {
  return (
    <section
      id="studio"
      className="relative overflow-hidden border-t border-[var(--hairline)] py-24"
    >
      <div
        className="engrave-lines pointer-events-none absolute inset-0 opacity-30"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-2 gap-y-12 lg:grid-cols-4"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
              }}
              className="text-center"
            >
              <div className="font-serif text-5xl font-semibold tracking-tight sm:text-6xl">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-3 text-xs font-medium uppercase tracking-[0.28em] text-sage">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <Reveal delay={0.15} className="mt-20">
          <p className="text-center text-[0.7rem] font-medium uppercase tracking-[0.4em] text-sage/70">
            Everything under one roof
          </p>
        </Reveal>
      </div>

      {/* infinite marquee — more play, less museum */}
      <div className="relative mt-10 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <motion.div
          className="flex shrink-0 items-center gap-10 pr-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        >
          {[...marquee, ...marquee].map((m, i) => (
            <span
              key={i}
              className="flex items-center gap-10 whitespace-nowrap font-serif text-2xl italic tracking-tight text-sage-gold/40 sm:text-3xl"
            >
              {m}
              <span className="text-gold-light/30">✦</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
