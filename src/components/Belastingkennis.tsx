import { Kopje } from "@/components/Blokken";
import { MERK } from "@/lib/merk";
import { BotIcoon } from "@/components/BotIcoon";

/** Paren: een regel gaat erin bij de Belastingdienst, de bijbehorende actie komt eruit in jouw boekhouding. Eén paar tegelijk. */
const PAREN: { regel: string; actie: string }[] = [
  { regel: "Kleineondernemersregeling", actie: "KOR voorgesteld" },
  { regel: "Afschrijvingstermijnen", actie: "Afschrijving bus ingeboekt" },
  { regel: "Investeringsaftrek (KIA)", actie: "€ 896 investeringsaftrek verwerkt" },
  { regel: "Btw-tarieven en termijnen", actie: "Btw-aangifte klaargezet" },
  { regel: "Zelfstandigenaftrek", actie: "Zelfstandigenaftrek toegepast" },
  { regel: "Urencriterium", actie: "Uren bijgehouden voor het criterium" },
  { regel: "MKB-winstvrijstelling", actie: "Reservering inkomstenbelasting berekend" },
  { regel: "Bijtelling en zakelijk rijden", actie: "Bijtelling berekend" },
];
/** Tijd per paar in seconden: regel glijdt in 2,2 s naar de bot, daarna verschijnt de actie eronder tot het volgende paar. Zelfde getallen als in de CSS. */
const PERIODE = 5.6;
const UIT_NA = 2.3;

const PUNTEN: { kop: string; tekst: string }[] = [
  { kop: "Altijd actueel", tekst: "Verandert de Belastingdienst een tarief, grens of termijn, dan rekent de bot vanaf die dag met het nieuwe." },
  { kop: "Op jouw situatie", tekst: "Geen algemene tips. Hij kijkt naar jouw omzet, uren, aankopen en rechtsvorm en past alleen toe wat voor jou geldt." },
  { kop: "Altijd met uitleg", tekst: "Bij elke actie staat in gewone taal welke regel hij toepaste en wat het je oplevert. Jij beslist, hij regelt." },
];

function Vinkje() {
  return <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden><path d="M2.5 6.3l2.3 2.3 4.7-5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

/** Belastingdienst → bot: één regel tegelijk glijdt naar de bot, die laat zien wat hij ermee doet. Animatie is puur CSS. */
export function Belastingkennis() {
  return (
    <div>
      <div className="text-center">
        <Kopje>Belastingkennis</Kopje>
        <h2 className="mx-auto mt-3 max-w-3xl text-[34px] leading-[1.05] md:text-[48px]">Kent alle regels van de Belastingdienst. En past ze toe op jouw cijfers.</h2>
        <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-tekst-2">Regels gaan erin, acties komen eruit. Jij hoeft niets op te zoeken of bij te houden: de bot ziet wat voor jou geldt en regelt het, of stelt het voor.</p>
      </div>

      <div className="stroom mt-12 md:mt-16" aria-label={`Regels van de Belastingdienst gaan naar ${MERK}, die ze toepast op jouw boekhouding`}>
        <div className="stroom-knoop">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/belastingdienst.png" alt="" width={84} height={84} />
          <strong>Belastingdienst</strong>
          <small>alle regels, tarieven en termijnen</small>
        </div>
        <div className="stroom-baan" aria-hidden>
          {PAREN.map((p, i) => (
            <span key={p.regel} className="stroom-chip" style={{ animationDelay: `${i * PERIODE}s` }}>{p.regel}</span>
          ))}
        </div>
        <div className="stroom-knoop stroom-bot">
          <span className="stroom-icoon"><BotIcoon size={46} /></span>
          <strong>{MERK}</strong>
          <small>past ze toe op jouw boekhouding</small>
          {/* De actie die uit de regel volgt, verschijnt even onder de bot zodra de regel is aangekomen. */}
          <span className="stroom-acties" aria-hidden>
            {PAREN.map((p, i) => (
              <span key={p.actie} className="stroom-actie" style={{ animationDelay: `${i * PERIODE + UIT_NA}s` }}><Vinkje />{p.actie}</span>
            ))}
          </span>
        </div>
      </div>

      <div className="mx-auto mt-20 grid max-w-5xl gap-8 md:mt-24 md:grid-cols-3 md:gap-10">
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
