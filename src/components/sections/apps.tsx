"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, Plus } from "lucide-react";
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
} from "@/components/service-icons";

const ease = [0.22, 1, 0.36, 1] as const;

const features = [
  { icon: WalletIcon, label: "Payroll", copy: "Run salaries and payslips without the spreadsheet gymnastics." },
  { icon: ClockIcon, label: "Attendance", copy: "Clock-in, clock-out and overtime, tracked without the guesswork." },
  { icon: CalendarIcon, label: "Leave", copy: "Requests and approvals, with balances that always add up." },
  { icon: UsersGroupIcon, label: "Staff records", copy: "Contracts and documents kept tidy in one place." },
  { icon: ChartIcon, label: "Reports", copy: "See headcount and payroll cost at a glance." },
  { icon: ShieldIcon, label: "Permissions", copy: "Managers see their team, and only their team." },
];

/** The Roster app icon — the logo motif in a rounded badge. */
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

export function Apps() {
  return (
    <section
      id="apps"
      className="relative flex min-h-screen items-center border-t border-[var(--line)] px-5 py-24 sm:px-6 lg:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        <Reveal className="max-w-2xl">
          <SectionLabel>In-house apps</SectionLabel>
          <h2 className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Products we build, own and run.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Alongside client work, we make our own software for businesses that
            want something ready to use from day one.
          </p>
        </Reveal>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease }}
          className="card-soft mt-10 overflow-hidden rounded-3xl border border-[var(--line)] bg-background-2"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr]">
            {/* copy side */}
            <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-11">
              <div className="flex items-center gap-4">
                <RosterMark />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                      Roster
                    </h3>
                    <span className="rounded-full border border-mint/25 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-mint-ink">
                      Our product
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm font-medium text-muted-strong">
                    HR software made for small businesses
                  </p>
                </div>
              </div>

              <p className="mt-6 text-base leading-relaxed text-muted">
                Most HR systems are priced and designed for companies with
                hundreds of staff. Roster is the opposite — payroll, attendance,
                leave and staff records for a team you can count, without the
                bloat or the enterprise invoice.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button variant="solid" className="group w-full sm:w-auto" onClick={openStartProject}>
                  Get early access
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Button>
                <Button variant="outline" className="w-full sm:w-auto" asChild>
                  <a href="mailto:hello@kmsolutions.mv?subject=Roster%20demo">
                    Book a demo
                  </a>
                </Button>
              </div>
            </div>

            {/* product preview */}
            <div className="relative flex items-center border-t border-[var(--line)] bg-background p-5 sm:p-7 lg:border-l lg:border-t-0">
              <div className="card-soft w-full overflow-hidden rounded-xl border border-[var(--line)]">
                <Image
                  src="/apps/roster.svg"
                  alt="Roster HR dashboard showing staff records, payroll and attendance"
                  width={720}
                  height={480}
                  loading="lazy"
                  className="h-auto w-full"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>
          </div>

          {/* feature strip */}
          <div className="grid grid-cols-1 divide-y divide-[var(--line)] border-t border-[var(--line)] sm:grid-cols-2 sm:divide-x lg:grid-cols-3">
            {features.map(({ icon: Icon, label, copy }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease, delay: i * 0.05 }}
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
