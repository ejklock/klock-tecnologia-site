import Image from "next/image";

import crest from "@/public/images/klock-brasao-branco.svg";
import type { Dictionary } from "../../i18n/dictionaries/pt";
import { mailto } from "../../i18n/site";
import { LiveClocks } from "./live-clocks";

type Props = { copy: Dictionary["hero"]; lang: string };

export function Hero({ copy, lang }: Props) {
  return (
    <section id="hero" className="page-hero">
      <Image src={crest} alt="" className="page-hero__crest" priority />
      <div className="container page-hero__inner">
        <p className="page-hero__strip mono-label">
          {copy.strip.map((item, index) => (
            <span key={item} className="page-hero__strip-item">
              {index > 0 && (
                <span aria-hidden="true" className="page-hero__separator">
                  /
                </span>
              )}
              <span>{item}</span>
            </span>
          ))}
        </p>
        <div className="page-hero__grid">
          <div>
            <h1 className="display-title page-hero__title">{copy.title}</h1>
            <p className="page-hero__subtitle">{copy.subtitle}</p>
            <div className="page-hero__actions">
              <a href={mailto(copy.primarySubject)} className="btn btn--primary">
                {copy.primary}
                <span aria-hidden="true" className="btn__arrow">
                  →
                </span>
              </a>
              <a href="#services" className="btn btn--secondary">
                {copy.secondary}
              </a>
            </div>
          </div>
          <div className="spec">
            <p className="spec__head mono-label">
              <span>{copy.spec.title}</span>
              <span>{copy.spec.file}</span>
            </p>
            <dl className="spec__list mono" aria-label={copy.spec.title}>
              {copy.spec.rows.map((row) => (
                <div key={row.key} className="spec__row">
                  <dt>{row.key}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
              <div className="spec__row">
                <dt>{copy.spec.now}</dt>
                <dd>
                  <LiveClocks lang={lang} labels={copy.spec.clocks} variant="hero" />
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
