"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, LogOut, UserCircle } from "lucide-react";
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

    window.location.reload();
  };

  const userImageUrl = user?.user_metadata?.avatar_url as string | undefined;

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
          <div className="mt-auto pt-4">
            <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center text-center space-y-3 border hover:border-emerald-500">
              <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                {userImageUrl ? (
                  <img
                    src={userImageUrl}
                    alt={`${user.email}'s avatar`}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <UserCircle size={48} className="text-gray-600" />
                )}
              </div>
              <h4 className="font-semibold text-gray-800">Logged in as:</h4>
              <p className="text-xs text-gray-600 break-all">{user.email}</p>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleSignOut}
              >
                <LogOut size={16} className="mr-2" /> Sign Out
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
