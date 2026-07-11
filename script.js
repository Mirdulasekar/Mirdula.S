let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");

function saveTasks(){
localStorage.setItem("tasks",JSON.stringify(tasks));
}

function displayTasks(filter="all"){

list.innerHTML="";

tasks.forEach((task,index)=>{

if(filter==="active" && task.completed) return;
if(filter==="completed" && !task.completed) return;

const li=document.createElement("li");

if(task.completed){
li.classList.add("completed");
}

li.innerHTML=`

<span>${task.text}</span>

<div>

<button onclick="toggleTask(${index})">✔</button>

<button onclick="editTask(${index})">Edit</button>

<button onclick="deleteTask(${index})">Delete</button>

</div>

`;

list.appendChild(li);

});

}

document.getElementById("addBtn").addEventListener("click",()=>{

const text=input.value.trim();

if(text==="") return;

tasks.push({

text:text,

completed:false

});

saveTasks();

displayTasks();

input.value="";

});

function toggleTask(index){

tasks[index].completed=!tasks[index].completed;

saveTasks();

displayTasks();

}

function deleteTask(index){

tasks.splice(index,1);

saveTasks();

displayTasks();

}

function editTask(index){

let newTask=prompt("Edit Task",tasks[index].text);

if(newTask!==null && newTask.trim()!==""){

tasks[index].text=newTask;

saveTasks();

displayTasks();

}

}

function filterTasks(type){

displayTasks(type);

}

displayTasks();