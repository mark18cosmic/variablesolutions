"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from "motion/react";
import { ArrowRight, Plus } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { Button } from "@/components/ui/button";
import { openStartProject } from "@/components/start-project";
import { Tilt, Layer } from "@/components/tilt";
import { Aurora, wash } from "@/components/aurora";
import { Magnetic } from "@/components/magnetic";
import {
  WalletIcon,
  ClockIcon,
  CalendarIcon,
  UsersGroupIcon,
  ChartIcon,
  ShieldIcon,
  ReceiptIcon,
  PercentIcon,
  RepeatIcon,
  LayersIcon,
  KeyIcon,
  BellIcon,
  GlobeIcon,
  CardIcon,
  PhoneIcon,
} from "@/components/service-icons";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

type Feature = {
  icon: (props: { size?: number }) => React.ReactElement;
  label: string;
  copy: string;
};

type Product = {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  headline: string;
  copy: string;
  mark: (props: { size?: number }) => React.ReactElement;
  image: string;
  alt: string;
  features: Feature[];
  primary: { label: string; mail?: string };
};

/** Roster — overlapping circles, the logo motif. */
function RosterMark({ size = 54 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden className="shrink-0">
      <rect width="64" height="64" rx="16" fill="var(--background)" />
      <circle cx="32" cy="23" r="11" fill="var(--mint)" />
      <circle cx="23" cy="40" r="11" fill="var(--mint)" opacity="0.55" />
      <circle cx="41" cy="40" r="11" fill="var(--blue)" opacity="0.65" />
    </svg>
  );
}

/** Ledgr — a ledger column of ruled lines with a mint balance. */
function LedgrMark({ size = 54 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden className="shrink-0">
      <rect width="64" height="64" rx="16" fill="var(--background)" />
      <rect x="16" y="18" width="22" height="5" rx="2.5" fill="var(--mint)" />
      <rect x="16" y="29" width="32" height="5" rx="2.5" fill="var(--mint)" opacity="0.5" />
      <rect x="16" y="40" width="18" height="5" rx="2.5" fill="var(--mint)" opacity="0.5" />
      <circle cx="43" cy="42.5" r="6" fill="var(--blue)" opacity="0.75" />
    </svg>
  );
}

/** Super App — one badge holding many tiles. */
function SuperMark({ size = 54 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden className="shrink-0">
      <rect width="64" height="64" rx="16" fill="var(--background)" />
      <rect x="16" y="16" width="14" height="14" rx="4.5" fill="var(--mint)" />
      <rect x="34" y="16" width="14" height="14" rx="4.5" fill="var(--mint)" opacity="0.5" />
      <rect x="16" y="34" width="14" height="14" rx="4.5" fill="var(--blue)" opacity="0.7" />
      <circle cx="41" cy="41" r="7" fill="var(--mint)" opacity="0.85" />
    </svg>
  );
}

