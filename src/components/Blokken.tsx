import Link from "next/link";
import type { CSSProperties } from "react";
import { AppIcoon, type AppId } from "@/components/Merk";
import { Telefoon } from "@/components/Demos";

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
      <h3 className="mt-3 max-w-md text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] md:text-[32px]">Koppel 11 banken en 6 verkoopkanalen met één klik</h3>
      <Meer href="#werkt-met" className="mt-4">Meer over koppelingen</Meer>
      <div className="tegelwand" aria-hidden>
        <div className="tegelrij">{rij1.map((id) => <AppIcoon key={id} id={id} size={112} className="tegel" />)}</div>
        <div className="tegelrij tegelrij-2">{rij2.map((id) => <AppIcoon key={id} id={id} size={112} className="tegel" />)}</div>
      </div>
    </div>
  );
}

/** Blok 2: de app op je telefoon, met twee telefoons die onderin uit het blok lopen. */
export function BlokApp() {
  return (
    <div className="blok min-h-[600px] p-7 md:min-h-[560px] md:p-10">
      <Kopje>Mobiele app</Kopje>
      <h3 className="mt-3 max-w-md text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] md:text-[32px]">Bonnen fotograferen en vragen beantwoorden, waar je ook bent</h3>
      <Meer href="#hoe" className="mt-4">Meer over de app</Meer>
      <div className="pointer-events-none absolute top-[250px] -right-24 h-[640px] w-[460px] origin-top-left scale-[.68] sm:top-auto sm:-bottom-[210px] sm:right-2 sm:scale-100 md:right-6" aria-hidden>
        <div className="absolute left-0 top-12 origin-bottom -rotate-[9deg] scale-[.8]"><Telefoon scherm="/schermen/m-bonnen.png" alt="" /></div>
        <div className="absolute left-[170px] top-0 origin-bottom rotate-[7deg] scale-[.8]"><Telefoon scherm="/schermen/m-app.png" alt="" /></div>
      </div>
    </div>
  );
}

const KAARTEN: { titel: string; sub: string; waarde: string; stijl: string }[] = [
  { titel: "Auditfile", sub: "XAF 3.2, 2026", waarde: "Klaar", stijl: "bg-[#4f566b] text-white" },
  { titel: "ICP-opgaaf", sub: "4e kwartaal 2026", waarde: "€ 3.200,00", stijl: "border border-lijn bg-white text-tekst" },
  { titel: "Btw-aangifte", sub: "4e kwartaal 2026", waarde: "€ 1.125,32", stijl: "bg-[linear-gradient(160deg,#1db1df,#0c7f9f)] text-white" },
  { titel: "Inkomstenbelasting", sub: "indicatie 2026", waarde: "€ 6.840", stijl: "bg-[#1a1f36] text-white" },
  { titel: "Jaarrekening", sub: "2026", waarde: "Winst € 38.120", stijl: "bg-primair-licht text-tekst" },
];

/** Blok 3: belasting, met een waaier van aangiften en drie regels. */
export function BlokBelasting() {
  return (
    <div className="blok px-6 pb-10 pt-12 text-center md:pb-14 md:pt-16">
      <Kopje>Belasting</Kopje>
      <h3 className="mx-auto mt-3 max-w-2xl text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] md:text-[46px]">Je btw-aangifte en inkomstenbelasting staan altijd klaar</h3>
      <div className="fan mx-auto mt-8 h-[320px] w-full max-w-2xl md:mt-12 md:h-[360px]" aria-hidden>
        {KAARTEN.map((k, i) => (
          <div key={k.titel} className={`fan-kaart ${k.stijl}`} style={{ "--r": `${(i - 2) * 15}deg`, zIndex: i } as CSSProperties}>
            <div>
              <p className="text-[15px] font-semibold">{k.titel}</p>
              <p className="text-[13px] opacity-70">{k.sub}</p>
            </div>
            <p className="cijfer text-[20px] font-bold">{k.waarde}</p>
          </div>
        ))}
      </div>
      <ul className="mx-auto mt-8 max-w-xl divide-y divide-lijn-2 border-y border-lijn-2 text-[16px]">
        <li className="py-3">Alle rubrieken 1a tot 5c staan elk kwartaal klaar</li>
        <li className="py-3">Elke maand zie je wat je moet reserveren voor de inkomstenbelasting</li>
        <li className="py-3">Jaarrekening en auditfile met één klik</li>
      </ul>
      <Meer href="#vragen" className="mt-8">Meer over belasting</Meer>
    </div>
  );
}
