
let tasks = [];

const addTask = () => {
    const taskinput = document.getElementById('taskinput');
    const text = taskinput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskinput.value = "";
        updateTaskList();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
};

const editTask = (index) => {
    const newText = prompt("Edit your task:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        updateTaskList();
    }
};

const updateTaskList = () => {
    const tasklist = document.querySelector('.task-list');
    tasklist.innerHTML = "";

    tasks.forEach((task, index) => {
        const listitem = document.createElement('li');

        listitem.innerHTML = `
            <div class="taskitem">
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="./img/edit.png" onclick="editTask(${index})"/>
                    <img src="./img/bin.png" onclick="deleteTask(${index})"/>
                </div>
            </div>
        `;

        listitem.querySelector(".checkbox").addEventListener("change", () => toggleTaskComplete(index));
        tasklist.append(listitem);
    });

    updateProgress();
};

const updateProgress = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;

    const progressBar = document.getElementById("progress");
    const progressText = document.getElementById("number");

    if (total > 0) {
        const percent = Math.round((completed / total) * 100);
        progressBar.style.width = `${percent}%`;
        progressText.textContent = `${completed}/${total}`;
    } else {
        progressBar.style.width = `0%`;
        progressText.textContent = `0/0`;
    }

    if (total && completed === total) {
        blastConfetti();
    }
};

document.getElementById("newtask").addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
});



const blastConfetti = () => {
    const defaults = {
        spread: 360,
        ticks: 100,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["heart"],
        colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
      };
      
      confetti({
        ...defaults,
        particleCount: 50,
        scalar: 2,
      });
      
      confetti({
        ...defaults,
        particleCount: 25,
        scalar: 3,
      });
      
      confetti({
        ...defaults,
        particleCount: 10,
        scalar: 4,
      });
};
