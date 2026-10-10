import type { CSSProperties } from "react";
import { BotIcoon } from "@/components/BotIcoon";

export type Uitslag = { wie: string; goed: number; ons?: boolean };
export type Meting = { totaal: number; uitslag: Uitslag[]; voetnoot: string };

const getal = (x: number) => x.toLocaleString("nl-NL");
const procent = (x: number) => `${x.toLocaleString("nl-NL", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;

/**
 * Hoe vaak de boeking klopt, in een venster zoals het chatvenster (.chatdemo): kop met icoon en legenda, liggende staven op
 * één schaal van 0 tot 100% (onze AI in merkblauw, de mensen in grijs) en onderin de bron. Breed staat elke uitslag op één
 * regel (naam, staaf, percentage), smal staat de staaf eronder. De staven groeien zodra het venster in beeld komt (een
 * <Onthul> er direct omheen); hover op een rij zet de andere een stap terug. Stijl bij .meetvenster in globals.css.
 */
export function Nauwkeurigheid({ totaal, uitslag, voetnoot }: Meting) {
  return (
    <figure className="meetvenster">
      <figcaption className="meetvenster-kop">
        <span className="meetvenster-icoon" aria-hidden>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M4 6h16M4 12h12M4 18h8" /></svg>
        </span>
        <div><strong>Correct geboekt</strong><span>Dezelfde {getal(totaal)} boekingen</span></div>
        <ul className="meetvenster-legenda" aria-hidden>
          <li><i className="ons" />Onze AI</li>
          <li><i />Mensen</li>
        </ul>
      </figcaption>
      <ol className="meting-lijst" role="list">
        {uitslag.map((u, i) => {
          const p = (100 * u.goed) / totaal;
          return (
            <li key={u.wie} className={`meting${u.ons ? " meting-ons" : ""}`}>
              <div className="meting-wie">
                <span className="meting-naam">{u.ons && <BotIcoon size={16} />}{u.wie}</span>
                <span className="meting-telling">{getal(u.goed)} van {getal(totaal)} goed</span>
              </div>
              <div className="meting-spoor" aria-hidden>
                <div className="meting-staaf" style={{ "--waarde": `${p}%`, transitionDelay: `${250 + i * 140}ms` } as CSSProperties} />
              </div>
              <span className="meting-waarde cijfer">{procent(p)}</span>
            </li>
          );
        })}
      </ol>
      <p className="meetvenster-voet">{voetnoot}</p>
    </figure>
  );
}
