const userController = require('../../controllers/userController')
const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/login', userController.getLoginPage)
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}), userController.userLogin)

router.get('/logout', userController.userLogout)

router.get('/register', userController.getRegisterPage)
router.post('/register', userController.userRegister)

module.exports = router