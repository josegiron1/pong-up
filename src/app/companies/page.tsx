import { currentUser } from "@clerk/nextjs";
import { db } from "@/lib/database";
import { users } from "@/lib/database/schema/users";
import { eq, sql } from "drizzle-orm";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import AddCompany from "@/app/companies/add-company";
import { company } from "@/lib/database/schema/companies";
import { usersToCompanies } from "@/lib/database/schema/usersToCompanies";
import { User } from "@clerk/nextjs/server";
import { addCompany } from "../actions";

async function createUserIfNotExists(user: User | null) {
  const [userInDb] = await db
    .select()
    .from(users)
    .where(eq(users.uuid, user!.id));

  if (userInDb) return userInDb;

  const newUser = {
    uuid: user!.id,
    email: user?.emailAddresses[0].emailAddress,
    fullName: user?.firstName + " " + user?.lastName,
  };

  const [createdUser] = await db
    .insert(users)
    .values({ ...newUser })
    .returning();

  return createdUser;
}

async function getCompanies(user: User | null) {
  const [userDb] = await db
    .select()
    .from(users)
    .where(eq(users.uuid, user!.id));

  const { rows } = await db
    .run(
      sql`SELECT
  ${company.id},
  ${company.name},
  COUNT(DISTINCT ${usersToCompanies.userId}) AS userCount
FROM
  ${company}
INNER JOIN
  ${usersToCompanies}
ON
  ${company.id} = ${usersToCompanies.companyId}
WHERE
  ${company.id} IN (
      SELECT
          ${usersToCompanies.companyId}
      FROM
          ${usersToCompanies}
      WHERE
          ${usersToCompanies.userId} = ${userDb.id}
  )
GROUP BY
  ${company.id}, ${company.name};`
    )
    .execute();

  return rows as unknown as { id: number; name: string; userCount: number }[];
}

export default async function Page({ params }: { params: { open: boolean } }) {
  const user = await currentUser();
  const [userInDb, companies] = await Promise.all([
    createUserIfNotExists(user),
    getCompanies(user),
  ]);

  const createCompanies = async (formData: FormData) => {
    "use server";
    await addCompany(formData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-2 gap-3">
      <div className="flex flex-col gap-3">
        <p className="text-2xl font-bold grow text-center">Companies</p>
        <AddCompany
          createCompany={createCompanies}
          userId={userInDb.id}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {companies.map((item) => (
          <Link href={`/companies/${item.id}`} key={item?.id}>
            <Card className="w-64 h-38 m-2">
              <CardHeader>
                <CardTitle>{item?.name}</CardTitle>
                <CardDescription>
                  Number of users: {item?.userCount}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
