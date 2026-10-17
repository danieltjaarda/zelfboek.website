import Link from "next/link";
import Image from "next/image";
import { MERK, LOGIN_URL } from "@/lib/merk";
import { Onthul } from "@/components/Onthul";
import { BlokApp, BlokFoefjes, BlokKoppelingen, BlokPrijzen, BlokVragen } from "@/components/Blokken";
import { Accordeon } from "@/components/Accordeon";
import { Voettekst } from "@/components/Voettekst";
import { Held } from "@/components/Held";
import { Kop } from "@/components/Kop";
import { Slot } from "@/components/Slot";
import { Meldingen, type Melding } from "@/components/Meldingen";
import { Ervaringen } from "@/components/Ervaringen";
import { Belastingkennis } from "@/components/Belastingkennis";
import { MobieleKnop } from "@/components/MobieleKnop";
import { Vragen } from "@/components/Vragen";
import { FiguurS } from "@/components/Figuren";
import { FactuurDemo } from "@/components/FactuurDemo";

export const instant = false;

/** Logo's in de strook "Vertrouwd door" (public/logos/bedrijven, SVG, in het zwart getoond); hoogte per logo voor optisch gelijk gewicht. */
const KLANTEN: { id: string; naam: string; hoogte: number }[] = [
  { id: "coolblue", naam: "Coolblue", hoogte: 30 }, { id: "tonys", naam: "Tony's Chocolonely", hoogte: 34 }, { id: "acetate", naam: "Ace & Tate", hoogte: 22 },
  { id: "omoda", naam: "Omoda", hoogte: 20 }, { id: "fairphone", naam: "Fairphone", hoogte: 22 }, { id: "fonq", naam: "fonQ", hoogte: 26 },
  { id: "sissyboy", naam: "Sissy-Boy", hoogte: 24 }, { id: "sendcloud", naam: "Sendcloud", hoogte: 26 }, { id: "scotchsoda", naam: "Scotch & Soda", hoogte: 20 },
  { id: "bax", naam: "Bax Music", hoogte: 30 }, { id: "hunkemoller", naam: "Hunkemöller", hoogte: 24 }, { id: "gstar", naam: "G-Star RAW", hoogte: 18 },
];
/** Voorbeeldmeldingen van de bot in de sectie "Altijd aan het werk" (src/components/Meldingen.tsx). */
const MELDINGEN: Melding[] = [
  { soort: "Voorstel", tijd: "vannacht 03:12", tekst: "Je omzet blijft dit jaar onder de € 20.000. Dan kan de kleineondernemersregeling (KOR) interessant zijn: geen btw meer afdragen en geen btw-aangifte. Zal ik het voor je doorrekenen?", acties: ["Ja, reken door", "Later"] },
  { soort: "Geregeld", tijd: "vannacht 03:14", tekst: "Ik zie een nieuwe bedrijfsbus van € 18.500 op je rekening. Die schrijf je in 5 jaar af. Ik heb de afschrijving al ingeboekt, € 3.700 per jaar." },
  { soort: "Vraag", tijd: "zojuist", tekst: "Betaling van € 48,90 bij Albert Heijn. Zakelijk of privé?", acties: ["Zakelijk", "Privé"] },
  { soort: "Klaar", tijd: "vanochtend 07:00", tekst: "Je btw-aangifte van dit kwartaal staat klaar: € 1.262 te betalen. Alle regels zijn gecontroleerd. Zal ik hem indienen?", acties: ["Indienen", "Eerst bekijken"] },
  { soort: "Geregeld", tijd: "vannacht 03:20", tekst: "Je kocht dit jaar voor € 3.200 aan apparatuur. Boven € 2.900 krijg je kleinschaligheidsinvesteringsaftrek. Ik heb het verwerkt: dat scheelt € 896 belasting." },
  { soort: "Geregeld", tijd: "vannacht 02:48", tekst: "Shopify-uitbetaling van € 2.410 gematcht met 37 orders. De btw is verdeeld over Nederland, België en Duitsland." },
  { soort: "Voorstel", tijd: "gisteren 18:05", tekst: "Factuur 2026-0032 van Studio Lente is 14 dagen te laat. Ik heb een vriendelijke herinnering klaargezet.", acties: ["Versturen", "Nog even wachten"] },
  { soort: "Voorstel", tijd: "vannacht 03:31", tekst: "Je zit op 1.180 uur dit jaar, nog 45 uur tot het urencriterium voor de zelfstandigenaftrek. Wil je dat ik je uren bijhoud?", acties: ["Ja, graag", "Nee"] },
  { soort: "Voorstel", tijd: "maandag 06:30", tekst: "Op basis van je winst tot nu toe: reserveer € 540 per maand voor de inkomstenbelasting. Zal ik een maandelijkse overboeking klaarzetten?", acties: ["Klaarzetten", "Later"] },
];

