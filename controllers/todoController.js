const Todo = require('../models/Todo');
const { v4: uuidv4 } = require('uuid');

const createTodo = async (req, res) => {
  const { title, description, status } = req.body;
  const id = uuidv4();
  try {
    await Todo.create(id, title, description, status, req.userId);
    res.status(201).json({ message: 'Todo created' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.getAllTodos();
    // console.log(todos)
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTodo = async (req, res) => {
  const { status } = req.body;
  try {
    await Todo.update(req.params.id, status);
    res.status(200).json({ message: 'Todo updated' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    await Todo.delete(req.params.id);
    res.status(200).json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createTodo, getTodos, updateTodo, deleteTodo };
