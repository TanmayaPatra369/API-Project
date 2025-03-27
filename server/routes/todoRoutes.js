const express = require('express');

const router = express.Router();

const todoController = require('../controllers/todoController');
const authController = require('../controllers/authController');

router
  .route('/')
  .get(authController.protect, todoController.getAllTodos)
  .post(authController.protect, todoController.createTodo);

router
  .route('/:id')
  .patch(authController.protect, todoController.editTodo)
  .delete(authController.protect, todoController.deleteTodo);

module.exports = router;
