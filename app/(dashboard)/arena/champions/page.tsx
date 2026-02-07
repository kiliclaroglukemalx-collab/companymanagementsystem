import { getServerAuthContext } from "@/lib/server-auth"
import { getMonthlyChampions } from "@/lib/arena-league-actions"
import { ChampionsCelebration } from "@/components/arena/champions-celebration"
import { redirect } from "next/navigation"

export default async function ChampionsPage() {
  const auth = await getServerAuthContext()
  
  if (!auth) {
    redirect("/login")
  }

  const result = await getMonthlyChampions()

  if (!result.success || !result.champions || result.champions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">
          Henüz arşivlenmiş şampiyon yok.
        </p>
      </div>
    )
  }

  return (
    <ChampionsCelebration
      champions={result.champions}
      month={result.month}
    />
  )
}
