import Image, { type StaticImageData } from "next/image";

import type { Dictionary } from "../../i18n/dictionaries/pt";
import baseDigital from "@/public/images/base-digital.svg";
import gaussian from "@/public/images/logo-gaussian.svg";
import unirede from "@/public/images/unirede-branco.svg";
import vipCommerce from "@/public/images/vip-commerce.png";

type Client = { name: string; url: string; logo?: StaticImageData };

const clients: readonly Client[] = [
  { name: "Planet Argon", url: "https://www.planetargon.com" },
  { name: "Base Digital", url: "https://base.digital", logo: baseDigital },
  { name: "Unirede", url: "https://aunirede.org.br", logo: unirede },
  { name: "VIP Commerce", url: "https://www.vipcommerce.com.br", logo: vipCommerce },
  { name: "Gaussian", url: "https://www.gaussiansolucoes.com.br", logo: gaussian },
];

type Props = { copy: Dictionary["clients"] };

export function Clients({ copy }: Props) {
  return (
    <section id="clients" className="section section--ink clients">
      <h2 className="section-title">{copy.title}</h2>
      <p className="section-lead">{copy.subtitle}</p>
      <ul className="clients__grid">
        {clients.map((client) => (
          <li key={client.name}>
            <a href={client.url} className="clients__card" rel="noopener">
              {client.logo === undefined ? (
                <span className="clients__wordmark">{client.name}</span>
              ) : (
                <Image src={client.logo} alt={client.name} className="clients__logo" />
              )}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
