import TodosController from '#controllers/todos_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head, Link } from '@inertiajs/react'

type Props = InferPageProps<TodosController, 'index'>

export default function ListTodos({ todos }: Props) {
  return (
    <>
      <Head title="todos" />
      <div>
        <h1>Todo List</h1>
        <Link as="button" href="/todos/create">
          Add Todo
        </Link>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.title}

              <br />
              <Link href={`/todos/${todo.id}`}>Ver detalhes</Link>

              <br />
              <Link href={`/todos/${todo.id}/edit`}>Editar </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
