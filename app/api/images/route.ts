// This is an example of how to read a JSON Web Token from an API route
import { getServerSession } from 'next-auth'
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware'
import { getToken } from 'next-auth/jwt'

import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET(req: NextRequestWithAuth) {
  //console.log(req.headers)
  const token = await getToken({ req })
  if (!token) {
    // Not Signed in
    console.log('Not Signed in')
    return new Response(null, {
      status: 401,
      statusText: 'Unauthorized',
    })
  }

  /*console.log(
    `api route: next auth token: ${JSON.stringify(req.nextauth.token)}`
  )*/

  const session = await getServerSession(authOptions)
  const myJwt = session?.myJwt ?? ''
  console.log({ myJwt })

  const testJwt =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Imphcmtrb3R1b3JpbGEiLCJzdWIiOiJqYXJra290dW9yaWxhIiwianRpIjoiNTQ2NzdiZmMiLCJhdWQiOlsiaHR0cDovL2xvY2FsaG9zdDo2MjAyNCIsImh0dHBzOi8vbG9jYWxob3N0OjQ0MzE1IiwiaHR0cDovL2xvY2FsaG9zdDo1MDY4IiwiaHR0cHM6Ly9sb2NhbGhvc3Q6NzEyOCJdLCJuYmYiOjE2OTQ1OTAyNTMsImV4cCI6MTcwMjQ1MjY1MywiaWF0IjoxNjk0NTkwMjU0LCJpc3MiOiJkb3RuZXQtdXNlci1qd3RzIn0.UYFhcnbGDWhZDbWmS3HAdjuTrEH9ikB_2nuV9FluSX8'

  const response = await fetch('http://localhost:5068/weatherforecast', {
    headers: {
      Authorization: `Bearer ${myJwt}`,
    },
  })
  if (response.status !== 200) {
    return new Response(null, {
      status: response.status,
    })
  }

  const images = await response.json()

  return NextResponse.json({ images })
}
