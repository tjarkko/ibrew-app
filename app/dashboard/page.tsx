'use client'

import React from 'react'
import { useSession } from 'next-auth/react'

export default function Dashboard() {
  const { data: session, status } = useSession()
  console.log({ session })
  return <div>Dashboard page</div>
}
