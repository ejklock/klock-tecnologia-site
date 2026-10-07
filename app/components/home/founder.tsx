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
    <section id="founder" className="section founder">
      <div className="founder__inner">
        <Image src={portrait} alt={copy.name} className="founder__portrait" sizes="(min-width: 768px) 280px, 60vw" />
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="founder__name">{copy.name}</h2>
          <p className="founder__role">{copy.role}</p>
          <p className="founder__bio">{copy.bio}</p>
          <ul className="founder__links">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="pill-link"
                  rel={link.href.startsWith("mailto:") ? undefined : "noopener"}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
