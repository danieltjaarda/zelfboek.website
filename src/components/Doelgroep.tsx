import Image from "next/image";
import Link from "next/link";
import { MERK, LOGIN_URL } from "@/lib/merk";
import { BEDRIJFSVORMEN, BEDRIJFSVORMEN_VRAGEN, SECTOREN, SECTOREN_VRAGEN, type Doelgroep } from "@/lib/voorwie";
import { Kop } from "@/components/Kop";
import { Voettekst } from "@/components/Voettekst";
import { Onthul } from "@/components/Onthul";
import { Vragen } from "@/components/Vragen";
import { Icoon } from "@/components/Iconen";
import { Slot } from "@/components/Slot";
import { MobieleKnop } from "@/components/MobieleKnop";

type Soort = "sector" | "bedrijfsvorm";
const OUDER: Record<Soort, { kop: string; pad: string }> = {
  sector: { kop: "Sectoren", pad: "/sectoren" },
  bedrijfsvorm: { kop: "Bedrijfsvormen", pad: "/bedrijfsvormen" },
};

/**
 * Pagina voor één sector of bedrijfsvorm (data in src/lib/voorwie.ts), naar de opzet van moneybird.nl: held met foto, drie
 * redenen, wat de bot doet, een citaat, vragen en de afsluiter. Stijl bij .doelgroep in globals.css.
 */
export function DoelgroepPagina({ d, soort }: { d: Doelgroep; soort: Soort }) {
  const ouder = OUDER[soort];
  return (
    <main className="flex-1">
      <Kop />

      {/* Held: tekst links, foto rechts. De navigatie is vast en 62px hoog, vandaar de ruimte bovenin. */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-[110px] md:pb-24 md:pt-[140px]">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <p className="kruimel"><Link href={ouder.pad}>{ouder.kop}</Link><span aria-hidden>/</span><span>{d.naam}</span></p>
            <h1 className="mt-4 text-balance text-[36px] leading-[1.06] md:text-[52px]">{d.kop}</h1>
            <p className="mt-5 max-w-[540px] text-pretty text-[17px] leading-[1.5] text-tekst-2 md:text-[19px]">{d.intro}</p>
            <div data-held-knoppen className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link href={LOGIN_URL} className="pilknop">Start gratis, 30 dagen</Link>
              <Link href="/#prijs" className="pilknop-licht">Bekijk prijzen</Link>
            </div>
          </div>
          <Onthul richting="rechts">
            <div className="doelgroep-beeld">
              <Image src={d.beeld} alt={d.alt} width={1600} height={1067} priority />
              <span className="doelgroep-badge" aria-hidden><Icoon naam={d.icoon} size={22} /></span>
            </div>
          </Onthul>
        </div>
      </section>

      {/* Drie redenen */}
      <section className="bg-papier py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <Onthul><h2 className="max-w-2xl text-[34px] leading-[1.05] md:text-[44px]">Wat het je oplevert.</h2></Onthul>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {d.waarom.map((w, i) => (
              <Onthul key={w.kop} vertraging={i * 100}>
                <div className="kaart h-full p-6 md:p-7">
                  <span className="nummer">{i + 1}</span>
                  <h3 className="mt-5 text-[19px] leading-snug">{w.kop}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-tekst-2">{w.tekst}</p>
                </div>
              </Onthul>
            ))}
          </div>
        </div>
      </section>

      {/* Wat de bot doet */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <Onthul>
          <h2 className="max-w-2xl text-[34px] leading-[1.05] md:text-[44px]">Wat de bot voor je doet.</h2>
          <p className="mt-4 max-w-xl text-[17px] text-tekst-2">Elke nacht, zonder dat je het vraagt. Jij leest na en tikt af en toe een antwoord.</p>
        </Onthul>
        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {d.doet.map((f, i) => (
            <Onthul key={f.kop} vertraging={i * 80}>
              <div className="flex gap-4">
                <span className="icoonchip"><Icoon naam={f.icoon} size={22} /></span>
                <div>
                  <h3 className="text-[18px] leading-snug">{f.kop}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-tekst-2">{f.tekst}</p>
                </div>
              </div>
            </Onthul>
          ))}
        </div>
      </section>

      {/* Het dashboard, schuin zoals op de homepage (.dash-vak), met regels die bij dit beroep passen. */}
      <section className="mx-auto max-w-6xl px-6 pb-20 md:pb-24">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.55fr] lg:gap-14">
          <Onthul>
            <h2 className="text-[32px] leading-[1.05] md:text-[42px]">Zo ziet je ochtend eruit.</h2>
            <p className="mt-4 max-w-md text-[17px] leading-relaxed text-tekst-2">{d.schermTekst}</p>
            <Link href="/#hoe" className="meer mt-5">Bekijk hoe het werkt<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M9 6l6 6-6 6" /></svg></Link>
          </Onthul>
          <Onthul richting="rechts">
            <div className="dash-vak" aria-hidden>
              <div className="dash-vak-b">
                <div className="dash-binnen">
                  <Image src={d.scherm} alt="" width={2880} height={1800} className="dash-beeld actief" />
                </div>
              </div>
            </div>
          </Onthul>
        </div>
      </section>

      {/* Citaat */}
      <section className="mx-auto max-w-6xl px-6 pb-20 md:pb-24">
        <Onthul>
          <figure className="blok px-6 py-14 text-center md:py-20">
            <blockquote className="mx-auto max-w-3xl text-balance text-[24px] font-semibold leading-[1.3] tracking-[-0.02em] md:text-[32px]">“{d.citaat.tekst}”</blockquote>
            <figcaption className="mt-6 text-[15px] text-tekst-2"><strong className="font-semibold text-tekst">{d.citaat.naam}</strong>, {d.citaat.rol}</figcaption>
          </figure>
        </Onthul>
      </section>

      {/* Vragen */}
      <section className="mx-auto max-w-3xl px-6 pb-20 md:pb-28">
        <Onthul><h2 className="text-[32px] leading-[1.05] md:text-[42px]">Veelgestelde vragen.</h2></Onthul>
        <Onthul vertraging={100} className="mt-8"><Vragen items={d.vragen} /></Onthul>
      </section>

      <Slot />
      <Voettekst />
      <MobieleKnop href={LOGIN_URL}>Start gratis, 30 dagen</MobieleKnop>
    </main>
  );
}

