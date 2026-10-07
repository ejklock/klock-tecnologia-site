import type { Metadata } from "next";

import { defaultLocale, htmlLang, locales, type Locale } from "./locales";
import { SITE_URL } from "./site";

type PageMeta = { title: string; description: string };

export function localizedMetadata(locale: Locale, path: string, meta: PageMeta): Metadata {
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((candidate) => [htmlLang[candidate], `/${candidate}${path}`]),
  );
  languages["x-default"] = `/${defaultLocale}${path}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/${locale}${path}`, languages },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `/${locale}${path}`,
      siteName: "Klock Tecnologia",
      locale: htmlLang[locale].replace("-", "_"),
      type: "website",
    },
  };
}
