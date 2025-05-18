import { Compass, Rocket, Trophy, PlusCircle } from "lucide-react";

export const SECTIONS = [
  {
    label: "Explore",
    href: "/dashboard/explore",
    icon: Compass,
  },
  {
    label: "Launchpad",
    href: "/dashboard/launchpad",
    icon: Rocket,
  },
  {
    label: "Leaderboard",
    href: "/dashboard/leaderboard",
    icon: Trophy,
  },
  {
    label: "Recommend a Book",
    href: "/dashboard/recommend",
    icon: PlusCircle,
  },
] as const;
