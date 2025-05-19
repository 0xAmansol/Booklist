import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "BookList - Book Recommendations",
  description: "Discover and share your favorite books",
  twitter: {
    card: "summary_large_image",
    site: "@your_twitter_handle",
    creator: "@0xAmansol",
    title: "BookList - Book Recommendations",
    description: "Discover and share your favorite books",
    images: "https://i.postimg.cc/Z0tGFy6R/783shots-so.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className={inter.variable}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
