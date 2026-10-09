"use client";
import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";

/** Sinus in-uit, dezelfde easing als de GSAP-'sine.inOut' die moneybird.nl gebruikt. */
const sinus = (x: number) => -(Math.cos(Math.PI * Math.min(Math.max(x, 0), 1)) - 1) / 2;

/**
 * Held met wallpaper naar het voorbeeld van moneybird.nl: een vaste achtergrond met twee lagen, de hele foto onderop en
 * daarboven alleen het personage als uitgesneden PNG (zelfde kadrering, dus pixel op pixel). Bij scrollen vervaagt en
 * krimpt de foto en wordt hij wazig; het personage schuift langzaam mee omhoog en blijft zichtbaar totdat de volgende
 * sectie eroverheen schuift. Tekst en dashboard vervagen mee. Bij 'minder beweging' staat alles stil.
 */
export function Held({ foto, persoon, children, dashboard }: { foto: string; persoon: string; children: ReactNode; dashboard?: ReactNode }) {
  const held = useRef<HTMLElement>(null);
  const dek = useRef<HTMLDivElement>(null);
  const achter = useRef<HTMLImageElement>(null);
  const voor = useRef<HTMLImageElement>(null);
  const inhoud = useRef<HTMLDivElement>(null);
  const dash = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const blur = (x: number) => (x > 0.02 ? `blur(${(20 * x).toFixed(1)}px)` : "");
    const tik = () => {
      raf = 0;
      const h = held.current?.offsetHeight || 1;
      const p = Math.min(Math.max(window.scrollY / h, 0), 1);
      const e = sinus(p);
      if (dek.current) dek.current.style.visibility = p >= 1 ? "hidden" : "";
      if (achter.current) {
        achter.current.style.opacity = String(1 - e);
        achter.current.style.transform = `translate3d(0, ${(-10 * e).toFixed(2)}%, 0) scale(${(1 - 0.15 * e).toFixed(3)})`;
        achter.current.style.filter = blur(sinus(p / 0.5));
      }
      if (voor.current) {
        voor.current.style.transform = `translate3d(0, ${(-20 * e).toFixed(2)}%, 0)`;
        voor.current.style.filter = blur(0.4 * sinus((p - 0.5) / 0.5)); // personage blijft scherp tot halverwege, daarna licht wazig (max 8px)
      }
      if (inhoud.current) inhoud.current.style.opacity = String(1 - sinus(p / 0.75));
      if (dash.current) {
        dash.current.style.transform = `translate3d(0, ${(100 * sinus(p / 0.25)).toFixed(1)}px, 0)`;
        dash.current.style.opacity = String(1 - e);
      }
    };
    const plan = () => { if (!raf) raf = requestAnimationFrame(tik); };
    tik();
    window.addEventListener("scroll", plan, { passive: true });
    window.addEventListener("resize", plan);
    return () => { window.removeEventListener("scroll", plan); window.removeEventListener("resize", plan); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <section ref={held} className="held relative -mt-14 h-[100svh] min-h-[640px] overflow-hidden">
      <div ref={dek} className="held-dek fixed inset-0 -z-10 overflow-hidden" aria-hidden>
        <Image ref={achter} src={foto} alt="" fill priority sizes="100vw" className="held-laag object-cover" />
        <Image ref={voor} src={persoon} alt="" fill priority sizes="100vw" className="held-laag object-cover" />
      </div>
      <div className="relative mx-auto h-full max-w-[1320px] px-6 md:px-10">
        <div ref={inhoud} className="max-w-[760px] pt-[max(112px,16svh)]">{children}</div>
        {dashboard && <div ref={dash} className="held-dash absolute bottom-0 left-6 hidden w-[min(820px,58%)] md:left-10 lg:block [@media(max-height:820px)]:hidden">{dashboard}</div>}
      </div>
    </section>
  );
}
