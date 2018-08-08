const express = require('express');
const todosRouter = express.Router();
const {Todo} = require('../models/Todo');
/*  
const toDos = [
  {todos: "buy grapes", isDone:1},
  {todos: "buy oranges", isDone:0},
];
*/

/* GET users listing. */
todosRouter.get ('/', getTodos);
async function getTodos (_req, res) {
  const toDos = await Todo.find({});
  res
  .status(200)
  .json({toDos});
}

todosRouter.post ('/', addTodos);
async function addTodos (req, res) {
  /*
  req.body = {
    todo: {
      todos: "sdfdsfsf",
      isDone: false,
    }
  }
  */
  const { todos, isDone } = req.body.todo;
  //toDos.push(newTodo);
  const todo = new Todo ({
      todos,
      isDone,
  });
  await todo.save();
}

todosRouter.delete ('/', removeTodo);
async function removeTodo (req, res) {
  await Todo.deleteOne({todos: req.body.todo.todos});
}

todosRouter.put ('/', updateIsDone);
async function updateIsDone (req, res) {
  const todo = await Todo.findOneAndUpdate(
    {todos: req.body.todo.todos},
    {isDone: req.body.todo.isDone},
    {returnNewDocument: true}
  )
  await todo.save();
}

module.exports =  todosRouter ;
