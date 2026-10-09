"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Wisselend woord in de kop. Het oude woord schuift omhoog en vervaagt met bewegingsonscherpte,
 * het nieuwe komt van onderen binnen. De breedte van de houder volgt het actieve woord met een
 * overgang, zodat de rest van de regel soepel meeschuift in plaats van verspringt.
 */
export function Wisselwoord({ woorden, interval = 2400 }: { woorden: string[]; interval?: number }) {
  const [stand, setStand] = useState<{ actief: number; vorige: number | null }>({ actief: 0, vorige: null });
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
      setStand((s) => ({ actief: (s.actief + 1) % woorden.length, vorige: s.actief }));
    }, interval);
    return () => window.clearInterval(t);
  }, [interval, woorden.length]);

  return (
    <span className="wissel" style={breedte ? { width: breedte } : undefined}>
      {woorden.map((w, k) => {
        const staat = k === stand.actief ? (stand.vorige === null ? "stil" : "in") : k === stand.vorige ? "uit" : "weg";
        return (
          <span key={w} ref={(el) => { refs.current[k] = el; }} className="wissel-woord" data-staat={staat} aria-hidden={k !== stand.actief}>
            {w}
          </span>
        );
      })}
    </span>
  );
}
