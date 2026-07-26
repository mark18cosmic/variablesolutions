import { cn } from "@/lib/utils";

/**
 * KMSolutions mark — three overlapping mint circles at varying opacity,
 * set inside a dark rounded-square badge. The badge stays dark in both
 * themes so the mark keeps its identity.
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
      <rect x="4" y="4" width="92" height="92" rx="24" fill="#151c23" />
      <circle cx="50" cy="37" r="21" fill="#2EE6A8" />
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
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark size={markSize} />
      <span className="flex flex-col leading-none">
        <span className="text-base font-bold tracking-tight text-foreground sm:text-lg">
          KMSolutions
        </span>
        {tagline && (
          <span className="mt-1.5 text-[0.58rem] font-medium uppercase tracking-[0.16em] text-mint-ink">
            Any problem. One solution.
          </span>
        )}
      </span>
    </span>
  );
}
