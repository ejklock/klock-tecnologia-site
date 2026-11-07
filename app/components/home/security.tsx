import type { ReactElement } from "react";

import type { Dictionary } from "../../i18n/dictionaries/pt";
import { founderLinks } from "../../i18n/site";
import { NumberedList } from "../numbered-list";
import { SectionLabel } from "../section-label";

type Props = { copy: Dictionary["security"] };

export function Security({ copy }: Props): ReactElement {
  return (
    <section id="security" className="band band--flush-top">
      <div className="container">
        <SectionLabel index="02">{copy.label}</SectionLabel>
        <div className="section-head">
          <h2 className="section-heading">{copy.title}</h2>
          <p className="section-head__intro">{copy.intro}</p>
        </div>
        <NumberedList items={copy.items} />
        <div className="security-tools">
          <p className="security-tools__label mono-label">{copy.tools.label}</p>
          <p className="security-tools__text">{copy.tools.text}</p>
          <ul className="repo-grid">
            {copy.tools.repos.map((repo) => (
              <li key={repo.name} className="repo-grid__item">
                <a href={`${founderLinks.github}/${repo.name}`} rel="noopener" className="repo-card">
                  <span className="repo-card__head">
                    <span className="repo-card__name mono">{repo.name}</span>
                    <span aria-hidden="true" className="repo-card__arrow">
                      ↗
                    </span>
                  </span>
                  <span className="repo-card__text">{repo.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
