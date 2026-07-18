"use client";

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
  tags: string[];
  featured?: boolean;
};

const projects: Project[] = [
  {
    name: "The Edge",
    tag: "Live",
    href: "https://theedge.mv",
    copy: "A bold digital presence for a Maldivian brand — fast, refined and built to convert. Our first flagship engagement.",
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
      transition={{ duration: 0.5, ease }}
      className={cn(
        "group relative h-full overflow-hidden rounded-3xl border border-[var(--hairline)] bg-[var(--background-2)]",
        className
      )}
    >
      {/* moving sheen on hover */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[rgba(246,226,122,0.07)] to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
      {children}
    </motion.div>
  );
}

export function Portfolio() {
  return (
    <section
      id="work"
      className="relative overflow-hidden border-t border-[var(--hairline)] py-28 lg:py-36"
    >
      {/* animated gold blob */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(246,226,122,0.10),transparent_70%)] blur-2xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <SectionLabel>Selected work</SectionLabel>
          <h2 className="mt-6 font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            A young studio,{" "}
            <span className="text-gold-gradient italic">big ambitions.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-sage">
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
              <TiltCard className="flex min-h-[300px] flex-col justify-between p-9">
                <div className="relative flex items-start justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline-strong)] px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-sage-gold">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-light opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold-light" />
                    </span>
                    {p.tag}
                  </span>
                  <ArrowUpRight
                    size={26}
                    className="text-sage transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-sage-gold"
                  />
                </div>

                <div className="relative mt-10">
                  <h3 className="font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                    {p.name}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-sage">
                    {p.copy}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-[var(--hairline)] px-3 py-1 text-xs tracking-wide text-sage"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="mt-6 inline-block text-xs font-medium tracking-wide text-sage-gold/80">
                    theedge.mv →
                  </span>
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
                <Sparkles size={22} className="text-sage-gold" />
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--hairline)] text-sage-gold transition-all duration-500 group-hover:rotate-90 group-hover:border-[var(--hairline-strong)]">
                  <Plus size={18} />
                </span>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
                  Your project here.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-sage">
                  We&apos;re taking on a handful of founding clients. Bring the
                  idea — we&apos;ll build the rest.
                </p>
                <span className="mt-6 inline-block text-xs font-medium tracking-wide text-sage-gold/80">
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
