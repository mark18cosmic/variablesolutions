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

const marquee = [
  "HR Systems",
  "Point of Sale",
  "Marketing",
  "Websites",
  "Apps",
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
    const controls = animate(0, to, {
      duration: reduce ? 0 : 1.4,
      ease,
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* decorative corner accents — flat line art, no gradients */

function WavyCorner({ stroke }: { stroke: string }) {
  return (
    <svg
      className="pointer-events-none absolute -right-4 -top-4 h-28 w-28 opacity-70"
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden
    >
      {[20, 34, 48, 62].map((y) => (
        <path
          key={y}
          d={`M0 ${y} Q 15 ${y - 12}, 30 ${y} T 60 ${y} T 90 ${y}`}
          stroke={stroke}
          strokeWidth="1.4"
        />
      ))}
    </svg>
  );
}

function ArcCorner({ stroke }: { stroke: string }) {
  return (
    <svg
      className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 opacity-70"
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden
    >
      <circle cx="100" cy="100" r="30" stroke={stroke} strokeWidth="1.4" />
      <circle cx="100" cy="100" r="48" stroke={stroke} strokeWidth="1.4" />
      <circle cx="100" cy="100" r="66" stroke={stroke} strokeWidth="1.4" />
    </svg>
  );
}

function SwirlCorner({ stroke }: { stroke: string }) {
  return (
    <svg
      className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 opacity-70"
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden
    >
      <path
        d="M50 50 C 50 30, 75 30, 75 50 C 75 75, 40 75, 40 45 C 40 15, 85 15, 85 50"
        stroke={stroke}
        strokeWidth="1.6"
      />
    </svg>
  );
}

type Block = {
  label: string;
  value: number;
  suffix: string;
  headline?: string;
  bg: string;
  fg: string;
  muted: string;
  accent: React.ReactNode;
};

const blocks: Block[] = [
  {
    label: "Built in-house",
    value: 100,
    suffix: "%",
    bg: "bg-background-2",
    fg: "text-foreground",
    muted: "text-muted",
    accent: <WavyCorner stroke="rgba(46,230,168,0.5)" />,
  },
  {
    label: "Off-the-shelf templates",
    value: 0,
    suffix: "",
    bg: "bg-mint",
    fg: "text-[#0a0a0a]",
    muted: "text-[#0a0a0a]/60",
    accent: <SwirlCorner stroke="rgba(10,10,10,0.35)" />,
  },
  {
    label: "Company, every layer",
    value: 1,
    suffix: "",
    bg: "bg-blue",
    fg: "text-white",
    muted: "text-white/70",
    accent: <ArcCorner stroke="rgba(255,255,255,0.4)" />,
  },
  {
    label: "Care after launch",
    value: 24,
    suffix: "/7",
    bg: "bg-background",
    fg: "text-foreground",
    muted: "text-muted",
    accent: <WavyCorner stroke="rgba(47,142,240,0.5)" />,
  },
  {
    label: "Maldives-based, working globally",
    value: 0,
    suffix: "",
    headline: "Global reach",
    bg: "bg-off-white",
    fg: "text-[#0a0a0a]",
    muted: "text-[#0a0a0a]/60",
    accent: <ArcCorner stroke="rgba(46,230,168,0.6)" />,
  },
];

export function Studio() {
  return (
    <section
      id="studio"
      className="relative overflow-hidden border-t border-[var(--line)] py-24"
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {blocks.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease, delay: i * 0.08 }}
              className={`relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl p-7 ${b.bg}`}
            >
              {b.accent}
              <span
                className={`relative text-[0.68rem] font-semibold uppercase tracking-[0.24em] ${b.muted}`}
              >
                {b.label}
              </span>
              <div className={`relative text-4xl font-bold tracking-tight sm:text-5xl ${b.fg}`}>
                {b.headline ?? <Counter to={b.value} suffix={b.suffix} />}
              </div>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-16">
          <p className="text-center text-[0.7rem] font-medium uppercase tracking-[0.4em] text-muted/70">
            Everything under one roof
          </p>
        </Reveal>
      </div>

      {/* infinite marquee */}
      <div className="relative mt-10 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <motion.div
          className="flex shrink-0 items-center gap-10 pr-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        >
          {[...marquee, ...marquee].map((m, i) => (
            <span
              key={i}
              className="flex items-center gap-10 whitespace-nowrap text-2xl font-bold tracking-tight text-muted/40 sm:text-3xl"
            >
              {m}
              <span className="text-mint/40">●</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
