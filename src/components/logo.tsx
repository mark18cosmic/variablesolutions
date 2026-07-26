import { cn } from "@/lib/utils";

/**
 * KMSolutions mark — three overlapping mint circles at varying opacity,
 * set inside a dark rounded-square badge.
 */
export function LogoMark({
  className,
  size = 44,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-label="KMSolutions"
      role="img"
    >
      <rect x="4" y="4" width="92" height="92" rx="22" fill="#12181F" />
      <circle cx="50" cy="37" r="21" fill="#2EE6A8" opacity="1" />
      <circle cx="39" cy="61" r="21" fill="#2EE6A8" opacity="0.55" />
      <circle cx="61" cy="61" r="21" fill="#2EE6A8" opacity="0.8" />
    </svg>
  );
}

export function Wordmark({
  className,
  markSize = 40,
  tagline = false,
}: {
  className?: string;
  markSize?: number;
  tagline?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark size={markSize} />
      <span className="flex flex-col leading-none">
        <span className="text-lg font-bold tracking-tight text-foreground">
          KMSolutions
        </span>
        {tagline && (
          <span className="mt-1.5 text-[0.6rem] font-medium tracking-[0.28em] text-mint">
            ANY PROBLEM. ONE SOLUTION.
          </span>
        )}
      </span>
    </span>
  );
}