/** Clay-icoon uit public/beeld (transparante PNG). */
function Beeldicoon({ naam, size = 72 }: { naam: string; size?: number }) {
  return <Image src={`/beeld/icoon-${naam}.png`} alt="" width={size} height={size} className="shrink-0" style={{ width: size, height: size }} />;
}

const stappen: { icoon: string; kop: string; tekst: string }[] = [
  { icoon: "bank", kop: "Koppel je bank", tekst: "Eén klik, net als in een app store. Alleen-lezen, dus niemand kan geld overmaken." },
  { icoon: "bot", kop: "De bot boekt elke nacht", tekst: "Categorie, btw-code en een zin uitleg bij elke regel. Bonnen hangt hij aan de juiste regel." },
  { icoon: "antwoord", kop: "Jij tikt af en toe een antwoord", tekst: "Zakelijk of privé? Dat is meestal het enige wat hij vraagt. Je btw-aangifte staat elk kwartaal klaar." },
];

const functies: { icoon: string; kop: string; tekst: string }[] = [
  { icoon: "bank", kop: "Bankregels geboekt voordat je wakker bent", tekst: "Elke nacht leest de bot je nieuwe regels, kiest categorie en btw-code en schrijft in één zin waarom." },
  { icoon: "bon", kop: "Bonnen: foto maken is genoeg", tekst: "Leverancier, datum, bedrag en btw worden uitgelezen. De bon hangt vanzelf aan de juiste bankregel." },
  { icoon: "factuur", kop: "Facturen die zichzelf opvolgen", tekst: "Met iDEAL-link en e-factuur. Herinneringen op dag 7, 21 en 35 gaan vanzelf. Jij hoeft er niet achteraan." },
  { icoon: "btw", kop: "Btw-aangifte in twee minuten", tekst: "Elk kwartaal staan alle rubrieken klaar, met verlegde btw uit de EU en je ICP-opgaaf. Overnemen en klaar." },
  { icoon: "ib", kop: "Nooit meer schrikken van de inkomstenbelasting", tekst: "Je ziet het hele jaar wat je moet reserveren, met zelfstandigenaftrek, MKB-vrijstelling en urencriterium erbij." },
  { icoon: "bot", kop: "Vraag het gewoon", tekst: "Hoeveel gaf ik uit aan software? Wie betaalt altijd te laat? De bot kijkt in je cijfers en antwoordt direct." },
];

/** Stemmen van klanten in de sectie "Voor wie": foto met citaat, naar het voorbeeld van moneybird.nl. Andere mensen dan in Ervaringen. */
const stemmen: { beeld: string; alt: string; tekst: string; naam: string; rol: string }[] = [
  { beeld: "/beeld/zzp-webdesigner.jpg", alt: "Webdesigner achter een laptop in een lichte werkkamer", tekst: "Ik stuur mijn facturen en fotografeer bonnetjes. De rest gebeurt ’s nachts, zonder dat ik ernaar omkijk.", naam: "Marloes", rol: "webdesigner" },
  { beeld: "/beeld/zzp-fotograaf.jpg", alt: "Fotograaf met een camera in een daglichtstudio", tekst: "Mijn camera’s staan als investering in de boeken, met afschrijving en al. Daar had ik vroeger een boekhouder voor.", naam: "Pieter", rol: "fotograaf" },
];

