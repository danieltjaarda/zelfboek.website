import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MERK } from "@/lib/merk";
import { SECTOREN, vindSector } from "@/lib/voorwie";
import { DoelgroepPagina } from "@/components/Doelgroep";

export const instant = false;

export function generateStaticParams() {
  return SECTOREN.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = vindSector((await params).slug);
  return s ? { title: `${s.naam} | ${MERK}`, description: s.intro } : {};
}

export default async function Sector({ params }: { params: Promise<{ slug: string }> }) {
  const s = vindSector((await params).slug);
  if (!s) notFound();
  return <DoelgroepPagina d={s} soort="sector" />;
}
