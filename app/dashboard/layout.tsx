import LaunchPromo from "@/components/LaunchPromo";
import Sidebar from "@/components/Sidebar";
import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="relative h-screen w-full bg-background flex justify-center">
      <div className="relative w-full max-w-7xl flex">
        <div className="fixed left-[calc(49%-560px)] top-0 h-full w-64  hidden lg:block bg-background z-10">
          <Sidebar />
        </div>

        <div className="fixed right-[calc(47%-560px)] top-0 h-full w-80  hidden lg:block bg-background z-10 p-6 overflow-y-auto">
          <LaunchPromo />
        </div>

        <main className="mx-auto h-full px-6 ">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
