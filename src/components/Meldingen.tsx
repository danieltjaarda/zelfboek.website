"use client";
import { useEffect, useRef, useState } from "react";

export type Melding = { soort: "Voorstel" | "Geregeld" | "Vraag" | "Klaar"; tijd: string; tekst: string; acties?: [string, string] };

const ZICHTBAAR = 5;
const START = 3;
const INTERVAL = 2600;

/**
 * Live feed van meldingen van de bot: zodra het blok in beeld is, schuift er elke paar seconden een nieuwe melding bovenin
 * (grid-rows-animatie, dus de rest zakt soepel mee), de onderste verdwijnt in het donker. Op een nachtscherm, met kaarten
 * van donker liquid glass met alleen soort, tijd en tekst. Bij 'minder beweging' een stille lijst.
 */
export function Meldingen({ items }: { items: Melding[] }) {
  const [lijst, setLijst] = useState(() => items.slice(0, START).map((_, i) => ({ sleutel: i, idx: i })));
  const [pauze, setPauze] = useState(false);
  const pauzeRef = useRef(false);
  const teller = useRef(START);
  const vak = useRef<HTMLDivElement>(null);
  const wissel = () => { pauzeRef.current = !pauzeRef.current; setPauze(pauzeRef.current); };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let inBeeld = false;
    const io = new IntersectionObserver(([e]) => { inBeeld = e.isIntersecting; }, { threshold: 0.35 });
    if (vak.current) io.observe(vak.current);
    const t = window.setInterval(() => {
      if (!inBeeld || document.hidden || pauzeRef.current) return;
      const n = teller.current++;
      setLijst((l) => [{ sleutel: n, idx: n % items.length }, ...l].slice(0, ZICHTBAAR));
    }, INTERVAL);
    return () => { io.disconnect(); window.clearInterval(t); };
  }, [items.length]);

  return (
    <div className="nacht">
      {/* Balk boven de feed: live-stipje en een knop om de stroom stil te zetten. Verborgen bij 'minder beweging'. */}
      <div className="meldingen-kop">
        <span className={`meldingen-live ${pauze ? "stil" : ""}`}><i aria-hidden />{pauze ? "Gepauzeerd" : "Live, meldingen van vannacht"}</span>
        <button type="button" className="meldingen-pauze glas glas-donker" onClick={wissel} aria-pressed={pauze}>
          {pauze
            ? <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden><path d="M3 1.8v8.4l7-4.2z" fill="currentColor" /></svg>
            : <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden><path d="M2.5 1.8h2.6v8.4H2.5zM6.9 1.8h2.6v8.4H6.9z" fill="currentColor" /></svg>}
          {pauze ? "Verder" : "Pauze"}
        </button>
      </div>
    <div ref={vak} className="meldingen" aria-live="off">
      {lijst.map(({ sleutel, idx }, i) => {
        const m = items[idx];
        return (
          <div key={sleutel} className="melding-wrap" style={{ animationDelay: sleutel < START ? `${(START - 1 - i) * 0.12}s` : "0s" }}>
            <div>
              <article className="melding glas glas-donker">
                <header>
                  <strong>{m.soort}</strong>
                  <time>{m.tijd}</time>
                </header>
                <p>{m.tekst}</p>
                {m.acties && (
                  <div className="melding-acties">
                    <button type="button" className="melding-knop melding-knop-primair">{m.acties[0]}</button>
                    <button type="button" className="melding-knop">{m.acties[1]}</button>
                  </div>
                )}
              </article>
            </div>
          </div>
        );
      })}
    </div>
    </div>
  );
}
