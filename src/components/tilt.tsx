"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

/**
 * A card that leans toward the pointer in real 3D — `preserve-3d`
 * plus a rotateX/rotateY pair, so anything inside marked with a
 * translateZ genuinely stands off the surface.
 *
 * The pointer position is written straight to motion values (never to
 * React state) so a move costs one style write and no re-render, and
 * the same values drive the CSS spotlight through custom properties.
 */
export function Tilt({
  children,
  className,
  intensity = 9,
  glare = true,
}: {
  children: React.ReactNode;
  className?: string;
  /** Maximum lean in degrees at the corners. */
  intensity?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const spring = { stiffness: 220, damping: 26, mass: 0.5 };
  const rotateX = useSpring(useTransform(py, [0, 1], [intensity, -intensity]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-intensity, intensity]), spring);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || reduce) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    px.set(x);
    py.set(y);
    if (glare) {
      el.style.setProperty("--spot-x", `${x * 100}%`);
      el.style.setProperty("--spot-y", `${y * 100}%`);
    }
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  if (reduce) {
    return <div className={cn("h-full w-full", className)}>{children}</div>;
  }

  return (
    <div className="persp h-full w-full">
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX, rotateY }}
        whileHover={{ scale: 1.015 }}
        transition={{ type: "spring", ...spring }}
        className={cn("preserve-3d h-full", glare && "spotlight", className)}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Lifts its children off a tilted surface. */
export function Layer({
  z = 40,
  className,
  children,
}: {
  z?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ transform: `translateZ(${z}px)` }} className={cn(className)}>
      {children}
    </div>
  );
}
