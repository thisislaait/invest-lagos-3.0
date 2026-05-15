import { Bricolage_Grotesque, Manrope, JetBrains_Mono } from 'next/font/google'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-display',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono-landing',
  display: 'swap',
})

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${bricolage.variable} ${manrope.variable} ${mono.variable}`}>
      {children}
    </div>
  )
}
