// app.js
const express = require('express');
const bodyParser = require('body-parser');
const taskController = require('./controller/taskController');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  taskController.getAllTasks((tasks) => {
    res.render('index', { tasks });
  });
});

app.post('/tasks', (req, res) => {
  const { name, priority } = req.body;
  taskController.addTask(name, priority, (task) => {
    res.json(task);
  });
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  taskController.deleteTask(taskId, (success) => {
    res.json({ success });
  });
});

app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  taskController.markTaskAsCompleted(taskId, (success) => {
    res.json({ success });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
