const form = document.querySelector('#task-form');
const taskList = document.querySelector('#task-list');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

function putTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    const updatedTasks = tasks.filter(function (task) {
        return task !== taskItem.textContent;
    });
    console.log(updatedTasks);

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

function liElementMakerAndAppender(text) {
    const li = document.createElement('li');
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(text));
    p.style.margin = 0;
    p.style.padding = 0;

    li.className = 'list-group-item d-flex justify-content-between';


    li.appendChild(p);

    const link = document.createElement('a');

    link.className = 'btn btn-danger delete-item';

    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);

    taskList.appendChild(li);
}

loadAllEventListener();
function loadAllEventListener() {

    document.addEventListener('DOMContentLoaded', getTasks);

    form.addEventListener('submit', addTask);

    taskList.addEventListener('click',removeTask);
    
    clearBtn.addEventListener('click', clearTasks);
    
    filter.addEventListener('keyup', filterTasks);
}

function getTasks() {

    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
        return;
    } else  {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (taskText) {
        liElementMakerAndAppender(taskText);

    })
    
}



function addTask(e) {
  let tskInputVal = taskInput.value.trim();
  console.log(tskInputVal);
    if(!tskInputVal) {
      alert('Please Add Valid Value');
    } else {

        liElementMakerAndAppender(tskInputVal);

        putTaskInLocalStorage(tskInputVal);

        taskInput.value = '';
    }




  e.preventDefault();
}

function removeTask(e) {

  if( e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure ?')) {
        e.target.parentElement.parentElement.remove();
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }

  } else if (e.target.classList.contains('delete-item') ) {
    if(confirm('Are you sure ?')) {
        e.target.parentElement.remove();
        removeTaskFromLocalStorage(e.target.parentElement);
    }
  }
  e.preventDefault();
}

function clearTasks() {

  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  localStorage.clear();

}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    console.log(text);

    const listGroupItems = document.querySelectorAll('.list-group-item');

    listGroupItems.forEach(function (task) {
      console.log(task);
      const taskText = task.firstChild.textContent;

      if(taskText.toLowerCase().indexOf(text) >  -1) {
        console.log('block');
        task.style.setProperty('display','flex','important')
      } else {
          console.log('none');
          task.style.setProperty('display','none','important')
      }
        
    })
}