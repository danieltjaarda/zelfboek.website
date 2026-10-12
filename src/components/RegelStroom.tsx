"use client";
import { useEffect, useRef, useState, type AnimationEvent } from "react";
import { MERK } from "@/lib/merk";
import { BotIcoon } from "@/components/BotIcoon";

export type Paar = { regel: string; actie: string };

function Vinkje() {
  return <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden><path d="M2.5 6.3l2.3 2.3 4.7-5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

/**
 * Regels van de Belastingdienst die één voor één naar de bot stromen. De regel schuift achter de kaart van de Belastingdienst
 * vandaan, reist over de lijn en verdwijnt achter de kaart van de bot; die licht op en de actie die eruit volgt verschijnt
 * eronder. De timing zit helemaal in de CSS (.stroom in globals.css): is de actie uitgefaded, dan gaat het volgende paar.
 * Staat stil zolang het paneel niet in beeld is; bij 'minder beweging' staat het eerste paar stil in het midden.
 */
export function RegelStroom({ paren }: { paren: Paar[] }) {
  const [stap, setStap] = useState(0);
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

  const paar = paren[stap % paren.length];
  const volgende = (e: AnimationEvent) => { if (e.target === e.currentTarget) setStap((s) => s + 1); };

  return (
    <div ref={vak} className="stroom" data-pauze={pauze ? "" : undefined}>
      <ul className="sr-only">
        {paren.map((p) => <li key={p.regel}>{p.regel}: {p.actie}</li>)}
      </ul>
      <div className="stroom-rij" aria-hidden>
        <div className="stroom-kaart glas glas-blauw">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/apps/belastingdienst.png" alt="" width={52} height={52} className="stroom-icoon" />
          <span><strong>Belastingdienst</strong><small>alle regels, tarieven en termijnen</small></span>
        </div>
        <div className="stroom-baan">
          <span className="stroom-lijn" />
          <span key={stap} className="stroom-rit"><span className="stroom-chip glas glas-blauw">{paar.regel}</span></span>
        </div>
        <div className="stroom-kaart stroom-bot glas glas-blauw">
          <span key={stap} className="stroom-icoon stroom-boticoon"><BotIcoon size={30} /></span>
          <span><strong>{MERK}</strong><small>past ze toe op jouw boekhouding</small></span>
          <span key={`golf-${stap}`} className="stroom-golf" />
        </div>
        {/* Buiten de kaart van de bot, anders ziet het glas van de actie alleen die kaart en niet het blauw erachter. */}
        <div className="stroom-uit">
          <span key={stap} className="stroom-actie glas glas-blauw" onAnimationEnd={volgende}><i><Vinkje /></i>{paar.actie}</span>
        </div>
      </div>
    </div>
  );
}
