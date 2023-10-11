import { ModeToggle } from "@/components/theme-toggle-button";
import { Button } from "@/components/ui/button";
import { SignOutButton, auth } from "@clerk/nextjs";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const { userId }: { userId: string | null } = auth();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Head>
        <title>Next.js Landing Page</title>
      </Head>

      <header className="absolute top-0 left-0 right-0 py-4 flex justify-between px-10">
        <div className="flex space-x-6">
          <a href="#" className="text-xl font-bold">
            Pong-Up
          </a>
        </div>
        <div className="flex space-x-4">
          <ModeToggle />
          {!!userId && <SignOutButton>Logout</SignOutButton>}
        </div>
      </header>

      <main className="text-center space-y-6">
        <h1 className="text-6xl font-bold">Ping Pong Elo For Startup Companies</h1>
        <p className="text-xl">
          Every startup has a ping pong table, make it competitive, make it fun.
        </p>
        <div className="space-x-4">
          <Link href="/sign-up">
            <Button>Get Started</Button>
          </Link>
          <Link href="/login">
            <Button className="bg-gray-700 px-8 py-3 rounded hover:bg-gray-600">
              Login to Ranking
            </Button>
          </Link>
        </div>
      </main>

      <footer className="absolute bottom-0 left-0 right-0 py-4 text-center">
        <p className="text-sm">Pong-Up 2023</p>
      </footer>
    </div>
  );
}
