import { Bell, Search } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import RecommendBookDialog from "./RecommendBookDialog";

const Header = () => {
  return (
    <header className="border-b px-2 py-3 flex items-center justify-end  bg-background">
      <div className="flex items-center gap-4">
        <RecommendBookDialog />

        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search BookList"
            className="pl-8 font-instrument-serif"
          />
        </div>

        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
