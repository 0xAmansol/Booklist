import Center from "@/components/Center";
import LaunchPromo from "@/components/LaunchPromo";
import Sidebar from "@/components/Sidebar";

export default function BooksPage() {
  return (
    <div className="relative h-screen w-full bg-background flex justify-center">
      {/* Container to center all 3 columns */}
      <div className="relative w-full max-w-7xl flex">
        {/* Left Sidebar */}
        <div className="fixed left-[calc(47%-560px)] top-0 h-full w-64  hidden lg:block bg-background z-10">
          <Sidebar />
        </div>

        {/* Right Sidebar */}
        <div className="fixed right-[calc(45%-560px)] top-0 h-full w-80 border-l hidden lg:block bg-background z-10 p-6 overflow-y-auto">
          <LaunchPromo />
        </div>

        {/* Scrollable Center */}
        <main className="mx-auto  h-full px-6  max-w-4xl">
          <Center />
        </main>
      </div>
    </div>
  );
}
