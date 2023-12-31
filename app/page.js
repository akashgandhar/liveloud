'use client'
import { useTheme } from '@/contexts/themeContext'
import Image from 'next/image'
import { useContext } from 'react'

export default function Home() {
  const { theme, setTheme } = useTheme()
  return (
    <div
      className={
        'flex min-h-screen flex-col dark:bg-black items-center justify-between p-24'
      }
    >
      dfghj
    </div>
  )
}
