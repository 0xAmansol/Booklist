import { supabase } from "@/lib/supabase";

interface GoogleBookItem {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: { thumbnail?: string };
    categories?: string[];
  };
}

export async function searchBooks(query: string) {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
  );
  const json = await res.json();

  return (
    (json.items as GoogleBookItem[])?.map((item) => ({
      id: item.id,
      title: item.volumeInfo.title,
      author: item.volumeInfo.authors?.join(", ") || "Unknown",
      description: item.volumeInfo.description || "No description",
      coverImage: item.volumeInfo.imageLinks?.thumbnail || "/placeholder.svg",
      categories: item.volumeInfo.categories || [],
    })) || []
  );
}

export async function createBookRecommendation(book: {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  categories: string[];
  user_id: string;
  user_email: string;
}) {
  const { error } = await supabase.from("recommendations").insert([
    {
      id: book.id,
      title: book.title,
      author: book.author,
      description: book.description,
      cover_image: book.coverImage,
      categories: book.categories,
      user_id: book.user_id,
      user_email: book.user_email,
      likes: 0,
      comments: 0,
      votes: 0,
    },
  ]);
  if (error) console.error(error);
}
