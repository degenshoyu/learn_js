document.addEventListener("DOMContentLoaded", getTodos);

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector("#todo-list");

// Add a new task to the todo list
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (todoInput.value != "") {
    addTaskToPage(todoInput.value);
    saveTodosLocal(todoInput.value);
    todoInput.value = "";
  }
});

// Manage a task in the todo list
todoList.addEventListener("click", (event) => {
  if (event.target.classList.contains("trash-btn")) {
    removeTodosLocal(
      event.target.parentElement.parentElement.querySelector("span").innerText,
    );
    event.target.parentElement.parentElement.remove();
  } else if (event.target.classList.contains("do-btn")) {
    event.target.parentElement.parentElement.classList.toggle("done-task");
  }
});

// Save to localStorage
function saveTodosLocal(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Remove from localStorage
function removeTodosLocal(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.splice(todos.indexOf(todo), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Render iterms from localStorage
function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    addTaskToPage(todo);
  });
}

function addTaskToPage(todoText) {
  const newTask = document.createElement("li");
  newTask.classList.add("todo");
  const newTaskText = document.createElement("span");
  newTaskText.innerText = todoText;
  newTask.appendChild(newTaskText);
  const buttonBox = document.createElement("div");
  const doButton = document.createElement("button");
  doButton.innerHTML = "✍️";
  doButton.classList.add("do-btn");
  buttonBox.appendChild(doButton);
  const delButton = document.createElement("button");
  delButton.innerHTML = "🗑️";
  delButton.classList.add("trash-btn");
  buttonBox.appendChild(delButton);
  newTask.appendChild(buttonBox);
  todoList.appendChild(newTask);
}