const products: Product[] = [
  {
    id: "super-app",
    name: "Super App",
    badge: "Coming soon",
    tagline: "One app for everything your business runs on",
    headline: "All in one app, instead of six that don't talk to each other.",
    copy: "One account, one bill, one place your team already knows. Turn on the modules you need — HR, invoicing, point of sale, bookings, payments — and everything shares the same customers, staff and numbers underneath.",
    mark: SuperMark,
    image: "/apps/super-app.svg",
    alt: "Super App all-in-one business platform showing modules, a mobile app and activity",
    primary: { label: "Get on the list", mail: "Super%20App" },
    features: [
      { icon: LayersIcon, label: "Modules", copy: "Switch on HR, billing, POS or bookings as you grow." },
      { icon: KeyIcon, label: "One account", copy: "A single login and one bill across every module." },
      { icon: CardIcon, label: "Payments", copy: "Take card and transfer payments in one flow." },
      { icon: PhoneIcon, label: "Mobile first", copy: "Built for the phone in your manager's pocket." },
      { icon: BellIcon, label: "Alerts", copy: "The right person told the moment something needs them." },
      { icon: GlobeIcon, label: "Island ready", copy: "Works on patchy connections, syncs when it can." },
    ],
  },
  {
    id: "roster",
    name: "Roster",
    badge: "Early access",
    tagline: "HR software made for small businesses",
    headline: "Payroll, attendance and leave for a team you can count.",
    copy: "Most HR systems are priced and designed for companies with hundreds of staff. Roster is the opposite — payroll, attendance, leave and staff records for a small team, without the bloat or the enterprise invoice.",
    mark: RosterMark,
    image: "/apps/roster.svg",
    alt: "Roster HR software dashboard showing staff records, payroll and attendance",
    primary: { label: "Get early access", mail: "Roster%20demo" },
    features: [
      { icon: WalletIcon, label: "Payroll", copy: "Run salaries and payslips without the spreadsheet gymnastics." },
      { icon: ClockIcon, label: "Attendance", copy: "Clock-in, clock-out and overtime, tracked without the guesswork." },
      { icon: CalendarIcon, label: "Leave", copy: "Requests and approvals, with balances that always add up." },
      { icon: UsersGroupIcon, label: "Staff records", copy: "Contracts and documents kept tidy in one place." },
      { icon: ChartIcon, label: "Reports", copy: "See headcount and payroll cost at a glance." },
      { icon: ShieldIcon, label: "Permissions", copy: "Managers see their team, and only their team." },
    ],
  },
  {
    id: "ledgr",
    name: "Ledgr",
    badge: "In development",
    tagline: "Accounting and invoicing software",
    headline: "Send the invoice, chase less, know where you stand.",
    copy: "Ledgr is accounting built around invoicing — raise a professional invoice in seconds, track what's paid and what's overdue, log expenses as they happen, and walk into filing season with the numbers already reconciled.",
    mark: LedgrMark,
    image: "/apps/ledgr.svg",
    alt: "Ledgr accounting software showing an invoice list, revenue tiles and an invoice document",
    primary: { label: "Join the waitlist", mail: "Ledgr%20waitlist" },
    features: [
      { icon: ReceiptIcon, label: "Invoicing", copy: "Branded invoices and quotes, sent and tracked in seconds." },
      { icon: RepeatIcon, label: "Recurring billing", copy: "Retainers and subscriptions that bill themselves." },
      { icon: WalletIcon, label: "Expenses", copy: "Log costs, attach receipts, keep every rufiyaa accounted for." },
      { icon: PercentIcon, label: "Tax ready", copy: "GST and withholding handled the way MIRA expects." },
      { icon: ChartIcon, label: "Reports", copy: "P&L, cash flow and ageing, without a bookkeeping degree." },
      { icon: UsersGroupIcon, label: "Clients", copy: "Every invoice, payment and note against the right customer." },
    ],
  },
];

function ProductPanel({ product }: { product: Product }) {
  const Mark = product.mark;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr]">
      {/* copy side */}
      <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-11">
        <div className="flex items-center gap-4">
          <Mark />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {product.name}
              </h3>
              <span className="rounded-full border border-mint/25 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-mint-ink">
                {product.badge}
              </span>
            </div>
            <p className="mt-1.5 text-sm font-medium text-muted-strong">
              {product.tagline}
            </p>
          </div>
        </div>

        <p className="mt-6 text-lg font-semibold leading-snug tracking-tight text-foreground">
          {product.headline}
        </p>
        <p className="mt-3 text-base leading-relaxed text-muted">{product.copy}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Magnetic className="w-full sm:w-auto">
            <Button variant="solid" className="group w-full sm:w-auto" onClick={openStartProject}>
              {product.primary.label}
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Button>
          </Magnetic>
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <a href={`mailto:hello@kmsolutions.mv?subject=${product.primary.mail}`}>
              Book a demo
            </a>
          </Button>
        </div>
      </div>

      {/* product preview, standing off the panel */}
      <div className="relative flex items-center overflow-hidden border-t border-[var(--line)] bg-background p-5 sm:p-7 lg:border-l lg:border-t-0">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{ background: wash("mint", 0.18) }}
          aria-hidden
        />
        <Tilt className="w-full rounded-xl" intensity={7}>
          <Layer z={44} className="relative">
            <div className="card-soft gradient-ring w-full overflow-hidden rounded-xl border border-[var(--line)]">
              <Image
                src={product.image}
                alt={product.alt}
                width={720}
                height={480}
                priority={product.id === "super-app"}
                loading={product.id === "super-app" ? undefined : "lazy"}
                className="h-auto w-full"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            {/* contact shadow, sold as depth rather than drawn as a border */}
            <div
              className="pointer-events-none absolute inset-x-6 -bottom-5 h-10 rounded-full bg-black/45 blur-2xl"
              aria-hidden
            />
          </Layer>
        </Tilt>
      </div>
    </div>
  );
}

