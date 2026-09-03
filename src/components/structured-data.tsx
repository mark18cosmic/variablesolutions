import { productSchemas, site, siteUrl } from "@/lib/site";

/**
 * JSON-LD for the single-page site: the organisation itself, the site (with a
 * search-free WebSite node), each in-house product, and the services we sell.
 * Emitted server-side so crawlers see it in the initial HTML.
 */
export function StructuredData() {
  const graph = [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: site.name,
      legalName: site.legalName,
      url: siteUrl,
      slogan: site.tagline,
      description: site.description,
      email: site.email,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icon.svg`,
      },
      image: `${siteUrl}/opengraph-image`,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.locality,
        addressCountry: site.country,
      },
      areaServed: {
        "@type": "Country",
        name: "Maldives",
      },
      knowsAbout: [
        "HR management systems",
        "Accounting and invoicing software",
        "Point of sale systems",
        "Web development",
        "Mobile app development",
        "Custom software development",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: site.email,
        areaServed: "MV",
        availableLanguage: ["en", "dv"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: site.name,
      description: site.shortDescription,
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: `${site.name} — software development`,
      url: siteUrl,
      description: site.description,
      parentOrganization: { "@id": `${siteUrl}/#organization` },
      areaServed: { "@type": "Country", name: "Maldives" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Software services",
        itemListElement: [
          "HR management systems",
          "POS systems",
          "Accounting and invoicing",
          "Marketing",
          "Websites",
          "Mobile apps",
          "Custom software",
        ].map((service) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: service },
        })),
      },
    },
    ...productSchemas.map((product) => ({
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#${product.slug}`,
      name: product.name,
      applicationCategory: product.category,
      operatingSystem: "Web, iOS, Android",
      description: product.description,
      url: `${siteUrl}/#apps`,
      publisher: { "@id": `${siteUrl}/#organization` },
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/PreOrder",
        price: "0",
        priceCurrency: "MVR",
      },
    })),
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
