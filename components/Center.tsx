import React from "react";
import BookCarousel from "./BookCarousel";
import { GENRES } from "@/constants/genres";
import { fetchBooksByGenre } from "@/scripts/seedBooks";
import Header from "./Header";

const Center = async () => {
  const genreData = await Promise.all(
    GENRES.map(async ({ name, icon }) => ({
      name,
      icon,
      books: await fetchBooksByGenre(name),
    }))
  );
  return (
    <div className="w-full justify-center items-center flex flex-col">
      <div
        className="space-y-8
        w-2xl border-l border-r border-gray-200"
      >
        <Header />
        <h1 className="font-instrument-serif text-3xl text-emerald-700 font-semibold flex items-center justify-start pl-4">
          Explore Top Books by Genre
        </h1>
        {genreData.map(({ name, icon, books }) => (
          <div key={name}>
            <div className="flex items-center gap-2 pl-4 pb-2"></div>
            <BookCarousel books={books} title={name} iconName={icon} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Center;
