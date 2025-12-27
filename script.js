let todos = [];
let currentFilter = 'all';
let todoId = 0;

function loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
        todoId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 0;
    }
    renderTodos();
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();

    if (text === '') {
        return;
    }

    const todo = {
        id: todoId++,
        text: text,
        completed: false
    };

    todos.push(todo);
    input.value = '';
    saveTodos();
    renderTodos();
}

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
    }
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    saveTodos();
    renderTodos();
}

function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const newText = prompt('Edit task:', todo.text);
    if (newText !== null && newText.trim() !== '') {
        todo.text = newText.trim();
        saveTodos();
        renderTodos();
    }
}

function filterTodos(filter) {
    currentFilter = filter;

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
    renderTodos();
}

function clearCompleted() {
    todos = todos.filter(t => !t.completed);
    saveTodos();
    renderTodos();
}

function getFilteredTodos() {
    switch(currentFilter) {
        case 'active':
            return todos.filter(t => !t.completed);
        case 'completed':
            return todos.filter(t => t.completed);
        default:
            return todos;
    }
}

function renderTodos() {
    const todoList = document.getElementById('todoList');
    const itemCount = document.getElementById('itemCount');
    const filteredTodos = getFilteredTodos();

    todoList.innerHTML = '';

    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

        li.innerHTML = `
            <div class="todo-content">
                <input type="checkbox"
                       ${todo.completed ? 'checked' : ''}
                       onchange="toggleTodo(${todo.id})" />
                <span class="todo-text">${escapeHtml(todo.text)}</span>
            </div>
            <div class="todo-actions">
                <button class="edit-btn" onclick="editTodo(${todo.id})">Edit</button>
                <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
            </div>
        `;

        todoList.appendChild(li);
    });

    const activeCount = todos.filter(t => !t.completed).length;
    itemCount.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

document.getElementById('todoInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});

loadTodos();
