"use client";
import { useEffect } from "react";

/** Kromming van de hoeken, zelfde parameter als CSS corner-shape: superellipse(K); 1 = rond, 2 = squircle. Exponent is 2^K. */
export const KROMMING = 1.4;
const MACHT = 2 / Math.pow(2, KROMMING);

/** Pad van een rechthoek w×h met superellips-hoeken (zelfde vorm als corner-shape: superellipse(KROMMING)) met straal r, in px. */
export function squirclePad(w: number, h: number, r: number): string {
  const n = 14;
  const pts: string[] = [];
  const hoek = (cx: number, cy: number, van: number) => {
    for (let i = 0; i <= n; i++) {
      const t = van + (i / n) * (Math.PI / 2);
      const c = Math.cos(t), s = Math.sin(t);
      const x = cx + r * Math.sign(c) * Math.pow(Math.abs(c), MACHT);
      const y = cy + r * Math.sign(s) * Math.pow(Math.abs(s), MACHT);
      pts.push(`${x.toFixed(2)} ${y.toFixed(2)}`);
    }
  };
  hoek(r, r, Math.PI); hoek(w - r, r, 1.5 * Math.PI); hoek(w - r, h - r, 0); hoek(r, h - r, 0.5 * Math.PI);
  return `path("M${pts.join(" L")} Z")`;
}

/** Fallback voor browsers zonder corner-shape: zet per knop een clip-path met squircle-hoeken en houdt die bij bij resize. */
export function SquircleFallback() {
  useEffect(() => {
    if (typeof CSS !== "undefined" && CSS.supports(`corner-shape: superellipse(${KROMMING})`)) return;
    const zet = (el: HTMLElement) => {
      const r = parseFloat(getComputedStyle(el).borderRadius) || 18;
      const w = el.offsetWidth, h = el.offsetHeight;
      if (w && h) el.style.clipPath = squirclePad(w, h, Math.min(r, w / 2, h / 2));
    };
    const ro = new ResizeObserver((items) => items.forEach((i) => zet(i.target as HTMLElement)));
    const start = () => document.querySelectorAll<HTMLElement>(".pilknop, .pilknop-licht").forEach((el) => { zet(el); ro.observe(el); });
    start();
    const mo = new MutationObserver(start);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { ro.disconnect(); mo.disconnect(); };
  }, []);
  return null;
}
