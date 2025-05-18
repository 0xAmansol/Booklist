import Link from "next/link";
import React from "react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 border-b bg-white sticky top-0 z-10">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-emerald-600">☕</span>
            <span className="font-instrument-serif text-xl font-bold">
              BookList
            </span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm text-gray-700 font-medium">
            <Link href="#faq" className="hover:text-emerald-600">
              FAQ
            </Link>
            <Link href="#wall" className="hover:text-emerald-600">
              Wall of <span className="text-emerald-600">♥</span>
            </Link>
            <div className="relative group">
              <button className="hover:text-emerald-600 flex items-center gap-1">
                Resources <span>▼</span>
              </button>
              {/* Dropdown can be added here */}
            </div>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search creators"
            className="hidden md:block px-3 py-1.5 rounded bg-gray-100 border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
          <Link
            href="/login"
            className="text-gray-700 font-medium hover:text-emerald-600"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-2 rounded-full transition"
          >
            Sign up
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center relative overflow-x-clip">
        {/* Floating Cards */}
        <div className="absolute left-0 top-32 flex flex-col gap-6 z-0">
          <div className="bg-white shadow-lg rounded-xl p-4 w-56 mb-2">
            <div className="font-semibold">
              Cara is building a new platform for artists
            </div>
            <div className="text-xs text-gray-500 mt-2">♥ 8,780 supporters</div>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-4 w-56 mb-2">
            <div className="font-semibold">
              Kaleigh Cohen is creating indoor cycling and strength workouts on
              YouTube!
            </div>
            <div className="text-xs text-gray-500 mt-2">♥ 4,488 supporters</div>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-4 w-56">
            <div className="font-semibold">
              Teacher Stefano is creating YouTube videos and Podcast
            </div>
            <div className="text-xs text-gray-500 mt-2">♥ 641 supporters</div>
          </div>
        </div>
        <div className="absolute right-0 top-40 flex flex-col gap-6 z-0">
          <div className="bg-white shadow-lg rounded-xl p-4 w-56 mb-2">
            <div className="font-semibold">
              The Thrill Of The Thrift is creating thrifting videos
            </div>
            <div className="text-xs text-gray-500 mt-2">♥ 112 supporters</div>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-4 w-56 mb-2">
            <div className="font-semibold">
              Beach Talk Radio is a Dinky Little Podcast
            </div>
            <div className="text-xs text-gray-500 mt-2">♥ 1,805 supporters</div>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-4 w-56">
            <div className="font-semibold">
              Simple Politics is helping people have better conversations about
              politics
            </div>
            <div className="text-xs text-gray-500 mt-2">♥ 2,000 supporters</div>
          </div>
        </div>

        {/* Main Hero Content */}
        <section className="flex flex-col items-center justify-center py-32 z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-emerald-600 text-lg">★★★★★</span>
            <span className="text-gray-600 text-sm">
              Loved by 1,000,000+ creators
            </span>
          </div>
          <h1 className="text-8xl  font-bold text-center mb-6 font-instrument-serif">
            Fund your <i>creative </i> work
          </h1>
          <p className="text-lg text-gray-700 text-center max-w-xl mb-8">
            Accept support. Start a membership. Setup a shop. It&apos;s easier
            than you think.
          </p>
          <Link
            href="/dashboard/explore"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 rounded-full text-lg shadow transition mb-2"
          >
            Start my page
          </Link>
          <div className="text-gray-500 text-sm mt-1">
            It&apos;s free and takes less than a minute!
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;
