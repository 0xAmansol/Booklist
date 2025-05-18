// lib/googleBooks.ts

export async function fetchBooksByGenre(genre: string) {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=top+${genre}&maxResults=20&key=${process.env.GOOGLE_BOOKS_API_KEY}`
  );
  const json = await res.json();

  return json.items.map((item: any) => ({
    id: item.id,
    title: item.volumeInfo.title,
    authors: item.volumeInfo.authors || [],
    thumbnail: item.volumeInfo.imageLinks?.thumbnail || "",
    description: item.volumeInfo.description || "",
    ratings: item.volumeInfo.ratingsCount || 0,
    tags: item.volumeInfo.categories || "Unknown Category",
    buyLink: item.saleInfo.buyLink || "",
    staffPicked:
      item.volumeInfo.categories?.includes("Staff Pick") || "readers' choice",
  }));
}
