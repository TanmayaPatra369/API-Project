const Todo = require('../models/todoModel');
const AppError = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

exports.getAllTodos = async (req, res, next) => {
  const todos = await Todo.find({ userId: req.user._id });

  res.status(200).json({
    status: 'success',
    todos,
  });
};

exports.createTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.create({
    name: req.body.name,
    userId: req.user._id,
  });

  res.status(201).json({
    status: 'success',
    data: {
      todo,
    },
  });
});

exports.editTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!todo) {
    return next(new AppError('No todo found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: todo,
  });
});

exports.deleteTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);

  if (!todo) {
    return next(new AppError('No todo found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
