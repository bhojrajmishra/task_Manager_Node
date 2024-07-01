// public/script.js
function addTask() {
  const taskInput = document.getElementById('task-input');
  const prioritySelect = document.getElementById('priority-select');

  const taskName = taskInput.value;
  const taskPriority = prioritySelect.value;

  if (!taskName || taskName.trim() === '') {
    console.error('Error: Task name cannot be null or empty.');
    return;
  }

  const requestData = {
    name: taskName,
    priority: taskPriority,
  };

  fetch('/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error adding task: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Task added:', data);
      window.location.reload();
    })
    .catch(error => {
      console.error('Error adding task:', error.message);
    });

  taskInput.value = '';
  prioritySelect.value = '1';
}

function deleteTask(id) {
  fetch(`/tasks/${id}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error deleting task: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Task deleted:', data);
      window.location.reload();
    })
    .catch(error => {
      console.error('Error deleting task:', error.message);
    });
}

function markTaskAsCompleted(id) {
  fetch(`/tasks/${id}`, {
    method: 'PUT',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error marking task as completed: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Task marked as completed:', data);
      window.location.reload();
    })
    .catch(error => {
      console.error('Error marking task as completed:', error.message);
    });
}
