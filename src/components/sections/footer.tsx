import { LogoMark } from "@/components/logo";

const columns = [
  {
    title: "Build",
    links: ["HR Management", "POS Systems", "Marketing", "Websites", "Mobile Apps", "Custom Software"],
  },
  {
    title: "Studio",
    links: ["Our approach", "Work", "Careers", "Contact"],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--hairline)] bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark size={40} />
              <div className="flex flex-col leading-none">
                <span className="font-serif text-sm font-semibold tracking-[0.28em] text-foreground">
                  VARIABLE
                </span>
                <span className="mt-1 text-[0.6rem] font-medium tracking-[0.42em] text-sage-gold/80">
                  SOLUTIONS
                </span>
              </div>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-sage">
              A boutique software house in the Maldives, building anything
              digital — precisely, quietly, and entirely on your terms.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-sage-gold/80">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#contact"
                      className="text-sm text-sage transition-colors duration-300 hover:text-sage-gold"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* gold hairline divider */}
        <div className="mt-14 h-px w-full bg-gradient-to-r from-transparent via-[rgba(214,184,92,0.28)] to-transparent" />

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-sage/70 sm:flex-row">
          <p>© {new Date().getFullYear()} Variable Solutions. All rights reserved.</p>
          <p className="tracking-wide">Malé · Republic of Maldives</p>
        </div>
      </div>
    </footer>
  );
}
