const todoController = require('../../controllers/todoController')
const express = require('express')
const router = express.Router()

router.get('/new', todoController.getCreateTodoPage)
router.get('/:id', todoController.getTodoPage)
router.put('/:id', todoController.updateTodo)
router.delete('/:id', todoController.deleteTodo)
router.get('/:id/edit', todoController.getEditTodoPage)
router.post('/', todoController.createTodo)

module.exports = router
