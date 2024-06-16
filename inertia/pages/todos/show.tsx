import TodosController from '#controllers/todos_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/react'

type Props = InferPageProps<TodosController, 'show'>

export default function ShowTodo({ todo }: Props) {
  return (
    <>
      <Head title="show todo" />

      <div>
        <h1>Todo {todo.title}</h1>
        <p>Todo title: {todo.title} </p>
        <p>Due date: {todo.dueDate} </p>
        <p>Completed: {todo.isCompleted} </p>
      </div>
    </>
  )
}
