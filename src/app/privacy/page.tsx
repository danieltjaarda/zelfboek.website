import type { Metadata } from "next";
import { MERK } from "@/lib/merk";
import { AANBIEDER, Juridisch } from "@/components/Juridisch";

export const metadata: Metadata = { title: `Privacyverklaring | ${MERK}` };
export const instant = false;

export default function Privacy() {
  return (
    <Juridisch titel="Privacyverklaring" bijgewerkt="12 oktober 2026">
      <p>{MERK} verwerkt gegevens om jouw boekhouding te doen. Niet voor iets anders: we verkopen niets, tonen geen advertenties en trainen geen AI-modellen met jouw gegevens.</p>

      <h2>Wie we zijn</h2>
      <p>{AANBIEDER.naam}, KvK {AANBIEDER.kvk}, {AANBIEDER.adres}. Vragen over privacy: {AANBIEDER.email}.</p>

      <h2>Twee rollen</h2>
      <ul>
        <li><strong>Jouw account</strong> (je naam, e-mailadres, inloggegevens, abonnement en betalingen aan ons): hiervoor zijn wij verantwoordelijk.</li>
        <li><strong>Je administratie</strong> (betalingen, bonnen, facturen, klanten, uren, kilometers): dat zijn jouw gegevens. Wij verwerken ze alleen in jouw opdracht. Daarvoor geldt de <a className="underline" href="/verwerkersovereenkomst">verwerkersovereenkomst</a>.</li>
      </ul>

      <h2>Welke gegevens en waarom</h2>
      <ul>
        <li>E-mailadres en naam: om in te loggen en je berichten te sturen (inlogcode, herinneringen, weekoverzicht).</li>
        <li>Bankmutaties, bonnen en facturen: om je boekhouding en aangiften klaar te zetten.</li>
        <li>Gegevens van je klanten (naam, adres, e-mail, btw-nummer): om facturen en offertes te maken en te versturen.</li>
        <li>Technische gegevens (IP-adres, tijdstip): om misbruik te stoppen, zoals het raden van inlogcodes. Die bewaren we hooguit twee dagen.</li>
        <li>Een logboek van wie wat wijzigde in je administratie, zodat jij en je boekhouder dat kunnen nagaan.</li>
      </ul>

      <h2>Waar het staat en wie helpt</h2>
      <p>Je gegevens staan in een database in de Europese Unie, versleuteld opgeslagen en met dagelijkse back-ups. Toegang tot je koppelingen (bank, betaaldiensten, webshop) bewaren we extra versleuteld. Je bankkoppeling is alleen-lezen: {MERK} kan nooit geld overmaken.</p>
      <p>We werken met deze partijen (subverwerkers):</p>
      <ul>
        <li>Hosting van de app: Vercel (servers in de EU waar mogelijk).</li>
        <li>Database: een Postgres-database in de EU.</li>
        <li>AI voor het boeken en lezen van bonnen: Anthropic (VS). We sturen alleen wat nodig is (omschrijving en bedrag van een betaling, of de bon zelf). Anthropic gebruikt die gegevens niet om modellen te trainen. Doorgifte buiten de EU gebeurt op basis van het EU-VS gegevensprivacykader of standaardcontractbepalingen.</li>
        <li>Betalen van je abonnement: Stripe.</li>
        <li>Versturen van e-mail: onze e-mailprovider.</li>
        <li>Bankkoppeling: Enable Banking (Finland), met een PSD2-vergunning.</li>
        <li>Koppelingen die jij zelf aanzet (zoals Mollie, Shopify of bol): alleen als jij dat kiest.</li>
      </ul>

      <h2>Hoe lang</h2>
      <p>Zolang je een account hebt. Verwijder je je account, dan verwijderen we je gegevens direct uit de app en binnen 30 dagen uit de back-ups. Jij moet je administratie zeven jaar bewaren (wettelijke bewaarplicht); download daarom eerst alles via Downloaden, Alles in één keer.</p>

      <h2>Jouw rechten</h2>
      <p>Je mag je gegevens inzien, verbeteren, downloaden en laten verwijderen. Het meeste doe je zelf in de app. Lukt iets niet, mail ons. Ben je het niet eens met hoe we met je gegevens omgaan, dan kun je een klacht indienen bij de Autoriteit Persoonsgegevens.</p>

      <h2>Beveiliging</h2>
      <p>Inloggen zonder wachtwoord met een code per e-mail, Face ID of vingerafdruk, en desgewenst tweestapsverificatie. Elke onderneming ziet alleen haar eigen gegevens. Lukt iets verdachts, dan zetten we het stop en laten we het je weten. Merk je zelf iets vreemds, mail ons meteen.</p>
    </Juridisch>
  );
}
