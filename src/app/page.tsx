import Link from "next/link";
import Image from "next/image";
import { MERK, PRIJS, LOGIN_URL } from "@/lib/merk";
import { AppIcoon, APPS, Woordmerk, type AppId } from "@/components/Merk";
import { Onthul } from "@/components/Onthul";
import { BoekDemo, BotDemo } from "@/components/Demos";
import { Voettekst } from "@/components/Voettekst";

export const instant = false;

const BANKEN: AppId[] = ["ing", "rabobank", "abnamro", "bunq", "knab", "sns", "asn", "regiobank", "triodos", "revolut", "n26"];
const KANALEN: AppId[] = ["mollie", "stripe", "shopify", "bol", "woocommerce", "paypal"];
const PAKKETTEN: AppId[] = ["moneybird", "eboekhouden", "jortt"];

function Pijl({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className={className} aria-hidden>
      <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Vink() {
  return (
    <span className="mt-[2px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-groen-licht text-groen" aria-hidden>
      <svg width="12" height="12" viewBox="0 0 16 16"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </span>
  );
}
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

const voorWie: { beeld: string; alt: string; kop: string; tekst: string }[] = [
  { beeld: "/beeld/zzp-webdesigner.jpg", alt: "Webdesigner achter een laptop in een lichte werkkamer", kop: "Freelancers en creatieven", tekst: "Uren naar factuur, btw verlegd naar klanten in de EU, software-abonnementen vanzelf als kosten." },
  { beeld: "/beeld/zzp-fotograaf.jpg", alt: "Fotograaf met een camera in een daglichtstudio", kop: "Fotografen en makers", tekst: "Apparatuur als investering met afschrijving, reiskosten per rit, offertes die je omzet in een factuur." },
  { beeld: "/beeld/zzp-fysio.jpg", alt: "Fysiotherapeut met een tablet in een lichte praktijkruimte", kop: "Zorg en praktijken", tekst: "Vrijgestelde omzet goed geboekt, bonnen per e-mail, de btw-aangifte die elk kwartaal klaarstaat." },
];

const vragen: [string, string][] = [
  ["Moet ik nog iets doen?", "Bijna niets. Je koppelt je bank, fotografeert bonnen en maakt facturen. De bot doet de rest en stelt soms een vraag die je met één tik beantwoordt."],
  ["Wie dient mijn aangifte in?", "Jij, in twee minuten. De bot zet alle rubrieken klaar; je neemt ze over in Mijn Belastingdienst Zakelijk. Zo blijf jij de baas over je aangifte."],
  ["Wat als de bot het fout heeft?", "Elke boeking heeft een uitleg en is met één klik te wijzigen. Bij twijfel boekt hij niet, maar vraagt hij. En hij onthoudt je antwoord."],
  ["Ik heb al een pakket. Kan ik overstappen?", "Ja. Je importeert klanten, facturen en boekingen uit Moneybird, e-Boekhouden, Jortt of Excel. Je historie komt mee."],
  ["Voor wie is het?", "Eenmanszaken en vof’s zonder personeel. Geen bv’s, geen loonadministratie."],
  ["Kan ik stoppen?", "Elke maand. Je data neem je mee als Excel of auditfile."],
  ["Waar staan mijn gegevens?", "Op servers in de EU, versleuteld. De bankkoppeling is alleen-lezen: niemand kan geld overmaken, ook de bot niet."],
];

export default function Landing() {
  const strook: AppId[] = [...BANKEN, ...KANALEN];
  return (
    <main className="flex-1">
      {/* Navigatie */}
      <header className="sticky top-3 z-30 px-3 md:top-4 md:px-6">
        <div className="navbalk mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full pl-5 pr-2.5">
          <Link href="/" aria-label={MERK}><Woordmerk size={17} /></Link>
          <nav className="hidden items-center gap-7 text-[14px] font-medium text-tekst-2 md:flex">
            <a href="#functies" className="hover:text-tekst">Wat hij doet</a>
            <a href="#werkt-met" className="hover:text-tekst">Werkt met</a>
            <a href="#prijs" className="hover:text-tekst">Prijs</a>
            <a href="#vragen" className="hover:text-tekst">Vragen</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link href={LOGIN_URL} className="knop-licht hidden sm:inline-flex">Inloggen</Link>
            <Link href={LOGIN_URL} className="knop">Gratis proberen</Link>
          </div>
        </div>
      </header>

      {/* Held */}
      <section className="relative overflow-hidden bg-[radial-gradient(70%_55%_at_50%_0%,rgba(29,177,223,0.14),transparent)]">
        <div className="mx-auto max-w-6xl px-6 pb-10 pt-16 text-center md:pt-24">
          <p className="op v1 pil pil-blauw mx-auto text-[12px]">AI-boekhouding voor zzp’ers</p>
          <h1 className="op v2 mx-auto mt-5 max-w-4xl text-[44px] font-bold leading-[1.02] tracking-[-0.03em] md:text-[76px]">
            Boekhouding die <span className="text-primair">zichzelf</span> doet.
          </h1>
          <p className="op v3 mx-auto mt-6 max-w-2xl text-[18px] leading-relaxed text-tekst-2 md:text-[20px]">
            Koppel je bank en de bot boekt elke nacht je regels, bonnen en facturen. Jij tikt af en toe een antwoord. Eén vaste prijs, € {PRIJS} per maand.
          </p>
          <div className="op v4 mt-9 flex flex-wrap justify-center gap-3">
            <Link href={LOGIN_URL} className="knop knop-groot">Start gratis, 30 dagen <Pijl /></Link>
            <a href="#hoe" className="knop-licht knop-groot">Bekijk hoe het werkt</a>
          </div>
          <p className="op v5 mt-5 text-[13px] text-tekst-3">Geen creditcard nodig · Account in dertig seconden · Maandelijks opzegbaar</p>
        </div>
        <div className="mx-auto max-w-6xl px-6 pb-16 md:pb-24">
          <div className="op v5 relative">
            <div className="raam zweef">
              <div className="raam-balk"><i /><i /><i /><span>app.zelfboek.nl</span></div>
              <Image src="/schermen/dashboard.png" alt={`Het overzicht in ${MERK}: infobalken, de vraagbalk voor de bot en de laatst geboekte regels`} width={1440} height={900} className="block w-full" priority />
            </div>
            <BoekDemo className="op v6 absolute -bottom-8 -left-3 hidden shadow-[0_24px_60px_-20px_rgba(26,31,54,0.35)] lg:block" />
          </div>
        </div>
      </section>

      {/* Werkt met: doorlopende strook */}
      <section id="werkt-met" className="border-y border-lijn bg-papier py-10">
        <p className="text-center text-[13px] font-semibold uppercase tracking-[.08em] text-tekst-3">Werkt met elke Nederlandse bank en je verkoopkanalen</p>
        <div className="strook-masker mt-6 overflow-hidden">
          <div className="strook">
            {[...strook, ...strook].map((id, i) => (
              <span key={`${id}-${i}`} className="flex items-center gap-2.5 text-[14px] font-medium text-tekst-2"><AppIcoon id={id} size={36} />{APPS[id]}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Zo werkt het */}
      <section id="hoe" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Onthul>
          <p className="eyebrow">Zo werkt het</p>
          <h2 className="mt-3 max-w-2xl text-[34px] font-bold leading-[1.05] md:text-[48px]">Drie stappen. Daarna doet hij het zelf.</h2>
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
      <section id="functies" className="bg-papier py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Onthul>
            <p className="eyebrow">Wat hij doet</p>
            <h2 className="mt-3 max-w-3xl text-[34px] font-bold leading-[1.05] md:text-[48px]">Alles wat een boekhouder deed. Elke nacht.</h2>
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
          <p className="eyebrow">Voor wie</p>
          <h2 className="mt-3 max-w-2xl text-[34px] font-bold leading-[1.05] md:text-[48px]">Gemaakt voor zzp’ers die liever werken dan boekhouden.</h2>
        </Onthul>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {voorWie.map((v, i) => (
            <Onthul key={v.kop} vertraging={i * 100}>
              <div className="kaart lift h-full overflow-hidden">
                <Image src={v.beeld} alt={v.alt} width={1200} height={896} className="aspect-[4/3] w-full object-cover" />
                <div className="p-5">
                  <h3 className="text-[17px] font-semibold">{v.kop}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-tekst-2">{v.tekst}</p>
                </div>
              </div>
            </Onthul>
          ))}
        </div>
      </section>

      {/* Bank: één scherm */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
          <Onthul>
            <div className="raam">
              <div className="raam-balk"><i /><i /><i /><span>app.zelfboek.nl/app/bank</span></div>
              <Image src="/schermen/bank.png" alt={`De bankpagina in ${MERK}: elke regel geboekt met categorie, btw-code en uitleg`} width={1440} height={900} className="block w-full" />
            </div>
          </Onthul>
          <Onthul vertraging={120}>
            <p className="eyebrow">Zo ziet je ochtend eruit</p>
            <h2 className="mt-3 text-[32px] font-bold leading-[1.05] md:text-[42px]">Eén scherm. Meestal niets te doen.</h2>
            <ul className="mt-7 space-y-3 text-[16px]">
              {["Bovenaan staat of je iets moet doen", "Twijfelregels beantwoord je met één tik", "Omzet, kosten, winst en btw altijd actueel", "Bij elke boeking staat waarom"].map((x) => (
                <li key={x} className="flex gap-3"><Vink />{x}</li>
              ))}
            </ul>
            <Link href={LOGIN_URL} className="knop knop-groot mt-9">Start gratis, 30 dagen <Pijl /></Link>
          </Onthul>
        </div>
      </section>

      {/* De bot */}
      <section className="bg-papier py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1fr_1.1fr]">
          <Onthul>
            <p className="eyebrow">Vraag het gewoon</p>
            <h2 className="mt-3 text-[32px] font-bold leading-[1.05] md:text-[42px]">Een bot die je cijfers kent, overal in de app.</h2>
            <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-tekst-2">Druk op ⌘K en vraag wat je wilt weten: open facturen, je grootste kostenpost, hoeveel btw je straks betaalt. Hij kijkt in je eigen boekhouding en antwoordt in gewone taal. Iets wijzigen doet hij pas na jouw ja.</p>
            <ul className="mt-7 space-y-3 text-[16px]">
              {["Antwoord met de echte cijfers uit je administratie", "Zet taken klaar en past boekingen aan na je bevestiging", "Leert van elke correctie die je maakt"].map((x) => (
                <li key={x} className="flex gap-3"><Vink />{x}</li>
              ))}
            </ul>
          </Onthul>
          <Onthul vertraging={120}><BotDemo className="mx-auto max-w-lg" /></Onthul>
        </div>
      </section>

      {/* Koppelingen als app store */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.25fr]">
          <Onthul>
            <p className="eyebrow">Koppelen</p>
            <h2 className="mt-3 text-[32px] font-bold leading-[1.05] md:text-[42px]">Je bank en je kanalen, als in een app store.</h2>
            <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-tekst-2">Kies je bank, geef toestemming, klaar. Mollie, Stripe, Shopify, bol.com, WooCommerce en PayPal koppel je met één sleutel. Overstappen van Moneybird, e-Boekhouden of Jortt? Je historie komt mee.</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {[...PAKKETTEN, ...KANALEN].map((id) => <AppIcoon key={id} id={id} size={36} />)}
            </div>
            <p className="mt-5 text-[13px] text-tekst-3">Alle koppelingen alleen-lezen. Sleutels slaan we versleuteld op.</p>
          </Onthul>
          <Onthul vertraging={120}>
            <div className="raam">
              <div className="raam-balk"><i /><i /><i /><span>app.zelfboek.nl/app/koppelingen</span></div>
              <Image src="/schermen/koppelingen.png" alt={`De koppelingenpagina in ${MERK}: banken en verkoopkanalen als tegels met een knop Koppelen`} width={1440} height={900} className="block w-full" />
            </div>
          </Onthul>
        </div>
      </section>

      {/* Prijs */}
      <section id="prijs" className="bg-papier py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Onthul className="text-center">
            <p className="eyebrow justify-center">Prijs</p>
            <h2 className="mt-3 text-[34px] font-bold leading-[1.05] md:text-[48px]">Eén prijs. Alles erin.</h2>
            <p className="mx-auto mt-4 max-w-xl text-[17px] text-tekst-2">Een boekhouder kost 600 tot 2.500 euro per jaar en kijkt één keer per kwartaal. {MERK} kijkt elke nacht.</p>
          </Onthul>
          <Onthul vertraging={120} className="mx-auto mt-12 max-w-lg">
            <div className="halo p-8 md:p-10">
              <div className="flex items-end gap-2">
                <span className="cijfer text-[56px] font-bold leading-none tracking-[-0.03em]">€ {PRIJS}</span>
                <span className="pb-2 text-[15px] text-tekst-2">per maand, zonder btw</span>
              </div>
              <ul className="mt-7 space-y-3 text-[15px]">
                {["Onbeperkt bankregels, bonnen en facturen", "Bankkoppeling en alle verkoopkanalen", "Btw-aangifte, ICP, IB-indicatie en jaarrekening", "Herinneringen, iDEAL-links en e-facturen via Peppol", "Een bot die je vragen over je cijfers beantwoordt", "Overstappen met je hele historie"].map((x) => (
                  <li key={x} className="flex gap-3"><Vink />{x}</li>
                ))}
              </ul>
              <Link href={LOGIN_URL} className="knop knop-groot mt-8 w-full">Start gratis, 30 dagen <Pijl /></Link>
              <p className="mt-4 text-center text-[13px] text-tekst-3">Geen creditcard nodig. Maandelijks opzegbaar.</p>
            </div>
          </Onthul>
        </div>
      </section>

      {/* Vragen */}
      <section id="vragen" className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <Onthul>
          <p className="eyebrow">Vragen</p>
          <h2 className="mt-3 text-[32px] font-bold leading-[1.05] md:text-[42px]">Wat mensen ons vragen.</h2>
        </Onthul>
        <Onthul vertraging={100} className="mt-8">
          {vragen.map(([v, a]) => (
            <details key={v} className="vraag">
              <summary>{v}</summary>
              <p>{a}</p>
            </details>
          ))}
        </Onthul>
      </section>

      {/* Slot */}
      <section className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <Onthul>
          <div className="relative overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#1db1df,#0c7f9f)] px-7 py-16 text-center text-white md:py-24">
            <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" aria-hidden />
            <div className="pointer-events-none absolute -bottom-28 -left-16 h-80 w-80 rounded-full bg-white/10 blur-2xl" aria-hidden />
            <h2 className="relative mx-auto max-w-2xl text-[34px] font-bold leading-[1.05] md:text-[56px]">Morgenochtend is je boekhouding al gedaan.</h2>
            <Link href={LOGIN_URL} className="knop-licht knop-groot relative mt-9">Start gratis, 30 dagen <Pijl /></Link>
            <p className="relative mt-4 text-[13px] text-white/75">Account in dertig seconden, alleen een e-mailadres.</p>
          </div>
        </Onthul>
      </section>

      <Voettekst />

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-lijn bg-white/95 p-3 backdrop-blur sm:hidden">
        <Link href={LOGIN_URL} className="knop w-full" style={{ height: 44 }}>Start gratis, 30 dagen</Link>
      </div>
    </main>
  );
}
