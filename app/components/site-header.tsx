import Image from "next/image";
import Link from "next/link";

import type { Dictionary } from "../i18n/dictionaries/pt";
import type { Locale } from "../i18n/locales";
import { mailto } from "../i18n/site";
import logo from "@/public/images/klock_marca_klock_horizontal_branco_brasao.png";
import { LanguageSwitcher } from "./language-switcher";
import { NavMenu } from "./nav-menu";

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
        {/* Two copies keep DOM order equal to visual order; CSS shows exactly one per width. */}
        <LanguageSwitcher current={locale} label={nav.language} className="lang-switch--bar" />
        <NavMenu label={nav.menu}>
          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
          <LanguageSwitcher current={locale} label={nav.language} className="lang-switch--row" />
          <a href={mailto()} className="btn btn--primary btn--sm nav-menu__cta">
            {nav.cta}
          </a>
        </NavMenu>
      </nav>
    </header>
  );
}
