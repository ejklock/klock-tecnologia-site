import Image from "next/image";
import Link from "next/link";

import type { Dictionary } from "../i18n/dictionaries/pt";
import type { Locale } from "../i18n/locales";
import { mailto } from "../i18n/site";
import logo from "@/public/images/klock_marca_klock_horizontal_branco_brasao.png";
import { LanguageSwitcher } from "./language-switcher";

type Props = { locale: Locale; nav: Dictionary["nav"] };

export function SiteHeader({ locale, nav }: Props) {
  const home = `/${locale}`;
  const links = [
    { href: `${home}#services`, label: nav.services },
    { href: `${home}#products`, label: nav.products },
    { href: `${home}#opensource`, label: nav.openSource },
    { href: `${home}#about`, label: nav.about },
    { href: `${home}#contact`, label: nav.contact },
  ];

  return (
    <header className="site-header">
      <nav className="nav container" aria-label={nav.label}>
        <Link href={home} className="nav-logo" aria-label={nav.home}>
          <Image src={logo} alt="Klock Tecnologia" className="nav-logo__img" priority />
        </Link>
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
        <div className="nav__actions">
          <LanguageSwitcher current={locale} label={nav.language} />
          <a href={mailto()} className="btn btn--primary btn--sm">
            {nav.cta}
          </a>
        </div>
      </nav>
    </header>
  );
}
