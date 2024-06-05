import AddPlayer from "@/app/companies/[id]/add-player"
import { Card } from "@/components/ui/card"
import { db } from "@/lib/database"
import { users } from "@/lib/database/schema/users"
import { usersToCompanies } from "@/lib/database/schema/usersToCompanies"
import assert from "assert"
import { eq } from "drizzle-orm"
import { PlayersInformation } from "./players-information"

async function getUsersFromCompany(id: string) {
    const res = await db.select().from(usersToCompanies).fullJoin(users, eq(users.id, usersToCompanies.userId)).where(eq(usersToCompanies.companyId, Number(id)))
    return res.map((user) => ({ id: user.users?.id , name: user.users?.fullName, elo: user.users_to_companies?.eloScore })).sort((a, b) => {
        assert(a.elo && b.elo)
        return b.elo - a.elo
    })
}

export default async function Page({ params, query }: { params: { id: string}, query: { modal: string }}) {
    const users = await getUsersFromCompany(params.id)
    console.log(params)
    
    
  return (
    <div className="min-h-screen flex flex-col items-center gap-3">
      <p className="text-2xl font-bold text-center">Players</p>
      <AddPlayer companyId={params.id}  />
      <main className="grid grid-cols-2 text-center w-1/2">
        <Card className="p-3 col-span-2">
          <PlayersInformation users={users} modal={query?.modal} />
        </Card>
      </main>
    </div>
  )
}