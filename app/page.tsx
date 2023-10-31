import Link from "next/link"
import { Inter } from 'next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <h1>Home Page</h1>
      <p>
        <Link href="/users-posts">User Posts</Link>
      </p>
      <br />
      <p>
        <Link href="/users-todos">User Todos</Link>
      </p>
      <br />
      <p>
        <Link href="/users-albums">User Albums</Link>
      </p>
    </main>
  )
}
