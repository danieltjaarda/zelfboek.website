"use client";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

const KLEUREN = [
  { naam: "Blauw", hex: "#1db1df" },
  { naam: "Groen", hex: "#1f9d6a" },
  { naam: "Paars", hex: "#6b5bd6" },
  { naam: "Inkt", hex: "#1a1f36" },
];
const VORMEN = [
  { naam: "Rond", id: "rond" },
  { naam: "Hoekig", id: "hoekig" },
  { naam: "Ruit", id: "ruit" },
] as const;
const LETTERS = [
  { naam: "Modern", stack: "var(--font-body), system-ui, sans-serif" },
  { naam: "Klassiek", stack: "Georgia, 'Times New Roman', serif" },
];

type Keuze = { kleur: number; vorm: number; letter: number };
type Groep = keyof Keuze;

/** Wat de cursor achter elkaar aanklikt (groep, keuze); daarna begint hij opnieuw. Eindigt waar hij begon. */
const STAPPEN: [Groep, number][] = [["kleur", 1], ["vorm", 0], ["letter", 1], ["kleur", 2], ["vorm", 2], ["kleur", 3], ["letter", 0], ["vorm", 1], ["kleur", 0]];

const BEWEEG_MS = 700;   // cursor onderweg naar de knop
const KLIK_MS = 420;     // indrukken plus de ring rond de punt
const WACHT_MS = 1300;   // even kijken wat er veranderd is

/**
 * Factuur opmaken: een vel op een grijs blok, rechts een klein glazen menu met kleuren, vormen en letters, en een cursor
 * die daar om de beurt op klikt. Het vel volgt meteen via --accent, --letter en data-vorm (stijl bij .fdemo in globals.css).
 * De knoppen werken ook echt: wie zelf klikt of over het menu beweegt, zet de cursor even stil. Start pas als het blok in
 * beeld is; bij 'minder beweging' staat de cursor uit en blijft het menu gewoon bedienbaar.
 */
