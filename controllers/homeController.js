const db = require('../models')
const { Todo } = db

const homeController = {
  getAllTodos: async (req, res) => {
    try {
      const todos = await Todo.findAll({ raw: true, nest: true })
      return res.render('index', { todos: todos })
    } catch (err) {
      console.log(err)
    }
  }
}
module.exports = homeController
