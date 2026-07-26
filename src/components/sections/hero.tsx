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
import { StartProjectButton } from "@/components/start-project";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const rotating = [
  "HR systems",
  "POS systems",
  "marketing",
  "websites & apps",
  "custom software",
];

const clients = ["The Edge", "UnifyGames", "Neut"];

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

/** A soft shape that drifts slowly and shifts a little with the pointer. */
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

/** The logo motif, enlarged and breathing gently behind the headline. */
function BreathingMark({ reduce }: { reduce: boolean }) {
  const circles = [
    { color: "bg-mint", opacity: 0.9, cx: 0, cy: -80 },
    { color: "bg-mint", opacity: 0.5, cx: -88, cy: 55 },
    { color: "bg-blue", opacity: 0.45, cx: 88, cy: 55 },
  ];

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 opacity-[0.07]"
      aria-hidden
    >
      <div className="relative h-[340px] w-[340px] sm:h-[440px] sm:w-[440px]">
        {circles.map((c, i) => (
          <motion.div
            key={i}
            className={cn(
              "absolute left-1/2 top-1/2 h-[240px] w-[240px] rounded-full sm:h-[300px] sm:w-[300px]",
              c.color
            )}
            style={{ opacity: c.opacity }}
            animate={
              reduce
                ? { x: c.cx - 120, y: c.cy - 120 }
                : {
                    x: [c.cx - 120, c.cx - 120 + (i === 1 ? -22 : 22), c.cx - 120],
                    y: [c.cy - 120, c.cy - 120 + (i === 0 ? -20 : 20), c.cy - 120],
                    scale: [1, 1.05, 1],
                  }
            }
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.1,
            }}
          />
        ))}
      </div>
    </div>
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
      <BreathingMark reduce={reduce} />

      {/* a few calm shapes — soft, sparse, never neon */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Floater {...shape} depth={-38} drift={16} duration={13} className="left-[6%] top-[22%] hidden lg:block">
          <div className="h-32 w-32 rounded-full border border-mint/20" />
        </Floater>
        <Floater {...shape} depth={30} drift={-14} duration={15} delay={1} className="right-[8%] top-[20%] hidden lg:block">
          <div className="h-20 w-20 rounded-full bg-mint/15" />
        </Floater>
        <Floater {...shape} depth={44} drift={18} duration={17} delay={2} className="bottom-[18%] right-[12%] hidden lg:block">
          <div className="h-24 w-24 rounded-full border border-blue/25" />
        </Floater>
        <Floater {...shape} depth={-26} drift={-15} duration={14} delay={0.5} className="bottom-[16%] left-[10%] hidden lg:block">
          <div className="h-12 w-28 rounded-full bg-blue/12" />
        </Floater>
      </div>

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-background-2/60 px-4 py-2 text-xs font-medium text-muted-strong"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-mint" />
          Full-service software company · Maldives
        </motion.p>

        <h1 className="text-[2.6rem] font-bold leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          <WordReveal text="Any problem." delay={0.2} />
          <WordReveal text="One solution." delay={0.4} className="text-mint-ink" />
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
          className="mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
        >
          <StartProjectButton variant="solid" size="lg" className="w-full sm:w-auto" />
          <a
            href="#services"
            className="text-sm font-medium text-muted transition-colors duration-300 hover:text-mint-ink"
          >
            See what we build →
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
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            {clients.map((c) => (
              <span
                key={c}
                className="text-sm font-semibold tracking-tight text-muted-strong"
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
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 sm:block"
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
