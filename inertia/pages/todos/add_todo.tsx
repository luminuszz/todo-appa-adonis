import { Head, useForm } from '@inertiajs/react'
import { FormEvent } from 'react'
import { z } from 'zod'

const schema = z.object({
  title: z.string(),
})

type FormSchema = z.infer<typeof schema>

export default function AddTodo() {
  const { setData, data, post } = useForm<FormSchema>({
    title: '',
  })

  async function handleCreateTodo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const results = schema.safeParse(data)

    if (!results.success) {
      alert(`Erro no formulário ${results.error.issues[0].message}`)
      return
    }

    post('/todos', {
      data: results.data,
      onSuccess: () => alert('Todo created successfully'),
      onError: () => alert('Error creating todo'),
    })
  }

  return (
    <>
      <Head title="Add Todo" />
      <div>
        <h1>Add Todo</h1>
        <form onSubmit={handleCreateTodo}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              type="text"
              id="title"
              name="title"
            />
          </div>

          <button type="submit">Add Todo</button>
        </form>
      </div>
    </>
  )
}
