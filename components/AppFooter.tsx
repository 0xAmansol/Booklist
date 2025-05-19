import Link from "next/link";
import React from "react";

// Placeholder Social Icons - replace with actual components/SVGs if available
const XIcon = () => <span className="text-lg">X</span>;
const YouTubeIcon = () => <span className="text-lg">▶️</span>;
const InstagramIcon = () => <span className="text-lg">📸</span>;

const AppFooter: React.FC = () => {
  return (
    <footer className="w-full bg-gray-100 text-gray-700 text-sm py-12 px-8 flex flex-col items-center">
      <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row justify-start items-start gap-12">
        <div className="mb-8 md:mb-0 md:w-1/4 text-center md:text-left">
          <span className="text-4xl font-bold text-emerald-600 font-instrument-serif">
            BookList
          </span>
        </div>
        <div className="grid grid-cols-2 gap-8 md:gap-12 md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
          <div>
            <h4 className="font-semibold mb-3">Navigation</h4>
            <nav className="flex flex-col gap-2 items-center md:items-start">
              <Link href="#" className="hover:underline">
                Browse Books
              </Link>
              <Link href="#" className="hover:underline">
                Recommendations
              </Link>
              <Link href="#" className="hover:underline">
                Categories
              </Link>
              <Link href="#" className="hover:underline">
                About Us
              </Link>
              <Link href="#" className="hover:underline">
                Contact
              </Link>
            </nav>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <nav className="flex flex-col gap-2 items-center md:items-start">
              <Link href="#" className="hover:underline">
                Help Center
              </Link>
              <Link href="#" className="hover:underline">
                API Documentation
              </Link>
              <Link href="#" className="hover:underline">
                Blog
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row justify-between items-center px-4 border-t border-gray-300 pt-6 mt-6">
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 mb-4 md:mb-0">
          <span>&copy; {new Date().getFullYear()} BookList.</span>
          <nav className="flex gap-3 md:gap-6 justify-center md:justify-start">
            <Link href="#" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:underline">
              Terms of Service
            </Link>
          </nav>
        </div>
        <div className="flex gap-4 justify-center md:justify-start">
          <Link href="#" aria-label="X (formerly Twitter)">
            <XIcon />
          </Link>
          <Link href="#" aria-label="YouTube">
            <YouTubeIcon />
          </Link>
          <Link href="#" aria-label="Instagram">
            <InstagramIcon />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
