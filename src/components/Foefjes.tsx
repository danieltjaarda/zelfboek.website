"use client";
import { useEffect, useRef, useState } from "react";

export type Foefje = { titel: string; oplevert: string };

/**
 * Wat de bot allemaal weet: één foefje tegelijk in een venster van liquid glass (stijl bij .foefjes in globals.css), alleen
 * de kop en wat het oplevert. Onderin een dunne voortgangslijn; is die vol, dan het volgende foefje. De timing zit in de
 * CSS: hover, focus of buiten beeld zet de lijn stil.
 */
export function Foefjes({ items }: { items: Foefje[] }) {
  const [stand, setStand] = useState({ actief: 0, vorige: -1 });
  const [pauze, setPauze] = useState(true);
  const vak = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let inBeeld = false;
    const zet = () => setPauze(!inBeeld || document.hidden);
    const io = new IntersectionObserver(([e]) => { inBeeld = e.isIntersecting; zet(); }, { threshold: 0.35 });
    if (vak.current) io.observe(vak.current);
    document.addEventListener("visibilitychange", zet);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", zet); };
  }, []);

  const volgende = () => setStand((s) => ({ actief: (s.actief + 1) % items.length, vorige: s.actief }));

  return (
    <div ref={vak} className="foefjes" data-pauze={pauze ? "" : undefined}>
      <div className="foefjes-glas glas">
        <div className="foefjes-podium" aria-live="off">
          {items.map((f, i) => (
            <article key={f.titel} className="foefje" data-actief={i === stand.actief ? "" : undefined} data-weg={i === stand.vorige ? "" : undefined} aria-hidden={i !== stand.actief}>
              <h3>{f.titel}</h3>
              <p className="foefje-oplevert">Levert op <strong>{f.oplevert}</strong></p>
            </article>
          ))}
        </div>
        {/* key wisselt mee met het actieve foefje, zodat de lijn elke keer opnieuw van nul begint. */}
        <span key={stand.actief} className="foefjes-voortgang" aria-hidden onAnimationEnd={volgende} />
      </div>
    </div>
  );
}
