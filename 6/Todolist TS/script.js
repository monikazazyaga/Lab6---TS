var myUL = document.querySelector('.myUL');
var myInput = document.querySelector('.myInput');
var addBtn = document.querySelector('.addBtn');
var cleanBtn = document.querySelector('.cleanBtn');
var filterLinks = document.querySelectorAll('.filter-link');
var completedCount = document.getElementById('completedCount');
var incompleteCount = document.getElementById('incompleteCount');
var totalCount = document.getElementById('totalCount');
var sortArrow = document.querySelector('.sort-arrow');
var sortOptions = document.querySelector('.sort-options');
document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('tasks') && myUL) {
        myUL.innerHTML = localStorage.getItem('tasks') || '';
    }
    updateTaskCount();
});
function updateLocalStorage() {
    if (myUL) {
        localStorage.setItem('tasks', myUL.innerHTML);
    }
}
function newElement() {
    if (myInput && myUL) {
        if (myInput.value.trim() === '') {
            alert("Вы должны что-то написать!");
            return;
        }
        var li = document.createElement("li");
        var inputValue = myInput.value;
        var t = document.createTextNode(inputValue.trim());
        li.appendChild(t);
        var editBtn = document.createElement("span");
        editBtn.className = "edit";
        editBtn.textContent = " ✎";
        li.appendChild(editBtn);
        var currentDate = new Date().toLocaleDateString();
        var dateSpan = document.createElement("span");
        dateSpan.textContent = " (".concat(currentDate, ")");
        dateSpan.style.display = 'block';
        dateSpan.style.fontSize = '12px';
        dateSpan.style.marginLeft = '0px';
        li.appendChild(dateSpan);
        var closeBtn = document.createElement("span");
        closeBtn.className = "close";
        closeBtn.textContent = "\u00D7";
        li.appendChild(closeBtn);
        myUL.appendChild(li);
        myInput.value = "";
        updateTaskCount();
        updateLocalStorage();
        var whiteLine = document.querySelector('.white-line');
        var taskSummary = document.querySelector('.task-summary');
        if (whiteLine)
            whiteLine.classList.remove('inactive');
        if (taskSummary)
            taskSummary.classList.remove('inactive');
        checkTasks();
    }
}
function deleteAllElements() {
    if (myUL) {
        myUL.innerHTML = "";
        updateTaskCount();
        updateLocalStorage();
    }
}
function updateTaskCount() {
    if (myUL && totalCount && completedCount && incompleteCount) {
        var totalTasks = myUL.children.length;
        totalCount.querySelector('span').textContent = totalTasks.toString();
        var completedTasks = 0;
        var incompleteTasks = 0;
        for (var i = 0; i < myUL.children.length; i++) {
            if (myUL.children[i].classList.contains('checked')) {
                completedTasks++;
            }
            else {
                incompleteTasks++;
            }
        }
        completedCount.querySelector('span').textContent = completedTasks.toString();
        incompleteCount.querySelector('span').textContent = incompleteTasks.toString();
        var whiteLine = document.querySelector('.white-line');
        var taskSummary = document.querySelector('.task-summary');
        if (whiteLine)
            whiteLine.classList.remove('inactive');
        if (taskSummary)
            taskSummary.classList.remove('inactive');
        checkTasks();
    }
}
function sortTasksBy(criteria) {
    var tasksList = Array.from(document.querySelectorAll('.myUL li'));
    tasksList.sort(function (a, b) {
        if (criteria === 'newest') {
            return new Date(b.dataset.timestamp).getTime() - new Date(a.dataset.timestamp).getTime();
        }
        else if (criteria === 'oldest') {
            return new Date(a.dataset.timestamp).getTime() - new Date(b.dataset.timestamp).getTime();
        }
        else if (criteria === 'az') {
            return a.innerText.localeCompare(b.innerText);
        }
        else if (criteria === 'za') {
            return b.innerText.localeCompare(a.innerText);
        }
        return 0;
    });
    var myUL = document.querySelector('.myUL');
    if (myUL) {
        myUL.innerHTML = '';
        tasksList.forEach(function (task) { return myUL.appendChild(task); });
    }
}
function filterTasks(status) {
    var tasks = document.querySelectorAll('.myUL li');
    tasks.forEach(function (task) {
        task.style.display = 'block'; // Показываем все дела
        if (status === 'completed' && !task.classList.contains('checked')) {
            task.style.display = 'none'; // Скрываем несделанные дела
        }
        else if (status === 'incomplete' && task.classList.contains('checked')) {
            task.style.display = 'none'; // Скрываем сделанные дела
        }
    });
}
if (myUL) {
    myUL.addEventListener('click', function (ev) {
        var _a;
        var target = ev.target;
        if (target.tagName === 'LI') {
            target.classList.toggle('checked');
            updateTaskCount();
            updateLocalStorage();
        }
        else if (target.classList.contains('close')) {
            (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
            updateTaskCount();
            updateLocalStorage();
        }
    });
}
filterLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        filterLinks.forEach(function (elem) { return elem.classList.remove('active'); });
        this.classList.add('active');
        var filter = this.id;
        myUL === null || myUL === void 0 ? void 0 : myUL.childNodes.forEach(function (item) {
            if (item instanceof HTMLElement) {
                var itemElement = item;
                if (filter === 'all') {
                    itemElement.style.display = 'block';
                }
                else if (filter === 'completed' && itemElement.classList.contains('checked')) {
                    itemElement.style.display = 'block';
                }
                else if (filter === 'incomplete' && !itemElement.classList.contains('checked')) {
                    itemElement.style.display = 'block';
                }
                else {
                    itemElement.style.display = 'none';
                }
            }
        });
    });
});
if (sortOptions) {
    sortOptions.addEventListener('click', function (ev) {
        var target = ev.target;
        if (target.tagName === 'A' && myUL) {
            var sortOption = target.textContent || '';
            var allTasks = Array.from(myUL.children);
            if (sortOption === 'Самые новые') {
                allTasks.sort(function (a, b) { return Number(b.getAttribute('data-timestamp') || '0') - Number(a.getAttribute('data-timestamp') || '0'); });
            }
            else if (sortOption === 'Самые старые') {
                allTasks.sort(function (a, b) { return Number(a.getAttribute('data-timestamp') || '0') - Number(b.getAttribute('data-timestamp') || '0'); });
            }
            else if (sortOption === 'А-Я') {
                allTasks.sort(function (a, b) { return (a.textContent || '').localeCompare(b.textContent || ''); });
            }
            else if (sortOption === 'Я-А') {
                allTasks.sort(function (a, b) { return (b.textContent || '').localeCompare(a.textContent || ''); });
            }
            allTasks.forEach(function (task) { return myUL === null || myUL === void 0 ? void 0 : myUL.appendChild(task); });
        }
    });
}
if (sortArrow) {
    sortArrow.addEventListener('click', function () {
        if (sortOptions) {
            sortOptions.style.display = sortOptions.style.display === 'none' ? 'block' : 'none';
        }
    });
}
function setActiveButton(buttonId) {
    var buttons = document.querySelectorAll('.count');
    buttons.forEach(function (button) {
        if (button.id === buttonId) {
            button.classList.add('active');
        }
        else {
            button.classList.remove('active');
        }
    });
}
function checkTasks() {
    var tasks = document.querySelectorAll('li');
    var whiteLine = document.querySelector('.white-line');
    var taskSummary = document.querySelector('.task-summary');
    var placeholder = document.querySelector('.placeholder');
    if (tasks.length === 0) {
        if (whiteLine)
            whiteLine.classList.add('inactive');
        if (taskSummary)
            taskSummary.classList.add('inactive');
        if (placeholder)
            placeholder.classList.add('hidden');
    }
    else {
        if (placeholder)
            placeholder.classList.remove('hidden');
    }
}
document.addEventListener('click', function (event) {
    var _a;
    if (event.target instanceof Element) {
        if (event.target.classList.contains('edit') && event.target.parentElement && !event.target.parentElement.classList.contains('checked')) {
            var listItem_1 = event.target.parentElement;
            var taskText = (((_a = listItem_1.firstChild) === null || _a === void 0 ? void 0 : _a.nodeValue) || '').trim();
            var editInput_1 = document.createElement('input');
            editInput_1.type = 'text';
            editInput_1.value = taskText;
            editInput_1.className = 'edit-input';
            if (listItem_1.firstChild) {
                listItem_1.replaceChild(editInput_1, listItem_1.firstChild);
            }
            editInput_1.focus();
            editInput_1.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    var newTaskText = editInput_1.value.trim();
                    if (newTaskText !== '') {
                        if (listItem_1)
                            listItem_1.replaceChild(document.createTextNode(newTaskText), editInput_1);
                    }
                    else {
                        alert('Текст задачи не может быть пустым!');
                    }
                }
            });
        }
        else if (event.target.classList.contains('edit') && event.target.parentElement && event.target.parentElement.classList.contains('checked')) {
            alert('Нельзя редактировать выполненное дело!');
        }
    }
});
checkTasks();
