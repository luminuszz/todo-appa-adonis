/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const TodosController = () => import('#controllers/todos_controller')

router.on('/').renderInertia('home', { version: 6 })

router.resource('/todos', TodosController)
