/* Flat geometric icon set — overlapping circles, pills and rings,
   drawn in the same language as the logo mark. No gradients, no strokes
   thinner than 1.5, all mint/blue on transparent. */

type IconProps = { size?: number };

export function OverlapIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9.5" cy="9.5" r="7" fill="var(--mint)" />
      <circle cx="14.5" cy="14.5" r="7" fill="var(--mint)" opacity="0.55" />
    </svg>
  );
}

export function RingIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9.5" stroke="var(--mint)" strokeWidth="2" opacity="0.55" />
      <circle cx="12" cy="12" r="4" fill="var(--mint)" />
    </svg>
  );
}

export function ArcIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="6" cy="18" r="2.4" fill="var(--mint)" />
      <path d="M6 12.5C10 12.5 13.5 16 13.5 20" stroke="var(--mint)" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <path d="M6 7C13.2 7 19 12.8 19 20" stroke="var(--mint)" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

export function PillIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2.5" y="7.5" width="19" height="9" rx="4.5" stroke="var(--mint)" strokeWidth="2" opacity="0.55" />
      <circle cx="9" cy="12" r="2.2" fill="var(--mint)" />
    </svg>
  );
}

export function PhonePillIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="6.5" y="2.5" width="11" height="19" rx="5.5" stroke="var(--mint)" strokeWidth="2" opacity="0.55" />
      <circle cx="12" cy="17" r="2" fill="var(--mint)" />
    </svg>
  );
}

export function TriCircleIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="6" fill="var(--mint)" />
      <circle cx="7" cy="16" r="6" fill="var(--mint)" opacity="0.55" />
      <circle cx="17" cy="16" r="6" fill="var(--mint)" opacity="0.8" />
    </svg>
  );
}
