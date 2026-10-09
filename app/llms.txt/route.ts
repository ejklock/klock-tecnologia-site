import { en } from "../i18n/dictionaries/en";
import { locales } from "../i18n/locales";
import { openSourceRepos, repoUrl } from "../i18n/open-source-repos";
import { CONTACT_EMAIL, founderLinks, SITE_URL } from "../i18n/site";

export const dynamic = "force-static";

const PAGE_LABELS = {
  en: { home: "Home (English)", relent: "Relent (English)" },
  pt: { home: "Home (Portuguese)", relent: "Relent (Portuguese)" },
} as const;

function buildLlmsTxt(): string {
  const { products, relent, openSource, services, about, contact } = en;
  const providers = relent.byok.providers.map((provider) => provider.name).join(", ");

  const lines = [
    "# Klock Tecnologia",
    "",
    `> ${en.meta.description}`,
    "",
    `${about.text} ${contact.text}`,
    "",
    "## Services",
    "",
    ...services.items.map((item) => `- **${item.title}**: ${item.text}`),
    "",
    "## Products",
    "",
    `- [Relent](${SITE_URL}/en/relent): ${products.tagline}`,
    "",
    `${relent.byok.title} ${relent.byok.text}`,
    "",
    `${relent.byok.providersLabel}: ${providers}`,
    "",
    "## Open source",
    "",
    ...openSourceRepos.map((name) => `- [${name}](${repoUrl(name)}): ${openSource.repos[name].description}`),
    "",
    "## Pages",
    "",
    ...locales.flatMap((locale) => [
      `- [${PAGE_LABELS[locale].home}](${SITE_URL}/${locale})`,
      `- [${PAGE_LABELS[locale].relent}](${SITE_URL}/${locale}/relent)`,
    ]),
    "",
    "## Contact",
    "",
    `- Email: ${CONTACT_EMAIL}`,
    `- GitHub: [${openSource.profile}](${founderLinks.github})`,
    "",
  ];
  return lines.join("\n");
}

export function GET(): Response {
  return new Response(buildLlmsTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
