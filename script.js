const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addButton = document.querySelector(".row button");


function addTask() {
    const taskText = inputBox.value.trim();
    if (taskText === '') {
        alert("You must write something!");
        return;
    }

    const li = createTaskElement(taskText);
    listContainer.appendChild(li);

    inputBox.value = "";
    saveData();
}

function createTaskElement(text, checked = false) {
    const li = document.createElement("li");
    li.textContent = text;

    if (checked) {
        li.classList.add("checked");
    }

    const span = document.createElement("span");
    span.textContent = "\u00d7"; // delete button
    li.appendChild(span);

    return li;
}

function handleTaskClick(event) {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked");
        saveData();
    } 
    else if (event.target.tagName === "SPAN") {
        event.target.parentElement.remove();
        saveData();
    }
}

function saveData() {
    const tasks = [];
    listContainer.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            checked: li.classList.contains("checked")
        });
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return;

    const tasks = JSON.parse(data);
    tasks.forEach(task => {
        const li = createTaskElement(task.text, task.checked);
        listContainer.appendChild(li);
    });
}

// Event Listeners
addButton.addEventListener("click", addTask);

inputBox.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addTask();
    }
});

listContainer.addEventListener("click", handleTaskClick);

// Initialize
loadTasks();
