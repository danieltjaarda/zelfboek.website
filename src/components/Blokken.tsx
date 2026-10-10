import Link from "next/link";
import { AppIcoon, type AppId } from "@/components/Merk";
import { Telefoon } from "@/components/Demos";
import { ChatDemo, type Gesprek } from "@/components/ChatDemo";
import { Nauwkeurigheid, type Meting } from "@/components/Nauwkeurigheid";
import { Onthul } from "@/components/Onthul";

/** Kleine kop boven een blok, in kapitalen. */
export function Kopje({ children }: { children: React.ReactNode }) {
  return <p className="text-[12px] font-semibold uppercase tracking-[.12em] text-tekst-3">{children}</p>;
}

/** Link "Meer over …" met een pijltje. */
export function Meer({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={`meer ${className}`}>
      {children}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M9 6l6 6-6 6" /></svg>
    </Link>
  );
}

/** Blok 1: koppelingen, met onderin een wand van app-tegels die uit het blok loopt. */
export function BlokKoppelingen() {
  const rij1: AppId[] = ["ing", "rabobank", "abnamro", "bunq", "knab", "revolut", "triodos", "sns"];
  const rij2: AppId[] = ["mollie", "stripe", "shopify", "bol", "woocommerce", "paypal", "n26", "asn"];
  return (
    <div className="blok min-h-[440px] p-7 md:min-h-[560px] md:p-10">
      <Kopje>Koppelingen</Kopje>
      <h3 className="mt-3 max-w-md text-[28px] font-[420] leading-[1.15] tracking-[-0.02em] md:text-[32px]">Koppel 11 banken en 6 verkoopkanalen met één klik</h3>
      <Meer href="#werkt-met" className="mt-4">Meer over koppelingen</Meer>
      {/* Twee rijen die langzaam langs elkaar schuiven; de rij onder je cursor staat stil. Elke rij staat er twee keer in voor een naadloze lus. */}
      <div className="tegelwand" aria-hidden>
        <div className="tegelrij tegelrij-rechts">{[...rij1, ...rij1].map((id, i) => <AppIcoon key={`${id}-${i}`} id={id} size={112} className="tegel" />)}</div>
        <div className="tegelrij tegelrij-links tegelrij-2">{[...rij2, ...rij2].map((id, i) => <AppIcoon key={`${id}-${i}`} id={id} size={112} className="tegel" />)}</div>
      </div>
    </div>
  );
}

/** Blok 2: de app op je telefoon, met twee telefoons die onderin uit het blok lopen. */
export function BlokApp() {
  return (
    <div className="blok min-h-[600px] p-7 md:min-h-[560px] md:p-10">
      <Kopje>Mobiele app</Kopje>
      <h3 className="mt-3 max-w-md text-[28px] font-[420] leading-[1.15] tracking-[-0.02em] md:text-[32px]">Bonnen fotograferen en vragen beantwoorden, waar je ook bent</h3>
      <Meer href="#hoe" className="mt-4">Meer over de app</Meer>
      <div className="pointer-events-none absolute top-[250px] -right-24 h-[640px] w-[460px] origin-top-left scale-[.68] sm:top-auto sm:-bottom-[210px] sm:right-2 sm:scale-100 md:right-6" aria-hidden>
        <div className="absolute left-0 top-12 origin-bottom -rotate-[9deg] scale-[.8]"><Telefoon scherm="/schermen/m-bonnen.png" alt="" /></div>
        <div className="absolute left-[170px] top-0 origin-bottom rotate-[7deg] scale-[.8]"><Telefoon scherm="/schermen/m-app.png" alt="" /></div>
      </div>
    </div>
  );
}

/** Voorbeeldgesprekken voor het typende chatvenster in het blok "Vraag het de AI". */
const GESPREKKEN: Gesprek[] = [
  { vraag: "Hoeveel btw moet ik dit kwartaal betalen?", antwoord: "Over dit kwartaal betaal je € 1.262. Je omzet was € 7.840 met 21% btw, en je hebt € 384 voorbelasting op inkopen. Uiterlijk 31 januari indienen. Zal ik de aangifte klaarzetten?" },
  { vraag: "Welke facturen staan nog open?", antwoord: "Drie, samen € 5.360: Studio Lente (€ 2.420, 14 dagen te laat), Vereniging Dorpshuis (€ 1.815, vervalt morgen) en Fysio Centrum Zuid (€ 1.125, over 9 dagen). Zal ik Studio Lente een herinnering sturen?" },
  { vraag: "Kan ik mijn nieuwe laptop aftrekken?", antwoord: "Ja. De laptop van € 1.450 is een bedrijfsmiddel: je schrijft hem in 5 jaar af, € 290 per jaar, en de btw van € 252 krijg je terug bij je volgende aangifte. Ik heb hem al zo ingeboekt." },
  { vraag: "Hoeveel moet ik reserveren voor de inkomstenbelasting?", antwoord: "Op basis van je winst tot nu toe (€ 31.200) kom je uit op ongeveer € 4.900 inkomstenbelasting. Reserveer € 540 per maand, dan zit je eind dit jaar goed. Zal ik elke maand een overboeking klaarzetten?" },
  { vraag: "Wat was mijn grootste kostenpost vorige maand?", antwoord: "Verzendkosten: € 1.180 bij PostNL en Sendcloud, 38% van je kosten. Daarna voorraad (€ 920) en software (€ 210)." },
];

/** Blok 3: vraag het de AI, met een chatvenster dat echt typt. */
export function BlokVragen() {
  return (
    <div className="blok px-6 pb-10 pt-12 text-center md:pb-14 md:pt-16">
      <Kopje>Vraag het de AI</Kopje>
      <h3 className="mx-auto mt-3 max-w-2xl text-[32px] font-[420] leading-[1.1] tracking-[-0.02em] md:text-[46px]">Stel zelf vragen aan de AI die alles over jouw boekhouding weet</h3>
      <p className="mx-auto mt-4 max-w-xl text-[16px] text-tekst-2">Hij kijkt in je eigen cijfers en antwoordt in gewone taal. Overal in de app, met ⌘K.</p>
      <ChatDemo gesprekken={GESPREKKEN} className="mx-auto mt-8 w-full max-w-2xl md:mt-10" />
    </div>
  );
}

/** Blok: hoe vaak de boeking klopt, in dezelfde opzet als "Vraag het de AI": kop in het midden, eronder de grafiek in een venster. */
export function BlokNauwkeurigheid({ meting }: { meting: Meting }) {
  return (
    <div className="blok px-6 pb-10 pt-12 text-center md:pb-14 md:pt-16">
      <Kopje>Nauwkeurigheid</Kopje>
      <h2 className="mx-auto mt-3 max-w-2xl text-[32px] font-[420] leading-[1.1] tracking-[-0.02em] md:text-[46px]">Hoe vaak klopt de boeking?</h2>
      <p className="mx-auto mt-4 max-w-xl text-[16px] text-tekst-2">Onze AI naast een fiscalist en een boekhouder, op precies dezelfde bankregels, bonnen en facturen.</p>
      <Onthul className="mx-auto mt-8 w-full max-w-2xl md:mt-10"><Nauwkeurigheid {...meting} /></Onthul>
    </div>
  );
}
