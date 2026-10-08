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
    <div className={`kaart w-[372px] max-w-full p-4 ${className}`} aria-hidden>
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
