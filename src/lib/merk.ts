/** Merknaam op één plek. Wijzig hier en alles volgt. */
export const MERK = "Zelfboek";
export const MERK_SLOGAN = "Je boekhouding doet zichzelf.";
export const MERK_DOMEIN = "zelfboek.nl";
export const PRIJS = 50;

/** Adres van de webapp (aparte repo en deployment). Links naar inloggen en starten wijzen hierheen. */
export const APP_URL = (process.env.NEXT_PUBLIC_APP_URL ?? "https://app.zelfboek.nl").replace(/\/$/, "");
export const LOGIN_URL = `${APP_URL}/login`;
