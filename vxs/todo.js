// Load tasks from local storage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTask(task.task, task.completed);
    });
}

// Save tasks to local storage
function saveTasks() {
    let tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        tasks.push({
            task: li.querySelector('label').textContent,
            completed: li.querySelector('input[type="checkbox"]').checked
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to create a new task item
function createTask(task, completed = false) {
    let taskList = document.getElementById("taskList");
    let li = document.createElement("li");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;
    let label = document.createElement("label");
    label.textContent = task;
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Trash";
    deleteBtn.className = "deleteBtn";
    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Function to add a task to the list
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let task = taskInput.value.trim();
    if (task !== "") {
        createTask(task);
        saveTasks();
        taskInput.value = "";
    }
}

// Function to delete a task
function deleteTask() {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
    saveTasks();
}

// Function to handle task completion
function handleTaskCompletion() {
    saveTasks();
}

document.getElementById("addTaskBtn").addEventListener("click", addTask);

// Event delegation for dynamically created delete buttons and task completion checkboxes
document.addEventListener('click', function(e) {
    if (e.target && e.target.className == 'deleteBtn') {
        deleteTask.call(e.target);
    }
});

document.addEventListener('change', function(e) {
    if (e.target && e.target.type == 'checkbox') {
        handleTaskCompletion();
    }
});

// Load tasks when the page loads
loadTasks();
