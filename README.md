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

## Ontwerp

Dezelfde taal als de app: wit, koele grijzen, merkblauw #1db1df, Inter, Stripe-achtige knoppen en gevulde statuslabels. Echte app-iconen van banken en kanalen in `public/logos/apps`, echte schermen van de app in `public/schermen`. Animaties: gefaseerd omhoog bij laden (`.op`), onthullen bij scrollen (`src/components/Onthul.tsx`), zwevend scherm, doorlopende iconenstrook, en twee CSS-demo's (`src/components/Demos.tsx`: regels die geboekt worden, chat met de bot). Alles valt stil bij `prefers-reduced-motion`.

## Structuur

- `src/app/page.tsx` — homepage
- `src/app/privacy`, `src/app/voorwaarden` — juridische pagina's
- `src/components/Merk.tsx` — beeldmerk, woordmerk en app-iconen (`public/logos/apps`)
- `src/components/Blokken.tsx` — productblokken (koppelingen met tegelwand, mobiele app met telefoons, belasting met waaier)
- `src/components/Accordeon.tsx` — dashboardsectie: onderwerpen links, scherm wisselt rechts mee
- `src/components/Voettekst.tsx` — footer
- `src/lib/merk.ts` — merknaam, prijs, app-adres
- `public/schermen` — screenshots van de app die op de homepage staan
- `docs/schermen` — referentieschermen voor ontwerp

## Stack

Next.js 16 (App Router), Tailwind 4, Inter via next/font.
