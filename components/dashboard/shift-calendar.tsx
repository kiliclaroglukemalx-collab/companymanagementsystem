"use client"

import React from "react"

import { useState, useMemo, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import Image from "next/image"
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Calendar, 
  Clock, 
  Users,
  X,
  Check,
  AlertCircle,
  Building2,
  Search,
  Zap,
  Award
} from "lucide-react"
import { brands, type Brand } from "@/lib/dashboard-data"

// Chronos Module Color Palette
const COLORS = {
  background: "#000000",
  electricBlue: "#3B82F6",
  champagneGold: "#D4AF37",
  goldLight: "#F5E6C8",
  glass: "rgba(255, 255, 255, 0.03)",
  glassBorder: "rgba(255, 255, 255, 0.08)",
  glassHover: "rgba(255, 255, 255, 0.06)",
}

// Department data with images
const departments = [
  { id: 'risk', name: 'Risk', image: '/departments/risk.png', color: '#3b82f6', personnel: 45, active: 38 },
  { id: 'bonus', name: 'Bonus', image: '/departments/bonus.png', color: '#f59e0b', personnel: 32, active: 28 },
  { id: 'canli-destek', name: 'Canli Destek', image: '/departments/canli-destek.png', color: '#10b981', personnel: 78, active: 65 },
  { id: 'finans', name: 'Finans', image: '/departments/finans.png', color: '#8b5cf6', personnel: 24, active: 22 },
  { id: 'call-center', name: 'Call Center', image: '/departments/call-center.png', color: '#06b6d4', personnel: 156, active: 142 },
  { id: 'marketing', name: 'Marketing', image: '/departments/marketing.png', color: '#ec4899', personnel: 38, active: 31 },
]

// Generate 80 random staff names for simulation
const turkishFirstNames = ["Ahmet", "Mehmet", "Ali", "Mustafa", "Huseyin", "Hasan", "Ibrahim", "Ismail", "Osman", "Yusuf", "Omer", "Murat", "Emre", "Burak", "Fatih", "Serkan", "Kemal", "Ayse", "Fatma", "Emine", "Hatice", "Zeynep", "Elif", "Merve", "Esra", "Seda", "Gamze", "Derya", "Ozge", "Tugba", "Sibel", "Selin", "Deniz", "Ece", "Irem", "Melis", "Buse", "Gizem", "Ceren", "Damla"]
const turkishLastNames = ["Yilmaz", "Kaya", "Demir", "Celik", "Sahin", "Yildiz", "Yildirim", "Ozturk", "Aydin", "Ozdemir", "Arslan", "Dogan", "Kilic", "Aslan", "Cetin", "Kara", "Koc", "Kurt", "Ozkan", "Simsek", "Polat", "Korkmaz", "Karatas", "Cinar", "Unal", "Acar", "Aktas", "Erdogan", "Gunes", "Tekin"]

const generateStaffList = () => {
  const staff = []
  for (let i = 0; i < 80; i++) {
    const firstName = turkishFirstNames[Math.floor(Math.random() * turkishFirstNames.length)]
    const lastName = turkishLastNames[Math.floor(Math.random() * turkishLastNames.length)]
    const shiftStart = Math.floor(Math.random() * 24)
    const shiftDuration = [6, 8, 10, 12][Math.floor(Math.random() * 4)]
    staff.push({
      id: i + 1,
      name: `${firstName} ${lastName}`,
      lp: Math.floor(Math.random() * 2500) + 500,
      shiftStart,
      shiftEnd: (shiftStart + shiftDuration) % 24,
      department: departments[Math.floor(Math.random() * departments.length)].id,
    })
  }
  return staff
}

const allStaff = generateStaffList()

// Mock data - will be replaced with real API data in Cursor
const mockShifts = [
  { id: "morning", name: "Sabah", time: "08:00 - 16:00", color: "#34d399" },
  { id: "afternoon", name: "Ogle", time: "16:00 - 00:00", color: "#60a5fa" },
  { id: "night", name: "Gece", time: "00:00 - 08:00", color: "#a78bfa" },
]

const mockWeekData = [
  { day: "Pazartesi", date: "27", shifts: [
    { shiftId: "morning", personnel: 12, maxPersonnel: 15 },
    { shiftId: "afternoon", personnel: 10, maxPersonnel: 12 },
    { shiftId: "night", personnel: 6, maxPersonnel: 8 },
  ]},
  { day: "Sali", date: "28", shifts: [
    { shiftId: "morning", personnel: 14, maxPersonnel: 15 },
    { shiftId: "afternoon", personnel: 11, maxPersonnel: 12 },
    { shiftId: "night", personnel: 7, maxPersonnel: 8 },
  ]},
  { day: "Carsamba", date: "29", shifts: [
    { shiftId: "morning", personnel: 13, maxPersonnel: 15 },
    { shiftId: "afternoon", personnel: 12, maxPersonnel: 12 },
    { shiftId: "night", personnel: 5, maxPersonnel: 8 },
  ]},
  { day: "Persembe", date: "30", shifts: [
    { shiftId: "morning", personnel: 15, maxPersonnel: 15 },
    { shiftId: "afternoon", personnel: 9, maxPersonnel: 12 },
    { shiftId: "night", personnel: 8, maxPersonnel: 8 },
  ]},
  { day: "Cuma", date: "31", shifts: [
    { shiftId: "morning", personnel: 11, maxPersonnel: 15 },
    { shiftId: "afternoon", personnel: 10, maxPersonnel: 12 },
    { shiftId: "night", personnel: 6, maxPersonnel: 8 },
  ]},
  { day: "Cumartesi", date: "1", shifts: [
    { shiftId: "morning", personnel: 8, maxPersonnel: 10 },
    { shiftId: "afternoon", personnel: 8, maxPersonnel: 10 },
    { shiftId: "night", personnel: 4, maxPersonnel: 6 },
  ]},
  { day: "Pazar", date: "2", shifts: [
    { shiftId: "morning", personnel: 6, maxPersonnel: 10 },
    { shiftId: "afternoon", personnel: 7, maxPersonnel: 10 },
    { shiftId: "night", personnel: 4, maxPersonnel: 6 },
  ]},
]

