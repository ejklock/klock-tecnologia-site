import "../globals.css";

import { Inter } from "next/font/google";
import { notFound } from "next/navigation";

import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { getDictionary } from "../i18n/get-dictionary";
import { htmlLang, isLocale, locales } from "../i18n/locales";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);

  return (
    <html lang={htmlLang[locale]} className={inter.variable}>
      <body>
        <a href="#main-content" className="skip-link">
          {dictionary.skipLink}
        </a>
        <SiteHeader locale={locale} nav={dictionary.nav} />
        <main id="main-content">{children}</main>
        <SiteFooter footer={dictionary.footer} />
      </body>
    </html>
  );
}
