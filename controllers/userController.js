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
  userRegister: async (req, res) => {
    let { name, email, password, confirmPassword } = req.body
    const registration_success_msg = `${email}會員註冊成功！`
    const registration_error_msg = '此會員信箱已註冊！'
    const errors = []
    if (!email || !password || !confirmPassword) {
      errors.push({ message: '請填寫信箱與密碼欄位。' })
    }
    if (confirmPassword !== password) {
      errors.push({ message: '密碼與確認密碼不相符！' })
      password = ''
      confirmPassword = ''
    }
    if (errors.length) {
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    try {
      const user = await User.findOne({ where: { email } })
      if (user) {
        email = ''
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword,
          registration_error_msg
        })
      }
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
      await User.create({
        name, email, password: hash
      })

      return res.render('login', {
        registration_success_msg
      })
    } catch (err) {
      console.log(err)
      res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    }
  },
  userLogout: (req, res) => {
    req.logout()
    res.redirect('/login')
  }
}

module.exports = userController
