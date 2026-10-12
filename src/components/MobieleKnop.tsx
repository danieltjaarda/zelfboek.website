"use client";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

/**
 * Zwevende knop onderin op mobiel. Komt pas omhoog als de knoppen in de held uit beeld zijn en zakt weer weg zodra het
 * slotblok (#slot, met een eigen knop) in beeld komt. Zo staat hij nooit dubbel met een andere knop en dekt hij de
 * voettekst niet af. Stijl bij .mobielknop in globals.css.
 */
export function MobieleKnop({ href, children }: { href: string; children: ReactNode }) {
  const [zichtbaar, setZichtbaar] = useState(false);

  useEffect(() => {
    const begin = document.querySelector("[data-held-knoppen]");
    const eind = document.getElementById("slot");
    let voorbij = false, klaar = false;
    const io = new IntersectionObserver((items) => {
      for (const e of items) {
        const erboven = e.boundingClientRect.top < 0;
        if (e.target === begin) voorbij = !e.isIntersecting && erboven;
        if (e.target === eind) klaar = e.isIntersecting || erboven;
      }
      setZichtbaar(voorbij && !klaar);
    });
    if (begin) io.observe(begin);
    if (eind) io.observe(eind);
    return () => io.disconnect();
  }, []);

  return (
    <div className="mobielknop sm:hidden" data-zichtbaar={zichtbaar ? "" : undefined}>
      <Link href={href} className="pilknop w-full">{children}</Link>
    </div>
  );
}
