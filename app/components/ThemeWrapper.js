'use client'
import { useTheme } from '@/contexts/themeContext'
import React from 'react'

export default function ThemeWrapper({ children }) {
  const { theme, setTheme } = useTheme()
  return <main class={theme}>{children}</main>
}
