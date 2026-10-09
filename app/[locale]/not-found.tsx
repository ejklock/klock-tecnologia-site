"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import crest from "@/public/images/klock-brasao-branco.svg";
import { getDictionary } from "../i18n/get-dictionary";
import { defaultLocale, localeFromPathname } from "../i18n/locales";

export default function NotFound() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname) ?? defaultLocale;
  const { notFound } = getDictionary(locale);

  return (
    <section className="band band--brand error-screen">
      <Image src={crest} alt="" className="error-screen__crest" />
      <div className="container error-screen__inner">
        <p className="error-screen__code mono-label">{notFound.code}</p>
        <h1 className="display-title error-screen__title">{notFound.title}</h1>
        <p className="error-screen__text">{notFound.text}</p>
        <div className="error-screen__actions">
          <Link href={`/${locale}`} className="btn btn--primary">
            <span aria-hidden="true" className="btn__arrow">
              ←
            </span>
            {notFound.back}
          </Link>
          <Link href={`/${locale}/relent`} className="btn btn--secondary">
            {notFound.relent}
          </Link>
        </div>
        <p className="error-screen__path mono">
          GET {pathname} <span aria-hidden="true" className="error-screen__arrow">→</span>{" "}
          <span className="error-screen__status">404 Not Found</span>
        </p>
      </div>
    </section>
  );
}
