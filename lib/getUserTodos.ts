export default async function getUserTodos(userId: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`, { next: { revalidate: 60 } })

  if (!res.ok) return undefined

  return res.json()
}
