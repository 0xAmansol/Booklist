"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { searchBooks } from "@/lib/googleBooks";
import { createBookRecommendation } from "@/lib/supabase";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import { toast } from "sonner";

type BookSearchResult = {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  categories: string[];
};

export default function RecommendBookDialog() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BookSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null));
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    const data = await searchBooks(query);
    setResults(data);
    setLoading(false);
  };

  const handleRecommend = async (book: BookSearchResult) => {
    if (!user) {
      toast("You must be logged in to recommend a book.");
      return;
    }
    await createBookRecommendation({
      ...book,
      user_id: user.id,
      user_email: user.email || "",
      user_name: user.user_metadata?.name as string | null | undefined,
    });
    toast("Book recommended!");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="sm"
          className="font-instrument-serif bg-emerald-600 hover:bg-emerald-500"
        >
          Recommend a book
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="font-instrument-serif text-emerald-500">
            Recommend a Book
          </DialogTitle>
          <DialogDescription>
            Search for a book to add to the leaderboard.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Search books..."
            className="font-instrument-serif"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            onClick={handleSearch}
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-instrument-serif"
          >
            Search
          </Button>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {results.map((book: BookSearchResult) => (
            <div
              key={book.id}
              className="border p-2 rounded flex gap-4 items-start"
            >
              <img
                src={book.coverImage || "/placeholder.svg"}
                alt={book.title}
                width={60}
                height={80}
                className="rounded border shadow-sm"
              />
              <div className="flex flex-col flex-1 min-w-0">
                <p className="font-bold font-instrument-serif text-base line-clamp-1">
                  {book.title}
                </p>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  by {book.author}
                </p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {book.description}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRecommend(book)}
                  className="mt-2 hover:bg-emerald-600 hover:text-white font-instrument-serif w-max"
                >
                  Recommend
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
