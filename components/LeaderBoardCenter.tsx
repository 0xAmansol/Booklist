"use client";

import { useEffect, useState } from "react";
import { ThumbsUp, Tag, CircleChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { startOfWeek, endOfWeek } from "date-fns";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";

import Header from "./Header";
import { supabase } from "@/lib/supabase";

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
  user?: {
    email?: string;
  };
}

export default function BookDiscovery() {
  function getCurrentWeekRange() {
    const now = new Date();
    const start = startOfWeek(now, { weekStartsOn: 1 });
    const end = endOfWeek(now, { weekStartsOn: 1 });
    return { start, end };
  }

  const [dbBooks, setDbBooks] = useState<DbBook[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

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
      const { start, end } = getCurrentWeekRange();
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
    };

    fetchBooks();
  }, []);

  // Upvote handler
  const handleUpvote = async (bookId: string) => {
    if (!user) {
      router.push("/login");
      return;
    }
    setLoadingId(bookId);

    // Check if user already upvoted this book
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

    // Insert vote record
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

    await fetchBooks();
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
    await fetchBooks();
    setLoadingId(null);
  };

  const fetchBooks = async () => {
    const { start, end } = getCurrentWeekRange();
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
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-lg shadow-sm border h-full">
      <Header />

      <div className="relative flex items-center p-2 border-b overflow-hidden">
        <div className="flex gap-2 px-2 mx-auto">
          <span className="font-instrument-serif text-lg">
            This Week&apos;s Recommendations
          </span>
        </div>
      </div>

      <div className="px-5 py-2 ">
        <div className="flex justify-between items-center">
          <h3 className="font-instrument-serif">This Week</h3>
        </div>
        <p className="text-sm text-muted-foreground mt-1 font-instrument-serif">
          Showing books recommended this week (Monday to Sunday, UTC)
        </p>
      </div>

      <div className="divide-y">
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
                Recommended by: {book.user?.email}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center pr-5">
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-emerald-500 hover:text-white"
                onClick={() => handleUpvote(book.id)}
                disabled={loadingId === book.id}
              >
                <CircleChevronUp className="h-6 w-6" />
              </Button>
              <span className="text-sm font-semibold">{book.votes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
