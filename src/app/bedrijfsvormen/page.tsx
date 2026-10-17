import type { Metadata } from "next";
import { MERK } from "@/lib/merk";
import { OverzichtPagina } from "@/components/Doelgroep";

export const instant = false;
export const metadata: Metadata = { title: `Bedrijfsvormen | ${MERK}`, description: `${MERK} voor zzp’ers, vof’s en bv’s. De bot boekt elke nacht en zet de aangiften klaar die bij jouw bedrijfsvorm horen.` };

export default function Bedrijfsvormen() {
  return <OverzichtPagina soort="bedrijfsvorm" />;
}
