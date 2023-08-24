import React from 'react'
import Link from 'next/link'

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col">
      <Link href="/">Home</Link>
      <Link href="/api/auth/signout">Logout</Link>
      {children}
    </div>
  )
}
