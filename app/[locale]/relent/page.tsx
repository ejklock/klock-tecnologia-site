import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "../../components/json-ld";
import { SectionLabel } from "../../components/section-label";
import { Steps } from "../../components/steps";
import { getDictionary } from "../../i18n/get-dictionary";
import { isLocale } from "../../i18n/locales";
import { localizedMetadata } from "../../i18n/metadata";
import { mailto, relentSchema } from "../../i18n/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/relent">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return localizedMetadata(locale, "/relent", getDictionary(locale).relent.meta);
}

export default async function RelentPage({ params }: PageProps<"/[locale]/relent">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  const t = dictionary.relent;
  const waitlistHref = mailto(t.waitlistSubject);

  return (
    <>
      <JsonLd data={relentSchema(locale, t.meta.description)} />

      <section id="hero" className="page-hero">
        <div className="container page-hero__inner">
          <div className="page-hero__strip">
            <nav aria-label={t.breadcrumb} className="breadcrumb mono-label">
              <ol className="breadcrumb__list">
                <li>
                  <Link href={`/${locale}`}>Klock</Link>
                </li>
                <li>
                  <span aria-hidden="true" className="breadcrumb__separator">
                    /
                  </span>
                </li>
                <li>
                  <Link href={`/${locale}#products`}>{dictionary.nav.products}</Link>
                </li>
                <li>
                  <span aria-hidden="true" className="breadcrumb__separator">
                    /
                  </span>
                </li>
                <li aria-current="page" className="breadcrumb__current">
                  {dictionary.nav.relent}
                </li>
              </ol>
            </nav>
            <span className="status-pill status-pill--on-brand mono-label">
              <span className="status-pill__dot" aria-hidden="true" />
              {dictionary.products.status}
            </span>
          </div>
          <div className="page-hero__grid">
            <div>
              <h1 className="display-title page-hero__title page-hero__title--wide">{t.title}</h1>
              <p className="page-hero__subtitle">{t.subtitle}</p>
              <div className="page-hero__actions">
                <a href={waitlistHref} className="btn btn--primary">
                  {t.waitlist}
                  <span aria-hidden="true" className="btn__arrow">
                    →
                  </span>
                </a>
                <a href="#how" className="btn btn--secondary">
                  {t.how.label}
                </a>
              </div>
            </div>
            <div className="spec">
              <p className="spec__head mono-label">
                <span>{t.panel.title}</span>
                <span>{t.panel.file}</span>
              </p>
              <ul className="spec__tasks mono">
                {t.panel.tasks.map((task) => (
                  <li key={task} className="spec__task">
                    <span aria-hidden="true" className="spec__task-mark">
                      →
                    </span>
                    <span>{task}</span>
                  </li>
                ))}
                <li className="spec__task spec__task--channel">
                  <span aria-hidden="true">⌁</span>
                  <span>{t.panel.channel}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="band band--ruled">
        <div className="container relent-problem">
          <SectionLabel index="01" asHeading>
            {t.problem.label}
          </SectionLabel>
          <p className="relent-problem__statement">
            {t.problem.lead} <span className="relent-problem__rest">{t.problem.rest}</span>
          </p>
        </div>
      </section>

      <section id="how" className="band band--flush-top">
        <div className="container">
          <SectionLabel index="02">{t.how.label}</SectionLabel>
          <h2 className="section-heading section-heading--spaced">{t.how.title}</h2>
          <Steps steps={t.how.steps} />
          <div className="channels mono">
            <span className="channels__label mono-label">{t.how.channels.label}</span>
            <span className="channels__item">
              <span aria-hidden="true" className="channels__dot" />
              {t.how.channels.telegram}
            </span>
            <span className="channels__item channels__item--soon">
              <span aria-hidden="true" className="channels__dot channels__dot--off" />
              {t.how.channels.email}
            </span>
            <span className="channels__item channels__item--soon">
              <span aria-hidden="true" className="channels__dot channels__dot--off" />
              {t.how.channels.other}
            </span>
          </div>
        </div>
      </section>

      <section className="band band--alt">
        <div className="container">
          <SectionLabel index="03">{t.principles.label}</SectionLabel>
          <h2 className="section-heading section-heading--spaced">{t.principles.title}</h2>
          <ul className="principles">
            {t.principles.items.map((item) => (
              <li key={item.title} className="principles__item">
                <h3 className="principles__title">{item.title}</h3>
                <p className="principles__text">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band">
        <div className="container byok">
          <div>
            <SectionLabel index="04">{t.byok.label}</SectionLabel>
            <h2 className="section-heading">{t.byok.title}</h2>
            <p className="byok__text">{t.byok.text}</p>
          </div>
          <ul aria-label={t.byok.providersLabel} className="provider-list mono">
            {t.byok.providers.map((provider) => (
              <li key={provider.name} className="provider-list__item">
                <span>{provider.name}</span>
                <span className="provider-list__models">{provider.models}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band band--brand band--closing">
        <div className="container">
          <SectionLabel index="05" onBrand>
            {t.status.label}
          </SectionLabel>
          <h2 className="display-title status__title">{t.status.title}</h2>
          <p className="status__text">{t.status.text}</p>
          <a href={waitlistHref} className="btn btn--primary status__cta">
            {t.waitlist}
            <span aria-hidden="true" className="btn__arrow">
              →
            </span>
          </a>
        </div>
      </section>
    </>
  );
}
