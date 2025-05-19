"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen } from "lucide-react";
import { SECTIONS } from "@/constants/sections";
import { Button } from "./ui/button";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import Image from "next/image";

const Sidebar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null));
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    // Optionally, redirect or refresh
    window.location.reload();
  };

  return (
    <div className="h-full flex justify-center">
      <div className="p-4 border-b w-full flex flex-col h-full">
        <div className="flex items-center justify-start mb-6">
          <Link href="/" className="flex items-center gap-1 pl-2">
            <Image
              src="/BookList.png"
              alt="BookList Logo"
              width={40}
              height={40}
              priority
            />
            <span className="font-instrument-serif text-xl font-bold text-black">
              BookList
            </span>
          </Link>
        </div>

        <nav className="flex-1 space-y-2">
          {SECTIONS.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={label}
                href={href}
                className={`flex items-center gap-1 px-3 py-1 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-accent text-emerald-600 "
                    : "hover:bg-muted hover:text-emerald-400 text-foreground"
                }`}
              >
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`font-instrument-serif tracking-wide text-md transition-colors duration-200 hover:border-emerald-500 w-full justify-start ${
                    isActive ? " bg-neutral-900" : "bg-emerald-50"
                  }`}
                >
                  <Icon
                    className={`h-14 w-14 transition-transform duration-200 ${
                      isActive ? "text-emerald-500" : "group-hover:scale-105"
                    }`}
                  />
                  {label}
                </Button>
              </Link>
            );
          })}
        </nav>
        {user && (
          <div className="mt-auto pt-4 text-sm text-gray-700 border-t">
            <div className="font-semibold">{user.email}</div>
          </div>
        )}
        {user && (
          <Button
            variant="outline"
            className="w-full mt-2"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
