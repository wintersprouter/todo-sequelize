const todoController = require('../../controllers/todoController')
const express = require('express')
const router = express.Router()

router.get('/:id', todoController.getTodoPage)

module.exports = router