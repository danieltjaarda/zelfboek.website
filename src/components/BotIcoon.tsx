/** Plat icoon van de bot in één kleur (currentColor): kopje met antenne, oortjes, twee ogen en een glimlach als uitsparing. */
export function BotIcoon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden fill="currentColor">
      <circle cx="32" cy="7.5" r="4.5" />
      <rect x="30" y="10" width="4" height="8" />
      <rect x="1" y="31" width="6" height="14" rx="3" />
      <rect x="57" y="31" width="6" height="14" rx="3" />
      <path fillRule="evenodd" d="M19 17h26a11 11 0 0 1 11 11v20a11 11 0 0 1-11 11H19A11 11 0 0 1 8 48V28a11 11 0 0 1 11-11zm3.5 13a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm19 0a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM22.6 46.2a1.9 1.9 0 0 0-1.2 3.4A17 17 0 0 0 32 53a17 17 0 0 0 10.6-3.4 1.9 1.9 0 0 0-2.4-3A13.2 13.2 0 0 1 32 49.2a13.2 13.2 0 0 1-8.2-2.6 1.9 1.9 0 0 0-1.2-.4z" />
    </svg>
  );
}
