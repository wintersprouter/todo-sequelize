const express = require('express')
const router = express.Router()
const users = require('./modules/users')
const home = require('./modules/home')
const todos = require('./modules/todos')

const authenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}
router.use('/', users)

router.use('/',authenticated, home)

router.use('/todos/',authenticated, todos)


module.exports = router