import { Wordmark } from "@/components/logo";

const columns = [
  {
    title: "Build",
    links: ["HR Management", "POS Systems", "Marketing", "Websites", "Apps", "Custom Software"],
  },
  {
    title: "Company",
    links: ["Our approach", "Work", "Careers", "Contact"],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--line)] bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Wordmark markSize={40} tagline />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
              A full-service software company in the Maldives, building
              anything digital your business needs — under one roof.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-mint">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#contact"
                      className="text-sm text-muted transition-colors duration-300 hover:text-mint"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 h-px w-full bg-[var(--line)]" />

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-muted/70 sm:flex-row">
          <p>© {new Date().getFullYear()} KMSolutions. All rights reserved.</p>
          <p className="tracking-wide">Malé · Republic of Maldives</p>
        </div>
      </div>
    </footer>
  );
}
