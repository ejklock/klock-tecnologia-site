import Image from "next/image";

import type { Dictionary } from "../i18n/dictionaries/pt";
import { companyLinks, founderLinks, legalEntity } from "../i18n/site";
import logoWhite from "@/public/images/klock_marca_klock_horizontal_branco_brasao.png";

type Props = { footer: Dictionary["footer"] };

export function SiteFooter({ footer }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <Image src={logoWhite} alt="Klock Tecnologia" className="site-footer__logo" />
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
    </footer>
  );
}
