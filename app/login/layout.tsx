import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Provider from '@/context/Provider'
import { SessionProvider } from 'next-auth/react'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div>{children}</div>
}
