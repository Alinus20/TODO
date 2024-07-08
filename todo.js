let clearAll = document.querySelector(".clear-btn");
let addMessage = document.querySelector('.message');
let addButton = document.querySelector('.add');
let count = 0;
todo = document.querySelector('.todo');
let todoList = [];

if (localStorage.getItem('todo')){
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

addButton.addEventListener('click', function(){

    let newTodo = {
        todo: addMessage.value,
        checked: false
    };
    todoList.push(newTodo);
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
});

function displayMessages(){
    let displayMessage ='';
    if(todoList.length === 0) todo.innerHTML='';
    todoList.forEach(function(item, i){
        displayMessage += `
        <li>
            <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
            <label for='item_${i}'>${item.todo}</label>
        </li>
        `;
        todo.innerHTML = displayMessage;
    });
}

todo.addEventListener('change', function(event){
 let idInput = event.target.getAttribute('id');
 let forLabel = todo.querySelector('[for='+idInput+']');
 let valueLabel = forLabel.innerHTML;
 todoList.forEach(function(item){
    if (item.todo === valueLabel){
        item.checked = !item.checked;
        localStorage.setItem('todo', JSON.stringify(todoList));
    }
 });
});

clearAll.addEventListener('click', function(){
    todoList.splice(0, todoList.length);
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
});

todo.addEventListener('contextmenu', function(event){
    event.preventDefault();
    todoList.forEach(function(item,i){
        if(item.todo === event.target.innerHTML){
            if(event.ctrlKey || event.metaKey)
            {
                todoList.splice(i,1);
            }

            if(event.altKey)
            {
                item.todo = addMessage.value;   
            }
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    })
 })

 