const vragen: [string, string][] = [
  ["Moet ik nog iets doen?", "Bijna niets. Je koppelt je bank, fotografeert bonnen en maakt facturen. De bot doet de rest en stelt soms een vraag die je met één tik beantwoordt."],
  ["Wie dient mijn aangifte in?", "Jij, in twee minuten. De bot zet alle rubrieken klaar; je neemt ze over in Mijn Belastingdienst Zakelijk. Zo blijf jij de baas over je aangifte."],
  ["Wat als de bot het fout heeft?", "Elke boeking heeft een uitleg en is met één klik te wijzigen. Bij twijfel boekt hij niet, maar vraagt hij. En hij onthoudt je antwoord."],
  ["Ik heb al een pakket. Kan ik overstappen?", "Ja. Je importeert klanten, facturen en boekingen uit Moneybird, e-Boekhouden, Jortt of Excel. Je historie komt mee."],
  ["Voor wie is het?", "Eenmanszaken en vof’s zonder personeel. Geen bv’s, geen loonadministratie."],
  ["Kan ik stoppen?", "Betaal je per maand, dan stop je elke maand. Betaal je per jaar, dan loopt je abonnement tot het eind van dat jaar. Je data neem je altijd mee als Excel of auditfile."],
  ["Waar staan mijn gegevens?", "Op servers in de EU, versleuteld. De bankkoppeling is alleen-lezen: niemand kan geld overmaken, ook de bot niet."],
];

