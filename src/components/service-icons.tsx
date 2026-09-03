/* Flat two-tone icon set — rounded geometry in the same language as the
   logo mark (overlapping circles, pills, rings). Mint leads, blue accents,
   no gradients, no hairline strokes. */

type IconProps = { size?: number };

function Svg({ size = 26, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      {children}
    </svg>
  );
}

/** HR — two overlapping people. */
export function PeopleIcon({ size }: IconProps) {
  return (
    <Svg size={size}>
      {/* back person */}
      <circle cx="21.5" cy="12" r="4" fill="var(--blue)" opacity="0.6" />
      <path
        d="M14.5 27v-3a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v3"
        fill="var(--blue)"
        opacity="0.35"
      />
      {/* front person */}
      <circle cx="12" cy="10.5" r="5" fill="var(--mint)" />
      <path
        d="M3 27v-2.5A6.5 6.5 0 0 1 9.5 18h5a6.5 6.5 0 0 1 6.5 6.5V27z"
        fill="var(--mint)"
        opacity="0.75"
      />
    </Svg>
  );
}

/** POS — card terminal with stripe and chip. */
export function CardIcon({ size }: IconProps) {
  return (
    <Svg size={size}>
      <rect x="3" y="7" width="26" height="18" rx="4" stroke="var(--mint)" strokeWidth="2.2" />
      <rect x="3" y="12" width="26" height="4" fill="var(--mint)" opacity="0.55" />
      <rect x="7" y="19.5" width="7" height="2.5" rx="1.25" fill="var(--mint)" />
      <circle cx="23" cy="20.5" r="2.5" fill="var(--blue)" />
    </Svg>
  );
}

/** Marketing — broadcast arcs radiating from a point. */
export function BroadcastIcon({ size }: IconProps) {
  return (
    <Svg size={size}>
      <circle cx="8" cy="24" r="3.5" fill="var(--mint)" />
      <path d="M8 17.5A10.5 10.5 0 0 1 18.5 28" stroke="var(--mint)" strokeWidth="2.2" strokeLinecap="round" opacity="0.75" />
      <path d="M8 11A17 17 0 0 1 25 28" stroke="var(--mint)" strokeWidth="2.2" strokeLinecap="round" opacity="0.45" />
      <circle cx="24" cy="8" r="3" fill="var(--blue)" opacity="0.8" />
    </Svg>
  );
}

/** Websites — browser window. */
export function BrowserIcon({ size }: IconProps) {
  return (
    <Svg size={size}>
      <rect x="3" y="5" width="26" height="22" rx="4" stroke="var(--mint)" strokeWidth="2.2" />
      <path d="M3 12h26" stroke="var(--mint)" strokeWidth="2.2" opacity="0.55" />
      <circle cx="7.5" cy="8.5" r="1.4" fill="var(--mint)" />
      <circle cx="12" cy="8.5" r="1.4" fill="var(--blue)" />
      <rect x="7" y="16" width="13" height="2.5" rx="1.25" fill="var(--mint)" opacity="0.7" />
      <rect x="7" y="21" width="8" height="2.5" rx="1.25" fill="var(--mint)" opacity="0.4" />
    </Svg>
  );
}

/** Apps — phone with app tiles. */
export function PhoneIcon({ size }: IconProps) {
  return (
    <Svg size={size}>
      <rect x="8.5" y="2.5" width="15" height="27" rx="5" stroke="var(--mint)" strokeWidth="2.2" />
      <rect x="12" y="7" width="3.5" height="3.5" rx="1.2" fill="var(--mint)" />
      <rect x="16.5" y="7" width="3.5" height="3.5" rx="1.2" fill="var(--blue)" opacity="0.8" />
      <rect x="12" y="11.5" width="3.5" height="3.5" rx="1.2" fill="var(--mint)" opacity="0.55" />
      <rect x="16.5" y="11.5" width="3.5" height="3.5" rx="1.2" fill="var(--mint)" opacity="0.8" />
      <circle cx="16" cy="23.5" r="2.5" fill="var(--mint)" />
    </Svg>
  );
}

