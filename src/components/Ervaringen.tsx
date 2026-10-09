import Image from "next/image";
import { Kopje } from "@/components/Blokken";
import { Onthul } from "@/components/Onthul";

/** PLAATSHOUDERS: namen, citaten, cijfers en portretten zijn verzonnen. Vervang door echte klanten en echte cijfers vóór livegang. */
const REVIEWS: { tekst: string; naam: string; rol: string; soort: "zzp'er" | "webshop"; beeld: string }[] = [
  { tekst: "Mijn btw-aangifte kostte me altijd een avond. Nu lees ik ’m na en klik op klaar.", naam: "Sanne", rol: "grafisch ontwerper", soort: "zzp'er", beeld: "/beeld/avatar-1.jpg" },
  { tekst: "Elke Shopify-uitbetaling staat ’s ochtends uitgesplitst per order en per btw-land. Mijn vorige boekhouder deed daar een dag over.", naam: "Lotte", rol: "kledingwebshop", soort: "webshop", beeld: "/beeld/avatar-5.jpg" },
  { tekst: "Bonnetje fotograferen en vergeten. Dat is eerlijk gezegd alles wat ik nog doe.", naam: "Jeroen", rol: "timmerman", soort: "zzp'er", beeld: "/beeld/avatar-2.jpg" },
  { tekst: "Bol-uitbetalingen, retouren, verzendkosten: alles klopt in de ochtend. Ik check alleen nog de twijfelgevallen, drie tikken per week.", naam: "Mehmet", rol: "webshop in fietsonderdelen", soort: "webshop", beeld: "/beeld/avatar-6.jpg" },
  { tekst: "Ik vraag gewoon aan de bot wat ik moet reserveren voor de inkomstenbelasting. Antwoord in één zin.", naam: "Els", rol: "adviseur", soort: "zzp'er", beeld: "/beeld/avatar-3.jpg" },
  { tekst: "Stripe en mijn bank gekoppeld in vijf minuten. Daarna nooit meer naar omgekeken.", naam: "Daan", rol: "softwareontwikkelaar", soort: "zzp'er", beeld: "/beeld/avatar-4.jpg" },
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

/** Social proof: beoordeling, drie cijfers en zes korte ervaringen van zzp'ers en webshops. */
export function Ervaringen() {
  return (
    <div>
      <div className="text-center">
        <Kopje>Ervaringen</Kopje>
        <h2 className="mx-auto mt-3 max-w-3xl text-[34px] leading-[1.05] md:text-[48px]">Zzp’ers en webshops die het al lieten doen.</h2>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[15px]">
          <span className="flex -space-x-2">
            {REVIEWS.slice(0, 4).map((r) => <Image key={r.naam} src={r.beeld} alt="" width={32} height={32} className="h-8 w-8 rounded-full border-2 border-white object-cover" />)}
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
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((r, i) => (
          <Onthul key={r.naam} richting={i % 2 ? "rechts" : "links"} vertraging={(i % 3) * 90}>
          <figure className="review-kaart h-full">
            <Sterren />
            <blockquote className="mt-3 text-[17px] leading-[1.5] text-tekst">“{r.tekst}”</blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <Image src={r.beeld} alt={`${r.naam}, ${r.rol}`} width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
              <span className="flex flex-col leading-tight"><strong className="text-[15px] font-semibold">{r.naam}</strong><span className="text-[13px] text-tekst-2">{r.rol}</span></span>
              <span className={`pil ml-auto ${r.soort === "webshop" ? "pil-blauw" : "pil-grijs"}`}>{r.soort}</span>
            </figcaption>
          </figure>
          </Onthul>
        ))}
      </div>
    </div>
  );
}
