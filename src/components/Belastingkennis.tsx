import { Kopje } from "@/components/Blokken";
import { MERK } from "@/lib/merk";
import { BotIcoon } from "@/components/BotIcoon";

/** Regels en regelingen die als chips van de Belastingdienst naar de bot stromen. */
const REGELS = [
  "Kleineondernemersregeling",
  "Zelfstandigenaftrek",
  "Urencriterium",
  "Investeringsaftrek (KIA)",
  "Btw-tarieven en termijnen",
  "Afschrijvingstermijnen",
  "MKB-winstvrijstelling",
  "Bijtelling en zakelijk rijden",
  "Startersaftrek",
];

/** Wat er aan de andere kant uitkomt: concrete acties in jouw boekhouding. */
const ACTIES = [
  "Afschrijving bus ingeboekt",
  "KOR voorgesteld",
  "€ 896 investeringsaftrek verwerkt",
  "Btw-aangifte klaargezet",
  "Reservering inkomstenbelasting berekend",
  "Uren bijgehouden voor het criterium",
];

const PUNTEN: { kop: string; tekst: string }[] = [
  { kop: "Altijd actueel", tekst: "Verandert de Belastingdienst een tarief, grens of termijn, dan rekent de bot vanaf die dag met het nieuwe." },
  { kop: "Op jouw situatie", tekst: "Geen algemene tips. Hij kijkt naar jouw omzet, uren, aankopen en rechtsvorm en past alleen toe wat voor jou geldt." },
  { kop: "Altijd met uitleg", tekst: "Bij elke actie staat in gewone taal welke regel hij toepaste en wat het je oplevert. Jij beslist, hij regelt." },
];

function Vinkje() {
  return <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden><path d="M2.5 6.3l2.3 2.3 4.7-5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

/** Plat icoon voor 'jouw boekhouding': een grootboekblad met regels en een vinkje, in één kleur. */
function BoekIcoon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden fill="currentColor">
      <path fillRule="evenodd" d="M16 6h24l12 12v34a6 6 0 0 1-6 6H16a6 6 0 0 1-6-6V12a6 6 0 0 1 6-6zm22 5v9a4 4 0 0 0 4 4h8L38 11zM18 30h22a2 2 0 1 1 0 4H18a2 2 0 1 1 0-4zm0-9h12a2 2 0 1 1 0 4H18a2 2 0 1 1 0-4zm0 18h14a2 2 0 1 1 0 4H18a2 2 0 1 1 0-4zm20.6 5.6a2 2 0 0 1 2.8 0l2.1 2.1 5.1-5.1a2 2 0 1 1 2.8 2.8l-6.5 6.5a2 2 0 0 1-2.8 0l-3.5-3.5a2 2 0 0 1 0-2.8z" />
    </svg>
  );
}

/** Belastingdienst → bot → jouw boekhouding: regels gaan erin, concrete acties komen eruit. Animatie is puur CSS. */
export function Belastingkennis() {
  return (
    <div>
      <div className="text-center">
        <Kopje>Belastingkennis</Kopje>
        <h2 className="mx-auto mt-3 max-w-3xl text-[34px] leading-[1.05] md:text-[48px]">Kent alle regels van de Belastingdienst. En past ze toe op jouw cijfers.</h2>
        <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-tekst-2">Regels gaan erin, acties komen eruit. Jij hoeft niets op te zoeken of bij te houden: de bot ziet wat voor jou geldt en regelt het, of stelt het voor.</p>
      </div>

      <div className="stroom mt-12 md:mt-16" aria-label={`Regels van de Belastingdienst gaan naar ${MERK}, acties komen in jouw boekhouding`}>
        <div className="stroom-knoop">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/belastingdienst.png" alt="" width={84} height={84} />
          <strong>Belastingdienst</strong>
          <small>alle regels, tarieven en termijnen</small>
        </div>
        <div className="stroom-baan" aria-hidden>
          {REGELS.map((r, i) => (
            <span key={r} className="stroom-chip" style={{ animationDelay: `${i * 1.2}s`, ["--y" as string]: `${[-46, 0, 46][i % 3]}px` }}>{r}</span>
          ))}
        </div>
        <div className="stroom-knoop stroom-bot">
          <span className="stroom-icoon"><BotIcoon size={46} /></span>
          <strong>{MERK}</strong>
          <small>leest ze en kijkt wat voor jou geldt</small>
        </div>
        <div className="stroom-baan" aria-hidden>
          {ACTIES.map((a, i) => (
            <span key={a} className="stroom-chip stroom-chip-uit" style={{ animationDelay: `${i * 1.8 + 0.9}s`, ["--y" as string]: `${[0, -46, 46][i % 3]}px` }}><Vinkje />{a}</span>
          ))}
        </div>
        <div className="stroom-knoop">
          <span className="stroom-icoon stroom-icoon-boek"><BoekIcoon size={42} /></span>
          <strong>Jouw boekhouding</strong>
          <small>geboekt, geregeld of voorgesteld</small>
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:mt-16 md:grid-cols-3 md:gap-10">
        {PUNTEN.map((p) => (
          <div key={p.kop}>
            <h3 className="flex items-center gap-2 text-[17px] font-semibold"><span className="h-2 w-2 rounded-full bg-primair" aria-hidden />{p.kop}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-tekst-2">{p.tekst}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
