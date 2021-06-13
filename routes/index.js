const express = require('express')
const router = express.Router()
const users = require('./modules/users')
const home = require('./modules/home')
const todos = require('./modules/todos')
const { authenticator } = require('../middleware/auth')

router.use('/', users)

router.use('/', authenticator, home)

router.use('/todos/', authenticator, todos)

module.exports = router
