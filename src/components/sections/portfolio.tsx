"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, Sparkles, Plus } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { openStartProject } from "@/components/start-project";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

type Project = {
  name: string;
  tag: string;
  copy: string;
  href?: string;
  image: string;
  tags: string[];
  featured?: boolean;
};

const projects: Project[] = [
  {
    name: "The Edge",
    tag: "Live",
    href: "https://theedge.mv",
    copy: "A bold digital presence for a Maldivian brand — fast, refined and built to convert. Our first flagship engagement.",
    image: "/projects/the-edge.svg",
    tags: ["Web", "Brand", "Next.js"],
    featured: true,
  },
];

function TiltCard({
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
        "group relative h-full overflow-hidden rounded-3xl border border-[var(--line)] bg-background-2",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function Portfolio() {
  return (
    <section
      id="work"
      className="relative overflow-hidden border-t border-[var(--line)] py-28 lg:py-36"
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <SectionLabel>Selected work</SectionLabel>
          <h2 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            A young company, <span className="text-mint">big ambitions.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">
            We&apos;re just getting started — and picky about what we take on.
            Here&apos;s where it begins. The next line could be yours.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Featured live project */}
          {projects.map((p) => (
            <motion.a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease }}
              className="lg:col-span-2"
            >
              <TiltCard className="flex flex-col">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-background">
                  <Image
                    src={p.image}
                    alt={`${p.name} project preview`}
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="(min-width: 1024px) 60vw, 100vw"
                  />
                </div>

                <div className="relative flex flex-1 flex-col justify-between p-9">
                  <div className="flex items-start justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full border border-mint/40 px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-mint">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
                      </span>
                      {p.tag}
                    </span>
                    <ArrowUpRight
                      size={26}
                      className="text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-mint"
                    />
                  </div>

                  <div className="mt-10">
                    <h3 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                      {p.name}
                    </h3>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
                      {p.copy}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-[var(--line)] px-3 py-1 text-xs tracking-wide text-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="mt-6 inline-block text-xs font-medium tracking-wide text-mint/80">
                      theedge.mv →
                    </span>
                  </div>
                </div>
              </TiltCard>
            </motion.a>
          ))}

          {/* Honest "your project here" invitation card */}
          <motion.button
            type="button"
            onClick={openStartProject}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease, delay: 0.12 }}
            className="text-left"
          >
            <TiltCard className="flex min-h-[300px] flex-col justify-between border-dashed p-9">
              <div className="flex items-start justify-between">
                <Sparkles size={22} className="text-mint" />
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-mint transition-all duration-300 group-hover:rotate-90 group-hover:border-mint/50">
                  <Plus size={18} />
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-foreground">
                  Your project here.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  We&apos;re taking on a handful of founding clients. Bring the
                  idea — we&apos;ll build the rest.
                </p>
                <span className="mt-6 inline-block text-xs font-medium tracking-wide text-mint/80">
                  Start a project →
                </span>
              </div>
            </TiltCard>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
