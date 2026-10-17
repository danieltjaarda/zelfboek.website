import Link from "next/link";
import { LOGIN_URL } from "@/lib/merk";
import { Onthul } from "@/components/Onthul";
import { FiguurS } from "@/components/Figuren";
import { Pijl } from "@/components/Iconen";

/** Afsluiter onderaan elke pagina: blauw blok met de S groot en wit in de hoek. */
export function Slot() {
  return (
    <section id="slot" className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
      <Onthul>
        <div className="relative overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#1db1df,#0c7f9f)] px-7 py-16 text-center text-white md:py-24">
          <FiguurS className="figuur-slot" />
          <h2 className="relative mx-auto max-w-2xl text-[34px] leading-[1.05] md:text-[56px]">Morgenochtend is je boekhouding al gedaan.</h2>
          <Link href={LOGIN_URL} className="pilknop-licht relative mt-9 bg-white">Start gratis, 30 dagen <Pijl /></Link>
          <p className="relative mt-4 text-[13px] text-white/75">Account in dertig seconden, alleen een e-mailadres.</p>
        </div>
      </Onthul>
    </section>
  );
}
