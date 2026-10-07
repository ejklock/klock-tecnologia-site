"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = { speed: number; className: string; children?: ReactNode };

export function ParallaxLayer({ speed, className, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (element === null) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame: number | undefined;

    const apply = () => {
      frame = undefined;
      if (reducedMotion.matches) {
        element.style.transform = "";
        return;
      }
      const rect = element.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
      element.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };

    const schedule = () => {
      if (frame === undefined) frame = requestAnimationFrame(apply);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    reducedMotion.addEventListener("change", schedule);
    return () => {
      if (frame !== undefined) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} data-parallax="" aria-hidden="true">
      {children}
    </div>
  );
}
