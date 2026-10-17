import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MERK } from "@/lib/merk";
import { BEDRIJFSVORMEN, vindBedrijfsvorm } from "@/lib/voorwie";
import { DoelgroepPagina } from "@/components/Doelgroep";

export const instant = false;

export function generateStaticParams() {
  return BEDRIJFSVORMEN.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const b = vindBedrijfsvorm((await params).slug);
  return b ? { title: `${b.naam} | ${MERK}`, description: b.intro } : {};
}

export default async function Bedrijfsvorm({ params }: { params: Promise<{ slug: string }> }) {
  const b = vindBedrijfsvorm((await params).slug);
  if (!b) notFound();
  return <DoelgroepPagina d={b} soort="bedrijfsvorm" />;
}