export function FactuurDemo({ className = "" }: { className?: string }) {
  const [keuze, setKeuze] = useState<Keuze>({ kleur: 0, vorm: 1, letter: 0 });
  const [cursor, setCursor] = useState({ x: 0, y: 0, klik: false, zichtbaar: false });
  const [hover, setHover] = useState(false);
  const vak = useRef<HTMLDivElement>(null);
  const knoppen = useRef<Record<string, HTMLButtonElement | null>>({});
  const hand = useRef(0); // tot wanneer de bezoeker zelf aan het klikken is (ms sinds epoch)

  useEffect(() => {
    const el = vak.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let inBeeld = false, timer = 0, i = 0;
    const later = (ms: number, f: () => void) => { timer = window.setTimeout(f, ms); };
    const vrij = () => inBeeld && !document.hidden && Date.now() > hand.current;
    const wachtTotVrij = (f: () => void) => { if (vrij()) f(); else later(300, () => wachtTotVrij(f)); };
    const doel = (groep: Groep, n: number) => {
      const k = knoppen.current[`${groep}-${n}`];
      if (!k) return null;
      const a = el.getBoundingClientRect(), b = k.getBoundingClientRect();
      return { x: b.left - a.left + b.width / 2, y: b.top - a.top + b.height / 2 };
    };
    const stap = () => wachtTotVrij(() => {
      const [groep, n] = STAPPEN[i % STAPPEN.length];
      i++;
      const d = doel(groep, n);
      if (!d) { later(WACHT_MS, stap); return; }
      setCursor((c) => ({ ...c, ...d, zichtbaar: true }));
      later(BEWEEG_MS, () => {
        setCursor((c) => ({ ...c, klik: true }));
        setKeuze((k) => ({ ...k, [groep]: n }));
        later(KLIK_MS, () => { setCursor((c) => ({ ...c, klik: false })); later(WACHT_MS, stap); });
      });
    });

    // Beginpositie: midden op het vel, onzichtbaar; de eerste stap laat hem van daar naar het menu lopen.
    const r = el.getBoundingClientRect();
    setCursor({ x: r.width * 0.4, y: r.height * 0.62, klik: false, zichtbaar: false });
    const io = new IntersectionObserver(([e]) => { inBeeld = e.isIntersecting; }, { threshold: 0.4 });
    io.observe(el);
    later(900, stap);
    return () => { io.disconnect(); window.clearTimeout(timer); };
  }, []);

  const kies = (groep: Groep, n: number) => setKeuze((k) => ({ ...k, [groep]: n }));
  const kleur = KLEUREN[keuze.kleur], vorm = VORMEN[keuze.vorm].id, letter = LETTERS[keuze.letter];

  return (
    <div ref={vak} className={`fdemo ${className}`} data-vorm={vorm} style={{ "--accent": kleur.hex, "--letter": letter.stack } as CSSProperties}>
      {/* Het vel: opgezet als een echte Nederlandse factuur; de accentkleur zit in de band bovenaan, de tabelkop, het totaal en de betaalknop. */}
      <div className="fdemo-vel" aria-hidden>
        <span className="fdemo-band" />
        <div className="fdemo-kop">
          <div className="fdemo-afzender"><span className="fdemo-merk" /><strong>Studio Noord</strong></div>
          <p className="fdemo-adres">Noorderhaven 14<br />9712 AB Groningen<br />hallo@studionoord.nl</p>
        </div>
        <div className="fdemo-titelrij">
          <p className="fdemo-titel">Factuur</p>
          <dl className="fdemo-gegevens">
            <dt>Factuurnummer</dt><dd>2026-0041</dd>
            <dt>Factuurdatum</dt><dd>13 okt 2026</dd>
            <dt>Vervaldatum</dt><dd>27 okt 2026</dd>
          </dl>
        </div>
        <div className="fdemo-aan">
          <p className="fdemo-kopje">Factuur aan</p>
          <p>Bakkerij De Korenaar<br />t.a.v. Sanne de Vries<br />Dorpsstraat 12<br />8011 AB Zwolle</p>
        </div>
        <table className="fdemo-tabel">
          <thead><tr><th>Omschrijving</th><th>Aantal</th><th>Prijs</th><th>Bedrag</th></tr></thead>
          <tbody>
            <tr><td>Website ontwerpen</td><td>1</td><td>€ 1.800,00</td><td>€ 1.800,00</td></tr>
            <tr><td>Fotografie, dagdeel</td><td>2</td><td>€ 320,00</td><td>€ 640,00</td></tr>
            <tr><td>Hosting, per maand</td><td>12</td><td>€ 15,00</td><td>€ 180,00</td></tr>
          </tbody>
        </table>
        <div className="fdemo-sommen">
          <p className="fdemo-som"><span>Subtotaal excl. btw</span><span>€ 2.620,00</span></p>
          <p className="fdemo-som"><span>Btw 21%</span><span>€ 550,20</span></p>
          <p className="fdemo-totaal"><span>Totaal incl. btw</span><strong>€ 3.170,20</strong></p>
        </div>
        <div className="fdemo-betalen">
          <p><strong>Betaal binnen 14 dagen</strong>, uiterlijk 27 oktober 2026, via de knop of op NL21 INGB 0001 2345 67 t.n.v. Studio Noord o.v.v. 2026-0041.</p>
          <span className="fdemo-knop">Betaal met iDEAL</span>
        </div>
        <p className="fdemo-voet">Studio Noord · KvK 12345678 · Btw-id NL001234567B01 · IBAN NL21 INGB 0001 2345 67</p>
      </div>

      <div className="fdemo-menu glas" onClick={() => { hand.current = Math.max(hand.current, Date.now() + 4000); }} onPointerEnter={() => { setHover(true); hand.current = Infinity; }} onPointerLeave={() => { setHover(false); hand.current = Date.now() + 800; }}>
        <p className="fdemo-menukop">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 3a9 9 0 1 0 0 18c1.2 0 2-.9 2-2 0-.6-.2-1-.5-1.4-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2h2.1A4.9 4.9 0 0 0 22 9.4C21.8 5.8 17.4 3 12 3Z" /><circle cx="7.5" cy="11.5" r="1.2" fill="currentColor" /><circle cx="11" cy="7.5" r="1.2" fill="currentColor" /><circle cx="16" cy="8" r="1.2" fill="currentColor" /></svg>
          Opmaak
        </p>
        <Groep label="Kleur">
          {KLEUREN.map((k, i) => (
            <button key={k.naam} ref={(b) => { knoppen.current[`kleur-${i}`] = b; }} type="button" className="fdemo-optie fdemo-kleur" style={{ background: k.hex }} aria-label={k.naam} aria-pressed={i === keuze.kleur} onClick={() => kies("kleur", i)} />
          ))}
        </Groep>
        <Groep label="Vorm">
          {VORMEN.map((v, i) => (
            <button key={v.id} ref={(b) => { knoppen.current[`vorm-${i}`] = b; }} type="button" className="fdemo-optie" aria-label={v.naam} aria-pressed={i === keuze.vorm} onClick={() => kies("vorm", i)}><span className="fdemo-vormicoon" data-vorm={v.id} /></button>
          ))}
        </Groep>
        <Groep label="Letter">
          {LETTERS.map((l, i) => (
            <button key={l.naam} ref={(b) => { knoppen.current[`letter-${i}`] = b; }} type="button" className="fdemo-optie fdemo-letter" style={{ fontFamily: l.stack }} aria-label={l.naam} aria-pressed={i === keuze.letter} onClick={() => kies("letter", i)}>Aa</button>
          ))}
        </Groep>
      </div>

      <div className="fdemo-cursor" data-klik={cursor.klik ? "" : undefined} data-weg={!cursor.zichtbaar || hover ? "" : undefined} style={{ transform: `translate(${cursor.x - 3}px, ${cursor.y - 2}px)` }} aria-hidden>
        <svg width="22" height="26" viewBox="0 0 22 26"><path d="M3 2v18.5l4.6-4.1 3.1 7.2 3.3-1.4-3.1-7.1h6.4z" fill="#1a1f36" stroke="#fff" strokeWidth="1.7" strokeLinejoin="round" /></svg>
      </div>
    </div>
  );
}

function Groep({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="fdemo-groep">
      <p className="fdemo-label">{label}</p>
      <div className="fdemo-opties">{children}</div>
    </div>
  );
}
