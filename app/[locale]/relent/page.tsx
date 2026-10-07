import { notFound } from "next/navigation";

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
      <section className="hero">
        <div className="container">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 className="hero__title">{t.title}</h1>
          <p className="hero__subtitle">{t.subtitle}</p>
          <a href={waitlistHref} className="btn-cta">
            {t.waitlist}
          </a>
        </div>
      </section>

      <section className="section">
        <div className="container section__grid">
          <h2 className="section-title">{t.problem.title}</h2>
          <div className="section__body">
            <p>{t.problem.text}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container section__grid">
          <h2 className="section-title">{t.how.title}</h2>
          <div className="section__body">
            <Steps steps={t.how.steps} />
            <p>{t.channels}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container section__grid">
          <h2 className="section-title">{t.principles.title}</h2>
          <div className="section__body">
            <ul className="rows">
              {t.principles.items.map((item) => (
                <li key={item.title} className="row">
                  <div>
                    <h3 className="row__title">{item.title}</h3>
                    <p className="row__text">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container section__grid">
          <h2 className="section-title">{t.byok.title}</h2>
          <div className="section__body">
            <p>{t.byok.text}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container section__grid">
          <h2 className="section-title">{t.status.title}</h2>
          <div className="section__body">
            <p>{t.status.text}</p>
            <a href={waitlistHref} className="btn-cta">
              {t.waitlist}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
