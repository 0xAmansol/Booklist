"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen } from "lucide-react";
import { SECTIONS } from "@/constants/sections";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="h-full flex justify-center">
      <div className="p-4 border-b w-full">
        <Link href="/" className="flex items-center gap-2 pl-2 mb-6">
          <BookOpen className="h-6 w-6 text-emerald-600" />
          <span className="font-instrument-serif text-3xl font-bold">
            BookList
          </span>
        </Link>

        <nav className="flex-1 space-y-2">
          {SECTIONS.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={label}
                href={href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group ${
                  isActive
                    ? "bg-accent text-emerald-600 font-bold"
                    : "hover:bg-muted hover:text-emerald-400 text-foreground"
                }`}
              >
                <Icon
                  className={`h-5 w-5 transition-transform duration-200 ${
                    isActive ? "text-emerald-600" : "group-hover:scale-105"
                  }`}
                />
                <span
                  className={`font-instrument-serif text-lg transition-colors duration-200 ${
                    isActive ? "font-bold" : "font-semibold"
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
