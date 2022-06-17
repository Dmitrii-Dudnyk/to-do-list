const input = document.querySelector(".input-task");
const tasksList = document.querySelector(".tasks-list");
const inputBoxEl = document.querySelector(".input-box");

const modal = document.getElementById("modal-box");
const modalCancelBtn = document.querySelector(".modal-cancel");
const modalDeleteBtn = document.querySelector(".modal-delete");

let tasks;
let index;

localStorage.tasks ? (tasks = JSON.parse(localStorage.getItem("tasks"))) : (tasks = []);

function Task(description) {
  this.description = description;
  this.completed = false;
}

function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

addListMarkup();

function addListMarkup() {
  tasksList.innerHTML = "";
  if (tasks.length > 0) {
    tasks.forEach(task => {
      tasksList.innerHTML += createListMarkup(task);
    });
  }
}

function createListMarkup(task) {
  return `
    <li class="tasks-list__item ${task.completed ? "checked" : ""}">
      <span class="tasks-list__text ${task.completed ? "checked" : ""}">${task.description}</span>
      <div class="btn-box">
        <input class="complete-btn" type="checkbox" ${task.completed ? "checked" : ""}>
        <label for="complete-btn"></label>
        <span class="remove-btn material-icons">delete_forever</span>
      </div>
    </li>
  `;
}

inputBoxEl.addEventListener("click", e => {
  if (e.target.className == "add-task" && input.value != "") renderMarkup();
});

inputBoxEl.addEventListener("keydown", e => {
  if (e.keyCode === 13 && input.value != "") renderMarkup();
});

function renderMarkup() {
  tasks.push(new Task(input.value));
  updateLocalStorage();
  addListMarkup();
  input.value = "";
}

tasksList.addEventListener("click", e => {
  if (e.target.className == "complete-btn") completeTask(e);
  if (e.target.className == "remove-btn material-icons") openModal(e);
});

modal.addEventListener("click", e => {
  if (e.target.className == "modal-close" || e.target.className == "modal-cancel") modal.style.display = "none";
  if (e.target.className == "modal-delete") {
    tasks.splice(index, 1);
    updateLocalStorage();
    addListMarkup();
    modal.style.display = "none";
  }
});

function completeTask(e) {
  const tasksListItem = document.querySelectorAll(".tasks-list__item");
  const tasksListText = document.querySelectorAll(".tasks-list__text");
  const completeBtns = document.querySelectorAll(".complete-btn");
  for (let i = 0; i < completeBtns.length; i += 1) {
    if (e.target == completeBtns[i]) {
      tasks[i].completed = !tasks[i].completed;
      updateLocalStorage();
    }
    if (tasks[i].completed) {
      tasksListItem[i].classList.add("checked");
      tasksListText[i].classList.add("checked");
    } else {
      tasksListItem[i].classList.remove("checked");
      tasksListText[i].classList.remove("checked");
    }
  }
}

function openModal(e) {
  const removeBtns = Array.from(document.querySelectorAll(".remove-btn.material-icons"));
  index = removeBtns.findIndex(item => item === e.target);
  if (index != -1) {
    modal.style.display = "block";
  }
}
