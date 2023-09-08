export const metadata = {
  title: "Klock Tecnologia",
  description: "Soluções em Tecnologia da Informação",
};

import Hero from "../components/hero";
import Features from "../components/features";
import HowWork from "../components/how-work";
import Newsletter from "../components/newsletter";
import Zigzag from "../components/zigzag";
import Testimonials from "../components/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowWork />
      <Zigzag />
      <Testimonials />
    </>
  );
}
