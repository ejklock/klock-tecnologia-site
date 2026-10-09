import Image from "next/image";
import Link from "next/link";

import type { Dictionary } from "../i18n/dictionaries/pt";
import type { Locale } from "../i18n/locales";
import logo from "@/public/images/klock_marca_klock_horizontal_branco_brasao.png";
import { companyLinks, founderLinks, legalEntity } from "../i18n/site";

type Props = { locale: Locale; nav: Dictionary["nav"]; footer: Dictionary["footer"] };

export function SiteFooter({ locale, nav, footer }: Props) {
  const year = new Date().getFullYear();
  const home = `/${locale}`;

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Image src={logo} alt="Klock Tecnologia" className="site-footer__logo" />
            <p className="site-footer__tagline">{footer.tagline}</p>
          </div>
          <nav aria-label={footer.label}>
            <p className="mono-label site-footer__heading">{footer.navigation}</p>
            <ul className="site-footer__list">
              <li>
                <Link href={`${home}#services`}>{nav.services}</Link>
              </li>
              <li>
                <Link href={`${home}#products`}>{nav.products}</Link>
              </li>
              <li>
                <Link href={`${home}/relent`}>
                  <span aria-hidden="true">↳ </span>
                  {nav.relent}
                </Link>
              </li>
              <li>
                <Link href={`${home}#opensource`}>{nav.openSource}</Link>
              </li>
              <li>
                <Link href={`${home}#about`}>{nav.about}</Link>
              </li>
              <li>
                <Link href={`${home}#contact`}>{nav.contact}</Link>
              </li>
            </ul>
          </nav>
          <div>
            <p className="mono-label site-footer__heading">{footer.social}</p>
            <ul className="site-footer__list">
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
          </div>
        </div>
        <div className="site-footer__legal mono">
          <span>
            © {year} Klock Tecnologia. {footer.rights}
          </span>
          <span>
            {legalEntity.name} · CNPJ {legalEntity.cnpj} · {legalEntity.city}
          </span>
        </div>
      </div>
    </footer>
  );
}
