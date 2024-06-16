import TodosController from '#controllers/todos_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head, useForm } from '@inertiajs/react'
import { DateTime } from 'luxon'
import { FormEvent } from 'react'
import { z } from 'zod'

type Props = InferPageProps<TodosController, 'edit'>

const schema = z.object({
  title: z.string(),
  dueDate: z.string(),
})

type FormSchema = z.infer<typeof schema>

export default function EditTodo({ todo }: Props) {
  const { processing, data, setData, put } = useForm<FormSchema>({
    dueDate: DateTime.fromISO(todo.dueDate).toFormat('yyyy-MM-dd'),
    title: todo.title,
  })

  function handleSave({ preventDefault }: FormEvent<HTMLFormElement>) {
    preventDefault()

    const payload = schema.safeParse(data)

    if (!payload.success) {
      alert(`Erro no formulário ${payload.error.issues[0].message}`)
      return
    }

    put(`/todos/${todo.id}`, {
      preserveScroll: true,
      onSuccess: () => alert('Todo updated successfully'),
      onError: () => alert('Error updating todo'),
      data: payload.data,
    })
  }

  return (
    <>
      <Head title="Edit Todo" />
      <div>
        <h1>Edit Todo</h1>
        <form onSubmit={handleSave}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              onChange={(e) => setData('title', e.target.value)}
              value={data.title}
              type="text"
              id="title"
              name="title"
            />
          </div>

          <br />

          <div>
            <label htmlFor="dueDate">Due Date</label>
            <input
              onChange={(e) => setData('dueDate', e.target.value)}
              value={data.dueDate}
              type="date"
              id="dueDate"
              name="dueDate"
            />
          </div>

          <button disabled={processing} type="submit">
            Edit Todo
          </button>
        </form>
      </div>
    </>
  )
}
