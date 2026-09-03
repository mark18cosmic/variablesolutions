import { cn } from "@/lib/utils";

type Blob = {
  className: string;
  color: string;
  delay?: string;
};

/**
 * The ambient colour wash that sits behind every section.
 *
 * Pure CSS: three blurred radials that only translate and scale, so
 * the whole thing lives on the compositor and costs nothing to
 * animate. It doubles as the fallback whenever the WebGL hero is
 * gated off, which is why it renders on the server with no JS at all.
 */
export function Aurora({
  blobs,
  className,
}: {
  blobs: Blob[];
  className?: string;
}) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      {blobs.map((b, i) => (
        <div
          key={i}
          className={cn("aurora-blob", b.className)}
          style={{ background: b.color, animationDelay: b.delay }}
        />
      ))}
    </div>
  );
}

/** Radial helper so callers don't repeat the gradient boilerplate. */
export const wash = (token: string, alpha = 0.55) =>
  `radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--${token}) ${Math.round(
    alpha * 100
  )}%, transparent), transparent 70%)`;
