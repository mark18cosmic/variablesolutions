import { ArrowRight } from "lucide-react";
import { StartProjectButton } from "@/components/start-project";
import { Magnetic } from "@/components/magnetic";

const clients = ["The Edge", "Mahufal", "UnifyGames", "Neut"];

/**
 * A centred, typographic opening. No product shot, no canvas — the
 * headline is the whole image, sized fluidly so it fills the viewport
 * at every width instead of shrinking into a column.
 *
 * The entrance is four CSS keyframes on a stagger. Nothing observes
 * scroll, nothing measures: the hero is above the fold, so it simply
 * plays once and the reduced-motion block in globals.css flattens it.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[86svh] items-center border-b border-[var(--line)] px-5 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:px-10"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <p className="rise inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-3.5 py-1.5 text-[0.7rem] font-medium tracking-wide text-muted sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-mint" />
          Software company · Malé, Maldives
        </p>

        <h1 className="rise rise-1 mt-7 text-[clamp(2.9rem,12vw,6.5rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-foreground sm:mt-9">
          Any problem.
          <br />
          One solution<span className="text-mint">.</span>
        </h1>

        <p className="rise rise-2 mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:mt-8 sm:text-lg">
          We design and build the software your business runs on — HR, point of
          sale, accounting, marketing, websites and apps. One team, start to
          finish.
        </p>

        <div className="rise rise-3 mt-9 flex w-full flex-col items-center gap-3 sm:mt-11 sm:w-auto sm:flex-row sm:gap-5">
          <Magnetic className="w-full sm:w-auto">
            <StartProjectButton variant="solid" size="lg" className="w-full" />
          </Magnetic>
          <a
            href="#services"
            className="group inline-flex h-12 items-center gap-2 px-2 text-sm font-medium text-muted-strong transition-colors hover:text-foreground"
          >
            See what we build
            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>
        </div>

        <div className="rise rise-4 mt-16 w-full border-t border-[var(--line)] pt-6 sm:mt-20">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-muted">
            Trusted by
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2.5 sm:gap-x-12">
            {clients.map((c) => (
              <span key={c} className="text-sm font-medium text-muted-strong">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
