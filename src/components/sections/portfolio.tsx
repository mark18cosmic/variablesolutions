"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, Sparkles, Plus } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { openStartProject } from "@/components/start-project";
import { Tilt } from "@/components/tilt";
import { Aurora, wash } from "@/components/aurora";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

type Project = {
  name: string;
  tag: string;
  copy: string;
  href?: string;
  image: string;
  alt: string;
  tags: string[];
};

const featured: Project = {
  name: "The Edge",
  tag: "Live",
  href: "https://theedge.mv",
  copy: "A bold digital presence for a Maldivian brand — fast, refined and built to convert. Our first flagship engagement.",
  image: "/projects/the-edge.svg",
  alt: "The Edge website preview",
  tags: ["Web", "Brand", "Next.js"],
};

const highlight: Project = {
  name: "Mahufal",
  tag: "Live",
  href: "https://mahufal.mv",
  copy: "A Maldivian platform built end to end — clean structure, fast pages and a stack that stays easy to run.",
  image: "/projects/mahufal.svg",
  alt: "Mahufal.mv website preview",
  tags: ["Web", "Platform", "SEO"],
};

const others: Project[] = [
  {
    name: "UnifyGames",
    tag: "Live",
    copy: "A digital home for a growing gaming brand — built to scale with its community.",
    image: "/projects/unifygames.svg",
    alt: "UnifyGames website preview",
    tags: ["Web", "Brand"],
  },
  {
    name: "Neut",
    tag: "Live",
    copy: "Clean, considered and quietly confident — designed and shipped end to end.",
    image: "/projects/neut.svg",
    alt: "Neut website preview",
    tags: ["Web", "Design"],
  },
];

function LiveBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-background/85 px-3 py-1 text-[0.68rem] font-medium text-muted-strong backdrop-blur-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-mint" />
      {label}
    </span>
  );
}

function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease }}
      className={cn(
        "card-soft surface gradient-ring group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--line)] bg-background-2 transition-colors duration-500 hover:border-mint/30",
        className
      )}
    >
      {/* light sweeping across the card on hover */}
      <span
        className="pointer-events-none absolute -inset-x-8 -top-1/2 z-20 h-[200%] -translate-x-full -rotate-12 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-full"
        aria-hidden
      />
      {children}
    </motion.div>
  );
}

function ProjectShell({
  project,
  children,
  className,
}: {
  project: Project;
  children: React.ReactNode;
  className?: string;
}) {
  if (project.href) {
    return (
      <a href={project.href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return <div className={className}>{children}</div>;
}

/** The compact project card used for everything beside the feature. */
function SmallCard({
  project,
  delay = 0,
  sizes = "(min-width: 640px) 46vw, 100vw",
}: {
  project: Project;
  delay?: number;
  sizes?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease, delay }}
      className="h-full"
    >
      <ProjectShell project={project} className="block h-full">
        <Tilt className="rounded-3xl" intensity={6}>
          <Card>
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-background">
            <Image
              src={project.image}
              alt={project.alt}
              fill
              loading="lazy"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes={sizes}
            />
            <div className="absolute left-4 top-4">
              <LiveBadge label={project.tag} />
            </div>
          </div>
          <div className="flex flex-1 flex-col p-6">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                {project.name}
              </h3>
              <ArrowUpRight
                size={19}
                className="mt-0.5 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-mint-ink"
              />
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted">{project.copy}</p>
            <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-background px-2.5 py-1 text-[0.68rem] tracking-wide text-muted-strong"
              >
                  {t}
                </span>
              ))}
              {project.href && (
                <span className="ml-auto text-[0.68rem] font-semibold text-mint-ink">
                  {project.href.replace("https://", "")} →
                </span>
              )}
            </div>
          </div>
          </Card>
        </Tilt>
      </ProjectShell>
    </motion.div>
  );
}

export function Portfolio() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative flex min-h-screen items-center overflow-hidden border-t border-[var(--line)] px-5 py-24 sm:px-6 lg:px-10"
    >
      <Aurora
        blobs={[
          { className: "-left-[10%] top-[8%] h-[32rem] w-[32rem]", color: wash("mint", 0.38) },
          { className: "-right-[14%] bottom-[8%] h-[34rem] w-[34rem]", color: wash("blue", 0.4), delay: "-8s" },
        ]}
      />

      <div className="relative mx-auto w-full max-w-7xl">
        <Reveal className="max-w-3xl">
          <SectionLabel>Selected work</SectionLabel>
          <h2
            id="work-heading"
            className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            A young company, <span className="text-gradient">big ambitions.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            We&apos;re just getting started — and picky about what we take on.
            Here&apos;s where it begins. The next line could be yours.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* featured */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease }}
            className="lg:col-span-2"
          >
            <ProjectShell project={featured} className="block h-full">
              <Tilt className="rounded-3xl" intensity={5}>
                <Card>
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-background">
                  <Image
                    src={featured.image}
                    alt={featured.alt}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(min-width: 1024px) 62vw, 100vw"
                  />
                  <div className="absolute left-5 top-5">
                    <LiveBadge label={featured.tag} />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                      {featured.name}
                    </h3>
                    <ArrowUpRight
                      size={24}
                      className="mt-1 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-mint-ink"
                    />
                  </div>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                    {featured.copy}
                  </p>
                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
                    {featured.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-background px-3 py-1 text-xs tracking-wide text-muted-strong"
                    >
                        {t}
                      </span>
                    ))}
                    <span className="ml-auto text-xs font-semibold text-mint-ink">
                      theedge.mv →
                    </span>
                  </div>
                </div>
                </Card>
              </Tilt>
            </ProjectShell>
          </motion.div>

          {/* newest client, tall beside the feature */}
          <SmallCard project={highlight} delay={0.1} sizes="(min-width: 1024px) 32vw, 100vw" />
        </div>

        {/* earlier work */}
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {others.map((p, i) => (
            <SmallCard key={p.name} project={p} delay={0.05 + i * 0.1} />
          ))}
        </div>

        {/* invitation strip */}
        <motion.button
          type="button"
          onClick={openStartProject}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease }}
          className="group mt-5 flex w-full flex-col items-start gap-4 rounded-2xl border border-dashed border-[var(--line-strong)] p-7 text-left transition-colors duration-300 hover:border-mint/35 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-mint-ink">
              <Sparkles size={18} />
            </span>
            <div>
              <h3 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
                Your project here.
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                We&apos;re taking on a handful of founding clients. Bring the
                idea — we&apos;ll build the rest.
              </p>
            </div>
          </div>
          <span className="flex shrink-0 items-center gap-2 text-xs font-semibold text-mint-ink">
            Start a project
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] transition-transform duration-500 group-hover:rotate-90">
              <Plus size={15} />
            </span>
          </span>
        </motion.button>
      </div>
    </section>
  );
}
