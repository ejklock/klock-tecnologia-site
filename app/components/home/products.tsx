import Link from "next/link";

import type { Locale } from "../../i18n/locales";
import type { Dictionary } from "../../i18n/dictionaries/pt";
import { SectionLabel } from "../section-label";

type Props = { copy: Dictionary["products"]; locale: Locale };

export function Products({ copy, locale }: Props) {
  return (
    <section id="products" className="band band--flush-top">
      <div className="container">
        <SectionLabel index="02">{copy.label}</SectionLabel>
        <div className="section-head">
          <h2 className="section-heading">{copy.title}</h2>
          <p className="section-head__intro">{copy.intro}</p>
        </div>
        <div className="product-card">
          <div className="product-card__body">
            <span className="status-pill mono-label">
              <span className="status-pill__dot" aria-hidden="true" />
              {copy.status}
            </span>
            <h3 className="product-card__name">Relent</h3>
            <p className="product-card__tagline">{copy.tagline}</p>
            <p className="product-card__text">{copy.text}</p>
            <Link href={`/${locale}/relent`} className="btn btn--dark product-card__cta">
              {copy.cta}
              <span aria-hidden="true" className="btn__arrow">
                →
              </span>
            </Link>
          </div>
          <ol className="product-card__steps">
            {copy.steps.map((step, index) => (
              <li key={step.title} className="product-card__step">
                <span className="product-card__step-number mono">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <strong className="product-card__step-title">{step.title}</strong>
                  <p className="product-card__step-text">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
