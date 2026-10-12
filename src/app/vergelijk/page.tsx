import Link from "next/link";
import { MERK, LOGIN_URL, PRIJS } from "@/lib/merk";
import { Woordmerk } from "@/components/Merk";
import { Voettekst } from "@/components/Voettekst";

export const instant = false;
export const metadata = { title: `${MERK} vergeleken met Moneybird, e-Boekhouden, Jortt en Wezp` };

/** Alleen feiten van de sites van de aanbieders zelf, met de datum waarop we ze nakeken. */
const NAGEKEKEN = "12 oktober 2026";

type Rij = { naam: string; pakket: string; prijs: string; bank: string; bonnen: string; facturen: string; btw: string; bron: string };

const RIJEN: Rij[] = [
  { naam: MERK, pakket: "Eén pakket", prijs: `€ ${PRIJS} per maand`, bank: "Ja, met één knop*", bonnen: "Ja, foto of mail; de AI leest ze en hangt ze aan de betaling", facturen: "Onbeperkt, met herinneringen", btw: "Klaargezet in drie stappen; jij dient in", bron: "" },
  { naam: "Moneybird", pakket: "Start", prijs: "€ 15 per maand", bank: "Niet in Start (vanaf Groei, € 29)", bonnen: "Ja", facturen: "Onbeperkt", btw: "Ja, indienen", bron: "https://www.moneybird.nl/prijzen/" },
  { naam: "e-Boekhouden.nl", pakket: "ZZP", prijs: "€ 9,95 per maand (eerste 12 maanden € 4,98)", bank: "Zie hun site", bonnen: "Met credits, vanaf € 0,09 per bon", facturen: "Onbeperkt; 240 boekingen", btw: "Zie hun site", bron: "https://www.e-boekhouden.nl/prijzen" },
  { naam: "Jortt", pakket: "ZZP", prijs: "€ 21,95 per maand excl. btw (€ 19,95 per jaar betaald)", bank: "Ja (1 bank)", bonnen: "Automatisch scannen pas in Plus (€ 39,95)", facturen: "Ja, ook via Peppol", btw: "Ja, elektronisch indienen", bron: "https://www.jortt.nl/prijs/" },
  { naam: "Wezp", pakket: "ZZP Small", prijs: "€ 52 per maand excl. btw", bank: "Ja", bonnen: "Ja, via de app (200 per jaar)", facturen: "Ja", btw: "Ja, zij dienen in na jouw akkoord; ook inkomstenbelasting", bron: "https://www.wezp.nl/" },
];

export default function Vergelijk() {
  const kol: [keyof Rij, string][] = [["prijs", "Prijs"], ["bank", "Bankkoppeling"], ["bonnen", "Bonnen"], ["facturen", "Facturen"], ["btw", "Btw-aangifte"]];
  return (
    <main className="flex-1">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"><Link href="/"><Woordmerk /></Link><Link href={LOGIN_URL} className="pilknop-licht pilknop-klein">Inloggen</Link></header>
      <article className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-[34px] font-semibold leading-tight text-tekst">{MERK} vergeleken</h1>
        <p className="mt-3 max-w-2xl text-[17px] text-tekst-2">Wat je krijgt voor je geld, naast elkaar. We noemen alleen wat de aanbieders zelf op hun site zetten, nagekeken op {NAGEKEKEN}. Prijzen veranderen; kijk bij twijfel op hun site.</p>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-lijn bg-white">
          <table className="w-full min-w-[760px] text-left text-[15px]">
            <thead className="bg-papier text-[13px] uppercase tracking-[.04em] text-tekst-3">
              <tr><th className="px-4 py-3">Pakket</th>{kol.map(([, l]) => <th key={l} className="px-4 py-3">{l}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-lijn">
              {RIJEN.map((r) => (
                <tr key={r.naam} className={r.naam === MERK ? "bg-[#f0f9fd]" : ""}>
                  <td className="px-4 py-3 align-top"><span className="font-semibold text-tekst">{r.naam}</span><span className="block text-[13px] text-tekst-3">{r.pakket}</span>{r.bron && <a href={r.bron} className="text-[13px] underline" rel="nofollow noreferrer" target="_blank">bron</a>}</td>
                  {kol.map(([k]) => <td key={k} className="px-4 py-3 align-top text-tekst-2">{r[k]}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[13px] text-tekst-3">Nagekeken op {NAGEKEKEN} op de prijspagina&apos;s van de aanbieders. &ldquo;Zie hun site&rdquo; betekent dat het daar niet duidelijk te lezen was. Wezp is een boekhoudservice met mensen; de andere zijn pakketten die je zelf gebruikt.</p>
        <p className="mt-1 text-[13px] text-tekst-3">* De bankkoppeling van {MERK} gaat aan zodra het contract met onze bankpartner rond is; tot die tijd upload je een afschrift van je bank.</p>
        <div className="mt-8"><Link href={LOGIN_URL} className="pilknop">Probeer {MERK} 30 dagen gratis</Link></div>
      </article>
      <Voettekst />
    </main>
  );
}
