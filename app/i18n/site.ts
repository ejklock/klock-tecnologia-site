import { htmlLang, type Locale } from "./locales";

export const SITE_URL = "https://www.klocktecnologia.com";

export const CONTACT_EMAIL = "evaldo@klocktecnologia.com";

export const founderLinks = {
  github: "https://github.com/ejklock",
  linkedin: "https://www.linkedin.com/in/ejklock",
} as const;

export const companyLinks = {
  instagram: "https://www.instagram.com/klocktecnologia",
} as const;

export const legalEntity = {
  name: "E. J. K. NETO LTDA",
  cnpj: "38.043.818/0001-64",
  city: "Cuiabá, MT",
} as const;

export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Klock Tecnologia",
  url: SITE_URL,
  email: CONTACT_EMAIL,
  foundingDate: "2020",
  address: { "@type": "PostalAddress", addressLocality: "Cuiabá", addressRegion: "MT", addressCountry: "BR" },
  areaServed: ["BR", "US"],
  knowsAbout: [
    "Node.js",
    "NestJS",
    "TypeScript",
    "Laravel",
    "PHP",
    "AWS",
    "AI-assisted software engineering",
    "Model Context Protocol (MCP)",
    "Retrieval-Augmented Generation (RAG)",
    "AI agents",
    "SEO",
    "Social media",
    "Video editing",
  ],
  founder: { "@type": "Person", name: "Evaldo Klock" },
} as const;

export function relentSchema(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Relent",
    description,
    url: `${SITE_URL}/${locale}/relent`,
    inLanguage: htmlLang[locale],
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    publisher: { "@type": "Organization", name: "Klock Tecnologia", url: SITE_URL },
  } as const;
}

export function mailto(subject?: string): string {
  return subject === undefined ? `mailto:${CONTACT_EMAIL}` : `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}
