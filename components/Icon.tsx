import {
  ArrowLeftRight,
  BadgeCheck,
  ChartLine,
  CreditCard,
  FileBadge,
  Landmark,
  Receipt,
  Wallet,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

const map = {
  wallet: Wallet,
  arrowLeftRight: ArrowLeftRight,
  creditCard: CreditCard,
  landmark: Landmark,
  badgeCheck: BadgeCheck,
  receipt: Receipt,
  chart: ChartLine,
  fileBadge: FileBadge,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof map;

/** Ícone de linha Lucide com traço padrão da marca (1.75px). */
export default function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Cmp = map[name];
  return <Cmp strokeWidth={1.75} aria-hidden="true" {...props} />;
}

/** Instagram em traço de linha (a Lucide não inclui logos de marcas). */
export function InstagramIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}
