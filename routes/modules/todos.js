const todoController = require('../../controllers/todoController')
const express = require('express')
const router = express.Router()

router.get('/:id', todoController.getTodoPage)
router.get('/new', todoController.getNewTodoPage)
router.post('/', todoController.createTodo)

module.exports = router
