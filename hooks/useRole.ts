'use client'
import { useEffect } from 'react'

export function useRole(role: string) {
  useEffect(() => {
    localStorage.setItem('cuestage_role', role)
  }, [role])
}
