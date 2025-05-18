import { IconMap } from "@/components/BookCarousel";
type IconName = keyof typeof IconMap;

export const GENRES: { name: string; icon: IconName }[] = [
  { name: "Trending Today", icon: "Flame" },
  { name: "Fiction", icon: "BookOpen" },
  { name: "Non-Fiction", icon: "ScrollText" },
  { name: "Romance", icon: "Heart" },
  { name: "Mystery", icon: "Search" },
  { name: "Science", icon: "FlaskConical" },
  { name: "Top Authors", icon: "Users" },
  { name: "Biography", icon: "User" },
  { name: "History", icon: "Landmark" },
  { name: "Philosophy", icon: "Brain" },
  { name: "Business", icon: "Briefcase" },
  { name: "Fantasy", icon: "Sparkles" },
  { name: "Self-Help", icon: "HelpingHand" },
  { name: "Technology", icon: "Monitor" },
  { name: "Health", icon: "HeartPulse" },
];
