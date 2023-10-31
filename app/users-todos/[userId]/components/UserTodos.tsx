type Props = {
  promise: Promise<Todo[]>
}

export default async function UserTodos({ promise }: Props) {
  const todos = await promise

  const content = todos.map(todo => {
      return (
          <article key={todo.id}>
              <h2>{todo.title}</h2>
              <br />
          </article>
      )
  })

  return content
}