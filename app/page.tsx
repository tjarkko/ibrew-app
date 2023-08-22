import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <div className="flex flex-col gap-4">
        <h1>NextAuth.js</h1>
        <Link href="/register">Register Page</Link>
        <Link href="/login">Login Page</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>
    </main>
  )
}
