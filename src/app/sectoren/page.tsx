import type { Metadata } from "next";
import { MERK } from "@/lib/merk";
import { OverzichtPagina } from "@/components/Doelgroep";

export const instant = false;
export const metadata: Metadata = { title: `Sectoren | ${MERK}`, description: `${MERK} voor elke sector: van bouw en horeca tot webshops en SaaS. De bot boekt elke nacht, jij werkt overdag.` };

export default function Sectoren() {
  return <OverzichtPagina soort="sector" />;
}