export function Apps() {
  const [active, setActive] = useState(products[0].id);
  const reduce = useReducedMotion();
  const product = products.find((p) => p.id === active) ?? products[0];

  return (
    <section
      id="apps"
      aria-labelledby="apps-heading"
      className="relative flex min-h-screen items-center overflow-hidden border-t border-[var(--line)] px-5 py-24 sm:px-6 lg:px-10"
    >
      <Aurora
        blobs={[
          { className: "-right-[16%] top-[4%] h-[36rem] w-[36rem]", color: wash("violet", 0.42) },
          { className: "-left-[12%] bottom-[2%] h-[30rem] w-[30rem]", color: wash("mint", 0.35), delay: "-11s" },
        ]}
      />

      <div className="relative mx-auto w-full max-w-7xl">
        <Reveal className="max-w-3xl">
          <SectionLabel>In-house apps</SectionLabel>
          <h2
            id="apps-heading"
            className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Products we <span className="text-gradient">build, own</span> and run.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Alongside client work, we make our own software for businesses that
            want something ready to use from day one — HR, accounting and an
            all-in-one app that ties the lot together.
          </p>
        </Reveal>

        {/* product switcher */}
        <Reveal delay={0.1} className="mt-8">
          <LayoutGroup id="apps-tabs">
            <div
              role="tablist"
              aria-label="Our products"
              className="flex flex-wrap gap-2"
            >
              {products.map((p) => {
                const selected = p.id === active;
                return (
                  <button
                    key={p.id}
                    role="tab"
                    id={`tab-${p.id}`}
                    aria-selected={selected}
                    aria-controls={`panel-${p.id}`}
                    onClick={() => setActive(p.id)}
                    className={cn(
                      "relative cursor-pointer rounded-full border px-5 py-2.5 text-sm font-semibold tracking-tight transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/50",
                      selected
                        ? "border-transparent text-[#0b1310]"
                        : "border-[var(--line-strong)] text-muted-strong hover:border-mint/40 hover:text-mint-ink"
                    )}
                  >
                    {selected && (
                      <motion.span
                        layoutId="apps-tab-pill"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-mint via-mint to-[#5ff0c4]"
                        transition={
                          reduce
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 380, damping: 32 }
                        }
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {p.name}
                      <span
                        className={cn(
                          "hidden text-[0.65rem] font-medium uppercase tracking-[0.1em] sm:inline",
                          selected ? "text-[#0b1310]/60" : "text-muted"
                        )}
                      >
                        {p.badge}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </Reveal>

        <motion.div
          layout={!reduce}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease }}
          className="card-soft surface gradient-ring mt-5 overflow-hidden rounded-3xl border border-[var(--line)] bg-background-2"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={product.id}
              id={`panel-${product.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${product.id}`}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease }}
            >
              <ProductPanel product={product} />

              {/* feature strip */}
              <div className="grid grid-cols-1 divide-y divide-[var(--line)] border-t border-[var(--line)] sm:grid-cols-2 sm:divide-x lg:grid-cols-3">
                {product.features.map(({ icon: Icon, label, copy }, i) => (
                  <motion.div
                    key={label}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease, delay: 0.1 + i * 0.05 }}
                    className="group p-6 transition-colors duration-300 hover:bg-background"
                  >
                    <div className="mb-3.5 transition-transform duration-500 group-hover:scale-105">
                      <Icon size={26} />
                    </div>
                    <h4 className="text-sm font-bold tracking-tight text-foreground">
                      {label}
                    </h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted">{copy}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* what's next */}
        <motion.button
          type="button"
          onClick={openStartProject}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease }}
          className="group mt-5 flex w-full flex-col items-start gap-4 rounded-2xl border border-dashed border-[var(--line-strong)] p-6 text-left transition-colors duration-300 hover:border-mint/35 sm:flex-row sm:items-center sm:justify-between sm:p-7"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-mint-ink transition-transform duration-500 group-hover:rotate-90">
              <Plus size={18} />
            </span>
            <div>
              <h3 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
                More apps on the way.
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                POS, bookings and back-office tools built around how Maldivian
                businesses actually work.
              </p>
            </div>
          </div>
          <span className="shrink-0 text-xs font-semibold text-mint-ink">
            Tell us what you need →
          </span>
        </motion.button>
      </div>
    </section>
  );
}
