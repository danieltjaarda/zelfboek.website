/** Lijniconen, 20 px, één stijl. Alleen paden, kleur via currentColor. */
const paden: Record<string, React.ReactNode> = {
  overzicht: <><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></>,
  bank: <><path d="M3 10l9-6 9 6" /><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8" /><path d="M3 20h18" /></>,
  bon: <><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3z" /><path d="M9 8h6M9 12h6" /></>,
  bot: <><rect x="4" y="7" width="16" height="12" rx="3" /><circle cx="9.5" cy="13" r="1.2" fill="currentColor" stroke="none" /><circle cx="14.5" cy="13" r="1.2" fill="currentColor" stroke="none" /><path d="M12 3v4" /></>,
  factuur: <><path d="M6 3h9l4 4v14H6z" /><path d="M15 3v4h4" /><path d="M9 12h6M9 16h6" /></>,
  offerte: <><path d="M6 3h9l4 4v14H6z" /><path d="M15 3v4h4" /><path d="M9 14l2 2 4-4" /></>,
  klanten: <><circle cx="9" cy="8" r="3.5" /><path d="M3 20a6 6 0 0112 0" /><circle cx="17" cy="9" r="2.5" /><path d="M16 15a5 5 0 015 5" /></>,
  uren: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  km: <><path d="M4 16l2-6h12l2 6" /><rect x="3" y="16" width="18" height="4" rx="1" /><circle cx="7.5" cy="20" r="1.5" /><circle cx="16.5" cy="20" r="1.5" /></>,
  btw: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M8 9h8M8 13h8M8 17h5" /></>,
  ib: <><path d="M4 19V5M4 19h16" /><path d="M7 15l4-5 3 3 5-6" /></>,
  activa: <><rect x="3" y="7" width="18" height="12" rx="2" /><path d="M8 7V5h8v2" /></>,
  jaar: <><path d="M5 3h14v18H5z" /><path d="M9 8h6M9 12h6M9 16h3" /></>,
  export: <><path d="M12 4v11" /><path d="M8 11l4 4 4-4" /><path d="M4 19h16" /></>,
  koppel: <><path d="M10 14a4 4 0 005.7 0l2.6-2.6a4 4 0 00-5.7-5.7L11 7.3" /><path d="M14 10a4 4 0 00-5.7 0l-2.6 2.6a4 4 0 005.7 5.7L13 16.7" /></>,
  import: <><path d="M12 19V8" /><path d="M8 12l4-4 4 4" /><path d="M4 20h16" /></>,
  bel: <><path d="M6 16V11a6 6 0 0112 0v5l2 2H4z" /><path d="M10 20a2 2 0 004 0" /></>,
  // Sectoren en bedrijfsvormen (menu "Voor wie", src/lib/voorwie.ts).
  palet: <><path d="M12 3a9 9 0 100 18c1.6 0 2.2-1.1 1.6-2.2-.5-1 .1-1.8 1.4-1.8H17a4 4 0 004-4c0-5.5-4-10-9-10z" /><circle cx="7.5" cy="12.5" r="1.1" fill="currentColor" stroke="none" /><circle cx="9.5" cy="8" r="1.1" fill="currentColor" stroke="none" /><circle cx="14.5" cy="7.5" r="1.1" fill="currentColor" stroke="none" /></>,
  helm: <><path d="M4 16a8 8 0 0116 0v1H4z" /><path d="M2 17h20" /><path d="M10 8v6M14 8v6" /></>,
  code: <><path d="M8 8l-4 4 4 4" /><path d="M16 8l4 4-4 4" /><path d="M14 5l-4 14" /></>,
  coach: <><circle cx="10" cy="7" r="3.5" /><path d="M4 20a6 6 0 0112 0" /><path d="M18.5 14V9" /><path d="M16 11.5L18.5 9l2.5 2.5" /></>,
  winkelwagen: <><path d="M3 4h2l2.5 11h11l2-8H6.2" /><circle cx="9" cy="19" r="1.5" /><circle cx="17" cy="19" r="1.5" /></>,
  pen: <><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.6 7.6" /><circle cx="11" cy="11" r="2" /></>,
  bestek: <><path d="M7 3v18" /><path d="M4 3v5a3 3 0 006 0V3" /><path d="M17 3c-1.5 2-2 5-2 8h2v10" /><path d="M17 3v8" /></>,
  advies: <><path d="M3 6a2 2 0 012-2h9a2 2 0 012 2v5a2 2 0 01-2 2H9l-4 3v-3a2 2 0 01-2-2z" /><path d="M19 9a2 2 0 012 2v5a2 2 0 01-2 2h-1v3l-4-3h-3" /></>,
  smartphone: <><rect x="7" y="2" width="10" height="20" rx="2.5" /><path d="M11 18h2" /></>,
  raster: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
  gebruiker: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0116 0" /></>,
  gebouw: <><rect x="4" y="3" width="16" height="18" rx="1.5" /><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" /><path d="M10 21v-3h4v3" /></>,
  handen: <><circle cx="9" cy="12" r="5" /><circle cx="15" cy="12" r="5" /></>,
  instel: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" /></>,
};

export function Icoon({ naam, size = 20, className = "" }: { naam: keyof typeof paden; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className}`} aria-hidden>
      {paden[naam]}
    </svg>
  );
}

export type IcoonNaam = keyof typeof paden;

/** Pijltje naar rechts in knoppen en links. */
export function Pijl({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className={className} aria-hidden>
      <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
