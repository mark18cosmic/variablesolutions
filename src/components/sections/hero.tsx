"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  AnimatePresence,
  type MotionValue,
} from "motion/react";
import { ArrowRight } from "lucide-react";
import { StartProjectButton } from "@/components/start-project";
import { HeroCanvas } from "@/components/three/hero-canvas";
import { Aurora, wash } from "@/components/aurora";
import { Magnetic } from "@/components/magnetic";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const rotating = [
  "HR systems",
  "POS systems",
  "accounting",
  "marketing",
  "websites & apps",
  "custom software",
];

const clients = ["The Edge", "Mahufal", "UnifyGames", "Neut"];

/** Glass chips that orbit the 3D object at different parallax depths. */
const chips = [
  { label: "Payroll", depth: -46, drift: 14, duration: 13, className: "left-[5%] top-[26%]" },
  { label: "Invoicing", depth: 34, drift: -16, duration: 15, className: "right-[6%] top-[22%]" },
  { label: "Point of sale", depth: 50, drift: 18, duration: 17, className: "bottom-[22%] right-[9%]" },
  { label: "Mobile apps", depth: -30, drift: -14, duration: 14, className: "bottom-[26%] left-[8%]" },
];

/** Headline that reveals word by word from behind a mask. */
function WordReveal({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={cn("flex flex-wrap justify-center gap-x-[0.24em]", className)}>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className="overflow-hidden pb-[0.14em]">
          <motion.span
            className="inline-block"
            initial={{ y: "112%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease, delay: delay + i * 0.08 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** A shape that drifts slowly and shifts with the pointer for depth. */
function Floater({
  mx,
  my,
  depth,
  drift,
  duration,
  delay = 0,
  className,
  children,
  reduce,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  depth: number;
  drift: number;
  duration: number;
  delay?: number;
  className?: string;
  children: React.ReactNode;
  reduce: boolean;
}) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);

  if (reduce) {
    return <div className={cn("absolute", className)}>{children}</div>;
  }

  return (
    <motion.div style={{ x, y }} className={cn("absolute", className)}>
      <motion.div
        animate={{ y: [0, drift, 0] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = !!useReducedMotion();
  const [idx, setIdx] = useState(0);

  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, { stiffness: 45, damping: 24 });
  const my = useSpring(myRaw, { stiffness: 45, damping: 24 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      mxRaw.set(e.clientX / window.innerWidth - 0.5);
      myRaw.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mxRaw, myRaw, reduce]);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % rotating.length), 2600);
    return () => clearInterval(t);
  }, [reduce]);

  const shape = { mx, my, reduce };

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 pb-20 pt-28 sm:px-6 sm:pt-32"
    >
      <Aurora
        blobs={[
          { className: "-left-[12%] top-[6%] h-[38rem] w-[38rem]", color: wash("mint", 0.5) },
          { className: "-right-[10%] top-[18%] h-[34rem] w-[34rem]", color: wash("violet", 0.5), delay: "-7s" },
          { className: "bottom-[-14%] left-[28%] h-[30rem] w-[30rem]", color: wash("blue", 0.45), delay: "-13s" },
        ]}
      />

      {/* perspective floor */}
      <div
        className="grid-floor pointer-events-none absolute inset-x-0 bottom-0 h-[42vh] opacity-[0.35]"
        aria-hidden
      />

      {/* the 3D object, behind the type and never taking pointer events */}
      <motion.div
        style={reduce ? undefined : { scale: sceneScale }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <HeroCanvas className="h-[min(70vh,38rem)] w-[min(88vw,38rem)] -translate-y-[7%]" />
      </motion.div>

      {/* A scrim between the object and the type. Without it the rim
          highlights cut through the headline at certain rotations. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(closest-side at 50% 44%, var(--background) 26%, transparent 72%)",
          opacity: 0.6,
        }}
        aria-hidden
      />

      {/* orbiting glass chips */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
        {chips.map((c, i) => (
          <Floater key={c.label} {...shape} {...c} delay={i * 0.6}>
            <motion.span
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease, delay: 1.2 + i * 0.12 }}
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-muted-strong"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-mint" />
              {c.label}
            </motion.span>
          </Floater>
        ))}
      </div>

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="glass mb-7 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-muted-strong"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
          </span>
          Full-service software company · Maldives
        </motion.p>

        <h1 className="text-[2.7rem] font-bold leading-[1.06] tracking-tight text-foreground sm:text-6xl lg:text-[5.2rem]">
          <WordReveal text="Any problem." delay={0.2} />
          <WordReveal text="One solution." delay={0.4} className="text-gradient" />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.7 }}
          className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
        >
          We design and build the software your business runs on — HR, point of
          sale, marketing, websites, apps and anything custom in between.
        </motion.p>

        {/* gentle service ticker */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.85 }}
          className="mt-6 flex items-center justify-center gap-x-2 text-base font-medium sm:text-lg"
        >
          <span className="text-muted">Today, that means</span>
          <span className="relative inline-block h-[1.5em] w-[9.5rem] leading-[1.5em] sm:w-[11rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease }}
                className="absolute inset-0 whitespace-nowrap text-left font-semibold leading-[1.5em] text-mint-ink"
              >
                {rotating[idx]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 1 }}
          className="mt-10 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row"
        >
          <Magnetic className="w-full sm:w-auto">
            <StartProjectButton variant="solid" size="lg" className="w-full sm:w-auto" />
          </Magnetic>
          <a
            href="#services"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors duration-300 hover:text-mint-ink"
          >
            See what we build
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </motion.div>

        {/* trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease, delay: 1.2 }}
          className="mt-14 flex flex-col items-center gap-3.5"
        >
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.14em] text-muted/80">
            Trusted by
          </span>
          <div className="glass flex flex-wrap items-center justify-center gap-x-7 gap-y-2 rounded-2xl px-6 py-3">
            {clients.map((c) => (
              <span
                key={c}
                className="text-sm font-semibold tracking-tight text-muted-strong transition-colors duration-300 hover:text-foreground"
              >
                {c}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.a
        href="#services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.9 }}
        aria-label="Scroll to services"
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 sm:block"
      >
        <div className="flex h-9 w-6 items-start justify-center rounded-full border border-[var(--line-strong)] p-1.5">
          <motion.div
            className="h-1.5 w-1 rounded-full bg-mint"
            animate={reduce ? undefined : { y: [0, 7, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.a>
    </section>
  );
}
