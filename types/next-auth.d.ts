import NextAuth, { DefaultSession } from 'next-auth'

// types/next-auth.d.ts

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as
   * a prop on the `SessionProvider` React Context
   */
  interface Session {
    myJwt: string
    user: DefaultSession['user']
  }
}
