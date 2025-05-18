"use client";

import BookCard from "./BookCard";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Flame,
  BookOpen,
  User,
  Heart,
  Search,
  FlaskConical,
  Users,
  Landmark,
  ScrollText,
  Brain,
  Briefcase,
  Sparkles,
  HelpingHand,
  Monitor,
  HeartPulse,
} from "lucide-react";
import { BookProps } from "./BookCard";

export const IconMap = {
  Flame,
  BookOpen,
  User,
  Heart,
  Search,
  FlaskConical,
  Users,
  Landmark,
  ScrollText,
  Brain,
  Briefcase,
  Sparkles,
  HelpingHand,
  Monitor,
  HeartPulse,
};

export default function BookCarousel({
  title,
  iconName,
  books,
}: {
  title: string;
  iconName: keyof typeof IconMap;
  books: BookProps[];
}) {
  const carouselRef = useRef<HTMLDivElement>(null);

  // Get the icon component from the mapping
  const Icon = IconMap[iconName] || BookOpen; // Default to BookOpen if not found

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { current } = carouselRef;
      const scrollAmount = direction === "left" ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-4 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-emerald-600" />
          <h2 className="font-instrument-serif text-2xl font-semibold text-black">
            {title}
          </h2>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-8 w-8 hover:bg-emerald-400"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-8 w-8 hover:bg-emerald-400"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {books.map((book) => (
          <div key={book.id} className="min-w-[300px] max-w-[300px]">
            <BookCard book={book} key={book.key} />
          </div>
        ))}
      </div>
    </div>
  );
}
