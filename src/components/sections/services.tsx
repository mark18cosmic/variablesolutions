"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  PeopleIcon,
  CardIcon,
  BroadcastIcon,
  BrowserIcon,
  PhoneIcon,
  BlocksIcon,
} from "@/components/service-icons";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { openStartProject } from "@/components/start-project";
import { Tilt, Layer } from "@/components/tilt";
import { Aurora, wash } from "@/components/aurora";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

type Service = {
  icon: (props: { size?: number }) => React.ReactElement;
  title: string;
  copy: string;
  tags: string[];
};

const services: Service[] = [
  {
    icon: PeopleIcon,
    title: "HR Management",
    copy: "Payroll, attendance, leave and staff records in one straightforward system built around how your team actually works.",
    tags: ["Payroll", "Attendance", "Leave"],
  },
  {
    icon: CardIcon,
    title: "POS Systems",
    copy: "Reliable point-of-sale for shops, cafés and resorts — with inventory, clear reporting and no drama at the counter.",
    tags: ["Retail", "Inventory", "Reporting"],
  },
  {
    icon: BroadcastIcon,
    title: "Marketing",
    copy: "Campaigns, CRM and analytics that turn attention into loyal customers — and show you what's working.",
    tags: ["Campaigns", "CRM", "Analytics"],
  },
  {
    icon: BrowserIcon,
    title: "Websites",
    copy: "Personal, company and online-store websites — quick to load, easy to update and unmistakably yours.",
    tags: ["Company", "E-commerce", "SEO"],
  },
  {
    icon: PhoneIcon,
    title: "Apps",
    copy: "iOS and Android apps that feel natural to use and grow comfortably alongside your business.",
    tags: ["iOS", "Android", "Cross-platform"],
  },
  {
    icon: BlocksIcon,
    title: "Custom Software",
    copy: "Got a problem nothing off-the-shelf solves? We'll design and build something shaped exactly around it.",
    tags: ["Bespoke", "Integrations", "Automation"],
  },
];

function ServiceCard({ service, active }: { service: Service; active: boolean }) {
  const { icon: Icon, title, copy, tags } = service;

  return (
    <Tilt className="rounded-2xl">
      <div
        data-active={active}
        className={cn(
          "card-soft surface gradient-ring group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-background-2 p-6 transition-colors duration-500 sm:p-7",
          active ? "border-mint/35" : "border-[var(--line)] hover:border-mint/25"
        )}
      >
        {/* a wash that only wakes up on hover, so idle cards stay flat */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: wash("mint", 0.45) }}
          aria-hidden
        />

        <Layer z={34} className="relative mb-5 w-fit">
          <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-mint/30 via-blue/20 to-violet/30 blur-md" />
          <span className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--glass-line)] bg-background transition-transform duration-500 group-hover:scale-105">
            <Icon size={26} />
          </span>
        </Layer>

        <Layer z={22} className="relative flex flex-1 flex-col">
          <h3 className="mb-2.5 text-lg font-bold tracking-tight text-foreground sm:text-xl">
            {title}
          </h3>
          <p className="mb-6 flex-1 text-sm leading-relaxed text-muted">{copy}</p>

          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[var(--line)] bg-background px-2.5 py-1 text-xs font-medium text-muted-strong transition-colors duration-300 group-hover:border-mint/25"
              >
                {t}
              </span>
            ))}
          </div>
        </Layer>
      </div>
    </Tilt>
  );
}

export function Services() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = !!useReducedMotion();

  /** Width of one card + gap, measured live so it stays responsive. */
  const stepWidth = useCallback(() => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0") || 0;
    return first.offsetWidth + gap;
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      const step = stepWidth();
      if (!track || !step) return;
      const perView = Math.max(1, Math.round(track.offsetWidth / step));
      const max = Math.max(0, services.length - perView);
      const clamped = Math.max(0, Math.min(index, max));
      track.scrollTo({ left: clamped * step, behavior: reduce ? "auto" : "smooth" });
    },
    [stepWidth, reduce]
  );

  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const sync = () => {
      const step = stepWidth();
      if (!step) return;
      setActive(Math.round(track.scrollLeft / step));
      setPerView(Math.max(1, Math.round(track.offsetWidth / step)));
    };

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sync);
    };

    sync();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [stepWidth]);

  // gentle auto-advance that loops back to the start
  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => {
      const track = trackRef.current;
      const step = stepWidth();
      if (!track || !step) return;
      const atEnd =
        track.scrollLeft + track.offsetWidth >= track.scrollWidth - step / 2;
      track.scrollTo({
        left: atEnd ? 0 : track.scrollLeft + step,
        behavior: "smooth",
      });
    }, 4600);
    return () => clearInterval(t);
  }, [reduce, paused, stepWidth]);

  const dots = Math.max(1, services.length - perView + 1);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative flex min-h-screen items-center overflow-hidden border-t border-[var(--line)] px-5 py-24 sm:px-6 lg:px-10"
    >
      <Aurora
        blobs={[
          { className: "-left-[14%] top-[10%] h-[32rem] w-[32rem]", color: wash("blue", 0.4) },
          { className: "-right-[12%] bottom-[6%] h-[30rem] w-[30rem]", color: wash("mint", 0.4), delay: "-9s" },
        ]}
      />

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-3xl">
            <SectionLabel>What we build</SectionLabel>
            <h2
              id="services-heading"
              className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              One team for <span className="text-gradient">everything</span>{" "}
              digital.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Whatever the challenge, we bring the planning, design and
              engineering to solve it properly — start to finish.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="flex shrink-0 items-center gap-2.5">
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              aria-label="Previous services"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] text-muted-strong transition-colors duration-300 hover:border-mint hover:text-mint-ink"
          >
              <ArrowLeft size={17} />
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              aria-label="Next services"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] text-muted-strong transition-colors duration-300 hover:border-mint hover:text-mint-ink"
          >
              <ArrowRight size={17} />
            </button>
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
          className="mt-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
        >
          <div
            ref={trackRef}
            className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-2"
          >
            {services.map((s, i) => (
              <div
                key={s.title}
                className="w-[82%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
            >
                <ServiceCard service={s} active={i === active} />
              </div>
            ))}
          </div>

          <div className="mt-7 flex items-center justify-center gap-2">
            {Array.from({ length: dots }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === active}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  i === active
                    ? "w-7 bg-mint"
                    : "w-1.5 bg-[var(--line-strong)] hover:bg-muted"
                )}
              />
            ))}
          </div>
        </motion.div>

        <Reveal delay={0.1} className="mt-12">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              "Discovery workshops",
              "UI/UX design",
              "Web & mobile",
              "Integrations",
              "Hosting",
              "Support & training",
            ].map((c) => (
              <span
                key={c}
                className="rounded-full border border-[var(--line)] px-3.5 py-1.5 text-xs font-medium text-muted transition-colors duration-300 hover:border-mint/35 hover:text-mint-ink"
            >
                {c}
              </span>
            ))}
            <button
              type="button"
              onClick={openStartProject}
              className="rounded-full bg-mint px-3.5 py-1.5 text-xs font-semibold text-[#0b1310] transition-colors duration-300 hover:bg-[#25d097]"
          >
              Something else? Ask us →
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
