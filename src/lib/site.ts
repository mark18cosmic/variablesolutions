/**
 * Single source of truth for anything that ends up in metadata, structured
 * data, the sitemap or the OG image. Set NEXT_PUBLIC_SITE_URL in production
 * so canonical URLs and og:image resolve against the real domain.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kmsolutions.mv"
).replace(/\/$/, "");

export const site = {
  name: "KMSolutions",
  legalName: "KMSolutions Pvt Ltd",
  tagline: "Any problem. One solution.",
  url: siteUrl,
  email: "hello@kmsolutions.mv",
  locality: "Malé",
  country: "MV",
  description:
    "KMSolutions is a full-service software company in the Maldives building HR management systems, accounting and invoicing software, POS systems, websites, mobile apps and custom software for growing businesses.",
  shortDescription:
    "Full-service software company in the Maldives — HR, accounting, POS, websites, apps and custom software under one roof.",
} as const;

/** Our own products, reused by the apps section copy, footer and JSON-LD. */
export const productSchemas = [
  {
    name: "Roster",
    slug: "roster",
    category: "BusinessApplication",
    description:
      "HR software for small businesses — payroll, attendance, leave, staff records, reporting and role-based permissions.",
  },
  {
    name: "Ledgr",
    slug: "ledgr",
    category: "FinanceApplication",
    description:
      "Accounting and invoicing software — send branded invoices, automate recurring billing, track expenses, stay GST-ready and see cash flow at a glance.",
  },
  {
    name: "Super App",
    slug: "super-app",
    category: "BusinessApplication",
    description:
      "An all-in-one business super app — HR, invoicing, point of sale, bookings and payments as modules sharing one account and one set of data.",
  },
] as const;

export const keywords = [
  "software company Maldives",
  "software development Maldives",
  "HR management system Maldives",
  "HR software Maldives",
  "payroll software Maldives",
  "accounting software Maldives",
  "invoicing software Maldives",
  "invoice software",
  "GST accounting Maldives",
  "POS system Maldives",
  "super app",
  "all in one business app",
  "custom software development",
  "mobile app development Maldives",
  "web development Maldives",
  "KMSolutions",
  "Roster HR software",
  "Ledgr accounting software",
];
