"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Loads the WebGL hero object only when it is genuinely worth it.
 *
 * Three gates, cheapest first:
 *   1. capability — reduced motion, small screens, thin CPUs and
 *      machines without WebGL never download or run the scene;
 *   2. proximity — the bundle is fetched when the hero is near the
 *      viewport, not on first paint, so it never blocks LCP;
 *   3. visibility — once mounted the render loop is driven by an
 *      IntersectionObserver and the page visibility API, so scrolling
 *      past the hero or switching tabs drops it to zero GPU work.
 *
 * Every path that fails a gate falls back to the CSS aurora already
 * behind it, so the hero is never empty.
 */

const OrbScene = dynamic(() => import("./orb-scene"), { ssr: false });

function canRender() {
  if (typeof window === "undefined") return false;
  if (window.innerWidth < 768) return false;
  if ((navigator.hardwareConcurrency ?? 8) < 4) return false;
  if ((navigator as { deviceMemory?: number }).deviceMemory !== undefined) {
    if ((navigator as { deviceMemory?: number }).deviceMemory! < 4) return false;
  }
  if (window.matchMedia("(prefers-reduced-data: reduce)").matches) return false;

  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

export function HeroCanvas({ className }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const onScreen = useRef(false);

  useEffect(() => {
    if (reduce || !canRender()) return;
    const el = host.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen.current = entry.isIntersecting;
        if (entry.isIntersecting) setMounted(true);
        setActive(entry.isIntersecting && !document.hidden);
      },
      // A little margin so the scene is warm by the time it's seen.
      { rootMargin: "200px" }
    );
    io.observe(el);

    const onVisibility = () => setActive(onScreen.current && !document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduce]);

  return (
    <div ref={host} className={cn("pointer-events-none", className)} aria-hidden>
      {mounted && <OrbScene active={active} />}
    </div>
  );
}
