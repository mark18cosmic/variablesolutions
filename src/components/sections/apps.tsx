"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { Button } from "@/components/ui/button";
import { openStartProject } from "@/components/start-project";
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
  image: string;
  alt: string;
  features: Feature[];
  primary: { label: string; mail?: string };
};

const products: Product[] = [
  {
    id: "super-app",
    name: "Super App",
    badge: "Coming soon",
    tagline: "One app for everything your business runs on",
    headline: "All in one app, instead of six that don't talk to each other.",
    copy: "One account, one bill, one place your team already knows. Turn on the modules you need — HR, invoicing, point of sale, bookings, payments — and everything shares the same customers, staff and numbers underneath.",
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

export function Apps() {
  const [active, setActive] = useState(products[0].id);
  const product = products.find((p) => p.id === active) ?? products[0];

  return (
    <section
      id="apps"
      aria-labelledby="apps-heading"
      className="border-b border-[var(--line)] px-5 py-20 sm:px-6 sm:py-24 lg:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        <Reveal className="max-w-2xl">
          <SectionLabel>In-house apps</SectionLabel>
          <h2
            id="apps-heading"
            className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl"
          >
            Products we build, own and run.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Alongside client work, we make our own software for businesses that
            want something ready to use from day one.
          </p>
        </Reveal>

        <div
          role="tablist"
          aria-label="Our products"
          className="mt-10 flex flex-wrap gap-2"
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
                  "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/50",
                  selected
                    ? "border-transparent bg-mint text-on-mint"
                    : "border-[var(--line-strong)] text-muted-strong hover:text-foreground"
                )}
              >
                {p.name}
              </button>
            );
          })}
        </div>

        <div
          id={`panel-${product.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${product.id}`}
          className="mt-5 overflow-hidden rounded-xl border border-[var(--line)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col justify-center bg-background p-7 sm:p-9">
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                  {product.name}
                </h3>
                <span className="rounded-full border border-[var(--line-strong)] px-2.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider text-muted">
                  {product.badge}
                </span>
              </div>
              <p className="mt-1.5 text-sm text-muted">{product.tagline}</p>

              <p className="mt-6 text-lg font-medium leading-snug tracking-tight text-foreground">
                {product.headline}
              </p>
              <p className="mt-3 text-base leading-relaxed text-muted">{product.copy}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button variant="solid" className="group w-full sm:w-auto" onClick={openStartProject}>
                  {product.primary.label}
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Button>
                <Button variant="outline" className="w-full sm:w-auto" asChild>
                  <a href={`mailto:hello@kmsolutions.mv?subject=${product.primary.mail}`}>
                    Book a demo
                  </a>
                </Button>
              </div>
            </div>

            <div className="flex items-center border-t border-[var(--line)] bg-background-2 p-6 sm:p-8 lg:border-l lg:border-t-0">
              <Image
                src={product.image}
                alt={product.alt}
                width={720}
                height={480}
                priority={false}
                loading="lazy"
                className="h-auto w-full rounded-lg border border-[var(--line)]"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-px border-t border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
            {product.features.map(({ icon: Icon, label, copy }) => (
              <div key={label} className="bg-background p-6">
                <Icon size={24} />
                <h4 className="mt-3.5 text-sm font-semibold tracking-tight text-foreground">
                  {label}
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">{copy}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={openStartProject}
          className="mt-5 flex w-full cursor-pointer flex-col items-start gap-3 rounded-xl border border-dashed border-[var(--line-strong)] p-6 text-left transition-colors hover:bg-background-2 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h3 className="text-base font-semibold tracking-tight text-foreground">
              More apps on the way.
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              POS, bookings and back-office tools built around how Maldivian
              businesses actually work.
            </p>
          </div>
          <span className="shrink-0 text-sm font-medium text-mint-ink">
            Tell us what you need →
          </span>
        </button>
      </div>
    </section>
  );
}
