import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Clients } from "../components/home/clients";
import { Founder } from "../components/home/founder";
import { Marquee } from "../components/marquee";
import { NumberedList } from "../components/numbered-list";
import { ParallaxLayer } from "../components/parallax-layer";
import { Steps } from "../components/steps";
import { getDictionary } from "../i18n/get-dictionary";
import { isLocale } from "../i18n/locales";
import { localizedMetadata } from "../i18n/metadata";
import { mailto } from "../i18n/site";
import crest from "@/public/images/klock_marca_klock_vertical_azul_brasao.png";

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
        <ParallaxLayer speed={0.08} className="hero__bg" />
        <div className="hero__inner">
          <h1 className="hero__title">{t.hero.title}</h1>
          <p className="hero__subtitle">{t.hero.subtitle}</p>
          <a href={mailto()} className="btn-cta">
            {t.hero.cta}
          </a>
        </div>
      </section>

      <Marquee words={t.marquee} />

      <section id="services" className="section">
        <h2 className="section-title">{t.services.title}</h2>
        <NumberedList items={t.services.items} />
      </section>

      <section id="relent" className="section section--accent relent-teaser">
        <div className="relent-teaser__inner">
          <p className="eyebrow">{t.relentTeaser.eyebrow}</p>
          <h2 className="relent-teaser__name">Relent</h2>
          <p className="relent-teaser__tagline">{t.relentTeaser.tagline}</p>
          <p className="relent-teaser__text">{t.relentTeaser.text}</p>
          <Link href={`/${locale}/relent`} className="btn-cta">
            {t.relentTeaser.cta}
          </Link>
        </div>
      </section>

      <section id="process" className="section">
        <h2 className="section-title">{t.process.title}</h2>
        <Steps steps={t.process.steps} />
      </section>

      <Clients copy={t.clients} />

      <section id="statement" className="statement">
        <ParallaxLayer speed={0.12} className="statement__outline">
          KLOCK
        </ParallaxLayer>
        <p className="statement__text">{t.statement}</p>
      </section>

      <section id="about" className="section about">
        <Image src={crest} alt="" className="about__crest" />
        <h2 className="section-title">{t.about.title}</h2>
        <p className="about__text">{t.about.text}</p>
      </section>

      <Founder copy={t.founder} />

      <section id="contact" className="section section--ink contact">
        <h2 className="section-title">{t.contact.title}</h2>
        <p className="section-lead">{t.contact.text}</p>
        <a href={mailto()} className="btn-cta">
          {t.contact.cta}
        </a>
      </section>
    </>
  );
}
