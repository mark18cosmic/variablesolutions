import { cn } from "@/lib/utils";

/**
 * Variable Solutions monogram — gold "VS" on emerald inside a rounded
 * card framed with fine guilloché / banknote-style engraved linework.
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
      aria-label="Variable Solutions monogram"
      role="img"
    >
      <defs>
        <linearGradient id="vsGold" x1="12" y1="10" x2="88" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f6e27a" />
          <stop offset="0.4" stopColor="#e4c163" />
          <stop offset="0.75" stopColor="#b98f2f" />
          <stop offset="1" stopColor="#8a6a1a" />
        </linearGradient>
        <linearGradient id="vsCard" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0d2419" />
          <stop offset="1" stopColor="#04120b" />
        </linearGradient>
        <radialGradient id="vsGlow" cx="50%" cy="38%" r="60%">
          <stop stopColor="#f6e27a" stopOpacity="0.18" />
          <stop offset="1" stopColor="#f6e27a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* card */}
      <rect x="4" y="4" width="92" height="92" rx="20" fill="url(#vsCard)" />
      <rect x="4" y="4" width="92" height="92" rx="20" fill="url(#vsGlow)" />

      {/* outer + inner engraved frame */}
      <rect x="6.5" y="6.5" width="87" height="87" rx="17.5" stroke="url(#vsGold)" strokeWidth="1.4" strokeOpacity="0.9" />
      <rect x="12" y="12" width="76" height="76" rx="13" stroke="url(#vsGold)" strokeWidth="0.7" strokeOpacity="0.5" />

      {/* guilloché engraving — concentric fine lines */}
      <g stroke="url(#vsGold)" strokeOpacity="0.16" strokeWidth="0.5">
        <circle cx="50" cy="50" r="30" />
        <circle cx="50" cy="50" r="34" />
        <circle cx="50" cy="50" r="38" />
      </g>

      {/* VS monogram */}
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-serif-display), Georgia, serif"
        fontWeight={600}
        fontSize="42"
        letterSpacing="-1"
        fill="url(#vsGold)"
      >
        VS
      </text>
    </svg>
  );
}

export function Wordmark({
  className,
  markSize = 40,
  stacked = false,
}: {
  className?: string;
  markSize?: number;
  stacked?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark size={markSize} />
      <span className={cn("flex flex-col leading-none", stacked ? "" : "")}>
        <span className="font-serif text-[0.95rem] font-semibold tracking-[0.28em] text-foreground">
          VARIABLE
        </span>
        <span className="mt-1 text-[0.62rem] font-medium tracking-[0.42em] text-sage-gold/80">
          SOLUTIONS
        </span>
      </span>
    </span>
  );
}
