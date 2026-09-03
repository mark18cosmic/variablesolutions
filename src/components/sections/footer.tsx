import { Mail, MapPin } from "lucide-react";
import { Wordmark } from "@/components/logo";

const columns = [
  {
    title: "Services",
    links: [
      { label: "HR Management", href: "#services" },
      { label: "POS Systems", href: "#services" },
      { label: "Marketing", href: "#services" },
      { label: "Websites", href: "#services" },
      { label: "Apps", href: "#services" },
      { label: "Custom Software", href: "#services" },
    ],
  },
  {
    title: "Apps",
    links: [
      { label: "Roster — HR software", href: "#apps" },
      { label: "Ledgr — accounting & invoicing", href: "#apps" },
      { label: "Super App — all in one", href: "#apps" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our approach", href: "#process" },
      { label: "Work", href: "#work" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--line)] bg-background px-5 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <Wordmark markSize={38} tagline />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              A full-service software company in the Maldives, building anything
              digital your business needs — under one roof.
            </p>
            <div className="mt-5 flex flex-col gap-2.5 text-sm text-muted">
              <a
                href="mailto:hello@kmsolutions.mv"
                className="inline-flex items-center gap-2 transition-colors hover:text-mint-ink"
              >
                <Mail size={14} strokeWidth={1.8} />
                hello@kmsolutions.mv
              </a>
              <span className="inline-flex items-center gap-2">
                <MapPin size={14} strokeWidth={1.8} />
                Malé, Maldives
              </span>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-mint-ink">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-muted transition-colors duration-300 hover:text-mint-ink"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 h-px w-full bg-[var(--line)]" />

        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-muted/80 sm:flex-row">
          <p>© {new Date().getFullYear()} KMSolutions. All rights reserved.</p>
          <p>Any problem. One solution.</p>
        </div>
      </div>
    </footer>
  );
}
