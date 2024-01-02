'use client'

import { useAuth } from '@/contexts/auth/context'
import React from 'react'

export default function Page() {
  const { user, logout } = useAuth()

  return (
    <div>
      <h1>Home Page</h1>
      <p>{user?.email}</p>

      
      
    </div>
  )
}
