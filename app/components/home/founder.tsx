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
    <article id="founder" className="founder">
      <Image src={portrait} alt={copy.alt} className="founder__portrait" sizes="8.5rem" />
      <div className="founder__identity">
        <p className="mono-label founder__label">{copy.eyebrow}</p>
        <h3 className="founder__name">{copy.name}</h3>
        <p className="founder__role">{copy.role}</p>
      </div>
      <p className="founder__bio">{copy.bio}</p>
      <ul className="founder__links mono">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} rel={link.href.startsWith("mailto:") ? undefined : "noopener"}>
              {link.label}{" "}
              <span aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}
