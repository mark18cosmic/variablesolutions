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
import { StartProjectButton } from "@/components/start-project";

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

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="border-b border-[var(--line)] px-5 py-20 sm:px-6 sm:py-24 lg:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        <Reveal className="max-w-2xl">
          <SectionLabel>What we build</SectionLabel>
          <h2
            id="services-heading"
            className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl"
          >
            One team for everything digital.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Whatever the challenge, we bring the planning, design and
            engineering to solve it properly — start to finish.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, copy, tags }) => (
            <div
              key={title}
              className="flex flex-col bg-background p-7 transition-colors hover:bg-background-2"
            >
              <Icon size={26} />
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                {title}
              </h3>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">{copy}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[var(--line)] px-2.5 py-1 text-xs text-muted-strong"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Reveal className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            Discovery workshops · UI/UX design · Web &amp; mobile · Integrations
            · Hosting · Support and training.
          </p>
          <StartProjectButton size="sm" variant="outline" className="shrink-0">
            Something else? Ask us
          </StartProjectButton>
        </Reveal>
      </div>
    </section>
  );
}
