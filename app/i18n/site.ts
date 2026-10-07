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

export function mailto(subject?: string): string {
  return subject === undefined ? `mailto:${CONTACT_EMAIL}` : `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}
