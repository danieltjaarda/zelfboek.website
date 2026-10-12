import type { Metadata } from "next";
import { MERK } from "@/lib/merk";
import { AANBIEDER, Juridisch } from "@/components/Juridisch";

export const metadata: Metadata = { title: `Verwerkersovereenkomst | ${MERK}` };
export const instant = false;

export default function Verwerkersovereenkomst() {
  return (
    <Juridisch titel="Verwerkersovereenkomst" bijgewerkt="12 oktober 2026">
      <p>Deze overeenkomst hoort bij de <a className="underline" href="/voorwaarden">algemene voorwaarden</a> en geldt zodra je {MERK} gebruikt. Jij bent de <strong>verwerkingsverantwoordelijke</strong> voor de persoonsgegevens in je administratie (bijvoorbeeld van je klanten). {AANBIEDER.naam} is de <strong>verwerker</strong>.</p>

      <h2>1. Wat we verwerken</h2>
      <ul>
        <li>Soorten gegevens: namen, adressen, e-mailadressen, telefoonnummers, IBAN&apos;s, btw-nummers en betaalgegevens die in je bankmutaties, bonnen, facturen en klantenlijst staan.</li>
        <li>Van wie: je klanten, leveranciers en andere partijen waarmee je zaken doet, en jijzelf.</li>
        <li>Waarvoor: alleen om {MERK} voor jou te laten werken (boeken, factureren, aangiften klaarzetten, herinneringen sturen). Nooit voor eigen doeleinden, reclame of het trainen van AI.</li>
      </ul>

      <h2>2. Onze afspraken</h2>
      <ol>
        <li>We verwerken de gegevens alleen op jouw instructie: wat je in de app doet en instelt, en wat in de voorwaarden staat.</li>
        <li>Iedereen bij ons die bij de gegevens kan, heeft een geheimhoudingsplicht.</li>
        <li>We nemen passende beveiligingsmaatregelen: versleutelde verbindingen en opslag, extra versleuteling van toegang tot koppelingen, strikte scheiding tussen ondernemingen, beperkte toegang voor medewerkers, limieten tegen misbruik en dagelijkse back-ups.</li>
        <li>We helpen je als iemand zijn rechten uitoefent (inzage, correctie, verwijdering), en bij een eventuele DPIA of vraag van de toezichthouder.</li>
        <li>Na afloop verwijderen we de gegevens, of geven we ze eerst aan je terug als je dat vraagt. Je kunt ze ook altijd zelf downloaden.</li>
        <li>Je mag controleren of we ons aan deze afspraken houden. Meestal volstaat een schriftelijke toelichting; een audit door een onafhankelijke deskundige kan op jouw kosten, na overleg.</li>
      </ol>

      <h2>3. Subverwerkers</h2>
      <p>Je geeft toestemming voor de subverwerkers die in de <a className="underline" href="/privacy">privacyverklaring</a> staan. Komt er een nieuwe bij, dan laten we je dat vooraf weten; je kunt dan bezwaar maken of opzeggen. Met elke subverwerker hebben we afspraken die minstens zo streng zijn als deze. Gegevens buiten de EU gaan alleen naar partijen met een passend beschermingsniveau (zoals het EU-VS gegevensprivacykader of standaardcontractbepalingen).</p>

      <h2>4. Datalekken</h2>
      <p>Merken we een beveiligingsincident dat jouw gegevens raakt, dan laten we het je zonder onnodige vertraging weten, en uiterlijk binnen 48 uur nadat we het ontdekten. We vertellen wat er gebeurde, welke gegevens het raakt en wat we eraan doen, zodat jij kunt beslissen of je het moet melden bij de Autoriteit Persoonsgegevens of aan betrokkenen.</p>

      <h2>5. Duur</h2>
      <p>Deze overeenkomst loopt zolang je {MERK} gebruikt en eindigt vanzelf als je account is verwijderd.</p>

      <h2>6. Aansprakelijkheid</h2>
      <p>Voor aansprakelijkheid gelden de afspraken uit de algemene voorwaarden.</p>

      <p className="mt-8 text-[14px]">Liever een getekende versie voor je eigen administratie? Mail naar {AANBIEDER.email}.</p>
    </Juridisch>
  );
}
