"use strict";

const html = document.querySelector('html');

const formTask = document.querySelector('#form_task');

const inputTask = document.querySelector('#input_task');
const btnAddTask = document.querySelector('#btn_add_task');

const counterTasks = document.querySelector("#tasks-number");

const containerTasks = document.querySelector('#container_tasks');

const btnClearAll = document.querySelector("#clear-all");

let currentTask;
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

inputTask.addEventListener('input', (e) => {
  currentTask = e.target.value;
});

const renderTasks = (arr) => {
  containerTasks.innerHTML = arr.map((task, i) => `
    <div class="task-content w-full flex items-center gap-2 mb-2 overflow-hidden bg-indigo-300 rounded-sm p-2">
      <div class="w-[calc(100%-50px)]">
        <li class="w-full break-words text-white">${task.title}</li>
      </div>
      <div class="w-[50px] h-10 flex items-center justify-center bg-indigo-600 rounded-sm py-1">
        <img src="imgs/trash.png" alt="trash-icon" class="delete-task cursor-pointer ml-1 w-7 h-7" data-index="${i}">
      </div>
    </div>`).join('')

  counterTasks.textContent = tasks.length;
}

// Create Tasks
formTask.addEventListener('submit', (e) => {
  e.preventDefault();

  tasks.push({ title: currentTask })

  inputTask.value = '';
  saveTasks(tasks);

  renderTasks(tasks);
  console.log('Tareas: ', tasks);
});

// Check tasks
containerTasks.addEventListener('dblclick', (e) => {
  const taskCheck = e.target.closest('.task-content');
  if (taskCheck) {
    taskCheck.classList.toggle('bg-gray-500');
  }
});

// Delete Tasks
const deleteTask = (index) => {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

containerTasks.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-task')) {
    const index = parseInt(e.target.getAttribute('data-index'), 10);
    deleteTask(index);
    renderTasks(tasks);
  }
});

btnClearAll.addEventListener('click', () => {
  tasks = [];
  localStorage.removeItem('tasks')
  renderTasks(tasks);
});

// Save Tasks
const saveTasks = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Render save tasks
document.addEventListener('DOMContentLoaded', () => {
  const saveTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  renderTasks(saveTasks);
});