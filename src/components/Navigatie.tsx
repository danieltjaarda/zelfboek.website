"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Navigatie bovenaan, naar het voorbeeld van ecomflow.com: bovenaan de pagina een volle balk over de hele breedte; na 64px
 * scrollen krimpt hij tot een zwevende ronde pil (data-zwevend, stijl bij .navkop in globals.css). Terug naar de volle balk
 * pas onder 16px, zodat hij rond de grens niet heen en weer springt.
 */
export function Navigatie({ children }: { children: ReactNode }) {
  const kop = useRef<HTMLElement>(null);

  useEffect(() => {
    let raf = 0;
    const tik = () => {
      raf = 0;
      const el = kop.current;
      if (el) el.toggleAttribute("data-zwevend", window.scrollY > (el.hasAttribute("data-zwevend") ? 16 : 64));
    };
    const plan = () => { if (!raf) raf = requestAnimationFrame(tik); };
    tik();
    // Begintoestand eerst vastleggen, dan pas overgangen aan: een pagina die halverwege opent krimpt niet zichtbaar bij het laden.
    kop.current?.getBoundingClientRect();
    kop.current?.setAttribute("data-klaar", "");
    window.addEventListener("scroll", plan, { passive: true });
    return () => { window.removeEventListener("scroll", plan); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return <header ref={kop} className="navkop">{children}</header>;
}
