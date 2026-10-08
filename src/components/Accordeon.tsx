"use client";

import Image from "next/image";
import { useState } from "react";

export type AccordeonItem = { titel: string; tekst: string; beeld: string; alt: string; badge?: string };

/** Lijst met uitklapbare onderwerpen links; rechts wisselt het scherm van de app mee. */
export function Accordeon({ kop, items }: { kop: React.ReactNode; items: AccordeonItem[] }) {
  const [actief, setActief] = useState(0);
  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.55fr] lg:gap-14">
      <div>
        {kop}
        <ul className="mt-10">
          {items.map((it, i) => {
            const open = i === actief;
            return (
              <li key={it.titel} className="acc-item" data-actief={open}>
                <button type="button" onClick={() => setActief(i)} aria-expanded={open} aria-controls={`acc-${i}`}>
                  {it.titel}
                  {it.badge && <span className="pil pil-blauw">{it.badge}</span>}
                </button>
                {open && <p id={`acc-${i}`} className="op">{it.tekst}</p>}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="dash-vak" aria-live="polite">
        {items.map((it, i) => (
          <Image key={it.beeld} src={it.beeld} alt={i === actief ? it.alt : ""} width={1440} height={900} className={`dash-beeld ${i === actief ? "actief" : ""}`} aria-hidden={i !== actief} />
        ))}
      </div>
    </div>
  );
}
