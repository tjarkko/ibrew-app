'use client'

import React from 'react'
import { useSession } from 'next-auth/react'

export default function Gallery() {
  const { data: session, status } = useSession()
  console.log({ session })
  return (
    <div>
      <h2>{session?.user?.name}&apos;s Gallery</h2>
      <p>Here is image..</p>
    </div>
  )
}
