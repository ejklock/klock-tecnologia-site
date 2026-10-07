import type { Dictionary } from "../i18n/dictionaries/pt";
import { companyLinks, founderLinks, legalEntity } from "../i18n/site";

type Props = { footer: Dictionary["footer"] };

export function SiteFooter({ footer }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <ul className="site-footer__links">
          <li>
            <a href={founderLinks.github} rel="noopener">GitHub</a>
          </li>
          <li>
            <a href={founderLinks.linkedin} rel="noopener">LinkedIn</a>
          </li>
          <li>
            <a href={companyLinks.instagram} rel="noopener">Instagram</a>
          </li>
        </ul>
        <p>
          © {year} Klock Tecnologia. {footer.rights}
        </p>
        <p>
          {legalEntity.name} · CNPJ {legalEntity.cnpj} · {legalEntity.city}
        </p>
      </div>
    </footer>
  );
}
