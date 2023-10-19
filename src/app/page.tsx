import GetStarted from "@/components/GetStarted";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center items-center">
        <main className="text-center space-y-6">
          <h1 className="text-6xl font-bold">
            Ping Pong Elo For Startup Companies
          </h1>
          <p className="text-xl">
            Every startup has a ping pong table, make it competitive, make it
            fun.
          </p>
          <div className="space-x-4">
            <GetStarted />
          </div>
        </main>

        <footer className="absolute bottom-0 left-0 right-0 py-4 text-center">
          <p className="text-sm">Pong-Up 2023</p>
        </footer>
      </div>
    </>
  );
}
