import type { Dictionary } from "../../i18n/dictionaries/pt";
import { openSourceRepos, repoUrl } from "../../i18n/open-source-repos";
import { founderLinks } from "../../i18n/site";
import { SectionLabel } from "../section-label";

const GITHUB_PROFILE = founderLinks.github;

type Props = { copy: Dictionary["openSource"] };

export function OpenSource({ copy }: Props) {
  return (
    <section id="opensource" className="band band--flush-top">
      <div className="container">
        <SectionLabel index="03">{copy.label}</SectionLabel>
        <div className="section-head">
          <h2 className="section-heading">{copy.title}</h2>
          <div className="section-head__aside">
            <p className="section-head__intro">{copy.intro}</p>
            <a href={GITHUB_PROFILE} rel="noopener" className="underlined-link mono">
              {copy.profile} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <ul className="repo-grid">
          {openSourceRepos.map((name) => (
            <li key={name} className="repo-grid__item">
              <a href={repoUrl(name)} rel="noopener" className="repo-card">
                <span className="repo-card__head">
                  <span className="repo-card__name mono">{name}</span>
                  <span aria-hidden="true" className="repo-card__arrow">
                    ↗
                  </span>
                </span>
                <span className="repo-card__text">{copy.repos[name].description}</span>
                <span className="tag-list tag-list--small mono">
                  {copy.repos[name].tags.map((tag) => (
                    <span key={tag} className="tag-list__item">
                      {tag}
                    </span>
                  ))}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