/** Overzicht van alle sectoren of alle bedrijfsvormen: kop, kaarten met foto, vragen en de afsluiter. */
export function OverzichtPagina({ soort }: { soort: Soort }) {
  const ouder = OUDER[soort];
  const items = soort === "sector" ? SECTOREN : BEDRIJFSVORMEN;
  const vragen = soort === "sector" ? SECTOREN_VRAGEN : BEDRIJFSVORMEN_VRAGEN;
  const kop = soort === "sector" ? `${MERK} voor elke sector.` : `${MERK} voor elke bedrijfsvorm.`;
  const intro = soort === "sector"
    ? "Elke sector heeft zijn eigen ritme en zijn eigen vragen. Dit zijn de sectoren die we het vaakst zien, maar de bot werkt voor elke ondernemer."
    : "Alleen, samen of met een bv erboven: de bot boekt elke nacht en zet de aangiften klaar die bij jouw bedrijfsvorm horen.";
  return (
    <main className="flex-1">
      <Kop />
      <section className="mx-auto max-w-6xl px-6 pb-12 pt-[110px] text-center md:pb-16 md:pt-[140px]">
        <p className="kruimel justify-center"><span>Voor wie</span><span aria-hidden>/</span><span>{ouder.kop}</span></p>
        <h1 className="mx-auto mt-4 max-w-3xl text-balance text-[36px] leading-[1.06] md:text-[52px]">{kop}</h1>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-[17px] leading-[1.5] text-tekst-2 md:text-[19px]">{intro}</p>
        <div data-held-knoppen className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
          <Link href={LOGIN_URL} className="pilknop">Start gratis, 30 dagen</Link>
          <Link href="/#prijs" className="pilknop-licht">Bekijk prijzen</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((d, i) => (
            <Onthul key={d.slug} vertraging={(i % 3) * 100}>
              <Link href={`${ouder.pad}/${d.slug}`} className="kaart lift block h-full overflow-hidden">
                <Image src={d.beeld} alt={d.alt} width={1600} height={1067} className="aspect-[3/2] w-full object-cover" />
                <div className="p-5">
                  <h3 className="flex items-center gap-2.5 text-[18px]"><span className="icoonchip icoonchip-klein"><Icoon naam={d.icoon} size={18} /></span>{d.naam}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-tekst-2">{d.kort}</p>
                  <span className="meer mt-4">
                    Bekijk
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M9 6l6 6-6 6" /></svg>
                  </span>
                </div>
              </Link>
            </Onthul>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-20 md:pb-28">
        <Onthul><h2 className="text-[32px] leading-[1.05] md:text-[42px]">Veelgestelde vragen.</h2></Onthul>
        <Onthul vertraging={100} className="mt-8"><Vragen items={vragen} /></Onthul>
      </section>

      <Slot />
      <Voettekst />
      <MobieleKnop href={LOGIN_URL}>Start gratis, 30 dagen</MobieleKnop>
    </main>
  );
}
