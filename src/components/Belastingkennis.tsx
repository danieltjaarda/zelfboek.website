import { RegelStroom, type Paar } from "@/components/RegelStroom";

/** Paren: een regel gaat erin bij de Belastingdienst, de bijbehorende actie komt eruit in jouw boekhouding. Eén paar tegelijk. */
const PAREN: Paar[] = [
  { regel: "Kleineondernemersregeling", actie: "KOR voorgesteld" },
  { regel: "Afschrijvingstermijnen", actie: "Afschrijving bus ingeboekt" },
  { regel: "Investeringsaftrek (KIA)", actie: "€ 896 investeringsaftrek verwerkt" },
  { regel: "Btw-tarieven en termijnen", actie: "Btw-aangifte klaargezet" },
  { regel: "Zelfstandigenaftrek", actie: "Zelfstandigenaftrek toegepast" },
  { regel: "Urencriterium", actie: "Uren bijgehouden voor het criterium" },
  { regel: "MKB-winstvrijstelling", actie: "Reservering inkomstenbelasting berekend" },
  { regel: "Bijtelling en zakelijk rijden", actie: "Bijtelling berekend" },
];

const PUNTEN: { kop: string; tekst: string }[] = [
  { kop: "Altijd actueel", tekst: "Verandert de Belastingdienst een tarief, grens of termijn, dan rekent de bot vanaf die dag met het nieuwe." },
  { kop: "Op jouw situatie", tekst: "Geen algemene tips. Hij kijkt naar jouw omzet, uren, aankopen en rechtsvorm en past alleen toe wat voor jou geldt." },
  { kop: "Altijd met uitleg", tekst: "Bij elke actie staat in gewone taal welke regel hij toepaste en wat het je oplevert. Jij beslist, hij regelt." },
];

/** Belastingdienst → bot: één regel tegelijk stroomt naar de bot, die laat zien wat hij ermee doet (src/components/RegelStroom.tsx). */
export function Belastingkennis() {
  return (
    <div>
      <div className="text-center">
        <h2 className="mx-auto max-w-3xl text-balance text-[32px] leading-[1.06] md:text-[48px] md:leading-[1.05]">Kent alle regels van de Belastingdienst. En past ze toe op jouw cijfers.</h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-[17px] leading-relaxed text-tekst-2">Regels gaan erin, acties komen eruit. Jij hoeft niets op te zoeken of bij te houden: de bot ziet wat voor jou geldt en regelt het, of stelt het voor.</p>
      </div>

      <div className="mt-10 md:mt-14">
        <RegelStroom paren={PAREN} />
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-7 md:mt-16 md:grid-cols-3 md:gap-10">
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
