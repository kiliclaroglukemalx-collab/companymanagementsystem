"use client"

import { motion } from "framer-motion"
import { X, TrendingUp, Users, Target, Shield } from "lucide-react"
import { brandDataWallMetrics, type Brand, type DataWallMetrics } from "@/lib/dashboard-data"

interface DataWallModalProps {
  isOpen: boolean
  onClose: () => void
  selectedBrand?: Brand
}

export function DataWallModal({ isOpen, onClose, selectedBrand }: DataWallModalProps) {
  if (!isOpen) return null

  const metrics: DataWallMetrics = selectedBrand 
    ? brandDataWallMetrics[selectedBrand.id] || brandDataWallMetrics['default']
    : brandDataWallMetrics['default']

  const themeColor = selectedBrand?.themeColor || "#10b981"
  const brandName = selectedBrand?.name || "Genel Sistem"

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop with blur */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: "rgba(0,0,0,0.85)",
          backdropFilter: "blur(10px)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://5b5aainrdyxbf7vr.public.blob.vercel-storage.com/arka%20plan.mp4"
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        style={{ 
          opacity: 0.25,
          filter: "brightness(0.6) contrast(1.2)",
        }}
      />

      {/* Modal Content */}
      <motion.div
        className="relative w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{
          background: "rgba(0,0,0,0.9)",
          border: `1px solid ${themeColor}30`,
          boxShadow: `0 0 60px ${themeColor}20`,
        }}
        initial={{ scale: 0.9, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 50, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <motion.div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: themeColor }}
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div>
              <h2 
                className="text-2xl font-bold tracking-wide"
                style={{
                  background: `linear-gradient(135deg, ${themeColor} 0%, #ffffff 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {brandName}
              </h2>
              <p className="text-xs text-white/40 tracking-[0.2em] uppercase mt-1">
                Canli Veri Paneli
              </p>
            </div>
          </div>

          {/* Close Button */}
          <motion.button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-6 h-6 text-white/60" />
          </motion.button>
        </div>

        {/* Data Grid */}
        <motion.div
          className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Revenue Card */}
          <motion.div
            className="p-6 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5" style={{ color: themeColor }} />
              <span className="text-xs font-medium text-white/40 tracking-[0.2em] uppercase">
                Ciro Analizi
              </span>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-white/30 mb-1">Gunluk Ciro</p>
                <p 
                  className="text-3xl font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${themeColor} 0%, #ffffff 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: `drop-shadow(0 0 20px ${themeColor}50)`,
                  }}
                >
                  {metrics.revenue.daily}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider">Haftalik</p>
                  <p className="text-sm font-semibold text-white/80">{metrics.revenue.weekly}</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider">Aylik</p>
                  <p className="text-sm font-semibold text-white/80">{metrics.revenue.monthly}</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider">Degisim</p>
                  <p className="text-sm font-semibold text-emerald-400">{metrics.revenue.change}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Players Card */}
          <motion.div
            className="p-6 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5" style={{ color: themeColor }} />
              <span className="text-xs font-medium text-white/40 tracking-[0.2em] uppercase">
                Oyuncu Metrikleri
              </span>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-white/30 mb-1">Aktif Oyuncu</p>
                <p 
                  className="text-3xl font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${themeColor} 0%, #ffffff 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: `drop-shadow(0 0 20px ${themeColor}50)`,
                  }}
                >
                  {metrics.players.active}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider">Yeni</p>
                  <p className="text-sm font-semibold text-white/80">{metrics.players.new}</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider">VIP</p>
                  <p className="text-sm font-semibold text-white/80">{metrics.players.vip}</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider">Retention</p>
                  <p className="text-sm font-semibold text-white/80">{metrics.players.retention}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* BTag Performance Card */}
          <motion.div
            className="p-6 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5" style={{ color: themeColor }} />
              <span className="text-xs font-medium text-white/40 tracking-[0.2em] uppercase">
                BTag Performansi
              </span>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-white/30 mb-1">ROI</p>
                <p 
                  className="text-3xl font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${themeColor} 0%, #ffffff 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: `drop-shadow(0 0 20px ${themeColor}50)`,
                  }}
                >
                  {metrics.btag.roi}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider">Kampanya</p>
                  <p className="text-sm font-semibold text-white/80">{metrics.btag.campaigns}</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider">Donusum</p>
                  <p className="text-sm font-semibold text-white/80">{metrics.btag.conversion}</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider">Maliyet</p>
                  <p className="text-sm font-semibold text-white/80">{metrics.btag.cost}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Security Status Card - Full Width */}
          <motion.div
            className="p-6 rounded-xl md:col-span-2 lg:col-span-3"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5" style={{ color: themeColor }} />
              <span className="text-xs font-medium text-white/40 tracking-[0.2em] uppercase">
                Guvenlik & Risk Durumu
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <motion.div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: metrics.security.status === 'green' ? '#10b981' : metrics.security.status === 'yellow' ? '#f59e0b' : '#ef4444',
                    }}
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-xs text-white/50 uppercase tracking-wider">Durum</span>
                </div>
                <p className={`text-lg font-bold ${metrics.security.status === 'green' ? 'text-emerald-400' : metrics.security.status === 'yellow' ? 'text-amber-400' : 'text-red-400'}`}>
                  {metrics.security.status === 'green' ? 'GUVENLI' : metrics.security.status === 'yellow' ? 'DIKKAT' : 'KRITIK'}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-white/30 uppercase tracking-wider mb-2">Aktif Uyari</p>
                <p 
                  className="text-2xl font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${themeColor} 0%, #ffffff 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {metrics.security.alerts}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-white/30 uppercase tracking-wider mb-2">Bloklanan</p>
                <p 
                  className="text-2xl font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${themeColor} 0%, #ffffff 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {metrics.security.blocked}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-white/30 uppercase tracking-wider mb-2">Dogrulama</p>
                <p 
                  className="text-2xl font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${themeColor} 0%, #ffffff 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {metrics.security.verified}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer Timestamp */}
        <div className="p-4 border-t border-white/5 text-center">
          <span className="text-[10px] font-mono text-white/20 tracking-wider">
            Son Guncelleme: {new Date().toLocaleTimeString('tr-TR')} UTC+3 | Canli Veri Akisi Aktif
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}
