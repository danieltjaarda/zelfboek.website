"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Wisselend woord in de kop. Het oude woord schuift omhoog en vervaagt met bewegingsonscherpte,
 * het nieuwe komt van onderen binnen. De breedte van de houder volgt het actieve woord met een
 * overgang, zodat de rest van de regel soepel meeschuift in plaats van verspringt. Alleen het actieve en het vertrekkende
 * woord staan in de DOM, zodat de kop als tekst (kopiëren, zoekmachines) gewoon "Boekhouding met een AI …" leest.
 */
export function Wisselwoord({ woorden, interval = 2400 }: { woorden: string[]; interval?: number }) {
  // `gewisseld`: na de eerste wissel komt elk nieuw woord met een animatie binnen; `vorige` verdwijnt uit de DOM zodra
  // zijn uitgaande animatie klaar is.
  const [stand, setStand] = useState<{ actief: number; vorige: number | null; gewisseld: boolean }>({ actief: 0, vorige: null, gewisseld: false });
  const [breedte, setBreedte] = useState<number | undefined>(undefined);
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  // Breedte van het actieve woord meten (ook na laden van het lettertype en bij resize).
  useEffect(() => {
    const meet = () => {
      const el = refs.current[stand.actief];
      if (el) setBreedte(el.offsetWidth);
    };
    meet();
    document.fonts?.ready.then(meet);
    window.addEventListener("resize", meet);
    return () => window.removeEventListener("resize", meet);
  }, [stand.actief]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => {
      setStand((s) => ({ actief: (s.actief + 1) % woorden.length, vorige: s.actief, gewisseld: true }));
    }, interval);
    return () => window.clearInterval(t);
  }, [interval, woorden.length]);

  return (
    <span className="wissel" style={breedte ? { width: breedte } : undefined}>
      {woorden.map((w, k) => {
        if (k !== stand.actief && k !== stand.vorige) return null;
        const actief = k === stand.actief;
        const staat = actief ? (stand.gewisseld ? "in" : "stil") : "uit";
        const opruimen = actief ? undefined : () => setStand((s) => (s.vorige === k ? { ...s, vorige: null } : s));
        return (
          <span key={w} ref={(el) => { refs.current[k] = el; }} className="wissel-woord" data-staat={staat} aria-hidden={!actief} onAnimationEnd={opruimen}>
            {w}
          </span>
        );
      })}
    </span>
  );
}
