'use client'
import { useEffect } from 'react'

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
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </>
  )
}
