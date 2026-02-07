"use client"

import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown, DollarSign, ArrowRight, Loader2 } from "lucide-react"
import { TR } from "@/lib/tr-constants"
import { cn } from "@/lib/utils"

interface FinancialSummary {
  totalIncome: number
  bankFees: number
  withdrawals: number
  operatingCosts: number
  netProfit: number
  cumulativeProfit: number
  lastUpdated: string
}

export function FinancialFlowWidget() {
  const [data, setData] = useState<FinancialSummary | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<"daily" | "monthly">("monthly")

  useEffect(() => {
    loadFinancialData()
  }, [timeRange])

  async function loadFinancialData() {
    try {
      setIsLoading(true)
      const res = await fetch(`/api/financial-flow/summary?range=${timeRange}`)
      if (res.ok) {
        const result = await res.json()
        setData(result.summary)
      }
    } catch (error) {
      console.error("Failed to load financial data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-white" />
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">{TR.financialFlow.title}</h2>
        <p className="text-green-200 mb-4">{TR.financialFlow.subtitle}</p>
        <div className="text-center py-8">
          <p className="text-green-300">{TR.financialFlow.noData}</p>
          <p className="text-sm text-green-400 mt-2">{TR.financialFlow.noDataDesc}</p>
        </div>
      </div>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const flowItems = [
    {
      label: TR.financialFlow.totalIncome,
      value: data.totalIncome,
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      icon: TrendingUp,
    },
    {
      label: TR.financialFlow.bankFees,
      value: -data.bankFees,
      color: "text-orange-400",
      bgColor: "bg-orange-500/20",
      icon: DollarSign,
    },
    {
      label: TR.financialFlow.withdrawals,
      value: -data.withdrawals,
      color: "text-red-400",
      bgColor: "bg-red-500/20",
      icon: TrendingDown,
    },
    {
      label: TR.financialFlow.operatingCosts,
      value: -data.operatingCosts,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/20",
      icon: DollarSign,
    },
  ]

  return (
    <div className="bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 rounded-2xl p-8 text-white shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">{TR.financialFlow.title}</h2>
          <p className="text-green-200">{TR.financialFlow.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setTimeRange("daily")}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              timeRange === "daily"
                ? "bg-white/20 text-white"
                : "bg-white/5 text-green-300 hover:bg-white/10"
            )}
          >
            {TR.financialFlow.dailyView}
          </button>
          <button
            onClick={() => setTimeRange("monthly")}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              timeRange === "monthly"
                ? "bg-white/20 text-white"
                : "bg-white/5 text-green-300 hover:bg-white/10"
            )}
          >
            {TR.financialFlow.monthlyView}
          </button>
        </div>
      </div>

      {/* Flow Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {flowItems.map((item, index) => {
          const Icon = item.icon
          return (
            <div key={index} className="relative">
              <div className={cn("rounded-xl p-4", item.bgColor, "backdrop-blur-sm")}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/80">{item.label}</span>
                  <Icon className={cn("w-4 h-4", item.color)} />
                </div>
                <div className={cn("text-xl font-bold", item.color)}>
                  {formatCurrency(Math.abs(item.value))}
                </div>
              </div>
              {index < flowItems.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-white/40" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Net Profit Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-green-200">{TR.financialFlow.netProfit}</span>
            {data.netProfit >= 0 ? (
              <TrendingUp className="w-5 h-5 text-green-400" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-400" />
            )}
          </div>
          <div className={cn(
            "text-3xl font-bold",
            data.netProfit >= 0 ? "text-green-400" : "text-red-400"
          )}>
            {formatCurrency(data.netProfit)}
          </div>
          <div className="mt-2 text-xs text-green-300">
            {timeRange === "daily" ? "Bugünkü" : "Aylık"} Kazanç
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-green-200">{TR.financialFlow.cumulativeProfit}</span>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-emerald-400">
            {formatCurrency(data.cumulativeProfit)}
          </div>
          <div className="mt-2 text-xs text-green-300">
            Tüm Zamanlar Toplam
          </div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="mt-4 text-center text-sm text-green-300">
        {TR.financialFlow.lastUpdated}: {new Date(data.lastUpdated).toLocaleString("tr-TR")}
      </div>
    </div>
  )
}
