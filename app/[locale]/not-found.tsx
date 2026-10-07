"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { getDictionary } from "../i18n/get-dictionary";
import { defaultLocale, localeFromPathname } from "../i18n/locales";

export default function NotFound() {
  const locale = localeFromPathname(usePathname()) ?? defaultLocale;
  const { notFound } = getDictionary(locale);

  return (
    <section className="section not-found">
      <h1 className="section-title">404</h1>
      <p>{notFound.title}</p>
      <Link href={`/${locale}`} className="btn-cta btn-cta--dark">
        {notFound.back}
      </Link>
    </section>
  );
}
