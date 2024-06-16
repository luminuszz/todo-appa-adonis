import Todo from '#models/todo'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class TodosController {
  async index({ inertia }: HttpContext) {
    const todoList = await Todo.all()

    const todos = todoList.map((todo) => {
      const { id, title, isCompleted } = todo.serialize() as {
        title: string
        id: number
        isCompleted: boolean
      }

      return {
        id,
        title,
        isCompleted,
      }
    })

    return inertia.render('todos/index', { todos })
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('todos/add_todo')
  }

  async store({ request, response }: HttpContext) {
    const { title } = request.body() as { title: string }

    const dateWith2DaysAdded = DateTime.now().plus({ days: 2 })

    await Todo.create({ title, dueDate: dateWith2DaysAdded, isCompleted: false })

    return response.redirect('/todos')
  }

  async show({ params, inertia }: HttpContext) {
    const todo = await Todo.find(params.id)

    if (!todo) {
      throw new Error('Todo not found')
    }

    return inertia.render('todos/show', {
      todo: todo.serialize() as {
        title: string
        dueDate: string
        isCompleted: boolean
      },
    })
  }

  async markAsCompleted({ params }: HttpContext) {
    const { id } = params as { id: number }

    const todo = await Todo.find(id)

    if (!todo) {
      throw new Error('Todo not found')
    }

    todo.isCompleted = !todo.isCompleted

    await todo.save()
  }

  async edit({ inertia, params }: HttpContext) {
    const { id } = params as { id: number }

    const todo = await Todo.find(id)

    if (!todo) {
      throw new Error('Todo not found')
    }

    return inertia.render('todos/edit', {
      todo: todo.serialize() as {
        title: string
        dueDate: string
        isCompleted: boolean
        id: number
      },
    })
  }

  async update({ response, request }: HttpContext) {
    const { title, dueDate } = request.body() as { title: string; dueDate: string }

    const parsedDate = DateTime.fromISO(dueDate)

    const todo = await Todo.find(request.param('id'))

    if (!todo) {
      throw new Error('Todo not found')
    }

    todo.title = title
    todo.dueDate = parsedDate

    await todo.save()

    return response.redirect('/todos')
  }

  /**
   * Handle form submission for the edit action
   */
  // async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
