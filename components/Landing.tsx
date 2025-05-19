import Link from "next/link";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CustomFloatingCard from "./CustomFloatingCard";
import { RocketIcon } from "./ui/rocket";
import Features from "./Features";
import AppFooter from "./AppFooter";

// Placeholder icons - replace with actual icons from a library if needed
const BookIcon = () => <span className="text-2xl">📖</span>;
const StarIcon = () => <span className="text-2xl">⭐</span>;
const HeartIcon = () => <span className="text-2xl">❤️</span>;

// Removed unused social icon definitions

const Landing = () => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const card1X = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const card1Y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const card2X = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const card2Y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const card3X = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const card3Y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const card4X = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const card4Y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const card5X = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const card5Y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const card6X = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const card6Y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div ref={ref} className="min-h-screen bg-white flex flex-col">
      <header className="flex items-center justify-between px-8 py-4  bg-white sticky top-0 z-10">
        <div className="flex items-center gap-8">
          <Link
            href="/login"
            className="text-gray-700 font-medium hover:text-emerald-600"
          >
            Log in
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center relative overflow-x-clip">
        <div className="absolute left-10 flex flex-col z-0">
          <motion.div style={{ rotate: -5, x: card1X, y: card1Y }}>
            <CustomFloatingCard
              icon={<BookIcon />}
              title="Discover Popular Books"
              subtitle="See what's trending this week"
            />
          </motion.div>
          <motion.div
            style={{ rotate: 3, x: card2X, y: card2Y }}
            className="mt-[-1rem]"
          >
            <CustomFloatingCard
              icon={<StarIcon />}
              title="Find Highly Rated Gems"
              subtitle="Read reviews and ratings"
              className="mt-8"
            />
          </motion.div>
          <motion.div
            style={{ rotate: -5, x: card3X, y: card3Y }}
            className="mt-[-0.5rem]"
          >
            <CustomFloatingCard
              icon={<HeartIcon />}
              title="Upvote Your Favorites"
              subtitle="Join the community"
              className="mt-[-0.5rem]"
            />
          </motion.div>
        </div>
        <div className="absolute right-10 flex flex-col z-0">
          <motion.div style={{ rotate: 5, x: card4X, y: card4Y }}>
            <CustomFloatingCard
              icon={<RocketIcon className="text-emerald-500" />}
              title="Explore New Arrivals"
              subtitle="Find the latest books"
            />
          </motion.div>
          <motion.div
            style={{ rotate: -3, x: card5X, y: card5Y }}
            className="mt-[-0.5rem]"
          >
            <CustomFloatingCard
              icon={<StarIcon />}
              title="Get Personalized Recommendations"
              subtitle="Based on your reading history"
              className="mt-4"
            />
          </motion.div>
          <motion.div
            style={{ rotate: 2, x: card6X, y: card6Y }}
            className="mt-[-0.5rem]"
          >
            <CustomFloatingCard
              icon={<HeartIcon />}
              title="Share Your Reads"
              subtitle="Recommend books to others"
              className="mt-[-0.5rem]"
            />
          </motion.div>
        </div>

        <section className="flex flex-col items-center justify-center py-32 z-0">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-emerald-600 text-lg">★★★★★</span>
            <span className="text-gray-600 text-lg">Loved by 1k+ readers</span>
          </div>
          <h1 className="text-9xl  font-bold text-center mb-6 font-instrument-serif">
            Find your
            <i className="font-light font-instrument-serif text-emerald-500">
              {" "}
              next{" "}
            </i>
            <br></br> favorite book
          </h1>
          <p className="text-2xl text-gray-700 text-center max-w-xl mb-8">
            Discover personalized recommendations, share your thoughts, and find
            your next great read.
          </p>
          <Link
            href="/dashboard/explore"
            className="bg-emerald-400 hover:bg-emerald-500 text-black font-semibold px-8 py-4 rounded-full text-lg shadow transition mb-2"
          >
            Explore Recommendations
          </Link>
          <div className="text-gray-500 text-sm mt-1">
            It&apos;s free and easy to get started!
          </div>
        </section>
      </main>

      <Features />
      <div className="w-full ">
        <AppFooter />
      </div>
    </div>
  );
};

export default Landing;
