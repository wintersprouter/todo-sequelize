const db = require('../models')
const User = db.User
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const FacebookStrategy = require('passport-facebook').Strategy

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, email, password, done) => {
    try {
      const user = await User.findOne({ email })
      if (!user) {
        return done(null, false, req.flash('warning_msg', '信箱或密碼輸入錯誤！'))
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return done(null, false, req.flash('warning_msg', '信箱或密碼輸入錯誤！'))
      }
      return done(null, user)
    } catch (err) {
      return done(err, false)
    }
  }))

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const { name, email } = profile._json
      const user = await User.findOne({ where: { email } })
      if (user) { return done(null, user) }
      const randomPassword = Math.random().toString(36).slice(-8)
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(randomPassword, salt)
      await User.create({ name, email, password: hash })
      return done(null, user)
    } catch (err) {
      return done(err, false)
    }
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then((user) => {
        user = user.toJSON()
        done(null, user)
      }).catch(err => done(err, null))
  })
}
