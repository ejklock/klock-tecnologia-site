import Image from "next/image";

import Unirede from "@/public/images/unirede-branco.svg";
import BaseDigital from "@/public/images/base-digital.svg";
import VipCommerce from "@/public/images/vip-commerce.png";
import Gaussian from "@/public/images/logo-gaussian.svg";

export default function Testimonials() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">Nossos clientes</h2>
            <p className="text-xl text-gray-400">Clientes que estão e/ou passaram pelo nosso serviço que foram ou são atendidos via outsourcing pelos nossos especialistas</p>
          </div>

          {/* Testimonials */}
          <div className="max-w-sm mx-auto grid gap-8 lg:grid-cols-3 lg:gap-6 items-start lg:max-w-none">
            <div
              className="flex flex-col h-full p-6 bg-gray-800 items-center justify-center"
              data-aos="fade-up"
            >
              <a href="https://aunirede.org.br">
                <div className="relative inline-flex flex-col mb-4 items-center">
                  <Image
                    src={Unirede}
                    alt="Logotipo Unirede"
                  />
                </div>
              </a>
            </div>
            <div
              className="flex flex-col h-full p-6 bg-gray-800 items-center justify-center"
              data-aos="fade-up"
            >
              <a href="https://base.digital">
                <div className="relative inline-flex flex-col mb-4 items-center">
                  <Image
                    src={BaseDigital}
                    alt="Logotipo Base Digital"
                  />
                </div>
              </a>
            </div>
            <div
              className="flex flex-col h-full p-6 bg-gray-800 items-center justify-center"
              data-aos="fade-up"
            >
              <a href="https://www.vipcommerce.com.br/">
                <div className="relative inline-flex flex-col mb-4 items-center">
                  <Image
                  width={80}
                    src={VipCommerce}
                    alt="Logotipo Vip Commerce"
                  />
                </div>
              </a>
            </div>
            <div
              className="flex flex-col h-full p-6 bg-gray-800 items-center justify-center"
              data-aos="fade-up"
            >
              <a href="https://www.gaussiansolucoes.com.br/">
                <div className="relative inline-flex flex-col mb-4 items-center">
                  <Image
                 
                    src={Gaussian}
                    alt="Logotipo Gaussian"
                  />
                </div>
              </a>
            </div>

          
          </div>
        </div>
      </div>
    </section>
  );
}
