import type { Metadata } from 'next'
import { Poppins, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://thisislaait.github.io/invest-lagos-3.0'),
  title: 'Invest Lagos 3.0 — Event Control',
  description: 'Lagos State Investment Forum 2026 — Live Event Dashboard',
  openGraph: {
    title: 'Invest Lagos 3.0',
    description: 'Lagos State Investment Forum 2026 — Live Event Dashboard',
    siteName: 'Invest Lagos 3.0',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased bg-[#0a0a08] text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
