import getUser from "@/lib/getUser"
import getUserAlbums from "@/lib/getUserAlbums"
import getAllUsers from "@/lib/getAllUsers"
import { Suspense } from "react"
import UserAlbums from "./components/UserAlbums"
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
    const userAlbumsData: Promise<Album[]> = getUserAlbums(userId)

    // If not progressively rendering with Suspense, use Promise.all
    //const [user, userPosts] = await Promise.all([userData, userTodosData])

    const user = await userData

    if (!user.name) notFound()

    return (
        <>
            <h2>{user.name}</h2>
            <h2>Albums</h2>
            <br />
            <Suspense fallback={<h2>Loading...</h2>}>
                <UserAlbums promise={userAlbumsData} />
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