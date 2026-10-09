import Link from "next/link";
import { Woordmerk } from "@/components/Merk";
import { APP_URL } from "@/lib/merk";

export default function NietGevonden() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <Woordmerk />
      <h1 className="mt-8 text-[36px]">Deze pagina bestaat niet</h1>
      <p className="mt-2 max-w-sm text-[16px] text-tekst-2">Misschien is de link verouderd. Ga terug naar je overzicht of naar de startpagina.</p>
      <div className="mt-8 flex gap-3">
        <Link href={`${APP_URL}/app`} className="pilknop pilknop-klein">Naar mijn overzicht</Link>
        <Link href="/" className="pilknop-licht pilknop-klein">Startpagina</Link>
      </div>
    </main>
  );
}
