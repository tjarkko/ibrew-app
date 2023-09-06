import { NextRequestWithAuth, withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'

const authMiddleware = withAuth({ pages: { signIn: '/login' } })

export function middleware(
  request: NextRequestWithAuth,
  _next: NextFetchEvent
) {
  console.log(`middleware, path: ${request.nextUrl.pathname}`)
  console.log('request:')
  console.log(request)
  const req = {
    ...request,
    nextUrl: { ...request.nextUrl, origin: request.headers.get('host') },
  }
  console.log('req:')
  console.log(request)
  /*if (request.nextUrl.pathname.startsWith('/dashboard')) {
    console.log('redirect to login')
    return NextResponse.redirect(new URL('/login', request.url))
  }*/
  return authMiddleware(request, _next)
}

/*export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log('this is from middleware')
    console.log(req.nextauth.token)
    console.log(`origin: ${req.nextUrl.origin}`)
    console.log(JSON.stringify(req))
    console.log(req)
  },
  {
    pages: { signIn: '/login' },
  }
)*/

export const config = {
  matcher: ['/((?!login).*)'],
}
