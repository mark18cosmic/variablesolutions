"use client";

import { motion } from "motion/react";
import { StartProjectButton } from "@/components/start-project";

const ease = [0.22, 1, 0.36, 1] as const;

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background"
    >
      {/* flat geometric backdrop — echoes the logo mark, zero gradients */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-mint/[0.07]" />
        <div className="absolute -right-16 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-blue/[0.08]" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-mint/[0.05]" />
        <div className="dot-grid absolute inset-0 opacity-40" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-mint/25" aria-hidden />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          className="mb-7 text-[0.7rem] font-medium uppercase tracking-[0.42em] text-mint"
        >
          Full-Service Software · Maldives
        </motion.p>

        <h1 className="text-5xl font-bold leading-[1.02] tracking-tight text-foreground sm:text-6xl md:text-7xl">
          <Line delay={0.25}>Any problem.</Line>
          <Line delay={0.4}>
            <span className="text-mint">One solution.</span>
          </Line>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.6 }}
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted-strong sm:text-lg"
        >
          HR management · POS systems · marketing · websites · apps · custom
          software — every layer of your digital business, built under one roof.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.75 }}
          className="mt-11"
        >
          <StartProjectButton variant="solid" size="lg" />
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-[var(--line-strong)] p-1.5">
          <motion.div
            className="h-2 w-1 rounded-full bg-mint"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
