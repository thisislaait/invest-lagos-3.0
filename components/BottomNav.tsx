'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const NAV = [
  { href: '/dashboard', label: 'Programme', short: '◈', roles: null },
  { href: '/admin',     label: 'Admin',     short: '✦', roles: ['admin', ''] },
  { href: '/stage',     label: 'Stage',     short: '▤', roles: ['admin', 'stage'] },
  { href: '/mc',        label: 'MC',        short: '⬡', roles: ['admin', 'mc'] },
  { href: '/av',        label: 'AV',        short: '▶', roles: ['admin', 'av'] },
  { href: '/moderator', label: 'Mod',       short: '◉', roles: ['admin', 'moderator'] },
  { href: '/speaker',   label: 'Speaker',   short: '◎', roles: ['admin', 'speaker'] },
  { href: '/briefing',  label: 'Briefing',  short: '▦', roles: ['admin', 'stage', 'mc', 'av', 'moderator', 'briefing', 'checklist'] },
  { href: '/checklist', label: 'Checklist', short: '☑', roles: ['admin', 'stage', 'briefing', 'checklist'] },
  { href: '/roles',     label: 'Roles',     short: '⌂', roles: null },
] as const

export default function BottomNav() {
  const path = usePathname()
  const [role, setRole] = useState('')

  useEffect(() => {
    setRole(localStorage.getItem('cuestage_role') || '')
  }, [])

  const visible = NAV.filter(item =>
    item.roles === null || item.roles.includes(role as never)
  )

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0d0d0b]/95 backdrop-blur border-t border-[#1c1c1a]">
      <div className="flex overflow-x-auto scrollbar-none">
        {visible.map(item => {
          const isActive = path === item.href || (item.href !== '/roles' && path.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 px-3 py-2 min-w-[4rem] shrink-0 transition-colors ${
                isActive ? 'text-amber-400 bg-amber-500/5' : 'text-zinc-600 hover:text-zinc-400'
              }`}
            >
              <span className="text-base leading-none">{item.short}</span>
              <span className="text-[9px] font-mono tracking-wide uppercase leading-none mt-0.5">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
