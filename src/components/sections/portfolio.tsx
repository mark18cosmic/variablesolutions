import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { StartProjectButton } from "@/components/start-project";
import { Tilt } from "@/components/tilt";

type Project = {
  name: string;
  copy: string;
  href?: string;
  image: string;
  alt: string;
  tags: string[];
};

const projects: Project[] = [
  {
    name: "The Edge",
    href: "https://theedge.mv",
    copy: "A bold digital presence for a Maldivian brand — fast, refined and built to convert. Our first flagship engagement.",
    image: "/projects/the-edge.svg",
    alt: "The Edge website preview",
    tags: ["Web", "Brand", "Next.js"],
  },
  {
    name: "Mahufal",
    href: "https://mahufal.mv",
    copy: "A Maldivian platform built end to end — clean structure, fast pages and a stack that stays easy to run.",
    image: "/projects/mahufal.svg",
    alt: "Mahufal.mv website preview",
    tags: ["Web", "Platform", "SEO"],
  },
  {
    name: "UnifyGames",
    copy: "A digital home for a growing gaming brand — built to scale with its community.",
    image: "/projects/unifygames.svg",
    alt: "UnifyGames website preview",
    tags: ["Web", "Brand"],
  },
  {
    name: "Neut",
    copy: "Clean, considered and quietly confident — designed and shipped end to end.",
    image: "/projects/neut.svg",
    alt: "Neut website preview",
    tags: ["Web", "Design"],
  },
];

function ProjectCard({ project }: { project: Project }) {
  const inner = (
    <>
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[var(--line)] bg-background-2">
        <Image
          src={project.image}
          alt={project.alt}
          fill
          loading="lazy"
          className="object-cover"
          sizes="(min-width: 640px) 46vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            {project.name}
          </h3>
          {project.href && (
            <ArrowUpRight size={18} className="mt-0.5 shrink-0 text-muted" />
          )}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.copy}</p>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-[var(--line)] px-2.5 py-1 text-xs text-muted-strong"
            >
              {t}
            </span>
          ))}
          {project.href && (
            <span className="ml-auto text-xs font-medium text-mint-ink">
              {project.href.replace("https://", "")}
            </span>
          )}
        </div>
      </div>
    </>
  );

  const className =
    "relative flex h-full flex-col overflow-hidden rounded-xl border border-[var(--line)] bg-background transition-colors hover:border-[var(--line-strong)]";

  return (
    <Tilt intensity={6} className="rounded-xl">
      {project.href ? (
        <a href={project.href} target="_blank" rel="noreferrer" className={className}>
          {inner}
        </a>
      ) : (
        <div className={className}>{inner}</div>
      )}
    </Tilt>
  );
}

export function Portfolio() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="border-b border-[var(--line)] px-5 py-20 sm:px-6 sm:py-24 lg:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        <Reveal className="max-w-2xl">
          <SectionLabel>Selected work</SectionLabel>
          <h2
            id="work-heading"
            className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl"
          >
            A young company, big ambitions.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            We&apos;re just getting started — and picky about what we take on.
            Here&apos;s where it begins.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>

        <Reveal className="mt-8 flex flex-col items-start gap-4 rounded-xl border border-dashed border-[var(--line-strong)] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-semibold tracking-tight text-foreground">
              Your project here.
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              We&apos;re taking on a handful of founding clients. Bring the idea
              — we&apos;ll build the rest.
            </p>
          </div>
          <StartProjectButton size="sm" variant="outline" className="shrink-0" />
        </Reveal>
      </div>
    </section>
  );
}
