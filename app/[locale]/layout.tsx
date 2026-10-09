import "../globals.css";

import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";

import { JsonLd } from "../components/json-ld";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { getDictionary } from "../i18n/get-dictionary";
import { htmlLang, isLocale, locales } from "../i18n/locales";
import { professionalServiceSchema } from "../i18n/site";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);

  return (
    <html lang={htmlLang[locale]} className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <JsonLd data={professionalServiceSchema} />
        <a href="#main-content" className="skip-link">
          {dictionary.skipLink}
        </a>
        <SiteHeader locale={locale} nav={dictionary.nav} />
        <main id="main-content">{children}</main>
        <SiteFooter locale={locale} nav={dictionary.nav} footer={dictionary.footer} />
      </body>
    </html>
  );
}
