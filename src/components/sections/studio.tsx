"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";

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
      duration: reduce ? 0 : 1.3,
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

/* soft decorative corner accents — thin line art, low contrast */

function WavyCorner({ stroke }: { stroke: string }) {
  return (
    <svg
      className="pointer-events-none absolute -right-3 -top-3 h-24 w-24 opacity-60"
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden
    >
      {[22, 36, 50].map((y) => (
        <path
          key={y}
          d={`M0 ${y} Q 15 ${y - 11}, 30 ${y} T 60 ${y} T 90 ${y}`}
          stroke={stroke}
          strokeWidth="1.2"
        />
      ))}
    </svg>
  );
}

function ArcCorner({ stroke }: { stroke: string }) {
  return (
    <svg
      className="pointer-events-none absolute -bottom-6 -right-6 h-28 w-28 opacity-60"
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden
    >
      <circle cx="100" cy="100" r="32" stroke={stroke} strokeWidth="1.2" />
      <circle cx="100" cy="100" r="52" stroke={stroke} strokeWidth="1.2" />
      <circle cx="100" cy="100" r="72" stroke={stroke} strokeWidth="1.2" />
    </svg>
  );
}

function SwirlCorner({ stroke }: { stroke: string }) {
  return (
    <svg
      className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 opacity-60"
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden
    >
      <path
        d="M50 50 C 50 32, 74 32, 74 50 C 74 73, 41 73, 41 46 C 41 18, 84 18, 84 50"
        stroke={stroke}
        strokeWidth="1.4"
      />
    </svg>
  );
}

type Block = {
  label: string;
  value: number;
  suffix: string;
  headline?: string;
  surface: string;
  fg: string;
  muted: string;
  accent: React.ReactNode;
};

const blocks: Block[] = [
  {
    label: "Built in-house",
    value: 100,
    suffix: "%",
    surface: "bg-background-2 border border-[var(--line)]",
    fg: "text-foreground",
    muted: "text-muted",
    accent: <WavyCorner stroke="rgba(46,230,168,0.4)" />,
  },
  {
    label: "Off-the-shelf templates",
    value: 0,
    suffix: "",
    surface: "bg-mint",
    fg: "text-[#0b1310]",
    muted: "text-[#0b1310]/65",
    accent: <SwirlCorner stroke="rgba(11,19,16,0.3)" />,
  },
  {
    label: "Team, every layer",
    value: 1,
    suffix: "",
    surface: "bg-blue",
    fg: "text-white",
    muted: "text-white/75",
    accent: <ArcCorner stroke="rgba(255,255,255,0.38)" />,
  },
  {
    label: "Care after launch",
    value: 24,
    suffix: "/7",
    surface: "bg-background-3 border border-[var(--line)]",
    fg: "text-foreground",
    muted: "text-muted",
    accent: <WavyCorner stroke="rgba(47,142,240,0.4)" />,
  },
  {
    label: "Maldives-based, working globally",
    value: 0,
    suffix: "",
    headline: "Global reach",
    surface: "bg-contrast-surface",
    fg: "text-contrast-ink",
    muted: "text-contrast-ink/65",
    accent: <ArcCorner stroke="rgba(46,230,168,0.5)" />,
  },
];

export function Studio() {
  return (
    <section
      id="studio"
      aria-labelledby="studio-heading"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden border-t border-[var(--line)] py-24"
    >
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel className="justify-center">Why us</SectionLabel>
          <h2
            id="studio-heading"
            className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Small enough to care, built to deliver.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {blocks.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease, delay: i * 0.07 }}
              className={`card-soft relative flex min-h-[190px] flex-col justify-between overflow-hidden rounded-2xl p-6 ${b.surface}`}
          >
              {b.accent}
              <span
                className={`relative text-xs font-semibold uppercase tracking-[0.1em] ${b.muted}`}
            >
                {b.label}
              </span>
              <div
                className={`relative text-3xl font-bold tracking-tight sm:text-4xl ${b.fg}`}
            >
                {b.headline ?? <Counter to={b.value} suffix={b.suffix} />}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* everything-under-one-roof marquee */}
      <div className="mt-14">
        <Reveal>
          <p className="text-center text-[0.7rem] font-medium uppercase tracking-[0.14em] text-muted/80">
            Everything under one roof
          </p>
        </Reveal>

        <div className="relative mt-6 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <motion.div
            className="flex shrink-0 items-center gap-8 pr-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
          >
            {[...marquee, ...marquee].map((m, i) => (
              <span
                key={i}
                className="flex items-center gap-8 whitespace-nowrap text-xl font-bold tracking-tight text-muted/55 sm:text-2xl"
            >
                {m}
                <span className="h-1.5 w-1.5 rounded-full bg-mint/40" />
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
