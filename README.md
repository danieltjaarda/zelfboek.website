# Zelfboek — website

De marketingsite van Zelfboek: homepage, privacyverklaring en voorwaarden. Statisch, geen database, geen inlog.

De webapp (inloggen, boekhouding, API's, cron) staat in de aparte repo **zelfboek-app**. Alle knoppen "Inloggen" en "Start gratis" op deze site linken daarnaartoe via `NEXT_PUBLIC_APP_URL` (standaard `https://app.zelfboek.nl`).

## Starten

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy

Vercel, framework Next.js. Eén omgevingsvariabele: `NEXT_PUBLIC_APP_URL`. Domein: `zelfboek.nl` (en `www`).

## Structuur

- `src/app/page.tsx` — homepage
- `src/app/privacy`, `src/app/voorwaarden` — juridische pagina's
- `src/components/Merk.tsx` — beeldmerk, woordmerk en partnerlogo's (`public/logos`)
- `src/components/Voettekst.tsx` — footer
- `src/lib/merk.ts` — merknaam, prijs, app-adres
- `public/schermen` — screenshots van de app die op de homepage staan
- `docs/schermen` — referentieschermen voor ontwerp

## Stack

Next.js 16 (App Router), Tailwind 4, Sora via next/font.
