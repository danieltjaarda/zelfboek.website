import Link from "next/link";
import { LOGIN_URL } from "@/lib/merk";
import { Logo } from "@/components/Merk";
import { Navigatie } from "@/components/Navigatie";
import { VoorWieMenu } from "@/components/VoorWieMenu";

/**
 * De navigatie bovenaan elke pagina: logo, links, het uitklapmenu "Voor wie" en de knoppen. De ankers wijzen naar de
 * homepage, zodat ze ook vanaf de losse pagina's werken. Smal blijft alleen het logo, het compacte "Voor wie"-menu en de
 * knop over.
 */
export function Kop() {
  return (
    <Navigatie>
      <div className="navbalk">
        <div className="navinhoud flex items-center justify-between">
          <Link href="/"><Logo className="navlogo" priority /></Link>
          <nav className="hidden items-center gap-7 text-[14px] font-medium text-tekst-2 md:flex">
            <Link href="/#functies" className="hover:text-tekst">Wat hij doet</Link>
            <VoorWieMenu />
            <Link href="/#werkt-met" className="hover:text-tekst">Werkt met</Link>
            <Link href="/#prijs" className="hover:text-tekst">Prijs</Link>
            <Link href="/#vragen" className="hover:text-tekst">Vragen</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href={LOGIN_URL} className="hidden px-3 text-[14px] font-medium text-tekst-2 hover:text-tekst sm:inline-flex">Inloggen</Link>
            <VoorWieMenu compact />
            <Link href={LOGIN_URL} className="pilknop pilknop-klein">Gratis proberen</Link>
          </div>
        </div>
      </div>
    </Navigatie>
  );
}
