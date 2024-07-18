// ページ要素を取得
let note = document.querySelector('#note');
let getData = document.querySelector('#input-data');
let NewTodo = document.querySelector('#create');
let UpdateTodo = document.querySelector('#update');
let ChangeStatus = document.querySelector('#change');
let DeleteTodo = document.querySelector('#delete');

// TODOリストを表示する
function listTodos() {
    let notes = JSON.parse(localStorage.getItem('Notes')) || [];
    if (notes.length === 0) {
        note.innerHTML = '<div class="note-items">まだTODOがありません。</div>';
    } else {
        note.innerHTML = '';
        notes.forEach(todo => {
            let statusIcon = todo.status === 'done' ? '<i class="fas fa-check"></i>' : '<i class="fas fa-times"></i>';
            let todoItem = `<div class="note-items row col-md-12">
                                <label class="todo-items">
                                    <input class="checkerbox-swicher check-items" name="items${todo.id}" type="checkbox" value="0">
                                </label>
                                <sapn class="todo-items col-md-8 todo-content">${todo.todo}</sapn>
                                <sapn class="todo-items col-md-2">${statusIcon}</sapn>
                                <sapn class="todo-items col-md-2">${todo.time}</sapn>
                            </div>`;
            note.innerHTML += todoItem;
        });
    }
}

// TODOを追加する
function addTodo() {
    if (getData.value.trim() !== '') {
        let date = new Date();
        let newTodo = {
            todo: getData.value.trim(),
            status: 'undone',
            time: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
        };
        let notes = JSON.parse(localStorage.getItem('Notes')) || [];
        notes.push(newTodo);
        localStorage.setItem('Notes', JSON.stringify(notes));
        getData.value = '';
    } else {
        alert('空白は入力しないでください！');
    }
}

// TODOを削除する
function deleteTodo() {
    let checkItems = document.querySelectorAll('.check-items');
    let notes = JSON.parse(localStorage.getItem('Notes')) || [];
    checkItems.forEach((checkbox, index) => {
        if (checkbox.checked && checkbox.name.startsWith('items')) {
            notes.splice(index, 1);
        }
    });
    localStorage.setItem('Notes', JSON.stringify(notes));
}

// TODOの状態を更新する
function updateTodoStatus() {
    let checkItems = document.querySelectorAll('.check-items');
    let notes = JSON.parse(localStorage.getItem('Notes')) || [];
    checkItems.forEach((checkbox, index) => {
        if (checkbox.checked && checkbox.name.startsWith('items')) {
            notes[index].status = notes[index].status === 'done' ? 'undone' : 'done';
        }
    });
    localStorage.setItem('Notes', JSON.stringify(notes));
}

// ページの読み込み完了時に実行
window.onload = function () {
    listTodos();
};

// ボタンのクリックイベントをバインドする
NewTodo.addEventListener('click', function () {
    addTodo();
    listTodos();
});
UpdateTodo.addEventListener('click', function () {
    updateTodoStatus();
    listTodos();
});
ChangeStatus.addEventListener('click', function () {
    updateTodoStatus();
    listTodos();
});
DeleteTodo.addEventListener('click', function () {
    deleteTodo();
    listTodos();
});
