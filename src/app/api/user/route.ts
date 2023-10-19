import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";
 
export async function POST(req: NextApiRequest) {
  const { userId } = getAuth(req);
  console.log(userId)
return Response.json({ userId });
}