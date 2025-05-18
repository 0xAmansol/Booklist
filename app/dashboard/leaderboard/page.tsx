import LaunchPromo from "@/components/LaunchPromo";
import BookDiscovery from "@/components/LeaderBoardCenter";
import Sidebar from "@/components/Sidebar";

export default function LeaderBoardPage() {
  return (
    <div className="relative h-screen w-full bg-background flex justify-center">
      <div className="relative w-full max-w-7xl flex">
        <div className="fixed left-[calc(50%-560px)] top-0 h-full w-64  hidden lg:block bg-background z-10">
          <Sidebar />
        </div>

        <div className="fixed right-[calc(48%-560px)] top-0 h-full w-80 border-l hidden lg:block bg-background z-10 p-6 overflow-y-auto">
          <LaunchPromo />
        </div>

        <main className="mx-auto  h-full px-6  max-w-4xl">
          <BookDiscovery />
        </main>
      </div>
    </div>
  );
}
