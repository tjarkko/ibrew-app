import { NextRequestWithAuth, withAuth } from 'next-auth/middleware'
import { DomainLocale } from 'next/dist/server/config'
import { NextURL } from 'next/dist/server/web/next-url'
import { INTERNALS } from 'next/dist/server/web/spec-extension/request'
import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'

const authMiddleware = withAuth({ pages: { signIn: '/login' } })

export function middleware(
  request: NextRequestWithAuth,
  _next: NextFetchEvent
) {
  const nextUrl: NextURL & any = {
    analyze: () => {
      return
    },

    formatPathname: (value: string) => {
      return ''
    },

    formatSearch: (value: string) => {
      return ''
    },
    get buildId(): string | undefined {
      return request.nextUrl.buildId
    },

    set buildId(buildId: string | undefined) {
      request.nextUrl.buildId = buildId
    },

    get locale(): string {
      return request.nextUrl.locale
    },

    set locale(locale: string) {
      request.nextUrl.locale = locale
    },

    get defaultLocale(): string | undefined {
      return request.nextUrl.defaultLocale
    },

    get domainLocale(): DomainLocale | undefined {
      return request.nextUrl.domainLocale
    },

    get searchParams(): URLSearchParams {
      return request.nextUrl.searchParams
    },

    get host(): string {
      return request.nextUrl.host
    },

    set host(value: string) {
      request.nextUrl.host = value
    },

    get hostname(): string {
      return request.nextUrl.hostname
    },

    set hostname(value: string) {
      request.nextUrl.hostname = value
    },

    get port(): string {
      return request.nextUrl.port
    },

    set port(value: string) {
      request.nextUrl.port = value
    },

    get protocol(): string {
      return request.nextUrl.protocol
    },

    set protocol(value: string) {
      request.nextUrl.protocol = value
    },

    get href(): string {
      return request.nextUrl.href
    },

    set href(url: string) {
      request.nextUrl.href = url
    },

    get origin(): string {
      //const url = request.nextUrl.protocol + '//' + request.headers.get('host')
      //+ request.nextUrl.port
      //+ request.nextUrl.pathname
      const url = process.env.NEXTAUTH_URL
      return url || request.nextUrl.origin
    },

    get pathname(): string {
      return request.nextUrl.pathname
    },

    set pathname(value: string) {
      request.nextUrl.pathname = value
    },

    get hash(): string {
      return request.nextUrl.hash
    },

    set hash(value: string) {
      request.nextUrl.hash = value
    },

    get search(): string {
      return request.nextUrl.search
    },

    set search(value: string) {
      request.nextUrl.search = value
    },

    get password(): string {
      return request.nextUrl.password
    },

    set password(value: string) {
      request.nextUrl.password = value
    },

    get username(): string {
      return request.nextUrl.username
    },

    set username(value: string) {
      request.nextUrl.username = value
    },

    get basePath(): string {
      return request.nextUrl.basePath
    },

    set basePath(value: string) {
      request.nextUrl.basePath = value
    },

    toString(): string {
      return request.nextUrl.toString()
    },

    toJSON(): string {
      return request.nextUrl.toJSON()
    },

    clone(): NextURL {
      return request.nextUrl.clone()
    },
    ['Internal']: undefined,
  }

  const req: NextRequestWithAuth = {
    ...request,
    [INTERNALS]: {
      cookies: request.cookies,
      geo: request.geo,
      ip: request.ip,
      url: request.url,
      nextUrl: request.nextUrl,
    },
    get cookies() {
      return this[INTERNALS].cookies
    },
    get geo() {
      return this[INTERNALS].geo
    },
    get ip() {
      return this[INTERNALS].ip
    },
    get nextUrl() {
      return nextUrl
    },
    get page() {
      return
    },
    get ua() {
      return
    },
    get url() {
      return this[INTERNALS].url
    },
  }

  return authMiddleware(req, _next)
}

export const config = {
  matcher: ['/((?!login).*)'],
}
