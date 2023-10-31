import getUser from "@/lib/getUser"
import getUserTodos from "@/lib/getUserTodos"
import getAllUsers from "@/lib/getAllUsers"
import { Suspense } from "react"
import UserTodos from "./components/UserTodos"
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Params = {
    params: {
        userId: string
    }
}

export async function generateMetadata({ params: { userId } }: Params): Promise<Metadata> {
    const userData: Promise<User> = getUser(userId)
    const user: User = await userData

    if (!user.name) {
        return {
            title: "User Not Found"
        }
    }
    return {
        title: user.name,
        description: `This is the page of ${user.name}`
    }

}

export default async function UserPage({ params: { userId } }: Params) {
    const userData: Promise<User> = getUser(userId)
    const userTodosData: Promise<Todo[]> = getUserTodos(userId)

    // If not progressively rendering with Suspense, use Promise.all
    //const [user, userPosts] = await Promise.all([userData, userTodosData])

    const user = await userData

    if (!user.name) notFound()

    return (
        <>
            <h2>{user.name}</h2>
            <h2>Todos</h2>
            <br />
            <Suspense fallback={<h2>Loading...</h2>}>
                <UserTodos promise={userTodosData} />
            </Suspense>
        </>
    )
}

export async function generateStaticParams() {
    const usersData: Promise<User[]> = getAllUsers()
    const users = await usersData
    return users.map(user => ({
        userId: user.id.toString()
    }))
}