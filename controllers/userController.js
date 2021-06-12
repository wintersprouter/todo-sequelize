const db = require('../models')
const { User } = db
const bcrypt = require('bcryptjs')

const userController = {
  getLoginPage: (req, res) => {
    res.render('login')
  },
  userLogin: (req, res) => {
    res.redirect('/')
  },
  getRegisterPage: (req, res) => {
    res.render('register')
  },
  userRegister: (req, res) => {
    const { name, email, password, confirmPassword } = req.body
  User.findOne({ where: { email } }).then(user => {
    if (user) {
      console.log('User already exists')
      return res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    }
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
  },
  userLogout: (req, res) => {
    req.logout()
    res.redirect('/login')
  }
}

module.exports = userController