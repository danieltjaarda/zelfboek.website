import { MERK } from "@/lib/merk";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: MERK,
    short_name: MERK,
    description: "AI-boekhouding voor zzp'ers. Bank, bonnen, facturen en btw, automatisch.",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#1db1df",
    lang: "nl",
    icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }, { src: "/icon-512.png", sizes: "512x512", type: "image/png" }],
  };
}
