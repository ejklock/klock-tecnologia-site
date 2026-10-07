import Image from "next/image";
import Link from "next/link";

import type { Dictionary } from "../i18n/dictionaries/pt";
import type { Locale } from "../i18n/locales";
import logo from "@/public/images/klock_marca_klock_horizontal_azul_brasao.png";
import { LanguageSwitcher } from "./language-switcher";

type Props = { locale: Locale; nav: Dictionary["nav"] };

export function SiteHeader({ locale, nav }: Props) {
  const home = `/${locale}`;
  const links = [
    { href: `${home}#services`, label: nav.services },
    { href: `${home}/relent`, label: nav.relent },
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
        <LanguageSwitcher current={locale} label={nav.language} />
      </nav>
    </header>
  );
}
