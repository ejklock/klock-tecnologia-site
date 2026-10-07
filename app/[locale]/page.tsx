import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import crest from "@/public/images/klock-brasao-branco.svg";
import { Clients } from "../components/home/clients";
import { Founder } from "../components/home/founder";
import { NumberedList } from "../components/numbered-list";
import { Steps } from "../components/steps";
import { getDictionary } from "../i18n/get-dictionary";
import { isLocale } from "../i18n/locales";
import { localizedMetadata } from "../i18n/metadata";
import { mailto } from "../i18n/site";

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return localizedMetadata(locale, "", getDictionary(locale).meta);
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <>
      <section id="hero" className="hero">
        <Image src={crest} alt="" className="hero__crest" priority />
        <div className="container">
          <h1 className="hero__title">{t.hero.title}</h1>
          <p className="hero__subtitle">{t.hero.subtitle}</p>
          <a href={mailto()} className="btn-cta">
            {t.hero.cta}
          </a>
        </div>
      </section>

      <section id="services" className="section">
        <div className="container section__grid">
          <h2 className="section-title">{t.services.title}</h2>
          <div className="section__body">
            <NumberedList items={t.services.items} />
          </div>
        </div>
      </section>

      <section id="relent" className="section">
        <div className="container section__grid">
          <h2 className="section-title">Relent</h2>
          <div className="section__body">
            <p className="eyebrow">{t.relentTeaser.eyebrow}</p>
            <p className="lead">{t.relentTeaser.tagline}</p>
            <p>{t.relentTeaser.text}</p>
            <Link href={`/${locale}/relent`} className="btn-cta">
              {t.relentTeaser.cta}
            </Link>
          </div>
        </div>
      </section>

      <section id="process" className="section">
        <div className="container section__grid">
          <h2 className="section-title">{t.process.title}</h2>
          <div className="section__body">
            <Steps steps={t.process.steps} />
          </div>
        </div>
      </section>

      <Clients copy={t.clients} />

      <section id="about" className="section">
        <div className="container section__grid">
          <h2 className="section-title">{t.about.title}</h2>
          <div className="section__body">
            <p>{t.about.text}</p>
          </div>
        </div>
      </section>

      <Founder copy={t.founder} />

      <section id="contact" className="section">
        <div className="container section__grid">
          <h2 className="section-title">{t.contact.title}</h2>
          <div className="section__body">
            <p>{t.contact.text}</p>
            <a href={mailto()} className="btn-cta">
              {t.contact.cta}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
