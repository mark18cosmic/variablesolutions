"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/logo";

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
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--background)]"
    >
      {/* engraved currency backdrop */}
      <div className="guilloche absolute inset-0 opacity-90" aria-hidden />
      <div className="engrave-lines absolute inset-0 opacity-60" aria-hidden />
      <div className="hero-vignette absolute inset-0" aria-hidden />
      {/* faint diamond outline, banknote seal */}
      <div
        className="absolute left-1/2 top-[42%] -z-0 hidden -translate-x-1/2 -translate-y-1/2 md:block"
        aria-hidden
      >
        <div className="h-[560px] w-[560px] rotate-45 rounded-[64px] border border-[rgba(214,184,92,0.10)]" />
        <div className="absolute inset-8 rotate-45 rounded-[52px] border border-[rgba(214,184,92,0.06)]" />
      </div>

      {/* top gold hairline glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(214,184,92,0.4)] to-transparent" aria-hidden />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease, delay: 0.1 }}
          className="mb-9"
        >
          <LogoMark size={78} className="drop-shadow-[0_10px_40px_rgba(246,226,122,0.18)]" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.25 }}
          className="mb-7 text-[0.7rem] font-medium uppercase tracking-[0.42em] text-sage-gold/80"
        >
          Bespoke Software · Maldives
        </motion.p>

        <h1 className="font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-foreground sm:text-6xl md:text-7xl">
          <Line delay={0.35}>Any problem.</Line>
          <Line delay={0.48}>
            <span className="text-gold-gradient italic">One solution.</span>
          </Line>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.7 }}
          className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-sage sm:text-lg"
        >
          From HR and point-of-sale to marketing platforms, websites and mobile
          apps — we design and build every layer of your digital business under
          one roof.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.85 }}
          className="mt-11 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button asChild variant="outline" size="lg">
            <a href="#contact">
              Start a project
              <ArrowRight size={18} className="transition-transform duration-500 group-hover:translate-x-1" />
            </a>
          </Button>
          <a
            href="#services"
            className="text-sm font-medium tracking-wide text-sage transition-colors duration-300 hover:text-sage-gold"
          >
            Explore what we build →
          </a>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-[var(--hairline-strong)] p-1.5">
          <motion.div
            className="h-2 w-1 rounded-full bg-gold-gradient"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
