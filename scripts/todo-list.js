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
  todoList.forEach((todoObject, i) => {
    const {name, dueDate} = todoObject;
    const html = `
      <div class="todo-name">${name}</div>
      <div>${dueDate}</div>
      <button class="delete-todo-button js-delete-todo-button">Delete</button>
      `;
    todoListHTML += html;
  })
  
  document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML;
  
  document.querySelectorAll('.js-delete-todo-button').forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      todoList.splice(index, 1);
      renderTodoList();
      localSaveTodoList();
    })
  });
}

document.querySelector('.js-add-todo-button').    addEventListener('click', () => {
  addTodo();
})

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
