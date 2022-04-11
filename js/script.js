const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');
const btn = document.querySelector('.header-button');

let toDoData = [];

if (localStorage.getItem('toDo')) {
    toDoData = JSON.parse(localStorage.getItem('toDo'));
    render();
}

function render() {
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';

    toDoData.forEach(function (item) {
        const li = document.createElement('li');

        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        li.querySelector('.todo-complete').addEventListener('click', function () {
            item.completed = !item.completed;
            localStorage.setItem('toDo', JSON.stringify(toDoData));
            render();
        });
        li.querySelector('.todo-remove').addEventListener('click', function () {
            li.remove('li');
        });
    });
};


todoControl.addEventListener('submit', function (event) {
    event.preventDefault();

    const newToDo = {
        text: headerInput.value,
        completed: false
    };

    if (headerInput.value.trim() === '') {
        return alert('Введите ваш план!');
    }
    toDoData.push(newToDo);
    headerInput.value = '';
    render();
    localStorage.setItem('toDo', JSON.stringify(toDoData));
});