/** Custom software — three overlapping rounded blocks, the logo motif squared off. */
export function BlocksIcon({ size }: IconProps) {
  return (
    <Svg size={size}>
      <rect x="3" y="3" width="15" height="15" rx="4.5" fill="var(--mint)" />
      <rect x="14" y="14" width="15" height="15" rx="4.5" fill="var(--mint)" opacity="0.55" />
      <rect x="3" y="19" width="10" height="10" rx="3.5" fill="var(--blue)" opacity="0.7" />
    </Svg>
  );
}

/* ---- smaller marks reused elsewhere (apps section, process) ---- */

export function ClockIcon({ size }: IconProps) {
  return (
    <Svg size={size}>
      <circle cx="16" cy="16" r="12" stroke="var(--mint)" strokeWidth="2.2" opacity="0.6" />
      <path d="M16 9.5V16l5 3" stroke="var(--mint)" strokeWidth="2.2" strokeLinecap="round" />
    </Svg>
  );
}

export function WalletIcon({ size }: IconProps) {
  return (
    <Svg size={size}>
      <rect x="3.5" y="7" width="25" height="18" rx="4" stroke="var(--mint)" strokeWidth="2.2" />
      <circle cx="22" cy="16" r="3" fill="var(--mint)" />
    </Svg>
  );
}

export function CalendarIcon({ size }: IconProps) {
  return (
    <Svg size={size}>
      <rect x="4" y="6.5" width="24" height="21" rx="4" stroke="var(--mint)" strokeWidth="2.2" />
      <path d="M4 13h24" stroke="var(--mint)" strokeWidth="2.2" opacity="0.55" />
      <circle cx="11" cy="19" r="2" fill="var(--mint)" />
      <circle cx="18" cy="19" r="2" fill="var(--blue)" opacity="0.8" />
    </Svg>
  );
}

export function ChartIcon({ size }: IconProps) {
  return (
    <Svg size={size}>
      <rect x="4" y="18" width="6" height="10" rx="2.5" fill="var(--mint)" opacity="0.55" />
      <rect x="13" y="12" width="6" height="16" rx="2.5" fill="var(--mint)" />
      <rect x="22" y="6" width="6" height="22" rx="2.5" fill="var(--blue)" opacity="0.75" />
    </Svg>
  );
}

export function ShieldIcon({ size }: IconProps) {
  return (
    <Svg size={size}>
      <path
        d="M16 3.5l10 4v8c0 6.5-4.2 11.4-10 13-5.8-1.6-10-6.5-10-13v-8z"
        stroke="var(--mint)"
        strokeWidth="2.2"
        strokeLinejoin="round"
        opacity="0.6"
      />
      <circle cx="16" cy="15" r="3.5" fill="var(--mint)" />
    </Svg>
  );
}

export function UsersGroupIcon({ size }: IconProps) {
  return (
    <Svg size={size}>
      <circle cx="10" cy="12" r="4.5" fill="var(--mint)" />
      <circle cx="22" cy="12" r="4.5" fill="var(--mint)" opacity="0.55" />
      <circle cx="16" cy="22" r="4.5" fill="var(--blue)" opacity="0.7" />
    </Svg>
  );
}

/** Invoicing — a receipt with a torn edge. */
export function ReceiptIcon({ size }: IconProps) {
  return (
    <Svg size={size}>
      <path
        d="M6 5.5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v21l-4-2.4-4 2.4-4-2.4-4 2.4-4-2.4z"
        stroke="var(--mint)"
        strokeWidth="2.2"
        strokeLinejoin="round"
        opacity="0.6"
      />
      <rect x="11" y="11" width="10" height="2.5" rx="1.25" fill="var(--mint)" />
      <rect x="11" y="16.5" width="7" height="2.5" rx="1.25" fill="var(--blue)" opacity="0.8" />
    </Svg>
  );
}

