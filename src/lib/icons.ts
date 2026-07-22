import {
  Award,
  Building,
  Building2,
  CheckCircle2,
  CheckSquare,
  FileCheck,
  Flame,
  GraduationCap,
  Hotel,
  Landmark,
  Network,
  Plane,
  Radio,
  Server,
  ShieldAlert,
  ShieldCheck,
  Users,
  Wallet,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const iconMap = {
  Award,
  Building,
  Building2,
  CheckCircle2,
  CheckSquare,
  FileCheck,
  Flame,
  GraduationCap,
  Hotel,
  Landmark,
  Network,
  Plane,
  Radio,
  Server,
  ShieldAlert,
  ShieldCheck,
  Users,
  Wallet,
  Wrench,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof iconMap;

export function getIcon(name: string): LucideIcon {
  return iconMap[name as IconName] ?? Building;
}
