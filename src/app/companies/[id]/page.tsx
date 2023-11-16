import AddPlayer from "@/components/AddPlayer"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { db } from "@/lib/database"
import { users } from "@/lib/database/schema/users"
import { usersToCompanies } from "@/lib/database/schema/usersToCompanies"
import assert from "assert"
import { eq } from "drizzle-orm"

async function getUsersFromCompany(id: string) {
    const res = await db.select().from(usersToCompanies).fullJoin(users, eq(users.id, usersToCompanies.userId)).where(eq(usersToCompanies.companyId, Number(id)))
    return res.map((user) => ({ id: user.users?.id , name: user.users?.fullName, elo: user.users_to_companies?.eloScore })).sort((a, b) => {
        assert(a.elo && b.elo)
        return b.elo - a.elo
    })
}

export default async function Page({ params }: { params: { id: string}}) {
    const users = await getUsersFromCompany(params.id)
    
    
  return (
    <div className="min-h-screen flex flex-col items-center gap-3">
      <p className="text-2xl font-bold text-center">Players</p>
      <AddPlayer companyId={params.id}  />
      <main className="grid grid-cols-2 text-center w-1/2">
        <Card className="p-3 col-span-2">
          <Table className="table-auto ">
            <TableCaption>Players Rankings</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Rank</TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Elo Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, idx) => (
                <TableRow key={user.id}>
                <TableCell className="text-center" >Rank {idx + 1}</TableCell>
                  <TableCell className="text-center">{user.name}</TableCell>
                  <TableCell className="text-center">{user.elo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </Card>
      </main>
    </div>
  )
}