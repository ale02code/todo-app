const formTask = document.querySelector('#form_task');

const inputTask = document.querySelector('#input_task');
const btnAddTask = document.querySelector('#btn_add_task');

const containerTasks = document.querySelector('#container_tasks');

let tasks = [];

let task = {
  id: '1',
  title: inputTask,
  completed: false
}

formTask.addEventListener('submit', (e) => {
  e.preventDefault();
  tasks.push(task);

  console.log('Tareas pendientes:', tasks);
});