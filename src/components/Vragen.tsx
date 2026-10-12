"use client";
import { useState } from "react";

/**
 * Veelgestelde vragen die vloeiend in- en uitklappen (stijl bij .vraag in globals.css): het antwoord zit in een grid-rij die
 * van 0fr naar 1fr gaat, zelfde truc als bij de meldingen, en de tekst vaagt mee. Het plusje wordt een minnetje doordat de
 * verticale streep krimpt. Meerdere vragen kunnen tegelijk open staan.
 */
export function Vragen({ items }: { items: [string, string][] }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set());
  const wissel = (i: number) => setOpen((s) => { const n = new Set(s); if (n.has(i)) n.delete(i); else n.add(i); return n; });

  return (
    <div>
      {items.map(([vraag, antwoord], i) => {
        const isOpen = open.has(i);
        return (
          <div key={vraag} className="vraag" data-open={isOpen ? "" : undefined}>
            <button type="button" aria-expanded={isOpen} aria-controls={`vraag-${i}`} onClick={() => wissel(i)}>
              {vraag}
              <svg className="vraag-plus" width="16" height="16" viewBox="0 0 16 16" aria-hidden><path d="M2 8h12" /><path className="vraag-plus-v" d="M8 2v12" /></svg>
            </button>
            <div id={`vraag-${i}`} className="vraag-inhoud" aria-hidden={!isOpen}><div><p>{antwoord}</p></div></div>
          </div>
        );
      })}
    </div>
  );
}
