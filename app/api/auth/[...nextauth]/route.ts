import NextAuth, { AuthOptions, SessionStrategy } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import AzureADProvider from 'next-auth/providers/azure-ad'
import bcrypt from 'bcrypt'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
        email: { label: 'Email', type: 'email' },
      },
      async authorize(credentials) {
        console.log('in authorize')
        console.log({ credentials })
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })
        if (!user) {
          return null
        }
        console.log({ user })
        const isValid =
          user.passwordHash &&
          (await bcrypt.compare(credentials.password, user.passwordHash))
        if (!isValid) {
          console.log('Invalid password')
          return null
        }
        return user
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXT_AUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  pages: { signIn: '/login' },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
