import type { Metadata } from "next";
import { MERK, PRIJS } from "@/lib/merk";
import { AANBIEDER, Juridisch } from "@/components/Juridisch";

export const metadata: Metadata = { title: `Algemene voorwaarden | ${MERK}` };
export const instant = false;

export default function Voorwaarden() {
  return (
    <Juridisch titel="Algemene voorwaarden" bijgewerkt="12 oktober 2026">
      <p>In gewone taal. Waar &quot;wij&quot; staat, bedoelen we {AANBIEDER.naam}, KvK {AANBIEDER.kvk}, {AANBIEDER.adres}. Waar &quot;jij&quot; staat, bedoelen we de ondernemer die {MERK} gebruikt.</p>

      <h2>1. Wat {MERK} is en wat niet</h2>
      <p>{MERK} is software die je boekhouding bijhoudt: betalingen boeken, bonnen lezen, facturen maken en de btw-aangifte klaarzetten. {MERK} gebruikt daarvoor AI. {MERK} is geen boekhouder, accountant of belastingadviseur en geeft geen persoonlijk fiscaal advies.</p>
      <p>Jij blijft verantwoordelijk voor je administratie en je aangiften. Wij zetten alles klaar; jij controleert en dient in.</p>

      <h2>2. Account</h2>
      <ul>
        <li>Je maakt een account met je e-mailadres. Je houdt je inloggegevens voor jezelf. Gebruik je Face ID, vingerafdruk of tweestapsverificatie, dan is dat extra veilig.</li>
        <li>Nodig je anderen uit (bijvoorbeeld je boekhouder), dan ben jij verantwoordelijk voor wat zij met hun toegang doen.</li>
        <li>Je geeft juiste gegevens op en gebruikt {MERK} alleen voor je eigen onderneming en binnen de wet.</li>
      </ul>

      <h2>3. Proefperiode, prijs en betalen</h2>
      <ul>
        <li>De eerste 30 dagen zijn gratis en zonder verplichting. Er wordt niets afgeschreven tot je zelf een abonnement start.</li>
        <li>Daarna kost {MERK} € {PRIJS} per maand, exclusief btw. Je betaalt vooraf per maand (of per jaar, als je dat kiest) via onze betaalpartij Stripe.</li>
        <li>Mislukt een betaling, dan proberen we het een paar keer opnieuw en laten we het je weten. Lukt het niet, dan stopt het abonnement.</li>
        <li>Prijswijzigingen hoor je minstens 30 dagen van tevoren per e-mail. Ben je het er niet mee eens, dan kun je opzeggen voordat de nieuwe prijs ingaat.</li>
      </ul>

      <h2>4. Opzeggen</h2>
      <p>Je zegt op wanneer je wilt via Instellingen, Abonnement. Het abonnement stopt aan het einde van de betaalde periode; je krijgt geen geld terug voor een lopende periode. Na het opzeggen kun je je gegevens nog bekijken en downloaden, maar niets meer wijzigen.</p>

      <h2>5. Je gegevens</h2>
      <ul>
        <li>Je gegevens zijn van jou. Je downloadt ze wanneer je wilt, in één keer of als Excel en auditfile.</li>
        <li>Wij gebruiken je gegevens alleen om {MERK} voor jou te laten werken. Hoe we dat doen staat in de <a className="underline" href="/privacy">privacyverklaring</a> en de <a className="underline" href="/verwerkersovereenkomst">verwerkersovereenkomst</a>, die bij deze voorwaarden horen.</li>
        <li>Verwijder je je account, dan verwijderen we je gegevens. Let op: jij moet je administratie volgens de wet zeven jaar bewaren. Download daarom eerst alles.</li>
      </ul>

      <h2>6. Beschikbaarheid</h2>
      <p>We doen ons best om {MERK} altijd bereikbaar te houden en maken elke dag een back-up. Onderhoud doen we zo veel mogelijk &apos;s nachts. Koppelingen met banken en andere diensten hangen ook af van die partijen; als zij storing hebben, kan het ophalen een tijdje niet lukken.</p>

      <h2>7. Aansprakelijkheid</h2>
      <p>We geven bij elke boeking uitleg en vragen het jou als we twijfelen. Toch kan er iets niet kloppen. Wij zijn niet aansprakelijk voor boetes, rente of andere schade door onjuiste of te late aangiften, tenzij wij opzettelijk of grof nalatig hebben gehandeld. Onze aansprakelijkheid is in alle gevallen beperkt tot het bedrag dat je ons in de twaalf maanden daarvoor hebt betaald.</p>

      <h2>8. Wijzigingen in deze voorwaarden</h2>
      <p>Veranderen we deze voorwaarden op een manier die voor jou nadelig is, dan hoor je dat minstens 30 dagen van tevoren per e-mail en kun je opzeggen voordat de wijziging ingaat.</p>

      <h2>9. Recht en geschillen</h2>
      <p>Op deze voorwaarden is Nederlands recht van toepassing. Komen we er samen niet uit, dan legt de bevoegde rechter in Nederland het geschil voor. Eerst praten heeft altijd onze voorkeur: mail naar {AANBIEDER.email}.</p>
    </Juridisch>
  );
}
