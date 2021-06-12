const db = require('../models')
const { Todo } = db

const homeController = {
getAllTodos: (req, res) => {
    return Todo.findAll({
    raw: true,
    nest: true
  })
    .then((todos) => { return res.render('index', { todos: todos }) })
    .catch((error) => { return res.status(422).json(error) })
  }
}  
module.exports = homeController