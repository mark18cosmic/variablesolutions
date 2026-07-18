import {
  Users,
  CreditCard,
  Megaphone,
  Globe,
  Smartphone,
  Boxes,
  type LucideIcon,
} from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";

type Service = {
  icon: LucideIcon;
  title: string;
  copy: string;
};

const services: Service[] = [
  {
    icon: Users,
    title: "HR Management",
    copy: "Payroll, attendance, leave and staff records in one calm, compliant system built for how your team actually works.",
  },
  {
    icon: CreditCard,
    title: "POS Systems",
    copy: "Fast, reliable point-of-sale for retail, cafés and resorts — with inventory, reporting and offline resilience.",
  },
  {
    icon: Megaphone,
    title: "Marketing Platforms",
    copy: "Campaigns, CRM and analytics that turn attention into loyal customers, measured end to end.",
  },
  {
    icon: Globe,
    title: "Websites",
    copy: "Personal, corporate and commerce sites — refined, fast and unmistakably yours, engineered to convert.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    copy: "Native-grade iOS and Android experiences that feel effortless and scale with your ambitions.",
  },
  {
    icon: Boxes,
    title: "Custom Software",
    copy: "Have a problem nothing off-the-shelf can solve? We architect bespoke software around it — precisely.",
  },
];

function ServiceCard({ icon: Icon, title, copy }: Service) {
  return (
    <div className="gold-glow-hover group relative h-full overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--background-2)] p-8">
      {/* corner engraving accent */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full border border-[rgba(214,184,92,0.10)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

      <div className="mb-7 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--hairline)] text-sage-gold transition-colors duration-500 group-hover:border-[var(--hairline-strong)]">
        <Icon size={22} strokeWidth={1.4} />
      </div>

      <h3 className="mb-3 font-serif text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-sage">{copy}</p>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative border-t border-[var(--hairline)] py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <SectionLabel>What we build</SectionLabel>
          <h2 className="mt-6 font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
            One studio for every digital need.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-sage">
            Whatever the challenge, we bring the strategy, design and engineering
            to solve it — the way a private bank handles wealth: quietly,
            precisely, and entirely on your terms.
          </p>
        </Reveal>

        <Stagger className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <StaggerItem key={s.title} className="h-full">
              <ServiceCard {...s} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
