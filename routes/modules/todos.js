const homeController = require('../../controllers/homeController')
const express = require('express')
const router = express.Router()

router.get('/:id', homeController.getAllTodos)

module.exports = router