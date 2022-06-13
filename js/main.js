const input = document.querySelector(".input-task");
const addTaskBtn = document.querySelector(".add-task");
const tasksList = document.querySelector(".tasks-list");

let tasks;

!localStorage.tasks ? (tasks = []) : (tasks = JSON.parse(localStorage.getItem("tasks")));

function Task(description) {
  this.description = description;
  this.completed = false;
}

function createListMarkup(task, index) {
  return `
    <li class="tasks-list__item ${task.completed ? "checked" : ""}">
      <span class="tasks-list__text ${task.completed ? "checked" : ""}">${task.description}</span>
      <div class="btn-box">
        <input class="complete-btn" type="checkbox" ${task.completed ? "checked" : ""}>
        <label for="complete-btn"></label>
        <span class="material-icons remove-btn">delete_forever</span>
      </div>
    </li>
  `;
}

addListMarkup();

addTaskBtn.addEventListener("click", () => {
  if (input.value != "") {
    tasks.push(new Task(input.value));
    updateLocalStorage();
    addListMarkup();
    input.value = "";
  }
});

input.addEventListener("keydown", e => {
  if (e.keyCode === 13 && input.value != "") {
    tasks.push(new Task(input.value));
    updateLocalStorage();
    addListMarkup();
    input.value = "";
  }
});

function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addListMarkup() {
  tasksList.innerHTML = "";
  if (tasks.length > 0) {
    tasks.forEach((task, index) => {
      tasksList.innerHTML += createListMarkup(task, index);
    });
  }
  addEventClickBtns();
}

function addEventClickBtns() {
  const tasksListItem = document.querySelectorAll(".tasks-list__item");
  const tasksListText = document.querySelectorAll(".tasks-list__text");
  const completeBtns = document.querySelectorAll(".complete-btn");
  const removeBtn = document.querySelectorAll(".remove-btn");
  for (let i = 0; i < completeBtns.length; i += 1) {
    completeBtns[i].addEventListener("click", () => {
      tasks[i].completed = !tasks[i].completed;
      updateLocalStorage();
      if (tasks[i].completed) {
        tasksListItem[i].classList.add("checked");
        tasksListText[i].classList.add("checked");
      } else {
        tasksListItem[i].classList.remove("checked");
        tasksListText[i].classList.remove("checked");
      }
    });
    removeBtn[i].addEventListener("click", () => {
      if (confirm("You really want to delete the task?")) {
        tasks.splice(i, 1);
        updateLocalStorage();
        addListMarkup();
      }
    });
  }
}
