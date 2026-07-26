import {
  OverlapIcon,
  RingIcon,
  ArcIcon,
  PillIcon,
  PhonePillIcon,
  TriCircleIcon,
} from "@/components/service-icons";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";

type Service = {
  icon: (props: { size?: number }) => React.ReactElement;
  title: string;
  copy: string;
};

const services: Service[] = [
  {
    icon: OverlapIcon,
    title: "HR Management",
    copy: "Payroll, attendance, leave and staff records in one calm, compliant system built for how your team actually works.",
  },
  {
    icon: RingIcon,
    title: "POS Systems",
    copy: "Fast, reliable point-of-sale for retail, cafés and resorts — with inventory, reporting and offline resilience.",
  },
  {
    icon: ArcIcon,
    title: "Marketing",
    copy: "Campaigns, CRM and analytics that turn attention into loyal customers, measured end to end.",
  },
  {
    icon: PillIcon,
    title: "Websites",
    copy: "Personal, corporate and commerce sites — refined, fast and unmistakably yours, engineered to convert.",
  },
  {
    icon: PhonePillIcon,
    title: "Apps",
    copy: "Native-grade iOS and Android experiences that feel effortless and scale with your ambitions.",
  },
  {
    icon: TriCircleIcon,
    title: "Custom Software",
    copy: "Have a problem nothing off-the-shelf can solve? We architect bespoke software around it — precisely.",
  },
];

function ServiceCard({ icon: Icon, title, copy }: Service) {
  return (
    <div className="flat-hover group relative h-full overflow-hidden rounded-2xl border border-[var(--line)] bg-background-2 p-8">
      <div className="mb-7 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-background text-mint">
        <Icon size={22} />
      </div>

      <h3 className="mb-3 text-xl font-bold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-muted">{copy}</p>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative border-t border-[var(--line)] py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <SectionLabel>What we build</SectionLabel>
          <h2 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
            One company for every digital need.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">
            Whatever the challenge, we bring the strategy, design and
            engineering to solve it — any problem, one solution.
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
