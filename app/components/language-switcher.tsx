"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { localeNames, locales, swapPathLocale, type Locale } from "../i18n/locales";

type Props = { current: Locale; label: string; className?: string };

export function LanguageSwitcher({ current, label, className }: Props) {
  const pathname = usePathname();

  return (
    <ul className={className ? `lang-switch mono ${className}` : "lang-switch mono"} aria-label={label}>
      {locales.map((locale) => (
        <li key={locale} className="lang-switch__item">
          <Link
            href={swapPathLocale(pathname, locale)}
            hrefLang={locale}
            aria-label={localeNames[locale].full}
            aria-current={locale === current ? "true" : undefined}
            className="lang-switch__link"
          >
            {localeNames[locale].short}
          </Link>
        </li>
      ))}
    </ul>
  );
}
