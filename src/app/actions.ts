'use server'

import { db } from "@/lib/database";
import { company } from "@/lib/database/schema/companies";
import { usersToCompanies } from "@/lib/database/schema/usersToCompanies";
import { revalidatePath } from "next/cache";


export async function addCompany(formData: FormData) {
    const name = formData.get('name');
    const userId = formData.get('userId');

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
        userId: parseInt(userId.toString()),
        companyId: companyCreated.id
    });

    return revalidatePath('/companies');
}