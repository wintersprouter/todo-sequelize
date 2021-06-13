const todoController = require('../../controllers/todoController')
const express = require('express')
const router = express.Router()

router.get('/new', todoController.getCreateTodoPage)
router.get('/:id', todoController.getTodoPage)
router.get('/:id/edit', todoController.getEditTodoPage)
router.post('/', todoController.createTodo)

module.exports = router