export default function Landing() {
  return (
    <main className="flex-1">
      <Kop />

      {/* Held met wallpaper, naar het voorbeeld van moneybird.nl: foto van een kledingwinkel als vaste achtergrond, het
          personage als aparte laag die zichtbaar blijft terwijl de foto bij scrollen vervaagt (src/components/Held.tsx).
          Tekst links, personage rechts; het dashboard piept onderaan uit beeld zoals de interface bij Moneybird. */}
      <Held foto="/beeld/held-winkel.jpg" persoon="/beeld/held-persoon.png" dashboard={
        <div className="dash-vak">
          <div className="dash-vak-b">
            <div className="dash-binnen">
              <Image src="/schermen/dashboard.png" alt={`Het overzicht in ${MERK}: infobalken, de vraagbalk voor de bot en de laatst geboekte regels`} width={2880} height={1800} priority className="dash-beeld actief" />
            </div>
          </div>
        </div>
      }>
        {/* Smal schaalt de kop mee met het scherm, zodat "Boekhoudsoftware" ook op 320px op één regel past. */}
        <h1 className="op v1 text-balance text-[clamp(30px,9.6vw,42px)] leading-[1.06] tracking-[-0.03em] md:text-[58px] md:leading-[1.04] xl:text-[68px] xl:leading-[1.03]">
          <span className="streep">Boekhoudsoftware</span> die het 100% automatisch doet.
        </h1>
        <div data-held-knoppen className="op v2 mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link href={LOGIN_URL} className="pilknop-wit w-full sm:w-auto">Start gratis, 30 dagen</Link>
          <a href="#hoe" className="pilknop-glas w-full sm:w-auto">Bekijk hoe het werkt</a>
        </div>
      </Held>

      <div className="na-held">
      {/* Vertrouwd door: doorlopende rij bedrijfslogo's, allemaal in het zwart. */}
      <section className="na-held-rand border-b border-lijn bg-papier py-10">
        <p className="text-center text-[13px] font-semibold uppercase tracking-[.08em] text-tekst-3">Vertrouwd door bedrijven in heel Nederland</p>
        <div className="strook-masker mt-8 overflow-hidden">
          <div className="strook items-center gap-[76px]">
            {[...KLANTEN, ...KLANTEN].map((k, i) => (
              <img key={`${k.id}-${i}`} src={`/logos/bedrijven/${k.id}.svg`} alt={k.naam} title={k.naam} style={{ height: k.hoogte }} className="w-auto shrink-0 opacity-90 [filter:brightness(0)]" loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      {/* Productblokken */}
      {/* De bot als boekhouder die 24/7 meekijkt: links de belofte, rechts een live feed van meldingen die binnenkomen. */}
      <section id="bot" className="mx-auto max-w-6xl px-6 pt-20 md:pt-28">
        <Onthul>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <h2 className="text-[34px] leading-[1.05] md:text-[48px]">Een <span className="streep">AI</span> die zelf met voorstellen komt.</h2>
              <p className="mt-5 max-w-md text-[17px] leading-relaxed text-tekst-2">Hij boekt niet alleen. Hij kijkt mee naar regelingen, aftrekposten en deadlines, en stuurt je een bericht zodra er iets te halen of te regelen valt. Jij zegt ja of nee.</p>
              <ul className="mt-7 space-y-3 text-[16px] text-tekst">
                {["Elke nacht alle bankregels, bonnen en facturen", "Voorstellen met uitleg in gewone taal", "Jij beslist met één tik, hij regelt de rest"].map((t) => (
                  <li key={t} className="flex items-start gap-3"><span className="mt-[3px] inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primair-licht text-primair-tekst"><svg width="12" height="12" viewBox="0 0 12 12" aria-hidden><path d="M2.5 6.3l2.3 2.3 4.7-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span>{t}</li>
                ))}
              </ul>
            </div>
            <Meldingen items={MELDINGEN} />
          </div>
        </Onthul>
      </section>

      <section id="werkt-met" className="mx-auto max-w-6xl px-6 pt-16 md:pt-24">
        <div className="grid gap-5 md:grid-cols-2">
          <Onthul><BlokKoppelingen /></Onthul>
          <Onthul vertraging={100}><BlokApp /></Onthul>
        </div>
        <Onthul className="mt-5"><BlokVragen /></Onthul>
      </section>

      {/* Dashboard met accordeon */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Onthul>
          <Accordeon
            kop={
              <>
                <h2 className="text-[32px] leading-[1.05] md:text-[42px]">Je cijfers bekijken én begrijpen</h2>
                <p className="mt-4 max-w-md text-[17px] leading-relaxed text-tekst-2">Omzet, kosten, winst en btw altijd actueel. Elke boeking met een zin uitleg, elke vraag met één tik beantwoord. Op je laptop en op je telefoon.</p>
              </>
            }
            items={[
              { titel: "Bank", tekst: "Elke regel geboekt met categorie, btw-code en uitleg. Twijfelt de bot, dan vraagt hij het: zakelijk of privé. Jij tikt, hij onthoudt.", beeld: "/schermen/bank.png", alt: `De bankpagina in ${MERK}` },
              { titel: "Facturen", tekst: "Maak de factuur, de rest gaat vanzelf: iDEAL-link, e-factuur, herinneringen op dag 7, 21 en 35, en afletteren zodra het geld binnen is.", beeld: "/schermen/facturen.png", alt: `De facturenpagina in ${MERK}` },
              { titel: "Koppelingen", tekst: "Banken en verkoopkanalen koppel je als in een app store. Wat live is, zie je in één oogopslag.", beeld: "/schermen/koppelingen.png", alt: `De koppelingenpagina in ${MERK}` },
              { titel: "Vraag het de bot", badge: "⌘K", tekst: "Overal in de app: open facturen, je grootste kostenpost, hoeveel btw je straks betaalt. Hij kijkt in je eigen cijfers en antwoordt in gewone taal.", beeld: "/schermen/bot.png", alt: `De bot in ${MERK}, geopend als paneel` },
            ]}
          />
        </Onthul>
      </section>

      {/* Factuur opmaken: links de demo met het menu en de cursor (src/components/FactuurDemo.tsx), rechts de belofte. Smal eerst de tekst. */}
      <section id="factuur" className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <Onthul>
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
            <div className="order-1 lg:order-2">
              <h2 className="text-[34px] leading-[1.05] md:text-[48px]">Facturen die eruitzien als <span className="streep">jouw</span> bedrijf.</h2>
              <p className="mt-5 max-w-md text-[17px] leading-relaxed text-tekst-2">Kies een kleur, een vorm en een letter. Klaar. Elke factuur, offerte en herinnering gaat zo de deur uit, met iDEAL-link en e-factuur erbij.</p>
            </div>
            <FactuurDemo className="order-2 lg:order-1" />
          </div>
        </Onthul>
      </section>

      {/* Belastingkennis: regels van de Belastingdienst stromen naar de bot. */}
      <section id="belastingkennis" className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <Onthul><Belastingkennis /></Onthul>
      </section>

      {/* Zo werkt het */}
      <section id="hoe" className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <Onthul>
          <h2 className="max-w-2xl text-[34px] leading-[1.05] md:text-[48px]">Drie stappen. Daarna doet hij het zelf.</h2>
        </Onthul>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {stappen.map((s, i) => (
            <Onthul key={s.kop} vertraging={i * 100}>
              <div className="kaart lift h-full p-6">
                <div className="flex items-center justify-between">
                  <Beeldicoon naam={s.icoon} size={64} />
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-inkt text-[12px] font-bold text-white">{i + 1}</span>
                </div>
                <h3 className="mt-5 text-[18px] font-semibold">{s.kop}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-tekst-2">{s.tekst}</p>
              </div>
            </Onthul>
          ))}
        </div>
      </section>

      {/* Wat hij doet */}
      {/* Social proof: beoordeling, cijfers en ervaringen. Plaatshouders tot er echte klanten zijn. */}
      <section id="ervaringen" className="overflow-hidden pb-20 md:pb-28">
        <Ervaringen />
      </section>

      <section id="functies" className="relative bg-papier py-20 md:py-28">
        {/* Figuur: de S steekt rechts boven de band uit, zie .figuur in globals.css. */}
        <div className="figuur figuur-boven" style={{ right: "clamp(24px, 9vw, 150px)" }}><FiguurS /></div>
        <div className="mx-auto max-w-6xl px-6">
          <Onthul>
            <h2 className="max-w-3xl text-[34px] leading-[1.05] md:text-[48px]">Alles wat een boekhouder deed. Elke nacht.</h2>
            <p className="mt-4 max-w-xl text-[17px] text-tekst-2">Jij doet wat je al deed: facturen sturen, bonnen bewaren. Alleen korter.</p>
          </Onthul>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {functies.map((f, i) => (
              <Onthul key={f.kop} vertraging={(i % 3) * 90}>
                <div className="kaart lift h-full p-6">
                  <Beeldicoon naam={f.icoon} size={64} />
                  <h3 className="mt-4 text-[17px] font-semibold leading-snug">{f.kop}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-tekst-2">{f.tekst}</p>
                </div>
              </Onthul>
            ))}
          </div>
        </div>
      </section>

      {/* Voor wie */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Onthul>
          <h2 className="max-w-2xl text-[34px] leading-[1.05] md:text-[48px]">Gemaakt voor zzp’ers die liever werken dan boekhouden.</h2>
        </Onthul>
        {/* Twee fotokaarten met een citaat en een kaart in merkblauw met de kop en twee knoppen, zie .stem in globals.css. */}
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {stemmen.map((s, i) => (
            <Onthul key={s.naam} vertraging={i * 100}>
              <figure className="stem">
                <Image src={s.beeld} alt={s.alt} width={1200} height={896} />
                <figcaption>
                  <blockquote>“{s.tekst}”</blockquote>
                  <span>{s.naam}, {s.rol}</span>
                </figcaption>
              </figure>
            </Onthul>
          ))}
          <Onthul vertraging={200}>
            <div className="stem stem-blauw">
              <h3>Je boekhouding.<br />Zo gebeurd,<br />met {MERK}<span>.</span></h3>
              <div className="stem-knoppen">
                <Link href={LOGIN_URL} className="pilknop-wit pilknop-klein">Start gratis</Link>
                <a href="#prijs" className="pilknop-glas pilknop-klein">Bekijk prijzen</a>
              </div>
            </div>
          </Onthul>
        </div>
      </section>

      {/* Foefjes: wat de bot allemaal weet, een grijs blok in dezelfde opzet als "Vraag het de AI". */}
      <section id="foefjes" className="relative mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        {/* Figuur: de S steekt links naast het blok uit, alleen op brede schermen. */}
        <div className="figuur figuur-zij hidden lg:block"><FiguurS /></div>
        <Onthul><BlokFoefjes /></Onthul>
      </section>

      {/* Prijs: de pakketten, een grijs blok in dezelfde opzet als de foefjes. */}
      <section id="prijs" className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <Onthul><BlokPrijzen /></Onthul>
      </section>

      {/* Vragen */}
      <section id="vragen" className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <Onthul>
          <h2 className="text-[32px] leading-[1.05] md:text-[42px]">Wat mensen ons vragen.</h2>
        </Onthul>
        <Onthul vertraging={100} className="mt-8">
          <Vragen items={vragen} />
        </Onthul>
      </section>

      <Slot />

      <Voettekst />
      </div>

      <MobieleKnop href={LOGIN_URL}>Start gratis, 30 dagen</MobieleKnop>
    </main>
  );
}
