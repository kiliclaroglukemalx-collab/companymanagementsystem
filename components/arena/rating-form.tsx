"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createRating } from "@/lib/rating-actions"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Star, Send, CheckCircle2, XCircle, User } from "lucide-react"
import { toast } from "sonner"
import { TR } from "@/lib/tr-constants"
import type { RatingCriteriaData } from "@/lib/rating-actions"

interface UserToRate {
  id: string
  name: string
  email: string
  alreadyRatedToday: boolean
}

interface Props {
  departmentId: string
  criteria: RatingCriteriaData[]
  users: UserToRate[]
}

export function RatingForm({ departmentId, criteria, users }: Props) {
  const router = useRouter()
  const [selectedUserId, setSelectedUserId] = useState<string>("")
  const [scores, setScores] = useState<Record<string, number>>({})
  const [isLoading, setIsLoading] = useState(false)

  const selectedUser = users.find((u) => u.id === selectedUserId)
  const availableUsers = users.filter((u) => !u.alreadyRatedToday)

  const handleScoreChange = (criteriaId: string, value: number) => {
    setScores((prev) => ({ ...prev, [criteriaId]: value }))
  }

  const handleSubmit = async () => {
    // Validation
    if (!selectedUserId) {
      toast.error(TR.rating.mustSelectPerson)
      return
    }

    const allScoresFilled = criteria.every((c) => scores[c.id] !== undefined)
    if (!allScoresFilled) {
      toast.error(TR.rating.mustFillAllScores)
      return
    }

    // Validate score range
    for (const criteriaId in scores) {
      if (scores[criteriaId] < 1 || scores[criteriaId] > 10) {
        toast.error(TR.rating.scoreMustBeBetween)
        return
      }
    }

    setIsLoading(true)

    const result = await createRating({
      ratedUserId: selectedUserId,
      departmentId,
      scores: Object.entries(scores).map(([criteriaId, score]) => ({
        criteriaId,
        score,
      })),
    })

    setIsLoading(false)

    if (result.success) {
      toast.success(TR.rating.ratingSuccessDesc, {
        description: `Toplam puan: ${result.data?.totalScore.toFixed(1)}/10`,
      })
      // Reset form
      setSelectedUserId("")
      setScores({})
      router.refresh()
    } else {
      // Handle error codes
      if (result.error === "ALREADY_RATED_TODAY") {
        toast.error(TR.rating.alreadyRatedToday, {
          description: TR.rating.alreadyRatedDesc,
        })
      } else if (result.error === "CANNOT_RATE_SELF") {
        toast.error(TR.rating.cannotRateSelf, {
          description: TR.rating.cannotRateSelfDesc,
        })
      } else {
        toast.error(TR.rating.ratingFailed, {
          description: result.error || TR.rating.ratingFailedDesc,
        })
      }
    }
  }

  if (availableUsers.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          Bugün Tüm Puanlamalar Tamamlandı
        </h3>
        <p className="text-sm text-slate-600">
          Departmanınızdaki tüm personeli bugün zaten puanladınız.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* User Selection */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          {TR.rating.selectPerson}
        </h2>

        <Select value={selectedUserId} onValueChange={setSelectedUserId}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={TR.rating.selectPersonDesc} />
          </SelectTrigger>
          <SelectContent>
            {availableUsers.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400" />
                  <span>{user.name}</span>
                  <span className="text-xs text-slate-400">({user.email})</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {users.length > availableUsers.length && (
          <p className="text-xs text-slate-500 mt-2">
            {users.length - availableUsers.length} kişiyi bugün zaten puanladınız
          </p>
        )}
      </div>

      {/* Criteria Scoring */}
      {selectedUser && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              {TR.rating.ratingCriteria}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {selectedUser.name} için değerlendirme yapın
            </p>
          </div>

          <div className="space-y-6">
            {criteria.map((criterion) => (
              <div key={criterion.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-900">
                    {criterion.name}
                  </label>
                  <Badge
                    variant="secondary"
                    className={
                      scores[criterion.id]
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-100 text-slate-600"
                    }
                  >
                    {scores[criterion.id] || "-"} / 10
                  </Badge>
                </div>

                <Slider
                  value={[scores[criterion.id] || 5]}
                  onValueChange={(value) => handleScoreChange(criterion.id, value[0])}
                  min={1}
                  max={10}
                  step={1}
                  className="py-2"
                />

                <div className="flex justify-between text-xs text-slate-500">
                  <span>{TR.rating.minScore}</span>
                  <span>{TR.rating.maxScore}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <Button
              onClick={handleSubmit}
              disabled={isLoading || !selectedUserId || criteria.some((c) => !scores[c.id])}
              className="w-full bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 h-12"
            >
              {isLoading ? (
                TR.common.loading
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  {TR.rating.giveRating}
                </>
              )}
            </Button>

            {selectedUserId && criteria.some((c) => !scores[c.id]) && (
              <p className="text-xs text-amber-600 mt-2 text-center">
                {TR.rating.mustFillAllScores}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Instructions */}
      {!selectedUser && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Star className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-blue-900 mb-1">
                Nasıl Çalışır?
              </h3>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>1. Yukarıdan puanlamak istediğiniz personeli seçin</li>
                <li>2. Her kriter için 1-10 arası puan verin</li>
                <li>3. Puanlama butonuna tıklayın</li>
                <li>4. Aynı gün aynı kişiyi tekrar puanlayamazsınız</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
