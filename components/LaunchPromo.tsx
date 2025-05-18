import { Rocket } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const LaunchPromo = () => {
  return (
    <div className="rounded-lg border bg-card p-4 relative overflow-hidden">
      <div className="flex items-start gap-3">
        <Rocket className="h-8 w-8 text-red-500" />
        <div className="space-y-1">
          <h3 className="font-instrument-serif text-lg font-medium">
            Want to launch your book?
          </h3>
          <p className="text-sm text-muted-foreground">
            Monday is a launch day. Get notified when the launchpad opens.
          </p>
          <Button className="mt-2 w-full font-instrument-serif bg-gray-900 hover:bg-gray-800">
            Get Notified
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LaunchPromo;
