export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

export const htmlLang: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en",
};

export const localeNames: Record<Locale, { short: string; full: string }> = {
  pt: { short: "PT", full: "Português" },
  en: { short: "EN", full: "English" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function localeFromPathname(pathname: string): Locale | undefined {
  const firstSegment = pathname.split("/")[1] ?? "";
  return isLocale(firstSegment) ? firstSegment : undefined;
}

export function swapPathLocale(pathname: string, target: Locale): string {
  const current = localeFromPathname(pathname);
  if (current === undefined) return `/${target}${pathname === "/" ? "" : pathname}`;
  return `/${target}${pathname.slice(current.length + 1)}`;
}

export function negotiateLocale(acceptLanguage: string | null): Locale {
  if (acceptLanguage === null) return defaultLocale;
  const ranked = acceptLanguage
    .split(",")
    .map((entry) => {
      const [tag = "", ...params] = entry.trim().split(";");
      const qualityParam = params.find((param) => param.trim().startsWith("q="));
      const quality = qualityParam === undefined ? 1 : Number(qualityParam.trim().slice(2));
      return { language: tag.toLowerCase().split("-")[0] ?? "", quality: Number.isFinite(quality) ? quality : 0 };
    })
    .filter((entry) => entry.quality > 0)
    .sort((a, b) => b.quality - a.quality);
  for (const { language } of ranked) {
    if (isLocale(language)) return language;
  }
  return defaultLocale;
}
