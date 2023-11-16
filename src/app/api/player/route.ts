import { db } from "@/lib/database";
import { company } from "@/lib/database/schema/companies";
import { users } from "@/lib/database/schema/users";
import { usersToCompanies } from "@/lib/database/schema/usersToCompanies";

export async function POST(request: Request, response: Response) {
    const req = await request.json();
    const { fullName, companyId } = req;
    if (!fullName) {
      throw new Error("Name is required");
    }
  
    if (!companyId) {
      throw new Error("User is required");
    }

    const [userCreated] = await db.insert(users).values({
        fullName,
    }).returning()
  
    await db.insert(usersToCompanies).values({
      userId: userCreated.id,
      companyId: companyId
    });

   
    return Response.json({ ...userCreated })
  }