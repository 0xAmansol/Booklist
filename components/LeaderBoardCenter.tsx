"use client";

import { useEffect, useState } from "react";
import { ThumbsUp, Tag, CircleChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  startOfWeek,
  endOfWeek,
  format,
  addWeeks,
  getWeek,
  isThisWeek,
  differenceInSeconds,
} from "date-fns";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";

import Header from "./Header";
import { supabase } from "@/lib/supabase";

const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}h : ${minutes}m : ${seconds}s`;
};

interface DbBook {
  id: string;
  title: string;
  author: string;
  description: string;
  likes: number;
  votes: number;
  categories: string[];
  cover_image: string;
  rank?: string;
  user_id: string;
  user_email: string;
  user_name: string;
}

export default function BookDiscovery() {
  const [dbBooks, setDbBooks] = useState<DbBook[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Voting timer state
  const [timeRemaining, setTimeRemaining] = useState(0);

  //week for the whole year is crazy
  const currentYear = new Date().getFullYear();
  const firstDayOfYear = startOfWeek(new Date(currentYear, 0, 1), {
    weekStartsOn: 1,
  });
  const weeksInYear = 52;
  const weekOptions = Array.from({ length: weeksInYear }).map((_, i) => {
    const start = addWeeks(firstDayOfYear, i);
    const end = endOfWeek(start, { weekStartsOn: 1 });
    return {
      label: `Week ${getWeek(start, { weekStartsOn: 1 })}`,
      value: i,
      start,
      end,
      range: `${format(start, "MMM d")} - ${format(end, "MMM d")}`,
      isCurrent: isThisWeek(start, { weekStartsOn: 1 }),
    };
  });

  const [selectedWeek, setSelectedWeek] = useState(() => {
    const thisWeekIdx = weekOptions.findIndex((w) => w.isCurrent);
    return thisWeekIdx !== -1 ? thisWeekIdx : weekOptions.length - 1;
  });
  const visibleCount = 7;
  const maxScroll = Math.max(0, weekOptions.length - visibleCount);
  const [scrollIdx, setScrollIdx] = useState(() =>
    Math.max(0, selectedWeek - Math.floor(visibleCount / 2))
  );

  const handlePrev = () => setScrollIdx((idx) => Math.max(0, idx - 1));
  const handleNext = () => setScrollIdx((idx) => Math.min(maxScroll, idx + 1));

  // Calculate time remaining until the end of the selected week
  const calculateTimeRemaining = (endDate: Date) => {
    const now = new Date();
    const diff = differenceInSeconds(endDate, now);
    return Math.max(0, diff);
  };

  useEffect(() => {
    if (selectedWeek < scrollIdx) {
      setScrollIdx(selectedWeek);
    } else if (selectedWeek > scrollIdx + visibleCount - 1) {
      setScrollIdx(selectedWeek - visibleCount + 1);
    }
  }, [selectedWeek]);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user ?? null);
    };
    getUser();
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      const { start, end } = weekOptions[selectedWeek];
      const { data, error } = await supabase
        .from("recommendations")
        .select("*")
        .gte("created_at", start.toISOString())
        .lte("created_at", end.toISOString())
        .order("votes", { ascending: false })
        .order("likes", { ascending: false });

      if (!error && data) {
        setDbBooks(data);
      }

      // Set up the timer for the current week if it's selected
      if (weekOptions[selectedWeek].isCurrent) {
        const endDate = weekOptions[selectedWeek].end;
        setTimeRemaining(calculateTimeRemaining(endDate));

        const timer = setInterval(() => {
          setTimeRemaining(calculateTimeRemaining(endDate));
        }, 1000);

        return () => clearInterval(timer);
      } else {
        setTimeRemaining(0); // No timer for past/future weeks
      }
    };

    fetchBooks();
  }, [selectedWeek]);

  // Upvote handler
  const handleUpvote = async (bookId: string) => {
    if (!user) {
      router.push("/login");
      return;
    }
    setLoadingId(bookId);

    // already upvoted?
    const { data: existingVote } = await supabase
      .from("book_votes")
      .select("*")
      .eq("user_id", user.id)
      .eq("book_id", bookId)
      .single();

    if (existingVote) {
      alert("You have already upvoted this book.");
      setLoadingId(null);
      return;
    }

    await supabase
      .from("book_votes")
      .insert([{ user_id: user.id, book_id: bookId }]);

    // Increment vote count
    const book = dbBooks.find((b) => b.id === bookId);
    if (book) {
      await supabase
        .from("recommendations")
        .update({ votes: book.votes + 1 })
        .eq("id", bookId);
    }

    setLoadingId(null);
  };

  const handleLike = async (bookId: string) => {
    if (!user) {
      router.push("/login");
      return;
    }
    setLoadingId(bookId + "-like");
    const book = dbBooks.find((b) => b.id === bookId);
    if (!book) return;
    await supabase
      .from("recommendations")
      .update({ likes: book.likes + 1 })
      .eq("id", bookId);

    setLoadingId(null);
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white border-l shadow-sm h-screen flex flex-col">
      <Header />

      <div className="relative flex items-center p-2 border-b  flex-shrink-0">
        <div className="flex gap-2 px-2 mx-auto">
          <span className="font-instrument-serif text-lg">
            This Week&apos;s Recommendations
          </span>
        </div>
      </div>

      <div className="px-5 py-2 ">
        <div className="relative">
          <div
            className="flex items-center gap-2 py-2 px-1 bg-gray-50 rounded-t min-w-max overflow-x-auto scrollbar-hide flex-shrink-0"
            style={{ scrollbarWidth: "none" }}
          >
            <button
              onClick={handlePrev}
              disabled={scrollIdx === 0}
              className="px-2 py-1 text-lg disabled:opacity-30 border bg-white rounded-full z-10"
              style={{ position: "sticky", left: 0 }}
            >
              &#60;
            </button>
            {weekOptions.slice(scrollIdx, scrollIdx + visibleCount).map((w) => (
              <button
                key={w.value}
                className={`flex items-center h-8 px-3 py-0 rounded-full mx-1 border font-semibold transition ${
                  selectedWeek === w.value
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-600 opacity-75"
                }`}
                onClick={() => setSelectedWeek(w.value)}
              >
                <span className="font-normal text-xs mr-1">Week</span>
                <span className="font-bold text-sm">
                  {getWeek(w.start, { weekStartsOn: 1 })}
                </span>
              </button>
            ))}
          </div>
          <button
            onClick={handleNext}
            disabled={scrollIdx === maxScroll}
            className="px-2 py-1 text-lg disabled:opacity-30 border bg-white rounded-full absolute right-0 top-1/2 -translate-y-1/2 z-20 shadow"
            style={{ pointerEvents: scrollIdx === maxScroll ? "none" : "auto" }}
          >
            &#62;
          </button>
        </div>
        <div className="flex justify-between items-center pt-2 flex-shrink-0">
          <h3 className="font-instrument-serif text-xl">
            {weekOptions[selectedWeek].label}
          </h3>
          {weekOptions[selectedWeek].isCurrent && timeRemaining > 0 && (
            <div className="flex items-center gap-2 text-lg text-muted-foreground font-instrument-serif">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              <span>Voting will close in</span>
              <span className="font-semibold text-black">
                {formatTime(timeRemaining)}
              </span>
            </div>
          )}
          {weekOptions[selectedWeek].isCurrent && timeRemaining <= 0 && (
            <div className="flex items-center gap-2 text-lg text-muted-foreground font-instrument-serif">
              <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
              <span>Voting has closed for this week.</span>
            </div>
          )}
          {!weekOptions[selectedWeek].isCurrent && (
            <div className="flex items-center gap-2 text-lg text-muted-foreground font-instrument-serif">
              <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
              <span>Voting is only for the current week.</span>
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1 font-instrument-serif">
          {weekOptions[selectedWeek].range}
        </p>
      </div>

      <div className="divide-y overflow-y-auto flex-1">
        {dbBooks.map((book) => (
          <div key={book.id} className="flex gap-4 p-4 hover:bg-gray-50">
            <div className="flex-shrink-0 w-16 text-center">
              <div className="font-bold text-gray-500">{book.rank}</div>
              <img
                src={book.cover_image || "/placeholder.svg"}
                alt={book.title}
                width={60}
                height={80}
                className="mx-auto rounded border shadow-sm mt-2"
              />
            </div>

            <div className="flex-grow p-2">
              <h4 className="font-bold font-instrument-serif">{book.title}</h4>
              <p className="text-sm text-muted-foreground font-instrument-serif">
                by {book.author}
              </p>
              <p className="text-sm mt-1">
                {book.description.length > 100
                  ? book.description.slice(0, 100) + "..."
                  : book.description}
              </p>

              <div className="flex gap-4 mt-2">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 p-0"
                    onClick={() => handleLike(book.id)}
                    disabled={loadingId === book.id + "-like"}
                  >
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <span>{book.likes}</span>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Tag className="h-4 w-4" />
                  {book.categories.map((category: string, index: number) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs font-normal"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Recommended by: {book.user_name}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center pr-5 ">
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-emerald-500 hover:text-white flex flex-col items-center h-14"
                onClick={() => handleUpvote(book.id)}
                disabled={loadingId === book.id}
              >
                <CircleChevronUp className="h-10 w-10 " />
                <span className="text-sm font-semibold">{book.votes}</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
