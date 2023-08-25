//import { withAuth } from 'next-auth/middleware'

//export default withAuth({ pages: { signIn: '/login' } })

/*export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log('this is from middleware')
    console.log(req.nextauth.token)
  },
  {
    pages: { signIn: '/login' },
  }
)*/

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Clone the request headers and set a new header `x-hello-from-middleware1`
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-hello-from-middleware1', 'hello')
  console.log(`middleware, path: ${request.nextUrl.pathname}`)

  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  })

  // Set a new response header `x-hello-from-middleware2`
  response.headers.set('x-hello-from-middleware2', 'hello')
  return response
}

//export const config = { matcher: ['/dashboard'] }
/*export const config = {
  matcher: ['/((?!login).*)'],
}*/
