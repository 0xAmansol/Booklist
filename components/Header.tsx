"use client";

import { Search } from "lucide-react";
import React, { useState } from "react";
import { Input } from "./ui/input";
import RecommendBookDialog from "./RecommendBookDialog";
import { searchBooks } from "@/lib/googleBooks";

type BookSearchResult = {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  categories: string[];
};

const Header = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<BookSearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="border-b px-4 py-3 flex items-center justify-between bg-background">
      <RecommendBookDialog />

      <div className="relative w-64 pr-2 flex-shrink-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground " />
        <Input
          placeholder="Search BookList"
          className="pl-8 font-instrument-serif"
          value={search}
          onChange={async (e) => {
            const value = e.target.value;
            setSearch(value);
            if (value.length > 1) {
              setShowDropdown(true);
              const data = await searchBooks(value);
              setResults(data);
            } else {
              setResults([]);
              setShowDropdown(false);
            }
          }}
        />
        {showDropdown && results.length > 0 && (
          <div className="absolute left-0 right-0 mt-1 bg-white border rounded shadow z-20 max-h-64 overflow-y-auto">
            {results.map((book) => (
              <div
                key={book.id}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <div className="font-semibold text-sm line-clamp-1">
                  {book.title}
                </div>
                <div className="text-xs text-muted-foreground line-clamp-1">
                  by {book.author}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
