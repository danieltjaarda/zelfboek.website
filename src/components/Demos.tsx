import Image from "next/image";
import { AppIcoon } from "@/components/Merk";

/** Kaart die laat zien hoe de bot 's nachts regels boekt: ze verschijnen één voor één en krijgen een groen label. */
export function BoekDemo({ className = "" }: { className?: string }) {
  const regels: { app: "ing" | "revolut"; naam: string; sub: string; bedrag: string }[] = [
    { app: "ing", naam: "Bakkerij De Korst", sub: "Factuur 2026-0031 · Omzet 21%", bedrag: "+2.722,50" },
    { app: "ing", naam: "KPN", sub: "Telefoon en internet · 21%", bedrag: "-58,00" },
    { app: "revolut", naam: "Google Ireland", sub: "Software · btw verlegd", bedrag: "-14,00" },
    { app: "ing", naam: "NS Zakelijk", sub: "Reiskosten OV · 9%", bedrag: "-27,40" },
  ];
  return (
    <div className={`kaart w-[372px] p-4 ${className}`} aria-hidden>
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-semibold">Vannacht geboekt</p>
        <span className="text-[12px] text-tekst-3">03:12</span>
      </div>
      <ul className="mt-3 space-y-2.5">
        {regels.map((r, i) => (
          <li key={r.naam} className="boek-rij flex items-center gap-3" style={{ "--d": `${i * 1.3}s` } as React.CSSProperties}>
            <AppIcoon id={r.app} size={32} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-medium">{r.naam}</span>
              <span className="block truncate text-[12px] text-tekst-3">{r.sub}</span>
            </span>
            <span className="relative flex h-5 w-[64px] items-center justify-end">
              <span className="boek-wacht stip absolute right-0 flex gap-1 text-tekst-3"><span /><span /><span /></span>
              <span className="boek-klaar pil pil-groen absolute right-0">Geboekt</span>
            </span>
            <span className={`cijfer w-[86px] text-right text-[13px] font-semibold ${r.bedrag.startsWith("+") ? "text-groen-tekst" : ""}`}>€ {r.bedrag}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Chat met de bot: vraag, denkstipjes, antwoord. Loopt in een lus. */
export function BotDemo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Image src="/beeld/mascotte.png" alt="De bot van Zelfboek, een vriendelijk blauw robotje" width={640} height={640} className="pointer-events-none absolute -top-[88px] right-5 hidden w-[112px] md:block" />
    <div className="halo p-5" aria-hidden>
      <div className="flex items-center gap-2 text-[13px] font-semibold">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--primair)" aria-hidden><path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2z" /><path d="M19 14l.9 2.6L22.5 17.5l-2.6.9L19 21l-.9-2.6-2.6-.9 2.6-.9L19 14z" opacity=".7" /></svg>
        Vraag het de bot
      </div>
      <div className="mt-4 flex min-h-[190px] flex-col gap-3">
        <div className="chat-vraag self-end rounded-xl rounded-br-md bg-inkt px-4 py-2.5 text-[14px] text-white">Hoeveel btw moet ik dit kwartaal betalen?</div>
        <div className="chat-typt stip self-start flex gap-1 rounded-xl rounded-bl-md border border-lijn px-4 py-3 text-tekst-3"><span /><span /><span /></div>
        <div className="chat-antwoord -mt-[46px] self-start rounded-xl rounded-bl-md border border-lijn bg-white px-4 py-3 text-[14px] leading-relaxed text-tekst">
          Over het 4e kwartaal betaal je <strong className="cijfer">€ 1.125,32</strong>. Je omzet was € 5.490 met 21% btw, en je hebt € 44,27 voorbelasting. Uiterlijk 31 januari indienen. Zal ik de aangifte klaarzetten?
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-lg border border-lijn bg-papier px-3 py-2 text-[13px] text-tekst-3">Stel een vraag over je boekhouding<span className="ml-auto rounded border border-lijn-2 bg-white px-1.5 text-[11px]">⌘K</span></div>
    </div>
    </div>
  );
}

/** Telefoonframe met een echt scherm van de app erin. */
export function Telefoon({ scherm, alt, className = "" }: { scherm: string; alt: string; className?: string }) {
  return (
    <div className={`telefoon ${className}`}>
      <div className="telefoon-notch" aria-hidden />
      <div className="telefoon-scherm">
        <Image src={scherm} alt={alt} width={390} height={844} className="block h-full w-full object-cover object-top" priority />
      </div>
    </div>
  );
}

/** Plaatshouders. Vervang door echte reviews voordat de site live gaat. */
export const REVIEWS: { tekst: string; naam: string; rol: string; beeld: string }[] = [
  { tekst: "Mijn btw-aangifte kostte me altijd een avond. Nu lees ik ’m na en klik op klaar.", naam: "Sanne", rol: "grafisch ontwerper", beeld: "/beeld/avatar-1.jpg" },
  { tekst: "Bonnetje fotograferen en vergeten. Dat is eerlijk gezegd alles wat ik nog doe.", naam: "Jeroen", rol: "timmerman", beeld: "/beeld/avatar-2.jpg" },
  { tekst: "Ik vraag gewoon aan de bot wat ik moet reserveren voor de IB. Antwoord in één zin.", naam: "Els", rol: "adviseur", beeld: "/beeld/avatar-3.jpg" },
  { tekst: "Stripe en mijn bank gekoppeld in vijf minuten. Daarna nooit meer naar omgekeken.", naam: "Daan", rol: "softwareontwikkelaar", beeld: "/beeld/avatar-4.jpg" },
];

function Ster() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="#f5b400" aria-hidden><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" /></svg>;
}

/** Sterren, score en portretten, met daaronder een citaat dat elke paar seconden wisselt. */
export function Reviews({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="flex -space-x-2">
          {REVIEWS.map((r) => <Image key={r.naam} src={r.beeld} alt="" width={32} height={32} className="h-8 w-8 rounded-full border-2 border-white object-cover" />)}
        </span>
        <span className="flex items-center gap-0.5" aria-label="4,9 van 5 sterren">{[0, 1, 2, 3, 4].map((i) => <Ster key={i} />)}</span>
        <span className="text-[14px] font-semibold">4,9 van 5</span>
        <span className="text-[14px] text-tekst-2">op basis van 130 zzp’ers</span>
      </div>
      <div className="relative mt-3 h-[44px] max-w-xl text-[15px] leading-snug text-tekst-2" aria-live="off">
        {REVIEWS.map((r, i) => (
          <p key={r.naam} className="review-citaat absolute inset-0" style={{ animationDelay: `${i * 4}s` }}>
            “{r.tekst}” <span className="whitespace-nowrap text-tekst-3">— {r.naam}, {r.rol}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
