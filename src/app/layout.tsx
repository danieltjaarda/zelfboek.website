import { MERK } from "@/lib/merk";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-body", subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: `${MERK}, boekhouding die zichzelf doet`,
  description: "AI-boekhouding voor zzp'ers. Koppel je bank, de bot boekt elke nacht je regels, bonnen en facturen. € 50 per maand, 30 dagen gratis.",
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
