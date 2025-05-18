import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Check, Star, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export interface BookProps {
  id: string;
  key: string;
  title: string;
  authors: string;
  description: string;
  thumbnail: string;
  ratings?: number;
  buyLink?: string;
  staffPicked?: string;
  tags: string;
  rank?: number;
}

export default function BookCard({
  book,
  rank,
}: {
  book: BookProps;
  rank?: number;
}) {
  return (
    <Card className="h-full flex flex-col hover:border-emerald-400 overflow-hidden transition-all duration-200 hover:shadow-md w-full">
      <CardHeader className="pb-3 relative p-4">
        {rank && (
          <div className="absolute left-3 top-3 bg-black/70 text-white font-instrument-serif w-8 h-8 rounded-full flex items-center justify-center z-10">
            #{rank}
          </div>
        )}

        <div className=" aspect-[2/3] w-30 mb-3 bg-muted rounded-md overflow-hidden justify-center flex">
          {book.thumbnail ? (
            <img
              src={book.thumbnail || "/placeholder.svg"}
              alt={book.title}
              className="w-30 h-40 object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
              <span className="font-instrument-serif text-emerald-700 text-4xl">
                {book.title.charAt(0)}
              </span>
            </div>
          )}

          {book.ratings !== undefined && (
            <div className="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-1 flex items-center gap-1 shadow-sm">
              <ThumbsUp className="h-3.5 w-3.5 text-emerald-600" />
              <span className="font-instrument-serif font-medium text-sm">
                {book.ratings}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <h3 className="font-instrument-serif text-lg font-medium line-clamp-1">
            {book.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-1">
            by {book.authors || "Unknown Author"}
          </p>

          {book.ratings !== undefined && (
            <div className="flex items-center gap-1 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.floor(book?.ratings || 0)
                      ? "text-amber-500 fill-amber-500"
                      : "text-gray-300"
                  )}
                />
              ))}
              <span className="text-xs text-muted-foreground ml-1">
                ({book.ratings.toFixed(1)})
              </span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pb-3 flex-grow px-4 gap-2">
        <p className="text-sm text-accent-foreground line-clamp-3">
          {book.description || "No description available."}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-1 border-t px-4 flex-wrap gap-2">
        <div className="flex flex-col gap-1 w-auto">
          {book.staffPicked && (
            <Badge
              variant="outline"
              className="bg-emerald-50 text-emerald-700 border-emerald-200 flex gap-1 items-center w-max"
            >
              <Check className="h-3 w-3" /> Staff Pick
            </Badge>
          )}

          {book.tags && (
            <Badge
              variant="secondary"
              className="font-instrument-serif w-max text-sm"
            >
              {book.tags}
            </Badge>
          )}
        </div>

        <Button
          variant="default"
          className="bg-emerald-200 hover:bg-emerald-600 text-emerald-950 hover:text-white font-instrument-serif font-semibold text-sm rounded-md px-4 py-2"
          onClick={() => window.open(book.buyLink, "_blank")}
        >
          Buy this book
        </Button>
      </CardFooter>
    </Card>
  );
}
