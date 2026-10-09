# Held-wallpaper opnieuw maken

De held op de homepage (src/components/Held.tsx) gebruikt twee lagen met dezelfde kadrering: `public/beeld/held-winkel.jpg`
(de hele foto) en `public/beeld/held-persoon.png` (alleen vrouw, toonbank en pakketten, transparant). Zo gemaakt:

1. **Foto genereren** (Gemini, key `GEMINI_API_KEY` in `.env.local`):
   `python3 -I banana.py werk/scene.jpg prompt-scene.txt 16:9 2K`
2. **Persoon uitsnijden** met Apple Vision (macOS 14+):
   `swiftc -O uitsnijden.swift -o uitsnijden && ./uitsnijden werk/scene.jpg werk/voorgrond.png werk/masker.png`
   Vision pakt alleen de persoon; de toonbank komt uit stap 3.
3. **Groen-masker voor toonbank en pakketten** (Gemini bewerkt de foto, blijft pixel op pixel uitgelijnd):
   `python3 -I banana.py werk/groen.png prompt-groen.txt 16:9 2K werk/scene.jpg`
4. **Voorgrond samenstellen**: `node voorgrond-bouwen.cjs` combineert het groen-masker (binnen de polygoon `POLY` rond de
   toonbank), het Vision-masker (1-2 px gekrompen tegen lichte randen) en de originele kleuren, en schrijft beide bestanden
   naar `public/beeld` plus een controlebeeld `werk/controle.jpg`. Bij een nieuwe foto de polygoon aanpassen.

Na het vervangen van de beelden de dev-server herstarten met `rm -rf .next`: Next 16 bewaart de beeldcache in `.next/dev/cache/images`.
