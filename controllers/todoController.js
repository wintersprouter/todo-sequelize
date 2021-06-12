const db = require('../models')
const { Todo } = db

const todoController = {
  getTodo:(req, res) => {
    const id = req.params.id
    return Todo.findByPk(id)
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
  }
}

module.exports = todoController 