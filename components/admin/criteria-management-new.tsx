"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { upsertCriteria, toggleCriteriaStatus } from "@/lib/rating-actions"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { BarChart3, Plus, Edit, Check, X } from "lucide-react"
import { toast } from "sonner"
import { TR } from "@/lib/tr-constants"
import type { UserRole } from "@/lib/auth"
import type { RatingCriteriaData } from "@/lib/rating-actions"

interface Department {
  id: string
  name: string
  siteId: string
  site: { name: string }
  _count: { ratingCriteria: number }
}

interface Props {
  departments: Department[]
  criteria: RatingCriteriaData[]
  currentUserRole: UserRole
}

export function CriteriaManagement({ departments, criteria, currentUserRole }: Props) {
  const router = useRouter()
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingCriteria, setEditingCriteria] = useState<RatingCriteriaData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Form state
  const [name, setName] = useState("")
  const [weight, setWeight] = useState("0")

  const filteredCriteria = selectedDepartmentId
    ? criteria.filter((c) => c.departmentId === selectedDepartmentId)
    : criteria

  const handleCreate = async () => {
    if (!name.trim() || !selectedDepartmentId) {
      toast.error("Lütfen tüm alanları doldurun")
      return
    }

    setIsLoading(true)
    const result = await upsertCriteria({
      departmentId: selectedDepartmentId,
      name: name.trim(),
      weight: parseInt(weight) || 0,
      isActive: true,
    })

    setIsLoading(false)

    if (result.success) {
      toast.success(TR.rating.criteriaCreatedSuccess)
      setIsCreateDialogOpen(false)
      setName("")
      setWeight("0")
      router.refresh()
    } else {
      toast.error(result.error || "Kriter oluşturulamadı")
    }
  }

  const handleEdit = async () => {
    if (!editingCriteria || !name.trim()) {
      toast.error("Lütfen tüm alanları doldurun")
      return
    }

    setIsLoading(true)
    const result = await upsertCriteria({
      id: editingCriteria.id,
      departmentId: editingCriteria.departmentId,
      name: name.trim(),
      weight: parseInt(weight) || 0,
      isActive: editingCriteria.isActive,
    })

    setIsLoading(false)

    if (result.success) {
      toast.success(TR.rating.criteriaUpdatedSuccess)
      setIsEditDialogOpen(false)
      setEditingCriteria(null)
      setName("")
      setWeight("0")
      router.refresh()
    } else {
      toast.error(result.error || "Kriter güncellenemedi")
    }
  }

  const handleToggleStatus = async (criteriaId: string) => {
    const result = await toggleCriteriaStatus(criteriaId)

    if (result.success) {
      toast.success(TR.rating.criteriaToggleSuccess)
      router.refresh()
    } else {
      toast.error(result.error || "Durum değiştirilemedi")
    }
  }

  const openEditDialog = (c: RatingCriteriaData) => {
    setEditingCriteria(c)
    setName(c.name)
    setWeight(c.weight.toString())
    setIsEditDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Department Filter */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <Select value={selectedDepartmentId} onValueChange={setSelectedDepartmentId}>
              <SelectTrigger>
                <SelectValue placeholder="Departman seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tüm Departmanlar</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.name}
                    {currentUserRole === "SUPER_ADMIN" && ` (${dept.site.name})`}
                    {" - "}
                    {dept._count.ratingCriteria} kriter
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={() => {
              if (!selectedDepartmentId) {
                toast.error("Önce bir departman seçin")
                return
              }
              setIsCreateDialogOpen(true)
            }}
            className="bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            {TR.rating.addCriteria}
          </Button>
        </div>
      </div>

      {/* Criteria List */}
      {filteredCriteria.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <BarChart3 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            {TR.rating.noCriteria}
          </h3>
          <p className="text-sm text-slate-600 mb-6">
            {TR.rating.noCriteriaDescAdmin}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    {TR.rating.criteriaName}
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    {TR.departments.department}
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    {TR.rating.criteriaWeight}
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    {TR.rating.criteriaStatus}
                  </th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    {TR.common.actions}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredCriteria.map((c) => {
                  const dept = departments.find((d) => d.id === c.departmentId)
                  return (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-slate-900">{c.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-600">
                          {dept?.name || "-"}
                          {currentUserRole === "SUPER_ADMIN" && dept && (
                            <span className="text-xs text-slate-400 ml-2">
                              ({dept.site.name})
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-600">{c.weight}</div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleStatus(c.id)}
                          className="inline-block"
                        >
                          <Badge
                            variant={c.isActive ? "default" : "secondary"}
                            className={
                              c.isActive
                                ? "bg-green-100 text-green-800 border-green-200 hover:bg-green-200"
                                : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                            }
                          >
                            {c.isActive ? (
                              <>
                                <Check className="w-3 h-3 mr-1" />
                                {TR.status.active}
                              </>
                            ) : (
                              <>
                                <X className="w-3 h-3 mr-1" />
                                {TR.status.inactive}
                              </>
                            )}
                          </Badge>
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(c)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          {TR.common.edit}
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{TR.rating.addCriteria}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                {TR.rating.criteriaName}
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Örn: İletişim Becerileri"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                {TR.rating.criteriaWeight} (Opsiyonel)
              </label>
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              {TR.common.cancel}
            </Button>
            <Button
              onClick={handleCreate}
              disabled={isLoading}
              className="bg-gradient-to-br from-blue-500 to-purple-600"
            >
              {isLoading ? TR.common.loading : TR.common.create}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{TR.rating.editCriteria}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                {TR.rating.criteriaName}
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Örn: İletişim Becerileri"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">
                {TR.rating.criteriaWeight}
              </label>
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                min="0"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              {TR.common.cancel}
            </Button>
            <Button
              onClick={handleEdit}
              disabled={isLoading}
              className="bg-gradient-to-br from-blue-500 to-purple-600"
            >
              {isLoading ? TR.common.loading : TR.common.save}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
