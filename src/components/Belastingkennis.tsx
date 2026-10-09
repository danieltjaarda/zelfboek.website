import Image from "next/image";
import { Kopje } from "@/components/Blokken";
import { MERK } from "@/lib/merk";

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

/** Belastingdienst → bot: een stroom van regels die de bot kent en toepast op jouw cijfers. Animatie is puur CSS. */
export function Belastingkennis() {
  return (
    <div>
      <div className="text-center">
        <Kopje>Belastingkennis</Kopje>
        <h2 className="mx-auto mt-3 max-w-3xl text-[34px] leading-[1.05] md:text-[48px]">Kent alle regels van de Belastingdienst. En past ze toe op jouw cijfers.</h2>
        <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-tekst-2">Elke regeling, elk tarief en elke termijn zit erin, en wordt bijgewerkt zodra de Belastingdienst iets verandert. Jij hoeft niets op te zoeken: de bot ziet wat voor jou geldt en regelt het of stelt het voor.</p>
      </div>
      <div className="stroom mt-12 md:mt-16" aria-label={`Regels van de Belastingdienst stromen naar ${MERK}`}>
        <div className="stroom-knoop">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/belastingdienst.png" alt="" width={84} height={84} />
          <strong>Belastingdienst</strong>
          <small>regels, tarieven, termijnen</small>
        </div>
        <div className="stroom-baan" aria-hidden>
          {REGELS.map((r, i) => (
            <span key={r} className="stroom-chip" style={{ animationDelay: `${i * 1.2}s`, ["--y" as string]: `${[-46, 0, 46][i % 3]}px` }}>{r}</span>
          ))}
        </div>
        <div className="stroom-knoop stroom-bot">
          <Image src="/beeld/icoon-bot.png" alt="" width={84} height={84} />
          <strong>{MERK}</strong>
          <small>past ze toe op jouw boekhouding</small>
        </div>
      </div>
    </div>
  );
}
