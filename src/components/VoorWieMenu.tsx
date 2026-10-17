"use client";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Icoon } from "@/components/Iconen";
import { BEDRIJFSVORMEN, SECTOREN } from "@/lib/voorwie";

/**
 * Uitklapmenu "Voor wie" in de navigatie, naar het voorbeeld van moneybird.nl: een wit paneel onder de balk met links de
 * sectoren in twee kolommen en rechts de bedrijfsvormen, elk met een lijnicoon (stijl bij .voorwie in globals.css). Breed
 * opent het bij zweven of klikken; `compact` is de variant voor smalle schermen: een knop met rastericoon die hetzelfde
 * paneel opent, dan in één kolom. Escape, een klik buiten het paneel of een klik op een link sluit het.
 */
export function VoorWieMenu({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const timer = useRef(0);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const klik = (e: PointerEvent) => { if (!wrap.current?.contains(e.target as Node)) setOpen(false); };
    const toets = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", klik);
    document.addEventListener("keydown", toets);
    return () => { document.removeEventListener("pointerdown", klik); document.removeEventListener("keydown", toets); };
  }, [open]);

  const binnen = () => { window.clearTimeout(timer.current); if (!compact) setOpen(true); };
  const buiten = () => { if (!compact) timer.current = window.setTimeout(() => setOpen(false), 160); };
  const sluit = () => setOpen(false);

  return (
    <div ref={wrap} className={compact ? "voorwie md:hidden" : "voorwie"} onMouseEnter={binnen} onMouseLeave={buiten}>
      <button type="button" className={compact ? "voorwie-knop-compact" : "voorwie-knop"} aria-expanded={open} aria-controls={id} aria-label={compact ? "Menu Voor wie" : undefined} onClick={() => setOpen((o) => !o)}>
        {compact ? <Icoon naam="raster" size={18} /> : (
          <>
            Voor wie
            <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden><path d="M3.5 6l4.5 4.5L12.5 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </>
        )}
      </button>
      {open && (
        <div id={id} className="voorwie-paneel">
          <div>
            <p className="voorwie-kop">Sectoren</p>
            <ul className="voorwie-lijst voorwie-lijst-2">
              {SECTOREN.map((s) => <li key={s.slug}><Link href={`/sectoren/${s.slug}`} onClick={sluit}><Icoon naam={s.icoon} size={20} />{s.naam}</Link></li>)}
              <li><Link href="/sectoren" onClick={sluit}><Icoon naam="raster" size={20} />Alle sectoren</Link></li>
            </ul>
          </div>
          <div>
            <p className="voorwie-kop">Bedrijfsvormen</p>
            <ul className="voorwie-lijst">
              {BEDRIJFSVORMEN.map((b) => <li key={b.slug}><Link href={`/bedrijfsvormen/${b.slug}`} onClick={sluit}><Icoon naam={b.icoon} size={20} />{b.naam}</Link></li>)}
              <li><Link href="/bedrijfsvormen" onClick={sluit}><Icoon naam="bank" size={20} />Alle bedrijfsvormen</Link></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
