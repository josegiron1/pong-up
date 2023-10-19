import { ModeToggle } from "@/components/theme-toggle-button";
import { SignOutButton, auth } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  const { userId }: { userId: string | null } = auth();

  return (
    <header className="py-4 flex w-full justify-between px-10">
    <div className="flex space-x-6 items-center">
      <Link href="/" className="text-xl font-bold">
        Pong-Up
      </Link>
      {!!userId &&<Link href={"/companies"} className="text-md">
        Companies
      </Link>}
    </div>
    <div className="flex space-x-4 items-center">
      <ModeToggle />
      {!!userId && <SignOutButton>Logout</SignOutButton>}
    </div>
  </header>
  )
  }