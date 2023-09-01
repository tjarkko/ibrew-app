import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log(`middleware, path: ${request.nextUrl.pathname}`)
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    console.log('redirect to login')
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
