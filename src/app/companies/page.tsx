import React from "react";
import { currentUser } from "@clerk/nextjs";
import { db } from "@/lib/database";
import { users } from "@/lib/database/schema/users";
import { eq } from "drizzle-orm";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import AddCompany from "@/components/AddCompany";
import Navbar from "@/components/Navbar";

async function createUserIfNotExists() {
  const user = await currentUser();

  const userInDb = await db
    .select()
    .from(users)
    .where(eq(users.uuid, user!.id));

  if (userInDb.length > 0) {
    return;
  }

  const newUser = {
    uuid: user!.id,
    email: user?.emailAddresses[0].emailAddress,
    fullName: user?.firstName + " " + user?.lastName,
  };

  await db.insert(users).values({ ...newUser });
}

export default async function Page() {
  await createUserIfNotExists();
  const array = Array.from({ length: 12 }, (_, i) => i + 1);
  return (
    <div className="min-h-screen flex flex-col items-center p-2 gap-3">
      <Navbar />
      <div className="flex flex-col gap-3">
        <p className="text-2xl font-bold grow text-center">Companies</p>
        <AddCompany />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {array.map((item) => (
          <Link href={`/companies/${item}`} key={item}>
            <Card key={item} className="w-64 h-38 m-2">
              <CardHeader>
                <CardTitle>Company {item}</CardTitle>
                <CardDescription>Users: #</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
