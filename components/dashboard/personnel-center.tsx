"use client"

import { useEffect } from "react"

import React from "react"

import { useRef } from "react"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { 
  Search, 
  Plus,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  Clock,
  Users,
  X,
  ChevronRight,
  ChevronLeft,
  Building2,
  Check,
  Crown,
  Star,
  Zap,
  Target,
  Award,
  Shield,
  Lock,
  Send,
  FileText,
  Eye,
  EyeOff,
  ShieldCheck,
  Briefcase,
  ImageIcon,
  Upload
} from "lucide-react"
import { brands, type Brand } from "@/lib/dashboard-data"
import { useSite } from "@/lib/site-context"

// Department data with images
const departments = [
  { id: 'risk', name: 'Risk', image: '/departments/risk.png', color: '#3b82f6', personnel: 45 },
  { id: 'bonus', name: 'Bonus', image: '/departments/bonus.png', color: '#f59e0b', personnel: 32 },
  { id: 'canli-destek', name: 'Canli Destek', image: '/departments/canli-destek.png', color: '#10b981', personnel: 78 },
  { id: 'finans', name: 'Finans', image: '/departments/finans.png', color: '#8b5cf6', personnel: 24 },
  { id: 'call-center', name: 'Call Center', image: '/departments/call-center.png', color: '#06b6d4', personnel: 156 },
  { id: 'marketing', name: 'Marketing', image: '/departments/marketing.png', color: '#ec4899', personnel: 38 },
]

