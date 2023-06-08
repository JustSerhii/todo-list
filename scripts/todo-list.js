let todoList = [{
  name: '',
  dueDate: ''}];

const storedTodoList = localStorage.getItem('todoList');
if (storedTodoList) {
  todoList = JSON.parse(storedTodoList);
}

renderTodoList();

function renderTodoList(){
  let todoListHTML = '';


  todoList.forEach(function(todoObject, i){
    const {name, dueDate} = todoObject;
    const html = `
      <div class="todo-name">${name}</div>
      <div>${dueDate}</div>
      <button onclick="
        todoList.splice(${i}, 1);
        renderTodoList();
        localSaveTodoList();
      " class="delete-todo-button">Delete</button>
      `;
    todoListHTML += html;
  })
  
  document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML;
}

function addTodo(){
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;
  
  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;  

  name === '' || dueDate === '' || name.length > 300 || todoList.push({
    name,
    dueDate
  }), localSaveTodoList();


  inputElement.value = '';
  console.log(todoList);
  renderTodoList();
}

function localSaveTodoList(){
  localStorage.setItem('todoList', JSON.stringify(todoList));
}
