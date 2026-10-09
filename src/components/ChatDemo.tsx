"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MERK } from "@/lib/merk";

export type Gesprek = { vraag: string; antwoord: string };

type Bericht = { sleutel: number; van: "jij" | "bot"; tekst: string };
type Stand = { berichten: Bericht[]; invoer: string; typt: boolean; stroom: string | null };

const TYPE_MS = 42;      // per teken in het invoerveld
const STROOM_MS = 14;    // per teken van het antwoord
const WACHT_NA_VRAAG = 450;
const DENKTIJD = 1000;
const PAUZE = 3400;

/**
 * Chatvenster dat echt typt: de vraag verschijnt teken voor teken in het invoerveld, wordt verstuurd als bel,
 * de bot 'denkt' met drie stipjes en streamt daarna het antwoord. Daarna de volgende vraag; oude berichten
 * schuiven naar boven uit beeld. Start pas als het venster in beeld is; bij 'minder beweging' staat het stil.
 */
export function ChatDemo({ gesprekken, className = "" }: { gesprekken: Gesprek[]; className?: string }) {
  const [stand, setStand] = useState<Stand>({ berichten: [], invoer: "", typt: false, stroom: null });
  const vak = useRef<HTMLDivElement>(null);
  const lijst = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stil = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (stil) {
      const g = gesprekken[0];
      const t0 = window.setTimeout(() => setStand({ berichten: [{ sleutel: 1, van: "jij", tekst: g.vraag }, { sleutel: 2, van: "bot", tekst: g.antwoord }], invoer: "", typt: false, stroom: null }), 0);
      return () => window.clearTimeout(t0);
    }
    let inBeeld = false, gestart = false, timer = 0, sleutel = 0, i = 0;
    const later = (ms: number, f: () => void) => { timer = window.setTimeout(f, ms); };
    const wachtTotInBeeld = (f: () => void) => { if (inBeeld && !document.hidden) f(); else later(300, () => wachtTotInBeeld(f)); };

    const ronde = () => {
      const g = gesprekken[i % gesprekken.length];
      let n = 0;
      const tik = () => {
        n++;
        setStand((s) => ({ ...s, invoer: g.vraag.slice(0, n) }));
        if (n < g.vraag.length) later(TYPE_MS + Math.random() * 40, tik);
        else later(WACHT_NA_VRAAG, verstuur);
      };
      const verstuur = () => {
        const k = ++sleutel;
        setStand((s) => ({ ...s, invoer: "", typt: true, berichten: [...s.berichten, { sleutel: k, van: "jij" as const, tekst: g.vraag }].slice(-6) }));
        later(DENKTIJD, () => { let m = 0; const stroom = () => {
          m = Math.min(g.antwoord.length, m + 1 + Math.floor(Math.random() * 2));
          setStand((s) => ({ ...s, typt: false, stroom: g.antwoord.slice(0, m) }));
          if (m < g.antwoord.length) later(STROOM_MS, stroom);
          else { const k2 = ++sleutel; setStand((s) => ({ ...s, stroom: null, berichten: [...s.berichten, { sleutel: k2, van: "bot" as const, tekst: g.antwoord }].slice(-6) })); i++; later(PAUZE, () => wachtTotInBeeld(ronde)); }
        }; stroom(); });
      };
      later(500, tik);
    };

    const io = new IntersectionObserver(([e]) => { inBeeld = e.isIntersecting; if (inBeeld && !gestart) { gestart = true; ronde(); } }, { threshold: 0.4 });
    if (vak.current) io.observe(vak.current);
    return () => { io.disconnect(); window.clearTimeout(timer); };
  }, [gesprekken]);

  // Altijd het laatste bericht in beeld houden.
  useEffect(() => { const el = lijst.current; if (el) el.scrollTop = el.scrollHeight; }, [stand]);

  const leeg = stand.berichten.length === 0 && !stand.typt && stand.stroom === null;
  return (
    <div ref={vak} className={`chatdemo ${className}`} aria-live="off">
      <div className="chatdemo-kop">
        <Image src="/beeld/icoon-bot.png" alt="" width={56} height={56} className="chatdemo-avatar" />
        <div><strong>{MERK}</strong><span>Kent je hele boekhouding</span></div>
        <i className="chatdemo-status" aria-hidden />
      </div>
      <div ref={lijst} className="chatdemo-lijst">
        {leeg && <p className="chatdemo-leeg">Stel een vraag over je cijfers. Bijvoorbeeld: hoe sta ik ervoor deze maand?</p>}
        {stand.berichten.map((b) => <div key={b.sleutel} className={`chatdemo-bel chatdemo-${b.van}`}>{b.tekst}</div>)}
        {stand.typt && <div className="chatdemo-bel chatdemo-bot chatdemo-stippen" aria-label="De bot typt"><span /><span /><span /></div>}
        {stand.stroom !== null && <div className="chatdemo-bel chatdemo-bot">{stand.stroom}<i className="chatdemo-cursor" /></div>}
      </div>
      <div className="chatdemo-invoer">
        <span className={stand.invoer ? "" : "chatdemo-plaats"}>{stand.invoer || "Stel een vraag over je boekhouding"}{stand.invoer && <i className="chatdemo-cursor" />}</span>
        <b className={stand.invoer ? "actief" : ""} aria-hidden><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg></b>
      </div>
    </div>
  );
}
