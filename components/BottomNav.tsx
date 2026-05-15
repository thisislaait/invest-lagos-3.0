'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Programme', short: '◈' },
  { href: '/admin',     label: 'Admin',     short: '✦' },
  { href: '/stage',     label: 'Stage',     short: '▤' },
  { href: '/mc',        label: 'MC',        short: '⬡' },
  { href: '/av',        label: 'AV',        short: '▶' },
  { href: '/moderator', label: 'Mod',       short: '◉' },
  { href: '/speaker',   label: 'Speaker',   short: '◎' },
  { href: '/briefing',  label: 'Briefing',  short: '▦' },
  { href: '/checklist', label: 'Checklist', short: '☑' },
  { href: '/',          label: 'Roles',     short: '⌂' },
]

export default function BottomNav() {
  const path = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0d0d0b] border-t border-[#1c1c1a]">
      <div className="flex overflow-x-auto scrollbar-none">
        {NAV_ITEMS.map(item => {
          const isActive = item.href === '/' ? path === '/' : path.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 px-3 py-2 min-w-[4rem] shrink-0 transition-colors ${
                isActive
                  ? 'text-amber-400 bg-[#111100]'
                  : 'text-zinc-600 hover:text-zinc-400'
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
