// This is an example of how to read a JSON Web Token from an API route
import { getServerSession } from 'next-auth'
import { getToken } from 'next-auth/jwt'

import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET(req: NextRequest) {
  //console.log('request', req)
  //console.log(JSON.stringify(req))
  //console.log(req.headers)
  // If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`
  const token = await getToken({ req })
  const session = await getServerSession(authOptions)
  if (token) {
    // Signed in
    //console.log('JSON Web Token', JSON.stringify(token, null, 2))
    console.log('Session', JSON.stringify(session, null, 2))
  } else {
    // Not Signed in
    return new Response(null, {
      status: 401,
      statusText: 'Unauthorized',
    })
  }
  return NextResponse.json({ token: JSON.stringify(token, null, 2) })
}
