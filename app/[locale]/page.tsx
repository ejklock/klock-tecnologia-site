import { notFound } from "next/navigation";

import { Clients } from "../components/home/clients";
import { Founder } from "../components/home/founder";
import { Hero } from "../components/home/hero";
import { LiveClocks } from "../components/home/live-clocks";
import { OpenSource } from "../components/home/open-source";
import { Products } from "../components/home/products";
import { NumberedList } from "../components/numbered-list";
import { SectionLabel } from "../components/section-label";
import { Steps } from "../components/steps";
import { getDictionary } from "../i18n/get-dictionary";
import { htmlLang, isLocale } from "../i18n/locales";
import { localizedMetadata } from "../i18n/metadata";
import { CONTACT_EMAIL, mailto } from "../i18n/site";

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return localizedMetadata(locale, "", getDictionary(locale).meta);
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const lang = htmlLang[locale];

  return (
    <>
      <Hero copy={t.hero} lang={lang} />
      <Clients copy={t.clients} />

      <section id="services" className="band">
        <div className="container">
          <SectionLabel index="01">{t.services.label}</SectionLabel>
          <div className="section-head">
            <h2 className="section-heading">{t.services.title}</h2>
            <p className="section-head__intro">{t.services.intro}</p>
          </div>
          <NumberedList items={t.services.items} />
        </div>
      </section>

      <Products copy={t.products} locale={locale} />
      <OpenSource copy={t.openSource} />

      <section id="process" className="band band--alt">
        <div className="container">
          <SectionLabel index="04">{t.process.label}</SectionLabel>
          <h2 className="section-heading section-heading--spaced">{t.process.title}</h2>
          <Steps steps={t.process.steps} prefix={t.process.stepPrefix} />
        </div>
      </section>

      <section id="about" className="band">
        <div className="container">
          <SectionLabel index="05">{t.about.label}</SectionLabel>
          <div className="about">
            <div>
              <h2 className="section-heading">{t.about.title}</h2>
              <p className="about__text">{t.about.text}</p>
              <dl className="facts mono">
                {t.about.facts.map((fact) => (
                  <div key={fact.key} className="facts__item">
                    <dt className="facts__key">{fact.key}</dt>
                    <dd className="facts__value">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <Founder copy={t.founder} />
          </div>
        </div>
      </section>

      <section id="contact" className="band band--brand band--closing">
        <div className="container">
          <SectionLabel index="06" onBrand>
            {t.contact.label}
          </SectionLabel>
          <h2 className="display-title contact__title">{t.contact.title}</h2>
          <p className="contact__text">{t.contact.text}</p>
          <a href={mailto()} className="contact__email mono">
            <span>{CONTACT_EMAIL}</span>
            <span aria-hidden="true">→</span>
          </a>
          <LiveClocks lang={lang} labels={t.contact.clocks} variant="contact" />
        </div>
      </section>
    </>
  );
}
