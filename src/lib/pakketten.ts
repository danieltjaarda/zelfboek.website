/**
 * Pakketten en prijzen op één plek, in euro's per maand zonder btw. `jaar` is de maandprijs bij betaling per jaar;
 * het verschil met `maand` maal twaalf is wat je per jaar bespaart. Wijzig hier en de prijssectie, held, metadata en
 * voorwaarden volgen.
 */
export type Pakket = {
  naam: string;
  voor: string;
  maand: number;
  jaar: number;
  populair?: boolean;
  /** Wat je ermee kunt, met een vinkje. */
  kan: string[];
};

export const PAKKETTEN: Pakket[] = [
  {
    naam: "Start", voor: "Ideaal voor freelancers en starters", maand: 18, jaar: 15,
    kan: ["Slim documenten verwerken", "Je administratie strak, jij aan het roer", "Scan je bonnetjes met de app"],
  },
  {
    naam: "Groei", voor: "Voor ondernemers die verder groeien", maand: 35, jaar: 29, populair: true,
    kan: ["Alles van Start", "80% van je boekhouding op de automatische piloot", "Samenwerken met meerdere gebruikers"],
  },
  {
    naam: "Compleet", voor: "Voor onbeperkt boekhouden", maand: 49, jaar: 41,
    kan: ["Alles van Groei", "Een compleet pakket zonder limitaties", "Ideaal voor bedrijven met uitgebreide administratie"],
  },
];

/** Laagste maandprijs, voor "vanaf € 15 per maand" in teksten. */
export const PRIJS_VANAF = Math.min(...PAKKETTEN.map((p) => p.jaar));
