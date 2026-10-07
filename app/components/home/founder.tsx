import Image from "next/image";

import type { Dictionary } from "../../i18n/dictionaries/pt";
import { founderLinks, mailto } from "../../i18n/site";
import portrait from "@/public/images/evaldo-klock.jpg";

type Props = { copy: Dictionary["founder"] };

export function Founder({ copy }: Props) {
  const links = [
    { href: founderLinks.github, label: copy.links.github },
    { href: founderLinks.linkedin, label: copy.links.linkedin },
    { href: mailto(), label: copy.links.email },
  ];

  return (
    <section id="founder" className="section">
      <div className="container section__grid">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="section-title">{copy.name}</h2>
        </div>
        <div className="section__body founder__body">
          <Image src={portrait} alt={copy.name} className="founder__portrait" sizes="(min-width: 768px) 220px, 60vw" />
          <div>
            <p className="lead">{copy.role}</p>
            <p>{copy.bio}</p>
            <ul className="founder__links">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} rel={link.href.startsWith("mailto:") ? undefined : "noopener"}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
