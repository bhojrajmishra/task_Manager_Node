// controller/taskController.js
const taskModel = require('../model/taskModel'); // Corrected import
const db = require('../db');

function addTask(req, res) {
  const { name, priority } = req.body;

  // Validate input
  if (!name || !priority) {
    return res.status(400).json({ error: 'Name and priority are required fields.' });
  }

  // Perform database insertion
  taskModel.addTask(name, priority, (err, insertedTask) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.status(201).json(insertedTask);
  });
}

function deleteTask(req, res) {
  const taskId = req.params.id;

  // Perform database deletion
  taskModel.deleteTask(taskId, (err, deleted) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (deleted) {
      return res.status(200).json({ message: 'Task deleted successfully.' });
    } else {
      return res.status(404).json({ error: 'Task not found.' });
    }
  });
}

function markTaskAsCompleted(req, res) {
  const taskId = req.params.id;

  // Perform database update
  taskModel.markTaskAsCompleted(taskId, (err, markedCompleted) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (markedCompleted) {
      return res.status(200).json({ message: 'Task marked as completed successfully.' });
    } else {
      return res.status(404).json({ error: 'Task not found.' });
    }
  });
}

function getAllTasks(req, res) {
  // Assuming you have a getAllTasks function in taskModel
  taskModel.getAllTasks((err, tasks) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.render('index', { tasks });
  });
}

module.exports = {
  addTask,
  deleteTask,
  markTaskAsCompleted,
  getAllTasks,
};
