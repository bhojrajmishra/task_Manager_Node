// model/taskModel.js
const db = require('../db');



function addTask(name, priority, callback) {
  const query = 'INSERT INTO tasks (name, priority, completed) VALUES (?, ?, false)';
  db.query(query, [name, priority], (err, result) => {
    if (err) {
      console.error('Error adding task to the database:', err);
      return callback(err, null);
    }

    const insertedTask = {
      id: result.insertId,
      name,
      priority,
      completed: false,
    };

    callback(null, insertedTask);
  });
}

function deleteTask(id, callback) {
  const query = 'DELETE FROM tasks WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting task from the database:', err);
      return callback(err, null);
    }

    callback(null, result.affectedRows > 0);
  });
}

function markTaskAsCompleted(id, callback) {
  const query = 'UPDATE tasks SET completed = true WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error marking task as completed in the database:', err);
      return callback(err, null);
    }

    callback(null, result.affectedRows > 0);
  });
}

module.exports = {
  addTask,
  deleteTask,
  markTaskAsCompleted,
};

