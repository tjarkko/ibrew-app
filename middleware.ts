import { withAuth } from 'next-auth/middleware'

//export default withAuth({ pages: { signIn: '/login' } })

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log('this is from middleware')
    console.log(req.nextauth.token)
  },
  {
    pages: { signIn: '/login' },
  }
)

export const config = {
  //matcher: ['/((?!login).*)'],
  matcher: ['/about/:path*', '/dashboard/:path*'],
}
