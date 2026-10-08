import Link from "next/link";
import { MERK, LOGIN_URL } from "@/lib/merk";
import { Woordmerk } from "@/components/Merk";

const kolommen: { kop: string; links: [string, string][] }[] = [
  { kop: "Product", links: [["Wat hij doet", "/#functies"], ["Werkt met", "/#werkt-met"], ["Prijs", "/#prijs"], ["Inloggen", LOGIN_URL]] },
  { kop: "Voor wie", links: [["Zzp’ers en freelancers", "/#functies"], ["Webshops en marktplaatsen", "/#werkt-met"], ["Overstappen van een ander pakket", "/#werkt-met"]] },
  { kop: "Hulp", links: [["Veelgestelde vragen", "/#vragen"], ["Contact", "mailto:hallo@zelfboek.nl"]] },
  { kop: "Juridisch", links: [["Privacy", "/privacy"], ["Voorwaarden", "/voorwaarden"], ["Verwerkersovereenkomst", "/privacy#verwerker"]] },
];

export function Voettekst() {
  return (
    <footer className="border-t border-lijn bg-papier">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <Woordmerk size={17} />
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-tekst-2">Boekhouding die zichzelf doet. Voor eenmanszaken en vof’s zonder personeel.</p>
            <Link href={LOGIN_URL} className="knop mt-6">Start gratis, 30 dagen</Link>
          </div>
          {kolommen.map((k) => (
            <div key={k.kop}>
              <p className="text-[13px] font-semibold uppercase tracking-[.06em] text-tekst-3">{k.kop}</p>
              <ul className="mt-3 space-y-2 text-[14px] text-tekst-2">
                {k.links.map(([t, h]) => <li key={t}><Link href={h} className="hover:text-tekst">{t}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-lijn pt-6 text-[13px] text-tekst-3">
          <span>© 2026 {MERK}. Servers in de EU.</span>
          <span>{MERK} is software en geeft geen fiscaal advies over je privésituatie. Je dient je aangiften zelf in.</span>
        </div>
      </div>
    </footer>
  );
}
