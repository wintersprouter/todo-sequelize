const db = require('../models')
const { Todo } = db

const todoController = {
  getTodoPage: async (req, res) => {
    try {
    const id = req.params.id
    const todo = await Todo.findByPk( id )
    res.render('detail', { todo: todo.toJSON() })
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = todoController 