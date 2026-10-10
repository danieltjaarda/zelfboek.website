import Image from "next/image";
import { Onthul } from "@/components/Onthul";

type Review = { tekst: string; naam: string; rol: string; soort: "zzp'er" | "webshop"; beeld: string };

/** PLAATSHOUDERS: namen, citaten, cijfers en portretten zijn verzonnen. Vervang door echte klanten en echte cijfers vóór livegang. */
const RIJ_A: Review[] = [
  { tekst: "Mijn btw-aangifte kostte me altijd een avond. Nu lees ik ’m na en klik op klaar.", naam: "Sanne", rol: "grafisch ontwerper", soort: "zzp'er", beeld: "/beeld/avatar-1.jpg" },
  { tekst: "Elke Shopify-uitbetaling staat ’s ochtends uitgesplitst per order en per btw-land. Mijn vorige boekhouder deed daar een dag over.", naam: "Lotte", rol: "kledingwebshop", soort: "webshop", beeld: "/beeld/avatar-5.jpg" },
  { tekst: "Bonnetje fotograferen en vergeten. Dat is eerlijk gezegd alles wat ik nog doe.", naam: "Jeroen", rol: "timmerman", soort: "zzp'er", beeld: "/beeld/avatar-2.jpg" },
  { tekst: "Bol-uitbetalingen, retouren, verzendkosten: alles klopt in de ochtend. Ik check alleen nog de twijfelgevallen, drie tikken per week.", naam: "Mehmet", rol: "webshop in fietsonderdelen", soort: "webshop", beeld: "/beeld/avatar-6.jpg" },
  { tekst: "Ik vraag gewoon aan de bot wat ik moet reserveren voor de inkomstenbelasting. Antwoord in één zin.", naam: "Els", rol: "adviseur", soort: "zzp'er", beeld: "/beeld/avatar-3.jpg" },
  { tekst: "Stripe en mijn bank gekoppeld in vijf minuten. Daarna nooit meer naar omgekeken.", naam: "Daan", rol: "softwareontwikkelaar", soort: "zzp'er", beeld: "/beeld/avatar-4.jpg" },
];
const RIJ_B: Review[] = [
  { tekst: "Na een shoot stuur ik de factuur vanaf mijn telefoon. Herinneringen gaan vanzelf, en betaald is afgeletterd voordat ik het zie.", naam: "Femke", rol: "fotograaf", soort: "zzp'er", beeld: "/beeld/avatar-7.jpg" },
  { tekst: "Mollie, Shopify en mijn bank praten met elkaar. Ik weet elke ochtend precies wat er netto is overgebleven.", naam: "Noor", rol: "webshop in sieraden", soort: "webshop", beeld: "/beeld/avatar-9.jpg" },
  { tekst: "Ik zit meer in de tuin dan achter de computer. ’s Nachts wordt alles geboekt, de btw-aangifte lees ik na op de bank.", naam: "Bram", rol: "hovenier", soort: "zzp'er", beeld: "/beeld/avatar-8.jpg" },
  { tekst: "Retouren waren altijd een rommeltje in mijn administratie. Nu worden ze automatisch tegengeboekt, inclusief de btw.", naam: "Anouk", rol: "webshop in kinderkleding", soort: "webshop", beeld: "/beeld/avatar-11.jpg" },
  { tekst: "Ik vroeg: wat is mijn winst dit kwartaal? Antwoord in één zin, met de btw erbij. Daar belde ik vroeger mijn boekhouder voor.", naam: "Tim", rol: "online marketeer", soort: "zzp'er", beeld: "/beeld/avatar-10.jpg" },
  { tekst: "Bonnetjes van de groothandel fotografeer ik in de bus. Verder heb ik er geen omkijken meer naar.", naam: "Ruben", rol: "elektricien", soort: "zzp'er", beeld: "/beeld/avatar-12.jpg" },
];

const CIJFERS: { getal: string; tekst: string }[] = [
  { getal: "2.400+", tekst: "zzp’ers en webshops" },
  { getal: "1,1 mln", tekst: "bankregels geboekt" },
  { getal: "4,9 / 5", tekst: "gemiddelde beoordeling" },
];

function Sterren({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} aria-label="5 van 5 sterren">
      {[0, 1, 2, 3, 4].map((i) => <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#f5b400" aria-hidden><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" /></svg>)}
    </span>
  );
}

function Kaart({ r }: { r: Review }) {
  return (
    <figure className="review-kaart">
      <Sterren />
      <blockquote className="mt-3 text-[16px] leading-[1.5] text-tekst">“{r.tekst}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <Image src={r.beeld} alt={`${r.naam}, ${r.rol}`} width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
        <span className="flex flex-col leading-tight"><strong className="text-[15px] font-semibold">{r.naam}</strong><span className="text-[13px] text-tekst-2">{r.rol}</span></span>
        <span className={`pil ml-auto ${r.soort === "webshop" ? "pil-blauw" : "pil-grijs"}`}>{r.soort}</span>
      </figcaption>
    </figure>
  );
}

/** Doorlopende rij kaarten, twee keer achter elkaar voor een naadloze lus; `terug` laat de rij naar rechts lopen. */
function Rij({ items, terug = false }: { items: Review[]; terug?: boolean }) {
  return (
    <div className="strook-masker overflow-hidden">
      <div className={`review-strook ${terug ? "review-strook-terug" : ""}`}>
        {[...items, ...items].map((r, i) => <div key={`${r.naam}-${i}`} aria-hidden={i >= items.length}><Kaart r={r} /></div>)}
      </div>
    </div>
  );
}

/** Social proof: beoordeling, drie cijfers en twaalf korte ervaringen in twee doorlopende rijen (links- en rechtsom). */
export function Ervaringen() {
  return (
    <div>
      <Onthul className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="mx-auto max-w-3xl text-[34px] leading-[1.05] md:text-[48px]">Zzp’ers en webshops die het al lieten doen.</h2>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[15px]">
            <span className="flex -space-x-2">
              {RIJ_A.slice(0, 4).map((r) => <Image key={r.naam} src={r.beeld} alt="" width={32} height={32} className="h-8 w-8 rounded-full border-2 border-white object-cover" />)}
            </span>
            <Sterren />
            <span className="font-semibold">4,9 van 5</span>
            <span className="text-tekst-2">op basis van 130 beoordelingen</span>
          </div>
        </div>
        <dl className="mx-auto mt-10 grid max-w-3xl grid-cols-3 divide-x divide-lijn-2 rounded-2xl border border-lijn-2 bg-white">
          {CIJFERS.map((c) => (
            <div key={c.getal} className="px-3 py-5 text-center md:py-6">
              <dt className="order-2 text-[13px] text-tekst-2">{c.tekst}</dt>
              <dd className="cijfer text-[26px] font-[520] tracking-[-0.02em] text-tekst md:text-[34px]">{c.getal}</dd>
            </div>
          ))}
        </dl>
      </Onthul>
      <div className="mt-10 space-y-5">
        <Rij items={RIJ_A} />
        <Rij items={RIJ_B} terug />
      </div>
    </div>
  );
}
