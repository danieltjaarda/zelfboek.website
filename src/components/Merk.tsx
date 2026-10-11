import { MERK } from "@/lib/merk";

/** Beeldmerk: de blauwe cirkel met witte S uit het Saldoplan-logo. Op een donkere ondergrond wit met blauwe S. */
export function Beeldmerk({ size = 28, donker = false }: { size?: number; donker?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <circle cx="16" cy="16" r="15" fill={donker ? "#ffffff" : "#1db1df"} />
      <text x="16" y="16" dy=".36em" textAnchor="middle" fontSize="21" fontWeight="700" fontFamily="'Segoe UI', 'Open Sans', Arial, sans-serif" fill={donker ? "#1db1df" : "#ffffff"}>S</text>
    </svg>
  );
}

/** Woordmerk: het Saldoplan-logo (public/logos/saldoplan.png). Op een donkere ondergrond het beeldmerk met witte naam. */
export function Woordmerk({ donker = false, size = 18 }: { donker?: boolean; size?: number }) {
  if (!donker) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src="/logos/saldoplan.png" alt={MERK} width={720} height={218} style={{ height: Math.round(size * 1.55), width: "auto" }} />;
  }
  return (
    <span className="inline-flex items-center gap-2">
      <Beeldmerk size={size + 8} donker={donker} />
      <span className="font-semibold tracking-[-0.02em]" style={{ fontSize: size, color: "#fff" }}>{MERK}</span>
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
