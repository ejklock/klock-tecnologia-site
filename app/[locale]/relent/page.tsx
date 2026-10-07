import { notFound } from "next/navigation";

import { ParallaxLayer } from "../../components/parallax-layer";
import { Steps } from "../../components/steps";
import { getDictionary } from "../../i18n/get-dictionary";
import { isLocale } from "../../i18n/locales";
import { localizedMetadata } from "../../i18n/metadata";
import { mailto } from "../../i18n/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/relent">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return localizedMetadata(locale, "/relent", getDictionary(locale).relent.meta);
}

export default async function RelentPage({ params }: PageProps<"/[locale]/relent">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale).relent;
  const waitlistHref = mailto(t.waitlistSubject);

  return (
    <>
      <section className="hero hero--relent">
        <ParallaxLayer speed={0.08} className="hero__bg" />
        <div className="hero__inner">
          <p className="eyebrow eyebrow--light">{t.eyebrow}</p>
          <h1 className="hero__title">{t.title}</h1>
          <p className="hero__subtitle">{t.subtitle}</p>
          <a href={waitlistHref} className="btn-cta">
            {t.waitlist}
          </a>
        </div>
      </section>

      <section className="section narrow">
        <h2 className="section-title">{t.problem.title}</h2>
        <p className="section-lead section-lead--dark">{t.problem.text}</p>
      </section>

      <section className="section section--ink">
        <h2 className="section-title">{t.how.title}</h2>
        <Steps steps={t.how.steps} />
        <p className="section-lead">{t.channels}</p>
      </section>

      <section className="section">
        <h2 className="section-title">{t.principles.title}</h2>
        <ul className="cards">
          {t.principles.items.map((item) => (
            <li key={item.title} className="cards__item">
              <h3 className="cards__title">{item.title}</h3>
              <p className="cards__text">{item.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section section--accent narrow">
        <h2 className="section-title">{t.claude.title}</h2>
        <p className="section-lead">{t.claude.text}</p>
      </section>

      <section className="section section--ink narrow">
        <h2 className="section-title">{t.status.title}</h2>
        <p className="section-lead">{t.status.text}</p>
        <a href={waitlistHref} className="btn-cta">
          {t.waitlist}
        </a>
      </section>
    </>
  );
}
