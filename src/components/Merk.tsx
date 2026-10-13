import Image from "next/image";
import { MERK } from "@/lib/merk";

/** Het logo (public/logos/saldoplan.png, 720×218): overal hetzelfde bestand, in de nav, de voettekst en de koppen van de
 * losse pagina's. Geef `hoogte` in px, de breedte volgt; zonder `hoogte` bepaalt de CSS-klasse de maat (zie .navlogo). */
export function Logo({ hoogte, className = "", priority = false }: { hoogte?: number; className?: string; priority?: boolean }) {
  return <Image src="/logos/saldoplan.png" alt="Saldoplan" width={720} height={218} priority={priority} className={`w-auto ${className}`} style={hoogte ? { height: hoogte } : undefined} />;
}

/** Beeldmerk: afgerond vierkant in de merkkleur met een wit vinkje. Op een donkere ondergrond wit met blauw vinkje. */
export function Beeldmerk({ size = 28, donker = false }: { size?: number; donker?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <rect x="2" y="2" width="28" height="28" rx="8" fill={donker ? "#ffffff" : "var(--primair)"} />
      <path d="M9.5 16.5l4.5 4.5L22.5 11.5" fill="none" stroke={donker ? "var(--primair)" : "#ffffff"} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Woordmerk({ donker = false, size = 18 }: { donker?: boolean; size?: number }) {
  return (
    <span className="inline-flex items-center gap-2">
      <Beeldmerk size={size + 8} donker={donker} />
      <span className="font-semibold tracking-[-0.02em]" style={{ fontSize: size, color: donker ? "#fff" : "var(--tekst)" }}>{MERK}</span>
    </span>
  );
}

export const APPS: Record<string, string> = {
  ing: "ING", rabobank: "Rabobank", abnamro: "ABN AMRO", bunq: "bunq", knab: "Knab", sns: "SNS", asn: "ASN Bank", regiobank: "RegioBank",
  triodos: "Triodos", revolut: "Revolut", n26: "N26", mollie: "Mollie", stripe: "Stripe", shopify: "Shopify", bol: "bol.com",
  woocommerce: "WooCommerce", paypal: "PayPal", moneybird: "Moneybird", eboekhouden: "e-Boekhouden", jortt: "Jortt", belastingdienst: "Belastingdienst",
};
export type AppId = keyof typeof APPS;

/** Echt app-icoon van een bank, kanaal of pakket (public/logos/apps). */
export function AppIcoon({ id, size = 44, className = "" }: { id: AppId; size?: number; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/logos/apps/${id}.png`} alt={APPS[id]} title={APPS[id]} width={size} height={size} className={`shrink-0 ${className}`} style={{ width: size, height: size, borderRadius: Math.round(size * 0.22) }} loading="lazy" />;
}
