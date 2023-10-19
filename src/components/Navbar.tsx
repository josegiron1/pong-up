import { ModeToggle } from "@/components/theme-toggle-button";
import { SignOutButton, auth } from "@clerk/nextjs";

export default function Navbar() {
  const { userId }: { userId: string | null } = auth();

  return (
    <header className="py-4 flex w-full justify-between px-10">
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
  )
  }