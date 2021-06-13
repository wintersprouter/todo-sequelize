const express = require('express')
const router = express.Router()
const users = require('./modules/users')
const home = require('./modules/home')
const todos = require('./modules/todos')
const auth = require('./modules/auth') 

const { authenticator } = require('../middleware/auth')

router.use('/', users)

router.use('/auth', auth) 

router.use('/todos/', authenticator, todos)

router.use('/', authenticator, home)

module.exports = router
