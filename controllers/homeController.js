const db = require('../models')
const { Todo, User } = db

const homeController = {
  getAllTodos: async (req, res) => {
    try {
      const UserId = req.user.id
      const user = await User.findByPk(UserId)
      if (!user) throw new Error('user not found')
      const todos = await Todo.findAll({ raw: true, nest: true, where: { UserId: UserId } })
      return res.render('index', { todos: todos })
    } catch (err) {
      console.log(err)
    }
  }
}
module.exports = homeController
