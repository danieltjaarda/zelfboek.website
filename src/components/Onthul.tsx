"use client";

import { useEffect, useRef } from "react";

/** Onthult de inhoud zodra die in beeld scrolt: zacht omhoog en in, of met `richting` van links of rechts. */
export function Onthul({ children, className = "", vertraging = 0, richting }: { children: React.ReactNode; className?: string; vertraging?: number; richting?: "links" | "rechts" }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { el.classList.add("in"); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`onthul ${richting ? `onthul-${richting}` : ""} ${className}`} style={vertraging ? { transitionDelay: `${vertraging}ms` } : undefined}>{children}</div>;
}
