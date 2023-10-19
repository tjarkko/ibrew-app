export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/((?!login).*)'],
  //matcher: ['/((?!api|login).*)'],
}
