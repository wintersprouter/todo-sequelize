const db = require('../models')
const { Todo } = db

const todoController = {
  getCreateTodoPage: (req, res) => {
    return res.render('new')
  },
  createTodo: async (req, res) => {
    try {
      const UserId = req.user.id
      const name = req.body.name
      if (!name) {
        return res.redirect('back')
      }
      await Todo.create({ name, UserId })
      return res.redirect('/')
    } catch (err) {
      console.log(err)
    }
  },
  getTodoPage: async (req, res) => {
    try {
      const UserId = req.user.id
      const id = req.params.id
      const todo = await Todo.findOne({ where: { id, UserId } })
      res.render('detail', { todo: todo.toJSON() })
    } catch (err) {
      console.log(err)
    }
  },
  getEditTodoPage: async (req, res) => {
    try {
      const UserId = req.user.id
      const id = req.params.id
      const todo = await Todo.findOne({ where: { id, UserId } })
      res.render('edit', { todo: todo.toJSON() })
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = todoController
