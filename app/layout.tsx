import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Providers, ThemeProvider } from '@/components/providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'CMS Dashboard',
  description: 'CMS Dashboard',
  icons: {
    icon: [
      {
        url: '/resm.jpg',
      },
    ],
    apple: '/resm.jpg',
    shortcut: '/resm.jpg',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className="dark">
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased bg-black text-white`}>
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
