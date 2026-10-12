"use client";
import Link from "next/link";
import { useState } from "react";
import { LOGIN_URL } from "@/lib/merk";
import { PAKKETTEN } from "@/lib/pakketten";

/**
 * De pakketten als drie witte vlakken op het grijze blok (stijl bij .prijzen in globals.css): geen glas, randen of lijnen,
 * de tekst doet het werk. Bovenin een schakelaar voor betaling per maand of per jaar; per jaar staat voor. Onder de prijs
 * staat in grijs wat je per jaar bespaart, of bij betaling per maand wat het pakket bij jaarbetaling kost.
 */
export function Prijzen() {
  const [perJaar, setPerJaar] = useState(true);

  return (
    <div>
      <div className="text-center">
        <div className="prijzen-schakel" role="group" aria-label="Betaalperiode">
          <button type="button" aria-pressed={!perJaar} onClick={() => setPerJaar(false)}>Per maand</button>
          <button type="button" aria-pressed={perJaar} onClick={() => setPerJaar(true)}>Per jaar</button>
        </div>
      </div>
      <div className="prijzen-rooster">
        {PAKKETTEN.map((p) => (
          <article key={p.naam} className="prijs-kaart">
            {p.populair && <span className="prijs-label">Meest gekozen</span>}
            <h3>{p.naam}</h3>
            <p className="prijs-voor">{p.voor}</p>
            <p className="prijs-regel"><span className="prijs-bedrag cijfer">€ {perJaar ? p.jaar : p.maand}</span> <span className="prijs-per">per maand</span></p>
            <p className="prijs-bespaar cijfer">{perJaar ? `Bespaar € ${(p.maand - p.jaar) * 12} per jaar` : `€ ${p.jaar} per maand bij betaling per jaar`}</p>
            <Link href={LOGIN_URL} className={`${p.populair ? "pilknop" : "pilknop-licht"} w-full`}>Start gratis, 30 dagen</Link>
            <ul className="prijs-kan">
              {p.kan.map((x) => <li key={x}><Vinkje />{x}</li>)}
              <li><Vinkje />Nog veel meer mogelijkheden</li>
            </ul>
          </article>
        ))}
      </div>
      <p className="prijzen-noot">Prijzen zonder btw. Eerst 30 dagen gratis, geen creditcard nodig.</p>
    </div>
  );
}

/** Dun grijs vinkje, zonder rondje. */
function Vinkje() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden>
      <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
