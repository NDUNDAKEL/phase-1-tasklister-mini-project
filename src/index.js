let tasks = []; // Array to store tasks

// Function to handle adding tasks
function handleAddTask(event) {
  event.preventDefault(); // Prevent form submission

  const form = document.getElementById('create-task-form');
  const new_task_description = form.elements['new-task-description'].value;
  const priority = form.elements['priority'].value;
  const user = form.elements['user'].value;
  const duration = form.elements['duration'].value;
  const dueDate = form.elements['due-date'].value;

  if (new_task_description.trim() === "") {
    alert("Please enter a task description.");
    return;
  }

  // Add task with priority and additional fields to the array
  tasks.push({
    description: new_task_description,
    priority: priority,
    user: user,
    duration: duration,
    dueDate: dueDate
  });

  // Reset the form after adding the task
  form.reset();

  // Update the task list display
  displayTasks();
}

// Function to display tasks on the screen
function displayTasks() {
  const taskList = document.getElementById('tasks');
  taskList.innerHTML = ""; // Clear existing list

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = `${task.description} (User: ${task.user}, Duration: ${task.duration} hours, Due: ${task.dueDate})`;

    // Apply color based on priority
    if (task.priority === 'high') {
      li.style.color = 'red';
    } else if (task.priority === 'medium') {
      li.style.color = 'yellow';
    } else {
      li.style.color = 'green';
    }

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      tasks.splice(index, 1); // Remove task from the array
      displayTasks(); // Re-render task list
    });

    // Append delete button to task list item
    li.appendChild(deleteButton);

    // Append the task <li> to the <ul>
    taskList.appendChild(li);
  });
}

// Function to sort tasks by priority (high -> medium -> low)
document.getElementById('sort-tasks').addEventListener('click', () => {
  tasks.sort((a, b) => {
    const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
  displayTasks(); // Re-render the sorted task list
});

// Set up event listener when the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Attach the handleAddTask function to the form's submit event
  const form = document.getElementById('create-task-form');
  form.addEventListener('submit', handleAddTask);
});
