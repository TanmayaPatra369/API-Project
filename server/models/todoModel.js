const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A task name is required for creating a task'],
  },
  userId: {
    type: String,
    required: [true, 'A userId is required for creating a task'],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  description: { type: String, maxLenght: 150, default: '' },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  priority: {
    type: String,
    enum: {
      values: ['None', 'Low', 'Medium', 'High', 'Urgent'],
      message: 'Priority must be: None, Low, Medium, High or Urgent',
    },
    default: 'None',
  },
});

todoSchema.index({ userId: 1 });

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
