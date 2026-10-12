"use client";
import { useEffect, useRef, useState } from "react";

export type Foefje = { kort: string; titel: string; uitleg: string; oplevert: string };

/**
 * Wat de bot allemaal weet: één foefje tegelijk in een venster van liquid glass (stijl bij .foefjes in globals.css),
 * met onderin alle foefjes als pillen. De actieve pil heeft een voortgangslijn; is die vol, dan het volgende foefje.
 * De timing zit in de CSS: hover, focus of buiten beeld zet de lijn stil. Kies je zelf een foefje, dan stopt het
 * wisselen. Smal scrolt de lijst opzij en blijft de actieve pil in beeld.
 */
export function Foefjes({ items }: { items: Foefje[] }) {
  const [stand, setStand] = useState({ actief: 0, vorige: -1 });
  const [handmatig, setHandmatig] = useState(false);
  const [pauze, setPauze] = useState(true);
  const vak = useRef<HTMLDivElement>(null);
  const lijst = useRef<HTMLDivElement>(null);
  const pillen = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    let inBeeld = false;
    const zet = () => setPauze(!inBeeld || document.hidden);
    const io = new IntersectionObserver(([e]) => { inBeeld = e.isIntersecting; zet(); }, { threshold: 0.35 });
    if (vak.current) io.observe(vak.current);
    document.addEventListener("visibilitychange", zet);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", zet); };
  }, []);

  // Actieve pil in beeld houden als de lijst opzij scrolt. Alleen horizontaal, zodat de pagina niet verspringt.
  useEffect(() => {
    const l = lijst.current, p = pillen.current[stand.actief];
    if (!l || !p || l.scrollWidth <= l.clientWidth) return;
    l.scrollTo({ left: p.offsetLeft - (l.clientWidth - p.offsetWidth) / 2, behavior: "smooth" });
  }, [stand.actief]);

  const kies = (i: number) => { setHandmatig(true); setStand((s) => (s.actief === i ? s : { actief: i, vorige: s.actief })); };
  const volgende = () => setStand((s) => ({ actief: (s.actief + 1) % items.length, vorige: s.actief }));

  return (
    <div ref={vak} className="foefjes" data-pauze={pauze ? "" : undefined}>
      <div className="foefjes-glas glas">
        <div className="foefjes-podium" aria-live="off">
          {items.map((f, i) => (
            <article key={f.kort} className="foefje" data-actief={i === stand.actief ? "" : undefined} data-weg={i === stand.vorige ? "" : undefined} aria-hidden={i !== stand.actief}>
              <h3>{f.titel}</h3>
              <p>{f.uitleg}</p>
              <p className="foefje-oplevert">Levert op <strong>{f.oplevert}</strong></p>
            </article>
          ))}
        </div>
        <div ref={lijst} className="foefjes-lijst">
          {items.map((f, i) => (
            <button key={f.kort} ref={(p) => { pillen.current[i] = p; }} type="button" className="foefjes-pil" aria-current={i === stand.actief ? "true" : undefined} onClick={() => kies(i)}>
              {f.kort}
              {i === stand.actief && !handmatig && <span className="foefjes-voortgang" aria-hidden onAnimationEnd={volgende} />}
            </button>
          ))}
          <span className="foefjes-meer">en nog veel meer</span>
        </div>
      </div>
    </div>
  );
}