const mockPendingRequests = [
  { id: "1", type: "leave", employeeName: "Ahmet Yilmaz", date: "28 Ocak", reason: "Kisisel", status: "pending" },
  { id: "2", type: "shift", employeeName: "Ayse Demir", date: "29 Ocak", fromShift: "Gece", toShift: "Sabah", status: "pending" },
  { id: "3", type: "leave", employeeName: "Mehmet Kaya", date: "30-31 Ocak", reason: "Saglik", status: "pending" },
]

// Staff Health Ring Component (Apple Watch Style)
function StaffHealthRing({ active, total, size = 60, color = COLORS.electricBlue }: { active: number; total: number; size?: number; color?: string }) {
  const percentage = (active / total) * 100
  const strokeWidth = size * 0.12
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
        />
        {/* Progress ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            filter: `drop-shadow(0 0 6px ${color}80)`,
          }}
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[14px] font-bold" style={{ color: COLORS.champagneGold }}>{active}</span>
        <span className="text-[9px] text-neutral-500">/{total}</span>
      </div>
    </div>
  )
}

interface ShiftCalendarProps {
  isManager?: boolean
}

export function ShiftCalendar({ isManager = true }: ShiftCalendarProps) {
  const [currentWeek] = useState("27 Ocak - 2 Subat 2025")
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [expandedDept, setExpandedDept] = useState<string | null>(null)
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)
  const [requestType, setRequestType] = useState<"leave" | "shift">("leave")
  const [showNotifications, setShowNotifications] = useState(false)
  
  // Timeline state
  const [isDragging, setIsDragging] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [springBackTimer, setSpringBackTimer] = useState<NodeJS.Timeout | null>(null)
  const [countdown, setCountdown] = useState(0)
  const timelineRef = useRef<HTMLDivElement>(null)
  
  // Real current hour
  const [realHour, setRealHour] = useState(() => new Date().getHours())
  
  // Motion values for spring animation
  const timelineX = useMotionValue(0)
  const springX = useSpring(timelineX, { stiffness: 300, damping: 30 })
  
  // Selected hour based on drag position
  const [selectedHour, setSelectedHour] = useState(realHour)
  
  // Brand and Department selection
  const [selectedBrand, setSelectedBrand] = useState<Brand>(brands[0])
  const [selectedDepartment, setSelectedDepartment] = useState(departments[0])
  const [isBrandSearchOpen, setIsBrandSearchOpen] = useState(false)
  const [brandSearchQuery, setBrandSearchQuery] = useState("")

  // Update real time
  useEffect(() => {
    const timer = setInterval(() => {
      setRealHour(new Date().getHours())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  // Filter staff based on selected hour
  const activeStaff = useMemo(() => {
    return allStaff.filter(person => {
      if (person.shiftStart < person.shiftEnd) {
        return selectedHour >= person.shiftStart && selectedHour < person.shiftEnd
      } else {
        return selectedHour >= person.shiftStart || selectedHour < person.shiftEnd
      }
    })
  }, [selectedHour])

  // Filter by department
  const departmentStaff = useMemo(() => {
    if (!expandedDept) return activeStaff
    return activeStaff.filter(person => person.department === expandedDept)
  }, [activeStaff, expandedDept])

  const totalPersonnel = useMemo(() => {
    return mockWeekData.reduce((acc, day) => {
      return acc + day.shifts.reduce((sum, shift) => sum + shift.personnel, 0)
    }, 0)
  }, [])

  const openRequestModal = (type: "leave" | "shift") => {
    setRequestType(type)
    setIsRequestModalOpen(true)
  }

  const filteredBrands = useMemo(() => {
    if (!brandSearchQuery.trim()) return brands
    return brands.filter((brand) =>
      brand.name.toLowerCase().includes(brandSearchQuery.toLowerCase())
    )
  }, [brandSearchQuery])

  // Handle timeline drag
  const handleTimelineDrag = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!timelineRef.current) return
    
    const rect = timelineRef.current.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(1, x / rect.width))
    const hour = Math.round(percentage * 23)
    
    setSelectedHour(hour)
    timelineX.set(percentage * rect.width)
    
    // Reset spring back timer
    if (springBackTimer) {
      clearTimeout(springBackTimer)
      setSpringBackTimer(null)
    }
    setCountdown(0)
  }, [springBackTimer, timelineX])

  const handleDragStart = () => {
    setIsDragging(true)
    if (springBackTimer) {
      clearTimeout(springBackTimer)
      setSpringBackTimer(null)
    }
    setCountdown(0)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    
    // Start 10 second countdown
    setCountdown(10)
    
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval)
          // Spring back to real time
          setSelectedHour(realHour)
          if (timelineRef.current) {
            const rect = timelineRef.current.getBoundingClientRect()
            timelineX.set((realHour / 23) * rect.width)
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    setSpringBackTimer(countdownInterval as unknown as NodeJS.Timeout)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleTimelineDrag(e)
    }
    setTooltipPosition({ x: e.clientX, y: e.clientY })
  }

  // 24-hour timeline data
  const hours = Array.from({ length: 24 }, (_, i) => i)

  // Glow intensity based on dragging
  const glowIntensity = isDragging ? 1 : 0.5

  return (
    <section className="relative min-h-screen pb-12" style={{ background: COLORS.background }}>
      {/* Apple-Style Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="fixed z-[100] pointer-events-none"
            style={{
              left: tooltipPosition.x + 15,
              top: tooltipPosition.y - 60,
            }}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <div 
              className="px-4 py-3 rounded-xl max-w-[280px]"
              style={{
                background: "rgba(0, 0, 0, 0.9)",
                border: `1px solid ${COLORS.champagneGold}40`,
                backdropFilter: "blur(20px)",
                boxShadow: `0 0 30px ${COLORS.champagneGold}20`,
              }}
            >
              <p 
                className="text-[12px] font-medium leading-relaxed"
                style={{ color: COLORS.goldLight }}
              >
                <span style={{ color: COLORS.champagneGold }}>Vardiya Gozlemcisi:</span> Zamani kaydirarak hangi departmanda kimin gorevde oldugunu anlik inceleyin.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Master Pulse - Interactive 24 Hour Timeline */}
      <div className="px-10 pt-8 pb-4">
        <motion.div
          ref={timelineRef}
          className="relative h-16 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing"
          style={{
            background: COLORS.glass,
            border: `1px solid ${isDragging ? COLORS.electricBlue : COLORS.glassBorder}`,
            boxShadow: isDragging 
              ? `0 0 40px ${COLORS.electricBlue}40, inset 0 0 20px ${COLORS.electricBlue}10` 
              : `0 0 20px ${COLORS.electricBlue}20`,
            transition: "box-shadow 0.3s ease, border-color 0.3s ease",
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onMouseLeave={() => {
            if (isDragging) handleDragEnd()
            setShowTooltip(false)
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setShowTooltip(true)}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
          onTouchMove={(e) => handleTimelineDrag(e)}
        >
          {/* Timeline markers */}
          <div className="absolute inset-0 flex items-end justify-between px-6 pb-2">
            {hours.map((hour) => (
              <div key={hour} className="flex flex-col items-center">
                <motion.div 
                  className="w-px"
                  style={{ 
                    height: hour % 6 === 0 ? 16 : hour % 3 === 0 ? 10 : 6,
                    background: hour === selectedHour 
                      ? COLORS.champagneGold 
                      : hour === realHour 
                        ? COLORS.electricBlue 
                        : "rgba(255,255,255,0.2)",
                    boxShadow: hour === selectedHour 
                      ? `0 0 12px ${COLORS.champagneGold}` 
                      : hour === realHour 
                        ? `0 0 8px ${COLORS.electricBlue}` 
                        : "none"
                  }}
                  animate={{
                    scaleY: hour === selectedHour ? 1.3 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 500 }}
                />
                {hour % 3 === 0 && (
                  <span 
                    className="text-[10px] mt-1 font-semibold"
                    style={{ 
                      color: hour === selectedHour 
                        ? COLORS.champagneGold 
                        : hour === realHour 
                          ? COLORS.electricBlue 
                          : "rgba(255,255,255,0.4)" 
                    }}
                  >
                    {hour.toString().padStart(2, '0')}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Draggable gold indicator */}
          <motion.div
            className="absolute top-0 h-full"
            style={{
              left: `${(selectedHour / 23) * 100}%`,
              x: "-50%",
            }}
            animate={{
              left: `${(selectedHour / 23) * 100}%`,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute top-0 h-full w-20 -translate-x-1/2"
              style={{
                background: `radial-gradient(ellipse at center, ${COLORS.electricBlue}${isDragging ? '60' : '30'} 0%, transparent 70%)`,
                filter: "blur(8px)",
              }}
              animate={{
                opacity: glowIntensity,
              }}
            />
            
            {/* Gold bar */}
            <motion.div
              className="relative h-full w-1 rounded-full"
              style={{
                background: `linear-gradient(180deg, ${COLORS.champagneGold} 0%, ${COLORS.electricBlue} 100%)`,
                boxShadow: `0 0 ${isDragging ? 30 : 15}px ${COLORS.electricBlue}${isDragging ? '80' : '50'}`,
              }}
              animate={{
                scaleX: isDragging ? 1.5 : 1,
              }}
            />
            
            {/* Hour badge */}
            <motion.div
              className="absolute -top-1 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full"
              style={{
                background: COLORS.background,
                border: `1px solid ${COLORS.champagneGold}`,
                boxShadow: `0 0 20px ${COLORS.champagneGold}40`,
              }}
              animate={{
                scale: isDragging ? 1.1 : 1,
              }}
            >
              <span 
                className="text-[13px] font-bold"
                style={{ color: COLORS.champagneGold }}
              >
                {selectedHour.toString().padStart(2, '0')}:00
              </span>
            </motion.div>
          </motion.div>

          {/* Real time indicator (when different from selected) */}
          {selectedHour !== realHour && (
            <motion.div
              className="absolute top-0 h-full w-0.5 rounded-full opacity-50"
              style={{
                left: `${(realHour / 23) * 100}%`,
                background: COLORS.electricBlue,
                boxShadow: `0 0 10px ${COLORS.electricBlue}`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
            />
          )}

          {/* Countdown indicator */}
          <AnimatePresence>
            {countdown > 0 && (
              <motion.div
                className="absolute top-2 right-4 px-3 py-1 rounded-full"
                style={{
                  background: "rgba(0,0,0,0.8)",
                  border: `1px solid ${COLORS.electricBlue}40`,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <span className="text-[11px] font-medium" style={{ color: COLORS.electricBlue }}>
                  Geri sayim: {countdown}s
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Chronos Title */}
        <motion.div 
          className="flex items-center justify-between mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-1.5 h-1.5 rounded-full"
              style={{ 
                background: COLORS.champagneGold,
                boxShadow: `0 0 8px ${COLORS.champagneGold}80`
              }}
            />
            <span 
              className="text-[11px] font-semibold tracking-[0.3em] uppercase"
              style={{ color: COLORS.champagneGold }}
            >
              Chronos Module
            </span>
            <div 
              className="w-1.5 h-1.5 rounded-full"
              style={{ 
                background: COLORS.champagneGold,
                boxShadow: `0 0 8px ${COLORS.champagneGold}80`
              }}
            />
          </div>

          {/* Active staff count */}
          <div className="flex items-center gap-2">
            <Users size={14} style={{ color: COLORS.electricBlue }} />
            <span className="text-[12px] font-semibold" style={{ color: COLORS.goldLight }}>
              {activeStaff.length} Aktif Personel
            </span>
            <span className="text-[11px] text-neutral-500">
              @ {selectedHour.toString().padStart(2, '0')}:00
            </span>
          </div>
        </motion.div>
      </div>

      {/* Company Selector Section */}
      <div className="px-10 pt-4 pb-6">
        <div className="flex items-center justify-center mb-8">
          {/* Brand Selector */}
          <div className="relative flex items-center gap-4">
            <motion.button
              onClick={() => {
                const currentIndex = brands.findIndex(b => b.id === selectedBrand.id)
                const prevIndex = currentIndex === 0 ? brands.length - 1 : currentIndex - 1
                setSelectedBrand(brands[prevIndex])
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: COLORS.glass,
                border: `1px solid ${COLORS.glassBorder}`,
              }}
              whileHover={{ scale: 1.1, borderColor: COLORS.champagneGold }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-4 h-4" style={{ color: COLORS.champagneGold }} />
            </motion.button>

            <motion.button
              onClick={() => setIsBrandSearchOpen(true)}
              className="relative flex items-center gap-3 px-6 py-3 rounded-full overflow-hidden"
              style={{
                background: COLORS.glass,
                border: `1px solid ${COLORS.champagneGold}40`,
                backdropFilter: "blur(20px)",
              }}
              whileHover={{ scale: 1.02, borderColor: COLORS.champagneGold }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 80% 80% at 50% 50%, ${COLORS.champagneGold}10, transparent 70%)`,
                }}
              />
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: `${COLORS.champagneGold}20` }}
              >
                <Building2 className="w-4 h-4" style={{ color: COLORS.champagneGold }} />
              </div>
              <span className="text-base font-semibold" style={{ color: COLORS.goldLight }}>{selectedBrand.name}</span>
              <Search className="w-4 h-4 ml-2" style={{ color: COLORS.champagneGold + "80" }} />
            </motion.button>

            <motion.button
              onClick={() => {
                const currentIndex = brands.findIndex(b => b.id === selectedBrand.id)
                const nextIndex = currentIndex === brands.length - 1 ? 0 : currentIndex + 1
                setSelectedBrand(brands[nextIndex])
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: COLORS.glass,
                border: `1px solid ${COLORS.glassBorder}`,
              }}
              whileHover={{ scale: 1.1, borderColor: COLORS.champagneGold }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-4 h-4" style={{ color: COLORS.champagneGold }} />
            </motion.button>
          </div>
        </div>

        {/* Modular Department Pods */}
        <div className="grid grid-cols-6 gap-4">
          {departments.map((dept, index) => {
            const deptActiveCount = activeStaff.filter(p => p.department === dept.id).length
            
            return (
              <motion.div
                key={dept.id}
                className="relative cursor-pointer group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => setExpandedDept(expandedDept === dept.id ? null : dept.id)}
              >
                <motion.div
                  className="relative p-5 rounded-2xl overflow-hidden"
                  style={{
                    background: COLORS.glass,
                    border: expandedDept === dept.id 
                      ? `1px solid ${COLORS.electricBlue}` 
                      : `1px solid ${COLORS.glassBorder}`,
                    backdropFilter: "blur(20px)",
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    background: COLORS.glassHover,
                    borderColor: COLORS.electricBlue + "60",
                  }}
                  whileTap={{ scale: 0.98 }}
                  layout
                >
                  {/* Glow effect when selected */}
                  {expandedDept === dept.id && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse at center, ${COLORS.electricBlue}15, transparent 70%)`,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}

                  {/* Department Image */}
                  <div className="relative w-full h-16 rounded-xl overflow-hidden mb-4 bg-neutral-900">
                    <Image
                      src={dept.image || "/placeholder.svg"}
                      alt={dept.name}
                      fill
                      priority
                      loading="eager"
                      sizes="120px"
                      className="object-cover"
                      style={{
                        filter: "brightness(0.9) saturate(1.1)",
                      }}
                    />
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.6) 100%)"
                      }}
                    />
                  </div>

                  {/* Department Name */}
                  <h3 
                    className="text-[13px] font-bold mb-3 tracking-wide"
                    style={{ color: COLORS.goldLight }}
                  >
                    {dept.name}
                  </h3>

                  {/* Staff Health Ring */}
                  <div className="flex items-center justify-between">
                    <StaffHealthRing 
                      active={deptActiveCount} 
                      total={dept.personnel} 
                      size={56}
                      color={expandedDept === dept.id ? COLORS.electricBlue : dept.color}
                    />
                    <div className="text-right">
                      <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Aktif</p>
                      <p 
                        className="text-[20px] font-bold"
                        style={{ color: COLORS.electricBlue }}
                      >
                        {deptActiveCount}
                      </p>
                    </div>
                  </div>

                  {/* Selection indicator */}
                  {expandedDept === dept.id && (
                    <motion.div
                      className="absolute top-3 right-3 w-2 h-2 rounded-full"
                      style={{ 
                        background: COLORS.electricBlue,
                        boxShadow: `0 0 10px ${COLORS.electricBlue}`
                      }}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [1, 0.7, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Expanded Personnel List */}
        <AnimatePresence>
          {expandedDept && (
            <motion.div
              className="mt-6 rounded-2xl overflow-hidden"
              style={{
                background: COLORS.glass,
                border: `1px solid ${COLORS.glassBorder}`,
                backdropFilter: "blur(20px)",
              }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 
                    className="text-[15px] font-bold tracking-wide"
                    style={{ color: COLORS.goldLight }}
                  >
                    {departments.find(d => d.id === expandedDept)?.name} Ekibi @ {selectedHour.toString().padStart(2, '0')}:00
                  </h3>
                  <span 
                    className="text-[11px] px-3 py-1 rounded-full"
                    style={{ 
                      background: `${COLORS.electricBlue}20`,
                      color: COLORS.electricBlue,
                    }}
                  >
                    {departmentStaff.length} Aktif
                  </span>
                </div>

                {/* Personnel Grid */}
                <div className="grid grid-cols-6 gap-3">
                  {departmentStaff.map((person, index) => (
                    <motion.div
                      key={person.id}
                      className="relative p-3 rounded-xl group cursor-pointer"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: `1px solid ${COLORS.glassBorder}`,
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.02 }}
                      whileHover={{ 
                        scale: 1.02, 
                        borderColor: COLORS.electricBlue + "60",
                        background: "rgba(255,255,255,0.04)",
                      }}
                    >
                      {/* Breathing glow for active */}
                      <motion.div
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        style={{
                          background: `radial-gradient(ellipse at center, ${COLORS.electricBlue}10, transparent 70%)`,
                        }}
                        animate={{
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.1,
                        }}
                      />

                      {/* Name */}
                      <p 
                        className="text-[12px] font-semibold mb-1 truncate"
                        style={{ color: COLORS.goldLight }}
                      >
                        {person.name}
                      </p>

                      {/* LP Badge */}
                      <div className="flex items-center gap-1">
                        <Award size={10} style={{ color: COLORS.champagneGold }} />
                        <span 
                          className="text-[10px] font-bold"
                          style={{ color: COLORS.champagneGold }}
                        >
                          {person.lp} LP
                        </span>
                      </div>

                      {/* Shift time */}
                      <p className="text-[9px] text-neutral-500 mt-1">
                        {person.shiftStart.toString().padStart(2, '0')}:00 - {person.shiftEnd.toString().padStart(2, '0')}:00
                      </p>
                    </motion.div>
                  ))}
                </div>

                {departmentStaff.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-neutral-500 text-[13px]">
                      Bu saatte aktif personel bulunmuyor
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Header Section */}
      <div className="px-10 pt-4 pb-8" style={{ background: COLORS.background }}>
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 
              className="text-[32px] font-medium tracking-tight mb-2"
              style={{ color: COLORS.goldLight }}
            >
              Mesai Takvimi
            </h1>
            <p className="text-[15px] font-normal text-neutral-400">
              Haftalik vardiya planlama ve personel yonetimi
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Employee Actions */}
            {!isManager && (
              <>
                <motion.button
                  className="flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[14px] font-medium transition-all"
                  style={{
                    background: COLORS.glass,
                    border: `1px solid ${COLORS.glassBorder}`,
                    color: COLORS.goldLight,
                  }}
                  whileHover={{ borderColor: COLORS.champagneGold }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openRequestModal("leave")}
                >
                  <Calendar className="w-4 h-4" style={{ color: COLORS.champagneGold }} />
                  Izin Talep Et
                </motion.button>
                <motion.button
                  className="flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[14px] font-medium transition-all"
                  style={{
                    background: COLORS.glass,
                    border: `1px solid ${COLORS.glassBorder}`,
                    color: COLORS.goldLight,
                  }}
                  whileHover={{ borderColor: COLORS.champagneGold }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openRequestModal("shift")}
                >
                  <Clock className="w-4 h-4" style={{ color: COLORS.champagneGold }} />
                  Mesai Talep Et
                </motion.button>
              </>
            )}

            {/* Manager Notifications */}
            {isManager && (
              <motion.button
                className="relative flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[14px] font-medium transition-all"
                style={{
                  background: COLORS.glass,
                  border: `1px solid ${COLORS.glassBorder}`,
                  color: COLORS.goldLight,
                }}
                whileHover={{ borderColor: COLORS.champagneGold }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <AlertCircle className="w-4 h-4" style={{ color: COLORS.champagneGold }} />
                Talepler
                {mockPendingRequests.length > 0 && (
                  <span 
                    className="ml-1 px-2 py-0.5 rounded-full text-[11px] font-bold text-white"
                    style={{ background: "#ef4444" }}
                  >
                    {mockPendingRequests.length}
                  </span>
                )}
              </motion.button>
            )}

            {/* Add Shift Button */}
            {isManager && (
              <motion.button
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[14px] font-bold transition-all"
                style={{
                  background: COLORS.champagneGold,
                  color: COLORS.background,
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="w-4 h-4" strokeWidth={2.5} />
                Vardiya Ekle
              </motion.button>
            )}
          </div>
        </div>

        {/* Week Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <motion.button
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{ 
                background: COLORS.glass,
                border: `1px solid ${COLORS.glassBorder}`,
              }}
              whileHover={{ borderColor: COLORS.champagneGold }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5" style={{ color: COLORS.champagneGold }} />
            </motion.button>
            <span 
              className="text-[17px] font-semibold tracking-tight"
              style={{ color: COLORS.goldLight }}
            >
              {currentWeek}
            </span>
            <motion.button
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{ 
                background: COLORS.glass,
                border: `1px solid ${COLORS.glassBorder}`,
              }}
              whileHover={{ borderColor: COLORS.champagneGold }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5" style={{ color: COLORS.champagneGold }} />
            </motion.button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8">
            <div className="text-right">
              <p 
                className="text-[12px] uppercase tracking-widest mb-1 font-medium"
                style={{ color: COLORS.champagneGold + "80" }}
              >
                Haftalik Toplam
              </p>
              <p className="text-[28px] font-semibold tracking-tight" style={{ color: COLORS.goldLight }}>
                {totalPersonnel}
                <span className="text-[14px] font-normal ml-2" style={{ color: COLORS.champagneGold + "80" }}>personel</span>
              </p>
            </div>
          </div>
        </div>

        {/* Shift Legend */}
        <div className="flex items-center gap-4 mt-6">
          {mockShifts.map((shift) => (
            <div 
              key={shift.id} 
              className="flex items-center gap-3 px-4 py-2 rounded-full"
              style={{ 
                background: COLORS.glass,
                border: `1px solid ${COLORS.glassBorder}`,
              }}
            >
              <div 
                className="w-2.5 h-2.5 rounded-full"
                style={{ 
                  backgroundColor: shift.color,
                  boxShadow: `0 0 8px ${shift.color}80`
                }}
              />
              <span className="text-[13px] font-medium" style={{ color: COLORS.goldLight }}>{shift.name}</span>
              <span className="text-[12px] font-normal" style={{ color: COLORS.champagneGold + "80" }}>{shift.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Grid - Glassmorphism cards */}
      <div className="px-10 py-8" style={{ background: COLORS.background }}>
        <div className="grid grid-cols-7 gap-4">
          {mockWeekData.map((day, dayIndex) => (
            <motion.div
              key={day.day}
              className="rounded-2xl overflow-hidden cursor-pointer transition-all"
              style={{
                background: COLORS.glass,
                border: selectedDay === day.day 
                  ? `1px solid ${COLORS.electricBlue}` 
                  : `1px solid ${COLORS.glassBorder}`,
                backdropFilter: "blur(20px)",
                boxShadow: selectedDay === day.day 
                  ? `0 0 40px ${COLORS.electricBlue}20` 
                  : "none",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: dayIndex * 0.04 }}
              whileHover={{ 
                y: -4,
                borderColor: COLORS.electricBlue + "60",
              }}
              onClick={() => setSelectedDay(selectedDay === day.day ? null : day.day)}
            >
              {/* Day Header */}
              <div 
                className="px-5 py-4 border-b"
                style={{ borderColor: COLORS.glassBorder }}
              >
                <p 
                  className="text-[12px] uppercase tracking-widest mb-1 font-semibold"
                  style={{ color: COLORS.champagneGold }}
                >
                  {day.day}
                </p>
                <p 
                  className="text-[28px] font-bold"
                  style={{ color: COLORS.goldLight }}
                >
                  {day.date}
                </p>
              </div>

              {/* Shifts */}
              <div className="p-4 space-y-3">
                {day.shifts.map((shift, shiftIndex) => {
                  const shiftInfo = mockShifts.find(s => s.id === shift.shiftId)
                  const fillPercentage = (shift.personnel / shift.maxPersonnel) * 100

                  return (
                    <motion.div
                      key={shift.shiftId}
                      className="group relative p-4 rounded-xl transition-all"
                      style={{ 
                        background: "rgba(255, 255, 255, 0.02)",
                        border: `1px solid ${COLORS.glassBorder}`,
                      }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: dayIndex * 0.04 + shiftIndex * 0.02 }}
                      whileHover={{ 
                        background: "rgba(255, 255, 255, 0.04)",
                        borderColor: COLORS.electricBlue + "40",
                      }}
                    >
                      {/* Shift Name */}
                      <div className="flex items-center justify-between mb-3">
                        <span 
                          className="text-[13px] font-semibold"
                          style={{ color: COLORS.goldLight }}
                        >
                          {shiftInfo?.name}
                        </span>
                        {fillPercentage >= 100 && (
                          <span 
                            className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                            style={{ 
                              background: `${COLORS.electricBlue}20`,
                              color: COLORS.electricBlue,
                            }}
                          >
                            Tam
                          </span>
                        )}
                        {fillPercentage < 70 && (
                          <span 
                            className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                            style={{ 
                              background: "rgba(239, 68, 68, 0.2)",
                              color: "#ef4444",
                            }}
                          >
                            Eksik
                          </span>
                        )}
                      </div>

                      {/* Personnel Count */}
                      <div className="flex items-baseline gap-1.5 mb-3">
                        <span 
                          className="text-[24px] font-bold"
                          style={{ color: shiftInfo?.color }}
                        >
                          {shift.personnel}
                        </span>
                        <span 
                          className="text-[13px] font-medium"
                          style={{ color: COLORS.champagneGold + "80" }}
                        >
                          / {shift.maxPersonnel}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div 
                        className="h-1.5 rounded-full overflow-hidden"
                        style={{ background: "rgba(255, 255, 255, 0.1)" }}
                      >
                        <motion.div
                          className="h-full rounded-full"
                          style={{ 
                            backgroundColor: shiftInfo?.color,
                            boxShadow: `0 0 10px ${shiftInfo?.color}60`,
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${fillPercentage}%` }}
                          transition={{ delay: dayIndex * 0.04 + shiftIndex * 0.02 + 0.3, duration: 0.6, ease: "easeOut" }}
                        />
                      </div>

                      {/* Manager hover actions */}
                      {isManager && (
                        <div 
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all rounded-xl"
                          style={{ 
                            background: "rgba(0, 0, 0, 0.85)",
                            backdropFilter: "blur(4px)",
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <button 
                              className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                              style={{ 
                                background: COLORS.champagneGold,
                                color: COLORS.background,
                              }}
                            >
                              <Plus className="w-4 h-4" strokeWidth={2} />
                            </button>
                            <button 
                              className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                              style={{ 
                                background: COLORS.glass,
                                border: `1px solid ${COLORS.glassBorder}`,
                                color: COLORS.goldLight,
                              }}
                            >
                              <Users className="w-4 h-4" strokeWidth={1.5} />
                            </button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Notifications Dropdown */}
      <AnimatePresence>
        {showNotifications && isManager && (
          <motion.div
            className="fixed top-24 right-10 w-96 rounded-2xl overflow-hidden z-50"
            style={{
              background: "rgba(0, 0, 0, 0.95)",
              border: `1px solid ${COLORS.glassBorder}`,
              backdropFilter: "blur(40px)",
              boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.8)`,
            }}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
          >
            <div 
              className="p-4 border-b flex items-center justify-between"
              style={{ borderColor: COLORS.glassBorder }}
            >
              <h3 className="text-[15px] font-bold" style={{ color: COLORS.goldLight }}>Bekleyen Talepler</h3>
              <motion.button
                onClick={() => setShowNotifications(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: COLORS.glass }}
                whileHover={{ background: COLORS.glassHover }}
              >
                <X size={16} style={{ color: COLORS.goldLight }} />
              </motion.button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {mockPendingRequests.map((request, index) => (
                <motion.div
                  key={request.id}
                  className="p-4 border-b"
                  style={{ borderColor: COLORS.glassBorder }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[14px] font-semibold" style={{ color: COLORS.goldLight }}>
                        {request.employeeName}
                      </p>
                      <p className="text-[12px] text-neutral-500 mt-0.5">
                        {request.type === "leave" ? `Izin: ${request.reason}` : `Vardiya Degisikligi: ${request.fromShift} → ${request.toShift}`}
                      </p>
                      <p className="text-[11px] mt-1" style={{ color: COLORS.champagneGold + "80" }}>{request.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ 
                          background: `${COLORS.electricBlue}20`,
                          color: COLORS.electricBlue,
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Check size={14} />
                      </motion.button>
                      <motion.button
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ 
                          background: "rgba(239, 68, 68, 0.2)",
                          color: "#ef4444",
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <X size={14} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Request Modal */}
      <AnimatePresence>
        {isRequestModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div 
              className="absolute inset-0"
              style={{ background: "rgba(0, 0, 0, 0.8)" }}
              onClick={() => setIsRequestModalOpen(false)}
            />
            <motion.div
              className="relative w-[440px] rounded-3xl overflow-hidden"
              style={{
                background: COLORS.background,
                border: `1px solid ${COLORS.glassBorder}`,
                boxShadow: `0 0 80px ${COLORS.electricBlue}20`,
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div 
                className="p-6 border-b"
                style={{ borderColor: COLORS.glassBorder }}
              >
                <h2 className="text-[20px] font-bold" style={{ color: COLORS.goldLight }}>
                  {requestType === "leave" ? "Izin Talep Et" : "Mesai Degisikligi Talep Et"}
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label 
                    className="text-[12px] font-semibold uppercase tracking-wider block mb-2"
                    style={{ color: COLORS.champagneGold }}
                  >
                    Tarih
                  </label>
                  <input
                    type="date"
                    className="w-full p-3 rounded-xl text-[14px] outline-none"
                    style={{
                      background: COLORS.glass,
                      border: `1px solid ${COLORS.glassBorder}`,
                      color: COLORS.goldLight,
                    }}
                  />
                </div>
                {requestType === "leave" ? (
                  <div>
                    <label 
                      className="text-[12px] font-semibold uppercase tracking-wider block mb-2"
                      style={{ color: COLORS.champagneGold }}
                    >
                      Izin Turu
                    </label>
                    <select
                      className="w-full p-3 rounded-xl text-[14px] outline-none"
                      style={{
                        background: COLORS.glass,
                        border: `1px solid ${COLORS.glassBorder}`,
                        color: COLORS.goldLight,
                      }}
                    >
                      <option value="annual">Yillik Izin</option>
                      <option value="sick">Saglik Izni</option>
                      <option value="personal">Kisisel Izin</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label 
                      className="text-[12px] font-semibold uppercase tracking-wider block mb-2"
                      style={{ color: COLORS.champagneGold }}
                    >
                      Istenen Vardiya
                    </label>
                    <select
                      className="w-full p-3 rounded-xl text-[14px] outline-none"
                      style={{
                        background: COLORS.glass,
                        border: `1px solid ${COLORS.glassBorder}`,
                        color: COLORS.goldLight,
                      }}
                    >
                      <option value="morning">Sabah (08:00 - 16:00)</option>
                      <option value="afternoon">Ogle (16:00 - 00:00)</option>
                      <option value="night">Gece (00:00 - 08:00)</option>
                    </select>
                  </div>
                )}
                <div>
                  <label 
                    className="text-[12px] font-semibold uppercase tracking-wider block mb-2"
                    style={{ color: COLORS.champagneGold }}
                  >
                    Aciklama
                  </label>
                  <textarea
                    rows={3}
                    className="w-full p-3 rounded-xl text-[14px] outline-none resize-none"
                    style={{
                      background: COLORS.glass,
                      border: `1px solid ${COLORS.glassBorder}`,
                      color: COLORS.goldLight,
                    }}
                    placeholder="Opsiyonel aciklama..."
                  />
                </div>
              </div>
              <div 
                className="p-6 border-t flex items-center justify-end gap-3"
                style={{ borderColor: COLORS.glassBorder }}
              >
                <motion.button
                  className="px-5 py-2.5 rounded-full text-[14px] font-medium"
                  style={{
                    background: COLORS.glass,
                    border: `1px solid ${COLORS.glassBorder}`,
                    color: COLORS.goldLight,
                  }}
                  whileHover={{ borderColor: COLORS.champagneGold }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsRequestModalOpen(false)}
                >
                  Iptal
                </motion.button>
                <motion.button
                  className="px-5 py-2.5 rounded-full text-[14px] font-bold"
                  style={{
                    background: COLORS.champagneGold,
                    color: COLORS.background,
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Talep Gonder
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Brand Search Modal */}
      <AnimatePresence>
        {isBrandSearchOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div 
              className="absolute inset-0"
              style={{ background: "rgba(0, 0, 0, 0.8)" }}
              onClick={() => setIsBrandSearchOpen(false)}
            />
            <motion.div
              className="relative w-[500px] rounded-3xl overflow-hidden"
              style={{
                background: COLORS.background,
                border: `1px solid ${COLORS.glassBorder}`,
                boxShadow: `0 0 80px ${COLORS.champagneGold}10`,
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div 
                className="p-6 border-b"
                style={{ borderColor: COLORS.glassBorder }}
              >
                <div 
                  className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{
                    background: COLORS.glass,
                    border: `1px solid ${COLORS.glassBorder}`,
                  }}
                >
                  <Search size={18} style={{ color: COLORS.champagneGold }} />
                  <input
                    type="text"
                    placeholder="Sirket ara..."
                    value={brandSearchQuery}
                    onChange={(e) => setBrandSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-[14px] outline-none"
                    style={{ color: COLORS.goldLight }}
                    autoFocus
                  />
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto p-4 space-y-2">
                {filteredBrands.map((brand) => (
                  <motion.button
                    key={brand.id}
                    className="w-full flex items-center gap-3 p-3 rounded-xl text-left"
                    style={{
                      background: selectedBrand.id === brand.id ? COLORS.glassHover : "transparent",
                      border: `1px solid ${selectedBrand.id === brand.id ? COLORS.champagneGold + "40" : "transparent"}`,
                    }}
                    whileHover={{ background: COLORS.glassHover }}
                    onClick={() => {
                      setSelectedBrand(brand)
                      setIsBrandSearchOpen(false)
                      setBrandSearchQuery("")
                    }}
                  >
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: `${COLORS.champagneGold}20` }}
                    >
                      <Building2 size={18} style={{ color: COLORS.champagneGold }} />
                    </div>
                    <span className="text-[14px] font-medium" style={{ color: COLORS.goldLight }}>{brand.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
