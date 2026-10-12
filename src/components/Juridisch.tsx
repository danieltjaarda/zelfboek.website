import Link from "next/link";
import { LOGIN_URL } from "@/lib/merk";
import { Woordmerk } from "@/components/Merk";
import { Voettekst } from "@/components/Voettekst";

/** Gegevens van de aanbieder. Staan hier op één plek; invullen vóór livegang. */
export const AANBIEDER = {
  naam: "[naam van de onderneming achter Saldoplan]",
  kvk: "[KvK-nummer]",
  adres: "[adres]",
  email: "hallo@saldoplan.nl",
};

/** Opmaak voor de juridische pagina's, met een duidelijke concept-melding tot een jurist ze heeft nagekeken. */
export function Juridisch({ titel, bijgewerkt, children }: { titel: string; bijgewerkt: string; children: React.ReactNode }) {
  return (
    <main className="flex-1">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"><Link href="/"><Woordmerk /></Link><Link href={LOGIN_URL} className="pilknop-licht pilknop-klein">Inloggen</Link></header>
      <article className="mx-auto max-w-2xl px-6 py-12 text-[16px] leading-relaxed text-tekst-2 [&_h1]:text-tekst [&_h2]:mt-9 [&_h2]:text-[22px] [&_h2]:font-medium [&_h2]:text-tekst [&_p]:mt-3 [&_li]:mt-1.5 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:text-tekst">
        <p className="mb-6 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-[14px] text-amber-900">Concept. Deze tekst wordt nog nagekeken door een jurist en kan op details veranderen.</p>
        <h1 className="text-[36px]">{titel}</h1>
        <p className="text-[14px] text-tekst-3">Bijgewerkt op {bijgewerkt}</p>
        {children}
      </article>
      <Voettekst />
    </main>
  );
}
