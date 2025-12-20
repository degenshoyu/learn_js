const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector(".todo-input");

const todoList = document.querySelector("#todo-list");

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (todoInput.value != "") {
    const newTask = document.createElement("li");
    newTask.innerText = todoInput.value;
    newTask.classList.add("todo");

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
    todoInput.value = "";
  }
});

todoList.addEventListener("click", (event) => {
  if (event.target.classList.contains("trash-btn")) {
    event.target.parentElement.parentElement.remove();
  } else if (event.target.classList.contains("do-btn")) {
    event.target.parentElement.parentElement.classList.toggle("done-task");
  }
});
