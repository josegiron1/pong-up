import { db } from "@/lib/database";
import { company } from "@/lib/database/schema/companies";
import { usersToCompanies } from "@/lib/database/schema/usersToCompanies";

export async function POST(request: Request, response: Response) {
    const req = await request.json();
    const { name, userId } = req;
    if (!name) {
      throw new Error("Name is required");
    }
  
    if (!userId) {
      throw new Error("User is required");
    }

    const [companyCreated] = await db.insert(company).values({
      name,
    }).returning()
  
    await db.insert(usersToCompanies).values({
      userId: Number(userId),
      companyId: companyCreated.id,
    });

   
    return Response.json({ ...companyCreated })
  }