// League rank system
const leagueRanks = [
  { name: 'Challenger', minLP: 2500, color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b, #fcd34d)', icon: Crown },
  { name: 'Master', minLP: 2000, color: '#a855f7', gradient: 'linear-gradient(135deg, #a855f7, #c084fc)', icon: Star },
  { name: 'Diamond', minLP: 1500, color: '#60a5fa', gradient: 'linear-gradient(135deg, #60a5fa, #93c5fd)', icon: Shield },
  { name: 'Platinum', minLP: 1000, color: '#22d3ee', gradient: 'linear-gradient(135deg, #22d3ee, #67e8f9)', icon: Award },
  { name: 'Gold', minLP: 500, color: '#fbbf24', gradient: 'linear-gradient(135deg, #fbbf24, #fcd34d)', icon: Zap },
  { name: 'Silver', minLP: 0, color: '#94a3b8', gradient: 'linear-gradient(135deg, #94a3b8, #cbd5e1)', icon: Target },
]

// Weekly schedule type
type DaySchedule = { day: string, shift: string | null } // null = izinli

// Mock data - Enhanced with salary, advance, schedule, site/global ranks
const mockEmployees = [
  { id: '1', name: 'Ahmet Yilmaz', role: 'Senior Analist', department: 'Risk', site: 'Lucky Stars', status: 'active', email: 'ahmet@cms.com', phone: '+90 532 XXX XX XX', startDate: '2021-03-15', performance: 94, shiftsThisMonth: 22, lp: 2650, speed: 92, accuracy: 96, ggr: 125000, ngr: 98000, salary: 45000, advance: 5000, deptRank: 3, siteRank: 1, globalRank: 12, weeklySchedule: [{ day: 'Pzt', shift: '09:00-17:00' }, { day: 'Sal', shift: '09:00-17:00' }, { day: 'Car', shift: '09:00-17:00' }, { day: 'Per', shift: '09:00-17:00' }, { day: 'Cum', shift: '09:00-17:00' }, { day: 'Cmt', shift: null }, { day: 'Paz', shift: null }] },
  { id: '2', name: 'Elif Kaya', role: 'Risk Uzmani', department: 'Risk', site: 'Victory Games', status: 'active', email: 'elif@cms.com', phone: '+90 533 XXX XX XX', startDate: '2020-08-01', performance: 89, shiftsThisMonth: 20, lp: 2180, speed: 88, accuracy: 91, ggr: 98000, ngr: 76000, salary: 38000, advance: 0, deptRank: 7, siteRank: 2, globalRank: 45, weeklySchedule: [{ day: 'Pzt', shift: '14:00-22:00' }, { day: 'Sal', shift: '14:00-22:00' }, { day: 'Car', shift: null }, { day: 'Per', shift: '14:00-22:00' }, { day: 'Cum', shift: '14:00-22:00' }, { day: 'Cmt', shift: '14:00-22:00' }, { day: 'Paz', shift: null }] },
  { id: '3', name: 'Mehmet Demir', role: 'Takim Lideri', department: 'Call Center', site: 'Golden Palace', status: 'active', email: 'mehmet@cms.com', phone: '+90 535 XXX XX XX', startDate: '2019-01-10', performance: 97, shiftsThisMonth: 23, lp: 2890, speed: 95, accuracy: 98, ggr: 156000, ngr: 134000, salary: 52000, advance: 0, deptRank: 1, siteRank: 1, globalRank: 3, weeklySchedule: [{ day: 'Pzt', shift: '08:00-16:00' }, { day: 'Sal', shift: '08:00-16:00' }, { day: 'Car', shift: '08:00-16:00' }, { day: 'Per', shift: '08:00-16:00' }, { day: 'Cum', shift: '08:00-16:00' }, { day: 'Cmt', shift: '08:00-12:00' }, { day: 'Paz', shift: null }] },
  { id: '4', name: 'Zeynep Arslan', role: 'BTag Uzmani', department: 'Marketing', site: 'Diamond Bet', status: 'onLeave', email: 'zeynep@cms.com', phone: '+90 536 XXX XX XX', startDate: '2022-05-20', performance: 85, shiftsThisMonth: 18, lp: 1650, speed: 82, accuracy: 88, ggr: 67000, ngr: 52000, salary: 32000, advance: 3000, deptRank: 15, siteRank: 5, globalRank: 124, weeklySchedule: [{ day: 'Pzt', shift: '10:00-18:00' }, { day: 'Sal', shift: '10:00-18:00' }, { day: 'Car', shift: '10:00-18:00' }, { day: 'Per', shift: '10:00-18:00' }, { day: 'Cum', shift: null }, { day: 'Cmt', shift: null }, { day: 'Paz', shift: null }] },
  { id: '5', name: 'Can Ozturk', role: 'Bonus Analisti', department: 'Bonus', site: 'BetMaster TR', status: 'active', email: 'can@cms.com', phone: '+90 537 XXX XX XX', startDate: '2023-02-01', performance: 78, shiftsThisMonth: 21, lp: 980, speed: 75, accuracy: 82, ggr: 45000, ngr: 32000, salary: 28000, advance: 0, deptRank: 28, siteRank: 8, globalRank: 287, weeklySchedule: [{ day: 'Pzt', shift: '09:00-17:00' }, { day: 'Sal', shift: '09:00-17:00' }, { day: 'Car', shift: '09:00-17:00' }, { day: 'Per', shift: '09:00-17:00' }, { day: 'Cum', shift: '09:00-17:00' }, { day: 'Cmt', shift: null }, { day: 'Paz', shift: null }] },
  { id: '6', name: 'Selin Yildiz', role: 'Musteri Temsilcisi', department: 'Canli Destek', site: 'Casino Royal', status: 'active', email: 'selin@cms.com', phone: '+90 538 XXX XX XX', startDate: '2021-11-15', performance: 91, shiftsThisMonth: 22, lp: 1920, speed: 89, accuracy: 93, ggr: 89000, ngr: 71000, salary: 35000, advance: 2000, deptRank: 9, siteRank: 3, globalRank: 67, weeklySchedule: [{ day: 'Pzt', shift: '22:00-06:00' }, { day: 'Sal', shift: '22:00-06:00' }, { day: 'Car', shift: '22:00-06:00' }, { day: 'Per', shift: null }, { day: 'Cum', shift: null }, { day: 'Cmt', shift: '22:00-06:00' }, { day: 'Paz', shift: '22:00-06:00' }] },
  { id: '7', name: 'Burak Celik', role: 'Finans Analisti', department: 'Finans', site: 'Spor Arena', status: 'active', email: 'burak@cms.com', phone: '+90 539 XXX XX XX', startDate: '2020-04-01', performance: 88, shiftsThisMonth: 20, lp: 1450, speed: 86, accuracy: 90, ggr: 78000, ngr: 62000, salary: 42000, advance: 0, deptRank: 12, siteRank: 4, globalRank: 98, weeklySchedule: [{ day: 'Pzt', shift: '09:00-17:00' }, { day: 'Sal', shift: '09:00-17:00' }, { day: 'Car', shift: '09:00-17:00' }, { day: 'Per', shift: '09:00-17:00' }, { day: 'Cum', shift: '09:00-17:00' }, { day: 'Cmt', shift: null }, { day: 'Paz', shift: null }] },
  { id: '8', name: 'Ayse Sahin', role: 'Marketing Uzmani', department: 'Marketing', site: 'Mega Win', status: 'inactive', email: 'ayse@cms.com', phone: '+90 540 XXX XX XX', startDate: '2022-09-01', performance: 82, shiftsThisMonth: 0, lp: 720, speed: 78, accuracy: 85, ggr: 34000, ngr: 24000, salary: 30000, advance: 0, deptRank: 35, siteRank: 12, globalRank: 412, weeklySchedule: [{ day: 'Pzt', shift: '10:00-18:00' }, { day: 'Sal', shift: '10:00-18:00' }, { day: 'Car', shift: '10:00-18:00' }, { day: 'Per', shift: '10:00-18:00' }, { day: 'Cum', shift: '10:00-18:00' }, { day: 'Cmt', shift: null }, { day: 'Paz', shift: null }] },
]

const mockStats = {
  totalEmployees: 847,
  activeNow: 234,
  onLeave: 45,
  newThisMonth: 12,
}

// Rating Criteria by Department
type RatingCriteria = {
  id: string
  name: string
  description: string
  category: 'department' | 'general'
}

const departmentCriteria: Record<string, RatingCriteria[]> = {
  'Risk': [
    { id: 'risk-1', name: 'Supheli Islem Tespit Yetenegi', description: 'Supheli islemleri dogru tespit etme basarisi', category: 'department' },
    { id: 'risk-2', name: 'Yanlis Pozitif Orani', description: 'Gereksiz bloklama orani (dusuk = iyi)', category: 'department' },
    { id: 'risk-3', name: 'Islem Kontrol Verimi', description: 'Mesai toplam islem kontrol adedi ve ortalama sure', category: 'department' },
    { id: 'risk-4', name: 'Risk Vaka Raporlama', description: 'Zamaninda raporlanan risk vakalari', category: 'department' },
    { id: 'risk-5', name: 'Grup Islem Donus Suresi', description: 'Grup islemlerine yanit verme hizi', category: 'department' },
    { id: 'risk-6', name: 'Bonus Cekim Limit Dogrulugu', description: 'Uye cekim islemlerinde bonus max limit kontrolu', category: 'department' },
    { id: 'risk-7', name: 'Sistem Bonus Kurallari Uyumu', description: 'Log, not, gerekce girislerinde uyum', category: 'department' },
    { id: 'risk-8', name: 'Zarar Azaltma Basarisi', description: 'Risk sonrasi zarar minimize etme yetenegi', category: 'department' },
  ],
  'Call Center': [
    { id: 'call-1', name: 'Ilk Cagri Cozum Orani', description: 'Ilk cagri da sorunu cozme basarisi', category: 'department' },
    { id: 'call-2', name: 'Gunluk Total Cagri Sayisi', description: 'Gun icerisinde alinan toplam cagri adedi', category: 'department' },
    { id: 'call-3', name: 'Cagri Kalitesi', description: 'Diksiyon, iletisim kalitesi ve profesyonellik', category: 'department' },
    { id: 'call-4', name: 'Ortalama Konusma Suresi', description: 'Cagri basina ortalama gorusme suresi', category: 'department' },
    { id: 'call-5', name: 'Gorev Baslama/Bitis Disiplini', description: 'Vardiyaya zamaninda baslama ve bitirme', category: 'department' },
    { id: 'call-6', name: 'Cagri/Yatirim Orani', description: 'Cagri sayisina karsilik yatirim donusum orani', category: 'department' },
    { id: 'call-7', name: 'Cagri Notlari Eksiksizligi', description: 'Her cagri sonrasi not ve kayit birakma', category: 'department' },
    { id: 'call-8', name: 'Cagri Reddetme/Kacirma Orani', description: 'Karsilanamiyan veya reddedilen cagri orani', category: 'department' },
    { id: 'call-9', name: 'Yonetici Geri Bildirim Puani', description: 'Yoneticiden alinan degerlendirme puani', category: 'department' },
    { id: 'call-10', name: 'Vardiya Ici Aktiflik Suresi', description: 'Mesai icerisinde aktif calisma suresi', category: 'department' },
  ],
  'Bonus': [
    { id: 'bonus-1', name: 'Bonus Talebi Sonuclandirma Suresi', description: 'Talep alindiktan sonra islem tamamlama hizi', category: 'department' },
    { id: 'bonus-2', name: 'Hatali Bonus Verme Orani', description: 'Yanlis veya hatali verilen bonus orani', category: 'department' },
    { id: 'bonus-3', name: 'Bonus Suistimali Yakalama Orani', description: 'Suistimal girisimlerini tespit etme basarisi', category: 'department' },
    { id: 'bonus-4', name: 'Bonus Iptal Orani', description: 'Iptal edilen bonus islem orani', category: 'department' },
    { id: 'bonus-5', name: 'Bonus Sistemindeki Kreatiflik', description: 'Yeni bonus stratejileri onerme ve uygulama', category: 'department' },
    { id: 'bonus-6', name: 'Tekrar Eden Hatali Islemler', description: 'Ayni hatalarin tekrarlama orani', category: 'department' },
    { id: 'bonus-7', name: 'Genel Bonuslara Hakimiyet', description: 'Tum bonus cesitleri ve kurallarini bilme', category: 'department' },
  ],
  'Canli Destek': [
    { id: 'destek-1', name: 'Ilk Yanit Suresi', description: 'Musteri mesajina ilk yanit verme hizi', category: 'department' },
    { id: 'destek-2', name: 'Ortalama Cozum Suresi', description: 'Sorunun tamamen cozulme suresi', category: 'department' },
    { id: 'destek-3', name: 'Tekrar Destek Alma Orani', description: 'Ayni kullanicidan tekrar destek talebi orani', category: 'department' },
    { id: 'destek-4', name: 'Canli Sohbet Terk Orani', description: 'Musterinin sohbeti terk etme orani', category: 'department' },
    { id: 'destek-5', name: 'Olumlu Geri Bildirim Orani', description: 'Musteriden alinan pozitif degerlendirme', category: 'department' },
    { id: 'destek-6', name: 'Sohbet Basina Mesaj Sayisi', description: 'Verimlilik olcusu - mesaj/cozum orani', category: 'department' },
    { id: 'destek-7', name: 'Mesai Ici Aktiflik Orani', description: 'Cevrimici ve aktif olma suresi', category: 'department' },
    { id: 'destek-8', name: 'Manuel Iletisim Tercihi', description: 'Canned yerine kisisellestirilmis yanitlar', category: 'department' },
    { id: 'destek-9', name: 'Sohbet Kalitesi', description: 'Iletisim uslup ve profesyonellik', category: 'department' },
    { id: 'destek-10', name: 'Imla Kurallarina Uyum', description: 'Yazim ve dilbilgisi kurallarina uyum', category: 'department' },
  ],
  'Finans': [
    { id: 'finans-1', name: 'Cekim Islemleri Anlik Takip', description: 'Cekim taleplerini aninda izleme', category: 'department' },
    { id: 'finans-2', name: 'Finans Gruplarina Donus Suresi', description: 'Ilgili gruplara yanit verme hizi', category: 'department' },
    { id: 'finans-3', name: 'Gruplardaki Iletisim Becerisi', description: 'Grup icinde profesyonel iletisim', category: 'department' },
    { id: 'finans-4', name: 'Sorunlu Islem Cozme Becerisi', description: 'Problemli islemleri cozme yetenegi', category: 'department' },
    { id: 'finans-5', name: 'Gunluk Islem Hacmi Dogrulugu', description: 'Islem kayitlarinin dogru tutulmasi', category: 'department' },
    { id: 'finans-6', name: 'Manuel Duzeltme Ihtiyaci', description: 'Sonradan duzeltme gerektiren islem orani', category: 'department' },
    { id: 'finans-7', name: 'Geciken Finans Islemleri', description: 'Suresi icinde tamamlanamayan islemler', category: 'department' },
    { id: 'finans-8', name: 'Uslup ve Imla Kurallari Uyumu', description: 'Yazismalarda profesyonellik', category: 'department' },
    { id: 'finans-9', name: 'Dis Ekiplerle Iletisim', description: 'Harici taraflarla islem cozme yetenegi', category: 'department' },
    { id: 'finans-10', name: 'Dis Finans Isleyisine Hakimiyet', description: 'Dis odeme sistemleri bilgisi', category: 'department' },
    { id: 'finans-11', name: 'Yetki Disi Islem Denemeleri', description: 'Yetki sinirlarina uyum (dusuk = iyi)', category: 'department' },
    { id: 'finans-12', name: 'Finansal Risk Bildirim Sayisi', description: 'Tespit edilen ve raporlanan riskler', category: 'department' },
  ],
  'Marketing': [],
  'Birim Muduru - Personel Gozunden': [
    { id: 'bm-p-1', name: 'Gorev Dagiliminda Adalet', description: 'Is yukunu ekip arasinda esit ve adil dagitma', category: 'department' },
    { id: 'bm-p-2', name: 'Vardiya Planlamasinda Esitlik', description: 'Mesai ve vardiyalari hakkaniyetle duzenleme', category: 'department' },
    { id: 'bm-p-3', name: 'Personeli Dinleme ve Geri Donus', description: 'Calisanlarin fikirlerini dinleme ve yanitlama', category: 'department' },
    { id: 'bm-p-4', name: 'Baskici Degil Yonlendirici Tutum', description: 'Zorlamak yerine destekleyici ve yonlendirici yaklaşim', category: 'department' },
    { id: 'bm-p-5', name: 'Hatalarda Suclayici Olmama', description: 'Hatalar karsisinda yapici ve cozum odakli yaklasim', category: 'department' },
    { id: 'bm-p-6', name: 'Kriz Aninda Ekibi Koruma', description: 'Zor durumlarda ekibin yaninda durma ve savunma', category: 'department' },
    { id: 'bm-p-7', name: 'Tutarli Davranis', description: 'Gun ve duruma gore degismeyen istikrarli tutum', category: 'department' },
    { id: 'bm-p-8', name: 'Ulasılabilirlik', description: 'Mesai icerisinde erisilebiIir olma ve iletisime aciklik', category: 'department' },
    { id: 'bm-p-9', name: 'Ust Baskiyi Personele Yansitmama', description: 'Yonetim baskisini ekibe aktarmadan yonetme', category: 'department' },
    { id: 'bm-p-10', name: 'Genel Guven Algisi', description: 'Personelin mudure olan genel guven ve saygi duzeyi', category: 'department' },
  ],
  'Birim Muduru - Admin Gozunden': [
    { id: 'bm-a-1', name: 'Sureclere Uyum', description: 'Belirlenen is sureclerine ve prosedürlere uyma', category: 'department' },
    { id: 'bm-a-2', name: 'Yetki Sinirlarini Asmama', description: 'Tanimli yetkilerin disina cikmama', category: 'department' },
    { id: 'bm-a-3', name: 'Sistem Kurallarina Uygunluk', description: 'Teknik ve idari sistem kurallarini uygulama', category: 'department' },
    { id: 'bm-a-4', name: 'Raporlama Disiplinine Uyum', description: 'Raporlari zamaninda ve eksiksiz hazirlama', category: 'department' },
    { id: 'bm-a-5', name: 'Mesai ve Planlama Zamanlamasi', description: 'Mesai planlarini zamaninda ve dogru yapma', category: 'department' },
    { id: 'bm-a-6', name: 'Yetki Ihlali / Bypass Denemesi', description: 'Sistemleri atlatma girisimi yapmama (dusuk = iyi)', category: 'department' },
    { id: 'bm-a-7', name: 'Yonetim Duyurularina Uyum', description: 'Ust yonetim kararlarini eksiksiz uygulama', category: 'department' },
    { id: 'bm-a-8', name: 'Operasyonel Duzenliligi Koruma', description: 'Birimin gunluk isleyisini sorunsuz yonetme', category: 'department' },
    { id: 'bm-a-9', name: 'Sistem Uzerinden Risk Yaratmama', description: 'Kurumsal sistemlerde guvenlik riski olusturmama', category: 'department' },
{ id: 'bm-a-10', name: 'Kurumsal Disiplin Seviyesi', description: 'Genel kurumsal kural ve normlara uyum', category: 'department' },
  ],
  'Genel Mudur - Personel Gozunden': [
    { id: 'gm-p-1', name: 'Kurumda Adalet Algisi', description: 'Genel mudurden hissedilen adalet ve esitlik', category: 'department' },
    { id: 'gm-p-2', name: 'Kayirmacilik Yapmama', description: 'Herkese esit mesafede durma', category: 'department' },
    { id: 'gm-p-3', name: 'Krizlerde Calisani Koruma', description: 'Zor durumlarda personelin yaninda olma', category: 'department' },
    { id: 'gm-p-4', name: 'Guven Veren Durus', description: 'Liderlik ve guven hissi olusturma', category: 'department' },
    { id: 'gm-p-5', name: 'Panik Yaratmama', description: 'Kriz anlarinda sakin ve kontrol kalma', category: 'department' },
    { id: 'gm-p-6', name: 'Calisan Lehine Tavir', description: 'Calisanlarin cikarlarini gozeten yaklasim', category: 'department' },
    { id: 'gm-p-7', name: 'Genel Guven Hissi', description: 'Personelin genel mudure duyduğu guven', category: 'department' },
  ],
  'Genel Mudur - Birim Muduru Gozunden': [
    { id: 'gm-bm-1', name: 'Kararlarin Gercekci Olmasi', description: 'Alinan kararlarin uygulanabilirlik duzeyi', category: 'department' },
    { id: 'gm-bm-2', name: 'Ani Kararlarla Sistemi Bozmama', description: 'Ani degisikliklerle operasyonu aksatmama', category: 'department' },
    { id: 'gm-bm-3', name: 'Birim Gerceklerini Bilme', description: 'Her birimin durumunu ve ihtiyaclarini anlama', category: 'department' },
    { id: 'gm-bm-4', name: 'Talimatlarin Netligi', description: 'Verilen talimat ve yonergelerin acikligi', category: 'department' },
    { id: 'gm-bm-5', name: 'Kriz Yonetim Kalitesi', description: 'Kriz anlarinda etkili yonetim becerisi', category: 'department' },
    { id: 'gm-bm-6', name: 'Ulasılabilirlik', description: 'Gerektiginde iletisime gecebilme kolayligi', category: 'department' },
    { id: 'gm-bm-7', name: 'Mudurleri Ezmeden Yonetme', description: 'Birim mudurlerine saygi gosteren yonetim tarzi', category: 'department' },
  ],
  'Genel Mudur - Admin Gozunden': [
    { id: 'gm-a-1', name: 'Sistem Istikrarini Koruma', description: 'Kurumsal sistemlerin surekliligini saglama', category: 'department' },
    { id: 'gm-a-2', name: 'Gereksiz Risk Almama', description: 'Kurumu tehlikeye atacak risklerden kacinma', category: 'department' },
    { id: 'gm-a-3', name: 'Yetki Sinirlarini Koruma', description: 'Yetki dagilimine ve hiyerarsiye saygi', category: 'department' },
    { id: 'gm-a-4', name: 'Guvenlik Hassasiyeti', description: 'Kurumsal guvenlik konularina onem verme', category: 'department' },
    { id: 'gm-a-5', name: 'Operasyonel Surdurulebilirlik', description: 'Uzun vadeli operasyonel basariyi saglama', category: 'department' },
    { id: 'gm-a-6', name: 'Kurumsal Dengeyi Koruma', description: 'Tum birimler arasi dengeyi gozeten yonetim', category: 'department' },
  ],
  'Admin - Personel Gozunden': [
    { id: 'adm-p-1', name: 'Sistemin Adil Calistigi Algisi', description: 'Sistemlerin herkese esit ve adil uygulandigi hissi', category: 'department' },
    { id: 'adm-p-2', name: 'Keyfi Kisitlama Yapmama', description: 'Mantikli ve tutarli kisitlamalar uygulama', category: 'department' },
    { id: 'adm-p-3', name: 'Yetkileri Kisiye Gore Degistirmeme', description: 'Tum kullanicilara esit yetki politikasi', category: 'department' },
    { id: 'adm-p-4', name: 'Gereksiz Korku Yaratmama', description: 'Calisanlarda gereksiz tedirginlik olusturmama', category: 'department' },
    { id: 'adm-p-5', name: 'Haksiz Ceza Algisi Olusturmama', description: 'Cezalandirma kararlarinda adalet', category: 'department' },
    { id: 'adm-p-6', name: 'Kullaniciyi Zor Durumda Birakmama', description: 'Teknik sorunlarda personeli destekleme', category: 'department' },
    { id: 'adm-p-7', name: 'Genel Guven Algisi', description: 'Personelin admin ekibine duyduğu guven', category: 'department' },
  ],
  'Admin - Birim Muduru Gozunden': [
    { id: 'adm-bm-1', name: 'Operasyonu Gereksiz Kilitlememe', description: 'Is akisini gereksiz yere engellememe', category: 'department' },
    { id: 'adm-bm-2', name: 'Sorunlara Zamaninda Mudahale', description: 'Teknik problemlere hizli cozum uretme', category: 'department' },
    { id: 'adm-bm-3', name: 'Teknik Sorun Cozme Hizi', description: 'Problemlerin cozum suresi', category: 'department' },
    { id: 'adm-bm-4', name: 'Surecleri Karmasiklastirmama', description: 'Basit ve anlasilir sistem kurallari', category: 'department' },
    { id: 'adm-bm-5', name: 'Mudur Yetkilerini Dogru Tanimlama', description: 'Birim mudurlerine uygun yetki seviyesi', category: 'department' },
    { id: 'adm-bm-6', name: 'Degisiklikleri Onceden Bildirme', description: 'Sistem degisikliklerini onceden duyurma', category: 'department' },
    { id: 'adm-bm-7', name: 'Operasyonel Esneklik', description: 'Gerektiginde esnek cozumler sunabilme', category: 'department' },
  ],
  'Admin - Genel Mudur Gozunden': [
    { id: 'adm-gm-1', name: 'Sistem Guvenligi Seviyesi', description: 'Genel sistem guvenlik kalitesi', category: 'department' },
    { id: 'adm-gm-2', name: 'Risk Yonetimi Basarisi', description: 'Potansiyel riskleri onceden tespit ve onleme', category: 'department' },
    { id: 'adm-gm-3', name: 'Kritik Olay Mudahale Kalitesi', description: 'Acil durumlarda etkili mudahale', category: 'department' },
    { id: 'adm-gm-4', name: 'Kurumsal Veri Guvenligi', description: 'Verilerin korunmasi ve gizlilik', category: 'department' },
    { id: 'adm-gm-5', name: 'Uzun Vadeli Sistem Sagligi', description: 'Sistemlerin surdurulebilir sekilde yonetimi', category: 'department' },
    { id: 'adm-gm-6', name: 'Admin Guvenirliligi', description: 'Admin ekibinin genel guvenilirlik duzeyi', category: 'department' },
  ],
}

// General criteria for all departments
const generalCriteria: RatingCriteria[] = [
  { id: 'gen-1', name: 'Mesai Disiplini', description: 'Panel acma saatleri, bilgisayar basinda olma, gec baslama/erken ayrilma', category: 'general' },
  { id: 'gen-2', name: 'Sistem Kullanim Duzeni', description: 'Paneli aktif kullanma, bos acik birakma, gereksiz oturumlar', category: 'general' },
  { id: 'gen-3', name: 'Yetki ve Rol Kurallari', description: 'Yetki disi islem denemeleri, hatali erisim girisimleri', category: 'general' },
  { id: 'gen-4', name: 'Guvenlik Farkindaligi', description: 'IP paylasimi suphesi, guvenlik uyarilarina reaksiyon', category: 'general' },
  { id: 'gen-5', name: 'Ic Iletisim Kalitesi', description: 'Duyurulari okuma orani, geri donus suresi, ihlal sayisi', category: 'general' },
  { id: 'gen-6', name: 'Sureclere Uyum', description: 'Zorunlu aciklama girme (mesai degisikligi vb.)', category: 'general' },
  { id: 'gen-7', name: 'Kriz Davranisi', description: 'Kriz aninda aktiflik, mudahaleye katki', category: 'general' },
  { id: 'gen-8', name: 'Raporlama Disiplini', description: 'Not birakma, aciklama ekleme, uye dogrulama', category: 'general' },
  { id: 'gen-9', name: 'Kurumsal Istikrar', description: 'Performans surekliligi, davranis tutarliligi', category: 'general' },
  { id: 'gen-10', name: 'Yonetim Guven Puani', description: 'Ust yonetim degerlendirmesi, kritik gorevlerde tercih', category: 'general' },
]

// Get all criteria for a department
const getCriteriaForDepartment = (department: string): RatingCriteria[] => {
  const deptCriteria = departmentCriteria[department] || []
  return [...deptCriteria, ...generalCriteria]
}

// Rating Slider Component
function RatingSlider({ 
  value, 
  onChange, 
  criteriaId 
}: { 
  value: number
  onChange: (id: string, value: number) => void
  criteriaId: string 
}) {
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  const getColor = (val: number) => {
    if (val <= 30) return { main: '#ef4444', glow: 'rgba(239, 68, 68, 0.4)', bg: 'rgba(239, 68, 68, 0.15)' }
    if (val <= 60) return { main: '#fbbf24', glow: 'rgba(251, 191, 36, 0.4)', bg: 'rgba(251, 191, 36, 0.15)' }
    return { main: '#10b981', glow: 'rgba(16, 185, 129, 0.4)', bg: 'rgba(16, 185, 129, 0.15)' }
  }

  const colors = getColor(value)

  const handleInteraction = (clientX: number) => {
    if (!sliderRef.current) return
    const rect = sliderRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    onChange(criteriaId, Math.round(percentage))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    handleInteraction(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleInteraction(e.clientX)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    handleInteraction(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      handleInteraction(e.touches[0].clientX)
    }
  }

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false)
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging && sliderRef.current) {
        handleInteraction(e.clientX)
      }
    }
    
    if (isDragging) {
      window.addEventListener('mouseup', handleGlobalMouseUp)
      window.addEventListener('mousemove', handleGlobalMouseMove)
    }
    
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp)
      window.removeEventListener('mousemove', handleGlobalMouseMove)
    }
  }, [isDragging])

  return (
    <div 
      ref={sliderRef}
      className="relative h-10 rounded-xl cursor-pointer select-none overflow-hidden"
      style={{ 
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setIsDragging(false)}
    >
      {/* Background gradient markers */}
      <div className="absolute inset-0 flex">
        <div className="flex-1" style={{ background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.05) 0%, rgba(239, 68, 68, 0.1) 100%)' }} />
        <div className="flex-1" style={{ background: 'linear-gradient(90deg, rgba(251, 191, 36, 0.05) 0%, rgba(251, 191, 36, 0.1) 100%)' }} />
        <div className="flex-1" style={{ background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.05) 0%, rgba(16, 185, 129, 0.15) 100%)' }} />
      </div>

      {/* Filled portion */}
      <motion.div 
        className="absolute top-0 left-0 h-full rounded-l-xl"
        style={{ 
          background: `linear-gradient(90deg, ${colors.bg} 0%, ${colors.main}40 100%)`,
          boxShadow: `inset 0 0 20px ${colors.glow}`,
        }}
        initial={false}
        animate={{ width: `${value}%` }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />

      {/* Glow effect at edge */}
      <motion.div 
        className="absolute top-0 h-full w-1"
        style={{ 
          background: colors.main,
          boxShadow: `0 0 15px 3px ${colors.glow}, 0 0 30px 6px ${colors.glow}`,
        }}
        initial={false}
        animate={{ left: `calc(${value}% - 2px)` }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />

      {/* Thumb */}
      <motion.div 
        className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center"
        style={{ 
          background: colors.main,
          boxShadow: `0 0 20px ${colors.glow}, 0 2px 8px rgba(0,0,0,0.3)`,
          border: '2px solid rgba(255,255,255,0.9)'
        }}
        initial={false}
        animate={{ 
          left: `calc(${value}% - 12px)`,
          scale: isDragging ? 1.2 : 1
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <span className="text-[8px] font-bold text-white">{value}</span>
      </motion.div>

      {/* Scale markers */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 pb-0.5">
        {[0, 25, 50, 75, 100].map(mark => (
          <span 
            key={mark} 
            className="text-[8px] font-medium"
            style={{ color: 'rgba(255,255,255,0.2)' }}
          >
            {mark}
          </span>
        ))}
      </div>
    </div>
  )
}

// Mock report history
const mockReportHistory = [
  { id: '1', date: '2026-01-27', time: '14:32', preview: 'Haftalik performans analizi tamamlandi...', status: 'delivered' },
  { id: '2', date: '2026-01-25', time: '09:15', preview: 'Risk departmani kapasite raporu...', status: 'read' },
  { id: '3', date: '2026-01-22', time: '16:45', preview: 'Yeni personel oneri listesi...', status: 'read' },
  { id: '4', date: '2026-01-20', time: '11:20', preview: 'Aylik hedef guncelleme talebi...', status: 'read' },
]

type UserRole = 'birim_muduru' | 'genel_mudur' | 'personel'

interface PersonnelCenterProps {
  isManager?: boolean
  userRole?: UserRole
}

export function PersonnelCenter({ isManager = true, userRole = 'birim_muduru' }: PersonnelCenterProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState<typeof mockEmployees[0] | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedRankFilter, setSelectedRankFilter] = useState<string | null>(null)
  
  // Brand and Department selection
  const { selectedSite: selectedBrand, setSelectedSite: setSelectedBrand } = useSite()
  const [selectedDepartment, setSelectedDepartment] = useState(departments[0])
  const [isBrandSearchOpen, setIsBrandSearchOpen] = useState(false)
  const [brandSearchQuery, setBrandSearchQuery] = useState("")

  // Briefing System State
  const [showBriefingPanel, setShowBriefingPanel] = useState(false)
  const [briefingText, setBriefingText] = useState('')
  const [isBriefingFocused, setIsBriefingFocused] = useState(false)
  const [briefingScreenshot, setBriefingScreenshot] = useState<string | null>(null)
  const briefingFileInputRef = useRef<HTMLInputElement>(null)

  const handleBriefingScreenshot = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setBriefingScreenshot(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Rating System State
  const [showRatingPanel, setShowRatingPanel] = useState(false)
  const [ratingEmployee, setRatingEmployee] = useState<typeof mockEmployees[0] | null>(null)
  const [ratingScores, setRatingScores] = useState<Record<string, number>>({})
  const [ratingComment, setRatingComment] = useState('')
  const [pendingRatings, setPendingRatings] = useState<typeof mockEmployees>([])

  // Mock: Get employees that need rating (not rated today)
  const employeesToRate = useMemo(() => {
    return mockEmployees.filter(emp => 
      emp.department === selectedDepartment.name && 
      emp.status === 'active'
    )
  }, [selectedDepartment])

  // Rating deadline check (00:00 - 17:00)
  const isWithinRatingWindow = () => {
    const now = new Date()
    const hour = now.getHours()
    return hour < 17 // Before 17:00
  }

  // Calculate system success weight based on role
  const getSystemSuccessWeight = (role: string) => {
    if (role.includes('Genel Mudur')) return 0.70
    if (role.includes('Mudur') || role.includes('Admin') || role.includes('Lider')) return 0.50
    return 0.30 // Personel
  }

  const getRank = (lp: number) => {
    return leagueRanks.find(rank => lp >= rank.minLP) || leagueRanks[leagueRanks.length - 1]
  }

  const filteredEmployees = useMemo(() => {
    let filtered = mockEmployees.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           emp.role.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesDept = emp.department === selectedDepartment.name
      return matchesSearch && matchesDept
    })
    
    if (selectedRankFilter) {
      filtered = filtered.filter(emp => getRank(emp.lp).name === selectedRankFilter)
    }
    
    return filtered.sort((a, b) => b.lp - a.lp)
  }, [searchQuery, selectedDepartment, selectedRankFilter])

  // Top 3 performers for leaderboard
  const topPerformers = useMemo(() => {
    return [...mockEmployees]
      .filter(emp => emp.department === selectedDepartment.name)
      .sort((a, b) => b.lp - a.lp)
      .slice(0, 3)
  }, [selectedDepartment])

  const filteredBrands = useMemo(() => {
    if (!brandSearchQuery.trim()) return brands
    return brands.filter((brand) =>
      brand.name.toLowerCase().includes(brandSearchQuery.toLowerCase())
    )
  }, [brandSearchQuery])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#a855f7'
      case 'onLeave': return '#fbbf24'
      case 'inactive': return '#6b7280'
      default: return '#6b7280'
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <section className="relative min-h-screen" style={{ background: "#000000" }}>
      {/* Company Selector Section */}
      <div className="px-10 pt-8 pb-6" style={{ background: "#000000" }}>
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
                background: "rgba(168, 85, 247, 0.1)",
                border: "1px solid rgba(168, 85, 247, 0.2)",
              }}
              whileHover={{ scale: 1.1, borderColor: "rgba(168, 85, 247, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-4 h-4 text-purple-400" />
            </motion.button>

            <motion.button
              onClick={() => setIsBrandSearchOpen(true)}
              className="relative flex items-center gap-3 px-6 py-3 rounded-full overflow-hidden"
              style={{
                background: "rgba(168, 85, 247, 0.08)",
                border: "1px solid rgba(168, 85, 247, 0.25)",
                backdropFilter: "blur(12px)",
              }}
              whileHover={{ scale: 1.02, borderColor: "rgba(168, 85, 247, 0.5)" }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(168, 85, 247, 0.15), transparent 70%)",
                }}
              />
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "rgba(168, 85, 247, 0.2)" }}
              >
                <Building2 className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-base font-semibold text-white">{selectedBrand.name}</span>
              <Search className="w-4 h-4 text-purple-400/50 ml-2" />
            </motion.button>

            <motion.button
              onClick={() => {
                const currentIndex = brands.findIndex(b => b.id === selectedBrand.id)
                const nextIndex = currentIndex === brands.length - 1 ? 0 : currentIndex + 1
                setSelectedBrand(brands[nextIndex])
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(168, 85, 247, 0.1)",
                border: "1px solid rgba(168, 85, 247, 0.2)",
              }}
              whileHover={{ scale: 1.1, borderColor: "rgba(168, 85, 247, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-4 h-4 text-purple-400" />
            </motion.button>
          </div>
        </div>

        {/* Department Cards - Enhanced with circular progress */}
        <div className="flex items-center justify-center gap-4">
          {departments.map((dept, index) => {
            // Mock active count per department (would come from real data based on selectedBrand)
            const activeCount = Math.floor(Math.random() * 8) + 2
            const totalCount = dept.personnel
            const percentage = (activeCount / totalCount) * 100
            
            return (
              <motion.button
                key={dept.id}
                onClick={() => setSelectedDepartment(dept)}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <motion.div
                  className="relative w-[140px] rounded-2xl overflow-hidden p-4"
                  style={{
                    background: selectedDepartment.id === dept.id 
                      ? "rgba(168, 85, 247, 0.1)" 
                      : "rgba(255, 255, 255, 0.02)",
                    border: selectedDepartment.id === dept.id 
                      ? "1px solid rgba(168, 85, 247, 0.4)" 
                      : "1px solid rgba(255, 255, 255, 0.06)",
                    backdropFilter: "blur(12px)",
                  }}
                  whileHover={{ 
                    scale: 1.03,
                    borderColor: "rgba(168, 85, 247, 0.3)",
                    background: "rgba(168, 85, 247, 0.08)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Department Image */}
                  <div className="relative w-full h-20 rounded-xl overflow-hidden mb-3 bg-neutral-900">
                    <Image
                      src={dept.image || "/placeholder.svg"}
                      alt={dept.name}
                      fill
                      priority
                      loading="eager"
                      sizes="(max-width: 768px) 100px, 140px"
                      className="object-cover"
                      style={{
                        filter: selectedDepartment.id === dept.id ? "brightness(1)" : "brightness(0.7)",
                      }}
                    />
                  </div>

                  {/* Department Name */}
                  <p 
                    className="text-[13px] font-semibold mb-3 transition-colors"
                    style={{ color: selectedDepartment.id === dept.id ? "#e5e5e5" : "#a3a3a3" }}
                  >
                    {dept.name}
                  </p>

                  {/* Stats Row */}
                  <div className="flex items-center justify-between">
                    {/* Circular Progress */}
                    <div className="relative w-12 h-12">
                      <svg className="w-12 h-12 -rotate-90">
                        {/* Background Circle */}
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          fill="none"
                          stroke="rgba(255, 255, 255, 0.08)"
                          strokeWidth="4"
                        />
                        {/* Progress Circle */}
                        <motion.circle
                          cx="24"
                          cy="24"
                          r="20"
                          fill="none"
                          stroke={dept.color}
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeDasharray={`${percentage * 1.256} 125.6`}
                          initial={{ strokeDasharray: "0 125.6" }}
                          animate={{ strokeDasharray: `${percentage * 1.256} 125.6` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </svg>
                      {/* Center Text */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-[14px] font-bold" style={{ color: dept.color }}>{activeCount}</span>
                        <span className="text-[8px]" style={{ color: "#525252" }}>/{totalCount}</span>
                      </div>
                    </div>

                    {/* Active Badge */}
                    <div className="text-right">
                      <span className="text-[10px] font-medium block mb-0.5" style={{ color: "#525252" }}>AKTIF</span>
                      <span className="text-[20px] font-bold" style={{ color: "#e5e5e5" }}>{activeCount}</span>
                    </div>
                  </div>
                </motion.div>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Header with Title */}
      <div className="px-10 pt-6 pb-4" style={{ background: "#000000" }}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <h1 className="text-[32px] font-semibold tracking-tight mb-2" style={{ color: "#e5e5e5" }}>
              Staff & Performance Hub
            </h1>
            <p className="text-[15px] font-normal" style={{ color: "#737373" }}>
              {selectedBrand.name} - {selectedDepartment.name} Birimi
            </p>
          </div>

          {isManager && (
            <div className="flex items-center gap-3">
              {/* Rating Button */}
              <motion.button
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all relative"
                style={{ 
                  background: "rgba(251, 191, 36, 0.1)",
                  border: "1px solid rgba(251, 191, 36, 0.25)",
                  color: "#fbbf24",
                }}
                whileHover={{ 
                  background: "rgba(251, 191, 36, 0.2)",
                  borderColor: "rgba(251, 191, 36, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowRatingPanel(true)}
              >
                <Star size={14} strokeWidth={2} />
                Personel Puanlama
                {employeesToRate.length > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center"
                    style={{ background: "#ef4444", color: "#fff" }}
                  >
                    {employeesToRate.length}
                  </span>
                )}
              </motion.button>

              {/* Briefing Button with Tooltip */}
              <div className="relative group">
                <motion.button
                  className="flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all"
                  style={{ 
                    background: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid rgba(16, 185, 129, 0.25)",
                    color: "#10b981",
                  }}
                  whileHover={{ 
                    background: "rgba(16, 185, 129, 0.2)",
                    borderColor: "rgba(16, 185, 129, 0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowBriefingPanel(true)}
                >
                  <Lock size={14} strokeWidth={2} />
                  Gizli Brifing
                </motion.button>
                
                {/* Tooltip */}
                <div 
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 p-4 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                  style={{ 
                    background: "rgba(5, 5, 5, 0.98)",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)"
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(16, 185, 129, 0.15)" }}
                    >
                      <Lock size={14} className="text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white mb-1">Gizli Sikayet Hatti</p>
                      <p className="text-[11px] leading-relaxed text-neutral-400">
                        Sikayetiniz dogrudan tepe yonetime iletilir ve <span className="text-emerald-400 font-medium">sadece ust yonetim</span> tarafindan okunabilir. Baska hicbir personel bu bilgiye erisemez.
                      </p>
                      <div className="flex items-center gap-1.5 mt-2 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                        <ImageIcon size={10} className="text-amber-400" />
                        <p className="text-[9px] text-amber-400">Ekran goruntusu eklenmesi zorunludur</p>
                      </div>
                    </div>
                  </div>
                  {/* Arrow */}
                  <div 
                    className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 -mt-1.5"
                    style={{ background: "rgba(5, 5, 5, 0.98)", borderRight: "1px solid rgba(16, 185, 129, 0.3)", borderBottom: "1px solid rgba(16, 185, 129, 0.3)" }}
                  />
                </div>
              </div>

              {/* Add Personnel Button */}
              <motion.button
                className="relative z-20 flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all cursor-pointer"
                style={{ 
                  background: "rgba(168, 85, 247, 0.15)",
                  border: "1px solid rgba(168, 85, 247, 0.3)",
                  color: "#a855f7",
                  pointerEvents: "auto",
                }}
                whileHover={{ 
                  background: "rgba(168, 85, 247, 0.25)",
                  borderColor: "rgba(168, 85, 247, 0.5)",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  console.log("[v0] Yeni Personel button clicked")
                  setShowAddModal(true)
                }}
              >
                <Plus size={16} strokeWidth={2} />
                Yeni Personel
              </motion.button>
            </div>
          )}
        </motion.div>

        {/* Leaderboard - Top 3 Podium */}
        {topPerformers.length >= 3 && (
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Crown className="w-5 h-5 text-purple-400" />
              <h2 className="text-[18px] font-semibold" style={{ color: "#d4d4d4" }}>The Arena - Top Performers</h2>
            </div>
            
            <div className="flex items-end justify-center gap-4">
              {/* 2nd Place */}
              <motion.div
                className="relative flex flex-col items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="relative w-32 h-44 rounded-3xl overflow-hidden flex flex-col items-center justify-center"
                  style={{
                    background: "rgba(148, 163, 184, 0.08)",
                    border: "1px solid rgba(148, 163, 184, 0.2)",
                    backdropFilter: "blur(20px)",
                  }}
                  whileHover={{
                    borderColor: "rgba(148, 163, 184, 0.5)",
                    boxShadow: "0 0 40px rgba(148, 163, 184, 0.2)",
                  }}
                >
                  <div className="absolute top-3 left-3 text-[28px] font-bold" style={{ color: "#94a3b8" }}>2</div>
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center text-[16px] font-bold mb-3"
                    style={{ 
                      background: getRank(topPerformers[1].lp).gradient,
                      color: "#fff",
                    }}
                  >
                    {getInitials(topPerformers[1].name)}
                  </div>
                  <p className="text-[13px] font-semibold text-white text-center px-2">{topPerformers[1].name}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-[18px] font-bold" style={{ color: getRank(topPerformers[1].lp).color }}>{topPerformers[1].lp}</span>
                    <span className="text-[11px]" style={{ color: "#737373" }}>LP</span>
                  </div>
                  <div 
                    className="mt-2 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                    style={{ 
                      background: `${getRank(topPerformers[1].lp).color}20`,
                      color: getRank(topPerformers[1].lp).color,
                    }}
                  >
                    {getRank(topPerformers[1].lp).name}
                  </div>
                </motion.div>
              </motion.div>

              {/* 1st Place - Taller */}
              <motion.div
                className="relative flex flex-col items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <motion.div
                  className="relative w-36 h-56 rounded-3xl overflow-hidden flex flex-col items-center justify-center"
                  style={{
                    background: "rgba(168, 85, 247, 0.1)",
                    border: "1px solid rgba(168, 85, 247, 0.3)",
                    backdropFilter: "blur(20px)",
                  }}
                  whileHover={{
                    borderColor: "rgba(168, 85, 247, 0.6)",
                    boxShadow: "0 0 60px rgba(168, 85, 247, 0.3)",
                  }}
                  animate={{
                    boxShadow: [
                      "0 0 30px rgba(168, 85, 247, 0.15)",
                      "0 0 50px rgba(168, 85, 247, 0.25)",
                      "0 0 30px rgba(168, 85, 247, 0.15)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {/* Crown icon */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2">
                    <Crown className="w-6 h-6 text-yellow-500" fill="#f59e0b" />
                  </div>
                  <div className="absolute top-10 left-3 text-[32px] font-bold" style={{ color: "#a855f7" }}>1</div>
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center text-[18px] font-bold mb-3 mt-4"
                    style={{ 
                      background: getRank(topPerformers[0].lp).gradient,
                      color: "#fff",
                      boxShadow: `0 0 30px ${getRank(topPerformers[0].lp).color}50`,
                    }}
                  >
                    {getInitials(topPerformers[0].name)}
                  </div>
                  <p className="text-[14px] font-semibold text-white text-center px-2">{topPerformers[0].name}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-[22px] font-bold" style={{ color: getRank(topPerformers[0].lp).color }}>{topPerformers[0].lp}</span>
                    <span className="text-[12px]" style={{ color: "#737373" }}>LP</span>
                  </div>
                  <div 
                    className="mt-2 px-3 py-1 rounded-full text-[11px] font-semibold"
                    style={{ 
                      background: `${getRank(topPerformers[0].lp).color}25`,
                      color: getRank(topPerformers[0].lp).color,
                    }}
                  >
                    {getRank(topPerformers[0].lp).name}
                  </div>
                </motion.div>
              </motion.div>

              {/* 3rd Place */}
              <motion.div
                className="relative flex flex-col items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <motion.div
                  className="relative w-32 h-40 rounded-3xl overflow-hidden flex flex-col items-center justify-center"
                  style={{
                    background: "rgba(251, 191, 36, 0.06)",
                    border: "1px solid rgba(251, 191, 36, 0.2)",
                    backdropFilter: "blur(20px)",
                  }}
                  whileHover={{
                    borderColor: "rgba(251, 191, 36, 0.5)",
                    boxShadow: "0 0 40px rgba(251, 191, 36, 0.15)",
                  }}
                >
                  <div className="absolute top-3 left-3 text-[28px] font-bold" style={{ color: "#fbbf24" }}>3</div>
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-[14px] font-bold mb-3"
                    style={{ 
                      background: getRank(topPerformers[2].lp).gradient,
                      color: "#fff",
                    }}
                  >
                    {getInitials(topPerformers[2].name)}
                  </div>
                  <p className="text-[12px] font-semibold text-white text-center px-2">{topPerformers[2].name}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="text-[16px] font-bold" style={{ color: getRank(topPerformers[2].lp).color }}>{topPerformers[2].lp}</span>
                    <span className="text-[10px]" style={{ color: "#737373" }}>LP</span>
                  </div>
                  <div 
                    className="mt-2 px-2 py-0.5 rounded-full text-[9px] font-semibold"
                    style={{ 
                      background: `${getRank(topPerformers[2].lp).color}20`,
                      color: getRank(topPerformers[2].lp).color,
                    }}
                  >
                    {getRank(topPerformers[2].lp).name}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Search & Rank Filter */}
        <motion.div
          className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Search */}
          <div 
            className="flex-1 flex items-center gap-3 px-5 py-3.5 rounded-2xl"
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(12px)",
            }}
          >
            <Search size={18} strokeWidth={1.5} style={{ color: "#737373" }} />
            <input
              type="text"
              placeholder={`${selectedDepartment.name} personeli ara...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-[14px] font-medium placeholder:text-neutral-600 outline-none"
              style={{ color: "#e5e5e5" }}
            />
          </div>

          
        </motion.div>
      </div>

      {/* Brand Search Modal */}
      <AnimatePresence>
        {isBrandSearchOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsBrandSearchOpen(false)
                setBrandSearchQuery("")
              }}
            />
            <motion.div
              className="fixed top-1/2 left-1/2 w-full max-w-md rounded-3xl overflow-hidden z-50"
              style={{
                background: "rgba(8, 8, 8, 0.95)",
                border: "1px solid rgba(168, 85, 247, 0.2)",
                backdropFilter: "blur(24px)",
                x: "-50%",
                y: "-50%",
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="p-4 border-b border-purple-500/20">
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-purple-400" />
                  <input
                    type="text"
                    value={brandSearchQuery}
                    onChange={(e) => setBrandSearchQuery(e.target.value)}
                    placeholder="Site ara..."
                    className="flex-1 bg-transparent text-base text-white placeholder-neutral-600 focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setIsBrandSearchOpen(false)
                      setBrandSearchQuery("")
                    }}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-purple-500/10 hover:bg-purple-500/20"
                  >
                    <X className="w-4 h-4 text-purple-400" />
                  </button>
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto py-2">
                {filteredBrands.map((brand, index) => (
                  <motion.button
                    key={brand.id}
                    onClick={() => {
                      setSelectedBrand(brand)
                      setIsBrandSearchOpen(false)
                      setBrandSearchQuery("")
                    }}
                    className="w-full flex items-center gap-4 px-5 py-3 hover:bg-purple-500/10 transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: brand.themeColor }}
                    />
                    <span
                      className="flex-1 text-left text-sm font-medium"
                      style={{ color: selectedBrand.id === brand.id ? "#a855f7" : "#d4d4d4" }}
                    >
                      {brand.name}
                    </span>
                    {selectedBrand.id === brand.id && (
                      <Check className="w-4 h-4 text-purple-400" />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Staff Grid - Glassmorphism Cards */}
      <div className="px-10 pb-12" style={{ background: "#000000" }}>
        {filteredEmployees.length === 0 ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p style={{ color: "#737373" }} className="text-[15px]">
              {selectedDepartment.name} departmaninda personel bulunamadi
            </p>
          </motion.div>
        ) : (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" layout>
            {filteredEmployees.map((employee, index) => {
              const rank = getRank(employee.lp)
              const RankIcon = rank.icon
              
              return (
                <motion.div
                  key={employee.id}
                  className="group relative rounded-3xl cursor-pointer overflow-hidden"
                  style={{
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    backdropFilter: "blur(20px)",
                    opacity: employee.status === 'inactive' ? 0.3 : 1,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: employee.status === 'inactive' ? 0.3 : 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ 
                    borderColor: "rgba(168, 85, 247, 0.4)",
                    boxShadow: "0 0 40px rgba(168, 85, 247, 0.15)",
                  }}
                  onClick={() => setSelectedEmployee(employee)}
                >
                  {/* Shimmer effect on hover */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "linear-gradient(135deg, transparent 30%, rgba(168, 85, 247, 0.08) 50%, transparent 70%)",
                    }}
                  />
                  
                  {/* Active glow for active employees */}
                  {employee.status === 'active' && (
                    <motion.div
                      className="absolute top-3 right-3 w-2 h-2 rounded-full"
                      style={{ background: "#a855f7" }}
                      animate={{
                        boxShadow: [
                          "0 0 5px rgba(168, 85, 247, 0.5)",
                          "0 0 15px rgba(168, 85, 247, 0.8)",
                          "0 0 5px rgba(168, 85, 247, 0.5)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}

                  <div className="p-5">
                    {/* Top section - Avatar & Info */}
                    <div className="flex items-start gap-4 mb-4">
                      <div 
                        className="relative w-14 h-14 rounded-2xl flex items-center justify-center text-[16px] font-bold text-white"
                        style={{ 
                          background: rank.gradient,
                          boxShadow: `0 8px 20px ${rank.color}30`,
                        }}
                      >
                        {getInitials(employee.name)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-[15px] font-semibold mb-1" style={{ color: "#e5e5e5" }}>{employee.name}</h3>
                        <p className="text-[12px]" style={{ color: "#737373" }}>{employee.role}</p>
                      </div>
                    </div>

                    {/* LP & Rank Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div 
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
                          style={{ 
                            background: `${rank.color}15`,
                            border: `1px solid ${rank.color}30`,
                          }}
                        >
                          <RankIcon className="w-3.5 h-3.5" style={{ color: rank.color }} />
                          <span className="text-[11px] font-semibold" style={{ color: rank.color }}>{rank.name}</span>
                        </div>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-[20px] font-bold" style={{ color: rank.color }}>{employee.lp}</span>
                        <span className="text-[11px] font-semibold" style={{ color: "#525252" }}>LP</span>
                      </div>
                    </div>

                    {/* Performance Metrics - Silver progress bars */}
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-medium" style={{ color: "#737373" }}>Speed</span>
                          <span className="text-[11px] font-semibold" style={{ color: "#d4d4d4" }}>{employee.speed}%</span>
                        </div>
                        <div 
                          className="h-1.5 rounded-full overflow-hidden"
                          style={{ background: "rgba(255, 255, 255, 0.05)" }}
                        >
                          <motion.div
                            className="h-full rounded-full"
                            style={{ 
                              background: "linear-gradient(90deg, #94a3b8, #e2e8f0)",
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${employee.speed}%` }}
                            transition={{ delay: index * 0.05 + 0.3, duration: 0.8, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-medium" style={{ color: "#737373" }}>Accuracy</span>
                          <span className="text-[11px] font-semibold" style={{ color: "#d4d4d4" }}>{employee.accuracy}%</span>
                        </div>
                        <div 
                          className="h-1.5 rounded-full overflow-hidden"
                          style={{ background: "rgba(255, 255, 255, 0.05)" }}
                        >
                          <motion.div
                            className="h-full rounded-full"
                            style={{ 
                              background: "linear-gradient(90deg, #94a3b8, #e2e8f0)",
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${employee.accuracy}%` }}
                            transition={{ delay: index * 0.05 + 0.4, duration: 0.8, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </div>

      {/* Hero Section - Employee Detail Modal */}
      <AnimatePresence>
        {selectedEmployee && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEmployee(null)}
            />
            <motion.div
              className="fixed top-1/2 left-1/2 w-full max-w-2xl rounded-3xl overflow-hidden z-50"
              style={{
                background: "rgba(8, 8, 8, 0.95)",
                border: "1px solid rgba(168, 85, 247, 0.2)",
                backdropFilter: "blur(30px)",
                x: "-50%",
                y: "-50%",
              }}
              initial={{ opacity: 0, scale: 0.9, y: "-40%" }}
              animate={{ opacity: 1, scale: 1, y: "-50%" }}
              exit={{ opacity: 0, scale: 0.9, y: "-40%" }}
            >
              {/* Hero Header with Gradient */}
              <div 
                className="relative p-8 pb-16"
                style={{
                  background: `linear-gradient(180deg, ${getRank(selectedEmployee.lp).color}15 0%, transparent 100%)`,
                }}
              >
                <button
                  onClick={() => setSelectedEmployee(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>

                <div className="flex items-center gap-6">
                  <div 
                    className="w-24 h-24 rounded-3xl flex items-center justify-center text-[28px] font-bold text-white"
                    style={{ 
                      background: getRank(selectedEmployee.lp).gradient,
                      boxShadow: `0 20px 40px ${getRank(selectedEmployee.lp).color}40`,
                    }}
                  >
                    {getInitials(selectedEmployee.name)}
                  </div>
                  <div>
                    <h2 className="text-[26px] font-bold text-white mb-1">{selectedEmployee.name}</h2>
                    <p className="text-[15px]" style={{ color: "#a3a3a3" }}>{selectedEmployee.role}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <div 
                        className="flex items-center gap-2 px-4 py-2 rounded-xl"
                        style={{ 
                          background: `${getRank(selectedEmployee.lp).color}20`,
                          border: `1px solid ${getRank(selectedEmployee.lp).color}40`,
                        }}
                      >
                        {(() => {
                          const RankIcon = getRank(selectedEmployee.lp).icon
                          return <RankIcon className="w-4 h-4" style={{ color: getRank(selectedEmployee.lp).color }} />
                        })()}
                        <span className="text-[13px] font-semibold" style={{ color: getRank(selectedEmployee.lp).color }}>
                          {getRank(selectedEmployee.lp).name}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-[24px] font-bold" style={{ color: getRank(selectedEmployee.lp).color }}>{selectedEmployee.lp}</span>
                        <span className="text-[13px]" style={{ color: "#737373" }}>LP</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

{/* Stats Grid */}
                <div className="p-8 pt-0 -mt-8 space-y-5">
                  {/* Salary & Advance Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className="p-5 rounded-2xl"
                      style={{
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                      }}
                    >
                      <p className="text-[11px] font-medium mb-2" style={{ color: "#737373" }}>Maas</p>
                      <p className="text-[24px] font-bold" style={{ color: "#10b981" }}>
                        {selectedEmployee.salary?.toLocaleString('tr-TR')} <span className="text-[14px] font-medium text-neutral-500">TL</span>
                      </p>
                    </div>
                    <div
                      className="p-5 rounded-2xl"
                      style={{
                        background: selectedEmployee.advance && selectedEmployee.advance > 0 ? "rgba(251, 191, 36, 0.05)" : "rgba(255, 255, 255, 0.03)",
                        border: selectedEmployee.advance && selectedEmployee.advance > 0 ? "1px solid rgba(251, 191, 36, 0.2)" : "1px solid rgba(255, 255, 255, 0.06)",
                      }}
                    >
                      <p className="text-[11px] font-medium mb-2" style={{ color: "#737373" }}>Avans Borcu</p>
                      {selectedEmployee.advance && selectedEmployee.advance > 0 ? (
                        <p className="text-[24px] font-bold" style={{ color: "#fbbf24" }}>
                          {selectedEmployee.advance.toLocaleString('tr-TR')} <span className="text-[14px] font-medium text-neutral-500">TL</span>
                        </p>
                      ) : (
                        <p className="text-[14px] font-medium" style={{ color: "#737373" }}>Avans yok</p>
                      )}
                    </div>
                  </div>

                  {/* League Ranking Card */}
                  <div
                    className="p-5 rounded-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${getRank(selectedEmployee.lp).color}08 0%, transparent 100%)`,
                      border: `1px solid ${getRank(selectedEmployee.lp).color}20`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[11px] font-semibold" style={{ color: "#737373" }}>LIG SIRALAMASI</p>
                      <span 
                        className="px-2.5 py-1 rounded-full text-[10px] font-bold"
                        style={{ background: `${getRank(selectedEmployee.lp).color}20`, color: getRank(selectedEmployee.lp).color }}
                      >
                        {getRank(selectedEmployee.lp).name}
                      </span>
                    </div>
                    
                    {/* LP Score */}
                    <div className="flex items-center gap-4 mb-5">
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{ 
                          background: getRank(selectedEmployee.lp).gradient,
                          boxShadow: `0 8px 20px ${getRank(selectedEmployee.lp).color}30`
                        }}
                      >
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2">
                          <span className="text-[28px] font-bold" style={{ color: getRank(selectedEmployee.lp).color }}>{selectedEmployee.lp}</span>
                          <span className="text-[13px]" style={{ color: "#737373" }}>LP</span>
                        </div>
                      </div>
                    </div>

                    {/* Rankings Grid */}
                    <div className="grid grid-cols-3 gap-3">
                      {/* Department Rank */}
                      <div 
                        className="p-3 rounded-xl text-center"
                        style={{ background: "rgba(59, 130, 246, 0.1)", border: "1px solid rgba(59, 130, 246, 0.2)" }}
                      >
                        <p className="text-[9px] font-semibold mb-1" style={{ color: "#737373" }}>DEPARTMAN</p>
                        <p className="text-[22px] font-bold" style={{ color: "#3b82f6" }}>#{selectedEmployee.deptRank}</p>
                        <p className="text-[9px]" style={{ color: "#525252" }}>{selectedEmployee.department}</p>
                      </div>
                      
                      {/* Site Rank */}
                      <div 
                        className="p-3 rounded-xl text-center"
                        style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)" }}
                      >
                        <p className="text-[9px] font-semibold mb-1" style={{ color: "#737373" }}>SITE</p>
                        <p className="text-[22px] font-bold" style={{ color: "#10b981" }}>#{selectedEmployee.siteRank}</p>
                        <p className="text-[9px]" style={{ color: "#525252" }}>{selectedEmployee.site}</p>
                      </div>
                      
                      {/* Global Rank */}
                      <div 
                        className="p-3 rounded-xl text-center"
                        style={{ background: "rgba(168, 85, 247, 0.1)", border: "1px solid rgba(168, 85, 247, 0.2)" }}
                      >
                        <p className="text-[9px] font-semibold mb-1" style={{ color: "#737373" }}>GENEL</p>
                        <p className="text-[22px] font-bold" style={{ color: "#a855f7" }}>#{selectedEmployee.globalRank}</p>
                        <p className="text-[9px]" style={{ color: "#525252" }}>Tum Siteler</p>
                      </div>
                    </div>
                  </div>

                  {/* Evaluation Score */}
                  <div
                    className="p-5 rounded-2xl"
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[11px] font-semibold" style={{ color: "#737373" }}>GENEL DEGERLENDIRME</p>
                      <span className="text-[13px] font-bold" style={{ color: "#e5e5e5" }}>{selectedEmployee.performance}/100</span>
                    </div>
                    <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(255, 255, 255, 0.05)" }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ 
                          background: selectedEmployee.performance >= 90 ? "linear-gradient(90deg, #10b981, #34d399)" :
                                      selectedEmployee.performance >= 70 ? "linear-gradient(90deg, #3b82f6, #60a5fa)" :
                                      "linear-gradient(90deg, #f59e0b, #fbbf24)"
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedEmployee.performance}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-[10px]" style={{ color: "#525252" }}>Dusuk</span>
                      <span className="text-[10px]" style={{ color: "#525252" }}>Mukemmel</span>
                    </div>
                  </div>

                  {/* Weekly Schedule */}
                  <div
                    className="p-5 rounded-2xl"
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                    }}
                  >
                    <p className="text-[11px] font-semibold mb-4" style={{ color: "#737373" }}>HAFTALIK MESAI TAKVIMI</p>
                    <div className="grid grid-cols-7 gap-2">
                      {selectedEmployee.weeklySchedule?.map((day, i) => (
                        <div 
                          key={i}
                          className="text-center p-2 rounded-xl"
                          style={{ 
                            background: day.shift ? "rgba(16, 185, 129, 0.1)" : "rgba(255, 255, 255, 0.02)",
                            border: day.shift ? "1px solid rgba(16, 185, 129, 0.2)" : "1px solid rgba(255, 255, 255, 0.04)"
                          }}
                        >
                          <p className="text-[10px] font-semibold mb-1" style={{ color: day.shift ? "#10b981" : "#525252" }}>
                            {day.day}
                          </p>
                          <p className="text-[9px]" style={{ color: day.shift ? "#a3a3a3" : "#404040" }}>
                            {day.shift || "Izin"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Email */}
                  <div 
                    className="flex items-center gap-3 p-4 rounded-xl"
                    style={{ 
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                    }}
                  >
                    <Mail className="w-4 h-4" style={{ color: "#737373" }} />
                    <span className="text-[13px]" style={{ color: "#d4d4d4" }}>{selectedEmployee.email}</span>
                  </div>
                </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add Employee Modal */}
      <AnimatePresence>
        {showAddModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
            />
            <motion.div
              className="fixed top-1/2 left-1/2 w-full max-w-md rounded-3xl overflow-hidden z-50"
              style={{
                background: "rgba(8, 8, 8, 0.95)",
                border: "1px solid rgba(168, 85, 247, 0.2)",
                backdropFilter: "blur(30px)",
                x: "-50%",
                y: "-50%",
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="p-6 border-b border-purple-500/20">
                <div className="flex items-center justify-between">
                  <h3 className="text-[18px] font-semibold text-white">Yeni Personel Ekle</h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-purple-500/10 hover:bg-purple-500/20"
                  >
                    <X className="w-4 h-4 text-purple-400" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-[12px] font-medium block mb-2" style={{ color: "#737373" }}>Ad Soyad</label>
                  <input 
                    type="text"
                    className="w-full px-4 py-3 rounded-xl text-[14px] font-medium outline-none"
                    style={{ 
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      color: "#e5e5e5",
                    }}
                    placeholder="Personel adi"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-medium block mb-2" style={{ color: "#737373" }}>Pozisyon</label>
                  <input 
                    type="text"
                    className="w-full px-4 py-3 rounded-xl text-[14px] font-medium outline-none"
                    style={{ 
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      color: "#e5e5e5",
                    }}
                    placeholder="Pozisyon"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-medium block mb-2" style={{ color: "#737373" }}>Departman</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl text-[14px] font-medium outline-none appearance-none"
                    style={{ 
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      color: "#e5e5e5",
                    }}
                  >
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.id} style={{ background: "#0a0a0a" }}>{dept.name}</option>
                    ))}
                  </select>
                </div>
                <motion.button
                  className="w-full py-3.5 rounded-xl text-[14px] font-semibold mt-4"
                  style={{ 
                    background: "rgba(168, 85, 247, 0.2)",
                    border: "1px solid rgba(168, 85, 247, 0.4)",
                    color: "#a855f7",
                  }}
                  whileHover={{ 
                    background: "rgba(168, 85, 247, 0.3)",
                    borderColor: "rgba(168, 85, 247, 0.6)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Personel Ekle
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Isolated Briefing System Modal */}
      <AnimatePresence>
        {showBriefingPanel && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/90 backdrop-blur-xl z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBriefingPanel(false)}
            />
            <motion.div
              className="fixed top-1/2 left-1/2 w-full max-w-3xl max-h-[85vh] rounded-3xl overflow-hidden z-50"
              style={{
                background: "rgba(5, 5, 5, 0.98)",
                border: "1px solid rgba(168, 85, 247, 0.15)",
                backdropFilter: "blur(40px)",
                x: "-50%",
                y: "-50%",
              }}
              initial={{ opacity: 0, scale: 0.9, y: "-40%" }}
              animate={{ opacity: 1, scale: 1, y: "-50%" }}
              exit={{ opacity: 0, scale: 0.9, y: "-40%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Privacy Badge Header */}
              <div 
                className="px-8 py-5 border-b"
                style={{ borderColor: "rgba(168, 85, 247, 0.1)" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Apple-style Privacy Badge */}
                    <motion.div
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                      style={{
                        background: "rgba(16, 185, 129, 0.1)",
                        border: "1px solid rgba(16, 185, 129, 0.25)",
                      }}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-[10px] font-bold tracking-wider text-emerald-500">GIZLILIK KORUMASI</span>
                    </motion.div>
                    <div>
                      <h2 className="text-[20px] font-semibold text-white">
                        {userRole === 'genel_mudur' ? 'Master Panel Brifing' : 'Izole Raporlama Sistemi'}
                      </h2>
                      <p className="text-[12px] mt-0.5" style={{ color: "#737373" }}>
                        {userRole === 'genel_mudur' ? 'Genel Mudur Gorunumu' : 'Birim Muduru Gorunumu'}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setShowBriefingPanel(false)}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                    style={{ background: "rgba(255, 255, 255, 0.05)" }}
                    whileHover={{ background: "rgba(255, 255, 255, 0.1)" }}
                  >
                    <X className="w-5 h-5 text-white/60" />
                  </motion.button>
                </div>
              </div>

              <div className="flex h-[calc(85vh-80px)]">
                {/* Left Side - Input Area */}
                <div className="flex-1 p-8 border-r" style={{ borderColor: "rgba(255, 255, 255, 0.05)" }}>
                  {/* Role-specific message */}
                  <motion.div
                    className="mb-6 p-4 rounded-2xl"
                    style={{
                      background: "rgba(168, 85, 247, 0.05)",
                      border: "1px solid rgba(168, 85, 247, 0.15)",
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(168, 85, 247, 0.15)" }}>
                        <Lock className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        {userRole === 'genel_mudur' ? (
                          <>
                            <p className="text-[13px] font-medium text-purple-300 mb-1">Master Panel Izolasyonu</p>
                            <p className="text-[12px] leading-relaxed" style={{ color: "#a3a3a3" }}>
                              Brifinginiz dogrudan Master Panel&apos;e iletilir ve sistemdeki diger tum rollerden 
                              (Birim Muduru dahil) tamamen izoledir.
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-[13px] font-medium text-purple-300 mb-1">Gizli Iletisim Kanali</p>
                            <p className="text-[12px] leading-relaxed" style={{ color: "#a3a3a3" }}>
                              Bu rapor sadece Master Yonetim tarafindan okunabilir. 
                              Diger birim mudurleri veya personel bu icerege erisemez.
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* Secure Input Field */}
                  <div className="mb-4">
                    <label className="text-[12px] font-semibold block mb-2" style={{ color: "#737373" }}>
                      <span className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5" />
                        Brifing Icerigi
                      </span>
                    </label>
                    <motion.div
                      className="relative rounded-2xl overflow-hidden"
                      animate={{
                        boxShadow: isBriefingFocused 
                          ? "0 0 0 2px rgba(168, 85, 247, 0.4), 0 0 40px rgba(168, 85, 247, 0.15)"
                          : "0 0 0 1px rgba(255, 255, 255, 0.08)",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Frosted Glass Effect */}
                      <div 
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: "rgba(255, 255, 255, 0.02)",
                          backdropFilter: "blur(20px)",
                        }}
                      />
                      <textarea
                        value={briefingText}
                        onChange={(e) => setBriefingText(e.target.value)}
                        onFocus={() => setIsBriefingFocused(true)}
                        onBlur={() => setIsBriefingFocused(false)}
                        placeholder="Gizli brifinginizi buraya yazin..."
                        className="relative w-full h-48 px-5 py-4 text-[14px] font-medium outline-none resize-none"
                        style={{
                          background: "transparent",
                          color: "#e5e5e5",
                        }}
                      />
                    </motion.div>
                  </div>

{/* Screenshot Upload Area */}
  <div className="mb-6">
    <p className="text-[11px] font-semibold text-neutral-500 mb-3 tracking-wider flex items-center gap-2">
      <ImageIcon size={12} className="text-amber-400" />
      EKRAN GORUNTUSU (ZORUNLU)
    </p>
    <input 
      type="file" 
      ref={briefingFileInputRef}
      onChange={handleBriefingScreenshot}
      accept="image/*"
      className="hidden"
    />
    {!briefingScreenshot ? (
      <motion.button
        onClick={() => briefingFileInputRef.current?.click()}
        className="w-full p-6 rounded-xl flex flex-col items-center justify-center gap-3 transition-all"
        style={{ 
          background: "rgba(251, 191, 36, 0.05)",
          border: "2px dashed rgba(251, 191, 36, 0.3)"
        }}
        whileHover={{ 
          background: "rgba(251, 191, 36, 0.1)",
          borderColor: "rgba(251, 191, 36, 0.5)"
        }}
      >
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(251, 191, 36, 0.15)" }}
        >
          <Upload className="w-5 h-5 text-amber-400" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-amber-400">Ekran goruntusu yukleyin</p>
          <p className="text-[10px] text-neutral-500 mt-1">PNG, JPG veya GIF - max 5MB</p>
        </div>
      </motion.button>
    ) : (
      <div 
        className="relative rounded-xl overflow-hidden"
        style={{ border: "1px solid rgba(16, 185, 129, 0.3)" }}
      >
        <img 
          src={briefingScreenshot || "/placeholder.svg"} 
          alt="Screenshot" 
          className="w-full h-40 object-cover"
        />
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3"
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500" />
              <span className="text-[11px] font-medium text-emerald-400">Goruntu yuklendi</span>
            </div>
            <button
              onClick={() => setBriefingScreenshot(null)}
              className="px-3 py-1.5 rounded-lg text-[10px] font-semibold text-red-400 transition-colors"
              style={{ background: "rgba(239, 68, 68, 0.2)" }}
            >
              Kaldir
            </button>
          </div>
        </div>
      </div>
    )}
  </div>

  {/* Character count and encryption indicator */}
  <div className="flex items-center justify-between mb-6">
  <div className="flex items-center gap-2">
  <motion.div
  className="w-2 h-2 rounded-full"
  style={{ background: "#10b981" }}
  animate={{
  scale: [1, 1.2, 1],
  opacity: [1, 0.7, 1],
  }}
  transition={{ duration: 2, repeat: Infinity }}
  />
  <span className="text-[11px] font-medium text-emerald-500">
  End-to-End Encrypted
  </span>
  </div>
  <span className="text-[11px]" style={{ color: "#525252" }}>
  {briefingText.length} / 2000
                    </span>
                  </div>

                  {/* Send Button */}
                  <motion.button
                    className="w-full py-4 rounded-2xl text-[14px] font-semibold flex items-center justify-center gap-2"
                    style={{
                      background: briefingText.length > 0 
                        ? "linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(139, 92, 246, 0.3))"
                        : "rgba(255, 255, 255, 0.03)",
border: (briefingText.length > 0 && briefingScreenshot)
  ? "1px solid rgba(168, 85, 247, 0.5)"
  : "1px solid rgba(255, 255, 255, 0.08)",
  color: (briefingText.length > 0 && briefingScreenshot) ? "#a855f7" : "#525252",
  }}
  whileHover={(briefingText.length > 0 && briefingScreenshot) ? {
  background: "linear-gradient(135deg, rgba(168, 85, 247, 0.4), rgba(139, 92, 246, 0.4))",
  borderColor: "rgba(168, 85, 247, 0.7)",
  } : {}}
  whileTap={(briefingText.length > 0 && briefingScreenshot) ? { scale: 0.98 } : {}}
  disabled={briefingText.length === 0 || !briefingScreenshot}
  >
  <Send className="w-4 h-4" />
  Gizli Raporu Gonder
  {!briefingScreenshot && briefingText.length > 0 && (
    <span className="text-[9px] text-amber-400 ml-2">(Ekran goruntusu gerekli)</span>
  )}
  </motion.button>
                </div>

                {/* Right Side - Report History Timeline */}
                <div className="w-80 p-6 overflow-y-auto">
                  <div className="flex items-center gap-2 mb-6">
                    <Clock className="w-4 h-4" style={{ color: "#737373" }} />
                    <h3 className="text-[14px] font-semibold" style={{ color: "#d4d4d4" }}>Rapor Gecmisi</h3>
                  </div>

                  {/* Isolation Notice */}
                  <div 
                    className="mb-6 p-3 rounded-xl flex items-center gap-2"
                    style={{
                      background: "rgba(251, 191, 36, 0.05)",
                      border: "1px solid rgba(251, 191, 36, 0.15)",
                    }}
                  >
                    <EyeOff className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <p className="text-[10px] leading-relaxed" style={{ color: "#a3a3a3" }}>
                      Sadece kendi raporlarinizi gorebilirsiniz
                    </p>
                  </div>

                  {/* Timeline */}
                  <div className="relative">
                    {/* Timeline Line */}
                    <div 
                      className="absolute left-[7px] top-2 bottom-2 w-px"
                      style={{ background: "rgba(168, 85, 247, 0.2)" }}
                    />

                    {/* Reports */}
                    <div className="space-y-4">
                      {mockReportHistory.map((report, index) => (
                        <motion.div
                          key={report.id}
                          className="relative pl-6"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                        >
                          {/* Timeline Dot */}
                          <div 
                            className="absolute left-0 top-1 w-[14px] h-[14px] rounded-full flex items-center justify-center"
                            style={{
                              background: report.status === 'delivered' ? "rgba(168, 85, 247, 0.2)" : "rgba(16, 185, 129, 0.2)",
                              border: `2px solid ${report.status === 'delivered' ? "#a855f7" : "#10b981"}`,
                            }}
                          >
                            {report.status === 'read' && (
                              <Check className="w-2 h-2 text-emerald-500" />
                            )}
                          </div>

                          {/* Report Card */}
                          <motion.div
                            className="p-3 rounded-xl cursor-pointer"
                            style={{
                              background: "rgba(255, 255, 255, 0.02)",
                              border: "1px solid rgba(255, 255, 255, 0.05)",
                            }}
                            whileHover={{
                              background: "rgba(168, 85, 247, 0.05)",
                              borderColor: "rgba(168, 85, 247, 0.2)",
                            }}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[11px] font-medium" style={{ color: "#737373" }}>
                                {report.date}
                              </span>
                              <span className="text-[10px]" style={{ color: "#525252" }}>
                                {report.time}
                              </span>
                            </div>
                            <p className="text-[12px] line-clamp-2" style={{ color: "#a3a3a3" }}>
                              {report.preview}
                            </p>
                            <div className="flex items-center gap-1 mt-2">
                              {report.status === 'read' ? (
                                <>
                                  <Eye className="w-3 h-3 text-emerald-500" />
                                  <span className="text-[10px] text-emerald-500">Okundu</span>
                                </>
                              ) : (
                                <>
                                  <Clock className="w-3 h-3 text-purple-400" />
                                  <span className="text-[10px] text-purple-400">Iletildi</span>
                                </>
                              )}
                            </div>
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Personnel Rating System Modal */}
      <AnimatePresence>
        {showRatingPanel && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/90 backdrop-blur-xl z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRatingPanel(false)}
            />
            <motion.div
              className="fixed top-1/2 left-1/2 w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden z-50"
              style={{
                background: "rgba(5, 5, 5, 0.98)",
                border: "1px solid rgba(251, 191, 36, 0.15)",
                backdropFilter: "blur(40px)",
                x: "-50%",
                y: "-50%",
              }}
              initial={{ opacity: 0, scale: 0.9, y: "-40%" }}
              animate={{ opacity: 1, scale: 1, y: "-50%" }}
              exit={{ opacity: 0, scale: 0.9, y: "-40%" }}
            >
              {/* Header */}
              <div 
                className="p-6 flex items-center justify-between"
                style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(251, 191, 36, 0.15)" }}
                  >
                    <Star className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Personel Puanlama Sistemi</h2>
                    <p className="text-sm text-neutral-500 mt-0.5">
                      Mesai sonrasi degerlendirme - {isWithinRatingWindow() ? 
                        <span className="text-emerald-500">Puanlama zamani aktif (17:00'a kadar)</span> : 
                        <span className="text-red-500">Puanlama zamani kapali</span>
                      }
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowRatingPanel(false)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-400" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
                {!ratingEmployee ? (
                  // Employee Selection List
                  <div className="space-y-6">
                    {/* Info Banner */}
                    <div 
                      className="p-4 rounded-xl flex items-start gap-3"
                      style={{ background: "rgba(251, 191, 36, 0.08)", border: "1px solid rgba(251, 191, 36, 0.2)" }}
                    >
                      <Award className="w-5 h-5 text-amber-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-amber-400">Hiyerarsik Puanlama</p>
                        <p className="text-xs text-neutral-400 mt-1">
                          Birim Muduru + Admin personeli, Birim Muduru + Genel Mudur adminleri, 
                          Tum yoneticiler Genel Muduru puanlar. Ortak puanlamalarda ortalama alinir.
                          Sistem basarisi etkisi: GM %70, Admin/BM %50, Personel %30
                        </p>
                      </div>
                    </div>

                    {/* Employees to Rate */}
                    <div>
                      <p className="text-xs font-semibold text-neutral-500 mb-3 tracking-wider">PUANLANACAK PERSONEL ({employeesToRate.length})</p>
                      <div className="grid grid-cols-2 gap-3">
                        {employeesToRate.map(emp => (
                          <motion.button
                            key={emp.id}
                            onClick={() => {
                              setRatingEmployee(emp)
                              setRatingScores({})
                              setRatingComment('')
                            }}
                            className="p-4 rounded-xl text-left transition-all relative overflow-hidden"
                            style={{ 
                              background: "rgba(255, 255, 255, 0.02)", 
                              border: "1px solid rgba(239, 68, 68, 0.15)" 
                            }}
                            whileHover={{ 
                              background: "rgba(251, 191, 36, 0.05)", 
                              borderColor: "rgba(251, 191, 36, 0.2)" 
                            }}
                          >
                            {/* Not Rated Badge */}
                            <div 
                              className="absolute top-0 right-0 px-2.5 py-1 rounded-bl-lg flex items-center gap-1.5"
                              style={{ background: "rgba(239, 68, 68, 0.15)", borderLeft: "1px solid rgba(239, 68, 68, 0.2)", borderBottom: "1px solid rgba(239, 68, 68, 0.2)" }}
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                              <span className="text-[9px] font-semibold text-red-400">Puanlanmadi</span>
                            </div>

                            <div className="flex items-center gap-3 mt-2">
                              <div 
                                className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
                                style={{ background: "rgba(168, 85, 247, 0.2)", color: "#a855f7" }}
                              >
                                {getInitials(emp.name)}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-white">{emp.name}</p>
                                <p className="text-xs text-neutral-500">{emp.role}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <span 
                                    className="px-2 py-0.5 rounded text-[9px] font-semibold"
                                    style={{ 
                                      background: `${getRank(emp.lp).color}20`, 
                                      color: getRank(emp.lp).color 
                                    }}
                                  >
                                    {getRank(emp.lp).name}
                                  </span>
                                  <span className="text-[10px] text-neutral-600">{emp.lp} LP</span>
                                </div>
                              </div>
                              <ChevronRight className="w-5 h-5 text-neutral-600" />
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Rating Form
                  <div className="space-y-6">
                    {/* Back Button */}
                    <button
                      onClick={() => setRatingEmployee(null)}
                      className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Geri
                    </button>

                    {/* Employee Header */}
                    <div 
                      className="p-5 rounded-2xl flex items-center gap-4"
                      style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.06)" }}
                    >
                      <div 
                        className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold"
                        style={{ background: "rgba(168, 85, 247, 0.2)", color: "#a855f7" }}
                      >
                        {getInitials(ratingEmployee.name)}
                      </div>
                      <div>
                        <p className="text-lg font-bold text-white">{ratingEmployee.name}</p>
                        <p className="text-sm text-neutral-500">{ratingEmployee.role} - {ratingEmployee.department}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span 
                            className="px-2.5 py-1 rounded-full text-[10px] font-bold"
                            style={{ background: `${getRank(ratingEmployee.lp).color}20`, color: getRank(ratingEmployee.lp).color }}
                          >
                            {getRank(ratingEmployee.lp).name} - {ratingEmployee.lp} LP
                          </span>
                          <span className="text-[11px] text-neutral-500">
                            Sistem basarisi etkisi: %{getSystemSuccessWeight(ratingEmployee.role) * 100}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Rating Criteria - Department Specific + General */}
                    <div className="space-y-6">
                      {/* Department Specific Criteria */}
                      {departmentCriteria[ratingEmployee.department]?.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-neutral-500 mb-3 tracking-wider flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ background: "#3b82f6" }} />
                            DEPARTMAN KRITERLERI ({ratingEmployee.department.toUpperCase()})
                          </p>
                          <div className="space-y-4">
                            {departmentCriteria[ratingEmployee.department].map((criteria) => (
                              <div key={criteria.id} className="space-y-3">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1">
                                    <span className="text-sm text-neutral-300">{criteria.name}</span>
                                    <p className="text-[10px] text-neutral-600 mt-0.5">{criteria.description}</p>
                                  </div>
                                  <span 
                                    className="text-lg font-bold tabular-nums"
                                    style={{ 
                                      color: (ratingScores[criteria.id] || 0) <= 30 ? "#ef4444" : 
                                             (ratingScores[criteria.id] || 0) <= 60 ? "#fbbf24" : "#10b981"
                                    }}
                                  >
                                    {ratingScores[criteria.id] || 0}
                                  </span>
                                </div>
                                <RatingSlider 
                                  value={ratingScores[criteria.id] || 0}
                                  onChange={(id, val) => setRatingScores(prev => ({ ...prev, [id]: val }))}
                                  criteriaId={criteria.id}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* General Criteria */}
                      <div>
                        <p className="text-xs font-semibold text-neutral-500 mb-3 tracking-wider flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full" style={{ background: "#a855f7" }} />
                          GENEL KRITERLER
                        </p>
                        <div className="space-y-4">
                          {generalCriteria.map((criteria) => (
                            <div key={criteria.id} className="space-y-3">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <span className="text-sm text-neutral-300">{criteria.name}</span>
                                  <p className="text-[10px] text-neutral-600 mt-0.5">{criteria.description}</p>
                                </div>
                                <span 
                                  className="text-lg font-bold tabular-nums"
                                  style={{ 
                                    color: (ratingScores[criteria.id] || 0) <= 30 ? "#ef4444" : 
                                           (ratingScores[criteria.id] || 0) <= 60 ? "#fbbf24" : "#10b981"
                                  }}
                                >
                                  {ratingScores[criteria.id] || 0}
                                </span>
                              </div>
                              <RatingSlider 
                                value={ratingScores[criteria.id] || 0}
                                onChange={(id, val) => setRatingScores(prev => ({ ...prev, [id]: val }))}
                                criteriaId={criteria.id}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Comment Section */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-semibold text-neutral-500 tracking-wider">DEGERLENDIRME YORUMU</label>
                        <span 
                          className="text-xs"
                          style={{ color: ratingComment.length >= 300 ? "#10b981" : "#ef4444" }}
                        >
                          {ratingComment.length}/300 karakter (min. 300)
                        </span>
                      </div>
                      <textarea
                        value={ratingComment}
                        onChange={(e) => setRatingComment(e.target.value)}
                        placeholder="Personel hakkinda detayli degerlendirmenizi yazin... (minimum 300 karakter)"
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-neutral-600 outline-none resize-none"
                        style={{ 
                          background: "rgba(255, 255, 255, 0.03)", 
                          border: `1px solid ${ratingComment.length >= 300 ? "rgba(16, 185, 129, 0.3)" : "rgba(255, 255, 255, 0.08)"}` 
                        }}
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      onClick={() => {
                        // Calculate average score
                        const scores = Object.values(ratingScores)
                        const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0
                        console.log('[v0] Rating submitted:', { employee: ratingEmployee.name, avgScore, comment: ratingComment })
                        setRatingEmployee(null)
                        setRatingScores({})
                        setRatingComment('')
                      }}
                      disabled={ratingComment.length < 300 || Object.keys(ratingScores).length < getCriteriaForDepartment(ratingEmployee.department).length}
                      className="w-full py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ 
                        background: "rgba(251, 191, 36, 0.15)", 
                        border: "1px solid rgba(251, 191, 36, 0.4)", 
                        color: "#fbbf24" 
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <Send className="w-4 h-4" />
                      Degerlendirmeyi Gonder
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
