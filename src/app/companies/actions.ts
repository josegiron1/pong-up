"use server"
import { db } from "@/lib/database";
import { company } from "@/lib/database/schema/companies";
import { usersToCompanies } from "@/lib/database/schema/usersToCompanies";
import { revalidatePath } from "next/cache";


export async function createCompanies(_: any, data: FormData) {
  const name = data.get("name");
  const userId = data.get("userId");
  if (!name) {
    throw new Error("Name is required");
  }

  if (!userId) {
    throw new Error("User is required");
  }

  const [companyCreated] = await db.insert(company).values({
    name: name.toString(),
  }).returning()

  await db.insert(usersToCompanies).values({
    userId: Number(userId),
    companyId: companyCreated.id,
  });

  revalidatePath("/companies");

  return {
    message: "Created",
    company: companyCreated,
  }

}
