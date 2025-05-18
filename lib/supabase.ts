import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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
      likes: 0,
      comments: 0,
      votes: 0,
    },
  ]);

  if (error) console.error(error);
}
