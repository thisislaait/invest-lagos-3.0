'use client'
import { useEffect } from 'react'
import Link from 'next/link'

const OPS_LINKS = [
  { href: '/admin', label: 'Admin' },
  { href: '/stage', label: 'Stage' },
  { href: '/av', label: 'AV' },
  { href: '/mc', label: 'MC' },
  { href: '/dashboard', label: 'Programme' },
  { href: '/roles', label: 'Roles' },
]

export default function SimulationClient({ bodyHtml, css }: { bodyHtml: string; css: string }) {
  useEffect(() => {
    const links = document.querySelectorAll('.sb-link')
    const scenes = document.querySelectorAll('.scene')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(l => l.classList.remove('active'))
          const match = document.querySelector(`.sb-link[href="#${entry.target.id}"]`)
          if (match) match.classList.add('active')
        }
      })
    }, { threshold: 0.25 })
    scenes.forEach(s => { if (s.id) observer.observe(s) })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <style>{`
        .sim-ops-nav {
          position: fixed;
          top: 12px;
          right: 16px;
          z-index: 200;
          display: flex;
          align-items: center;
          gap: 2px;
          background: rgba(7, 21, 48, 0.92);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(244, 180, 26, 0.2);
          padding: 6px 8px;
        }
        .sim-ops-nav a {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.5rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          padding: 4px 8px;
          transition: color 0.12s, background 0.12s;
          white-space: nowrap;
        }
        .sim-ops-nav a:hover {
          color: #F4B41A;
          background: rgba(244,180,26,0.08);
        }
        .sim-ops-nav .sep {
          width: 1px;
          height: 10px;
          background: rgba(255,255,255,0.1);
          flex-shrink: 0;
        }
        .sim-ops-nav .ops-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.44rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #F4B41A;
          padding: 0 8px 0 4px;
          opacity: 0.7;
        }
      `}</style>
      <nav className="sim-ops-nav">
        <span className="ops-label">Ops ↗</span>
        {OPS_LINKS.map((link, i) => (
          <span key={link.href} style={{ display: 'contents' }}>
            {i > 0 && <span className="sep" />}
            <Link href={link.href}>{link.label}</Link>
          </span>
        ))}
      </nav>
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </>
  )
}