/** Tax / rates — a percent mark built from the logo circles. */
export function PercentIcon({ size }: IconProps) {
  return (
    <Svg size={size}>
      <circle cx="10.5" cy="10.5" r="4.5" fill="var(--mint)" />
      <circle cx="21.5" cy="21.5" r="4.5" fill="var(--blue)" opacity="0.75" />
      <path d="M24 8L8 24" stroke="var(--mint)" strokeWidth="2.2" strokeLinecap="round" opacity="0.6" />
    </Svg>
  );
}

/** Recurring — a loop that comes back around. */
export function RepeatIcon({ size }: IconProps) {
  return (
    <Svg size={size}>
      <path
        d="M6 16a10 10 0 0 1 10-10c3.4 0 6.4 1.7 8.2 4.3"
        stroke="var(--mint)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M26 16a10 10 0 0 1-10 10c-3.4 0-6.4-1.7-8.2-4.3"
        stroke="var(--mint)"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.45"
      />
      <circle cx="24.5" cy="7.5" r="3" fill="var(--mint)" />
      <circle cx="7.5" cy="24.5" r="3" fill="var(--blue)" opacity="0.8" />
    </Svg>
  );
}

/** Modules — stacked layers. */
export function LayersIcon({ size }: IconProps) {
  return (
    <Svg size={size}>
      <path d="M16 4l12 6-12 6L4 10z" fill="var(--mint)" />
      <path d="M4 16l12 6 12-6" stroke="var(--mint)" strokeWidth="2.2" strokeLinejoin="round" opacity="0.6" />
      <path d="M4 22l12 6 12-6" stroke="var(--blue)" strokeWidth="2.2" strokeLinejoin="round" opacity="0.7" />
    </Svg>
  );
}

/** Speed — a bolt in the flat two-tone style. */
export function BoltIcon({ size }: IconProps) {
  return (
    <Svg size={size}>
      <path d="M18 3L7 18h7l-2 11 11-15h-7z" fill="var(--mint)" />
      <circle cx="25" cy="7" r="2.5" fill="var(--blue)" opacity="0.75" />
    </Svg>
  );
}

/** One account — a key-ring circle through a rounded square. */
export function KeyIcon({ size }: IconProps) {
  return (
    <Svg size={size}>
      <circle cx="12" cy="12" r="7" stroke="var(--mint)" strokeWidth="2.2" />
      <circle cx="12" cy="12" r="2.5" fill="var(--mint)" />
      <path d="M17 17l8 8" stroke="var(--mint)" strokeWidth="2.2" strokeLinecap="round" opacity="0.6" />
      <rect x="22" y="20" width="6" height="6" rx="2" fill="var(--blue)" opacity="0.8" />
    </Svg>
  );
}

/** Notifications — a bell reduced to two rounded forms. */
export function BellIcon({ size }: IconProps) {
  return (
    <Svg size={size}>
      <path
        d="M8 22v-6a8 8 0 1 1 16 0v6z"
        stroke="var(--mint)"
        strokeWidth="2.2"
        strokeLinejoin="round"
        opacity="0.65"
      />
      <rect x="5" y="22" width="22" height="3" rx="1.5" fill="var(--mint)" />
      <circle cx="16" cy="28" r="2.5" fill="var(--blue)" opacity="0.8" />
    </Svg>
  );
}

/** Works anywhere — a globe with a single meridian. */
export function GlobeIcon({ size }: IconProps) {
  return (
    <Svg size={size}>
      <circle cx="16" cy="16" r="12" stroke="var(--mint)" strokeWidth="2.2" opacity="0.6" />
      <ellipse cx="16" cy="16" rx="5.5" ry="12" stroke="var(--mint)" strokeWidth="2.2" opacity="0.45" />
      <path d="M4.5 16h23" stroke="var(--mint)" strokeWidth="2.2" />
      <circle cx="16" cy="16" r="3" fill="var(--blue)" opacity="0.8" />
    </Svg>
  );
}
