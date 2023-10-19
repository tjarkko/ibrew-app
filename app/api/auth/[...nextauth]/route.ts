import NextAuth, { AuthOptions, Session, SessionStrategy } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import AzureADProvider from 'next-auth/providers/azure-ad'
import bcrypt from 'bcrypt'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import * as jose from 'jose'
import { JWT } from 'next-auth/jwt'

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
  callbacks: {
    session: async ({
      session,
      token,
    }: {
      session: Session
      token: JWT
    }): Promise<Session> => {
      //session.user.provider = token.provider
      //session.user.id = token.id

      console.log(`token: ${JSON.stringify(token)}`, token)
      const mySecret = Uint8Array.from(
        Buffer.from(process.env.MY_SECRET ?? '', 'base64')
      )

      const jwt = await new jose.SignJWT(token)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('2 hours')
        .sign(mySecret)

      //const jwe = await new jose.EncryptJWT(jwt)
      const jwe = await new jose.CompactEncrypt(new TextEncoder().encode(jwt))
        .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
        //.setExpirationTime('30d')
        //.setIssuedAt()
        //.setSubject('my-subject')
        //.setIssuer('https://example.com')
        //.setAudience('https://example.com/test')
        //.setExpirationTime('1d')
        .encrypt(mySecret)
      session.myJwt = jwe

      console.log(`jwe: ${JSON.stringify(jwe)}`)

      //const decryptedJwt = await jose.jwtDecrypt(jwe, mySecret)
      //console.log(`decryptedJwt: ${JSON.stringify(decryptedJwt)}`)
      const { plaintext, protectedHeader } = await jose.compactDecrypt(
        jwe,
        mySecret
      )

      console.log(protectedHeader)
      console.log(new TextDecoder().decode(plaintext))

      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXT_AUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  pages: { signIn: '/login' },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
