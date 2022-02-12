const taskForm = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const task = document.querySelector("#task");
const filter = document.querySelector("#filter");
const clearBtn = document.querySelector("#clear-tasks");

loadAllEvents();

function loadAllEvents() {
    document.addEventListener("DOMContentLoaded", getTasks);
    taskForm.addEventListener("submit", addTask);
    filter.addEventListener("keyup", fitlerTasks);
    taskList.addEventListener("click", deleteSingle);
    clearBtn.addEventListener("click", deleteAll);
}

function addTask(e) {
    if (task.value == "") {
        alert("Please Enter a task!");
    } else {
        const li = document.createElement("li");
        li.className = "collection-item";
        li.appendChild(document.createTextNode(task.value));
        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        link.innerHTML = "<span class='fa fa-remove'></span>";
        li.appendChild(link);
        taskList.appendChild(li);

        saveLocal(task.value);
    }
    task.value = "";

    e.preventDefault();
}

function saveLocal(task) {
    let tasks;
    if (localStorage.getItem("tasks") == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "collection-item";
        li.appendChild(document.createTextNode(task));
        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        link.innerHTML = "<span class='fa fa-remove'></span>";
        li.appendChild(link);
        taskList.appendChild(li);
    });
}

function fitlerTasks() {
    let input = filter.value.toLocaleLowerCase();
    
    document.querySelectorAll(".collection-item").forEach(list => {

        if (list.firstChild.textContent.toLocaleLowerCase().indexOf(input) == -1) {
            list.style.display = "none"
        } else {
            list.style.display = "block"
        }
    });
}

function deleteSingle(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
        e.target.parentElement.parentElement.remove();

        removeLocal(e.target.parentElement.parentElement.textContent);
    }
}

function removeLocal(removeItem) {
    let tasks;
    if (localStorage.getItem("tasks") == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach((task, index) => {
        if (task == removeItem) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));   
}

function deleteAll() {
    while(taskList.firstChild) {
        taskList.firstChild.remove();
    }
    localStorage.clear();
}