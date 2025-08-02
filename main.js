"use strict";

const html = document.querySelector('html');

const formTask = document.querySelector('#form_task');

const inputTask = document.querySelector('#input_task');
const btnAddTask = document.querySelector('#btn_add_task');

const containerTasks = document.querySelector('#container_tasks');

let currentTask;
let tasks = [];

inputTask.addEventListener('input', (e) => {
  currentTask = e.target.value;
});

const renderTasks = (arr) => {
  containerTasks.innerHTML = arr.map((task, i) => `
    <div class="w-full flex items-center gap-2 mb-2 overflow-hidden bg-indigo-300 rounded-sm p-2">
      <li class="w-[calc(100%-50px)] break-words text-white">${task.title}</li>
      <div class="w-[50px] h-10 flex items-center justify-center bg-indigo-600 rounded-sm py-1">
        <img src="imgs/trash.png" alt="trash-icon" class="delete-task cursor-pointer ml-1 w-7 h-7" data-index="${i}">
      </div>
    </div>`).join('')
}


formTask.addEventListener('submit', (e) => {
  e.preventDefault();

  tasks.push({ title: currentTask })

  inputTask.value = '';
  saveTasks(tasks);

  renderTasks(tasks);
  console.log('Tareas: ', tasks);
});

const saveTasks = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

const loadTasks = () => {

};

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
})