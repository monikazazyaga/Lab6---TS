const myUL: HTMLUListElement | null = document.querySelector('.myUL');
const myInput: HTMLInputElement | null = document.querySelector('.myInput');
const addBtn: HTMLElement | null = document.querySelector('.addBtn');
const cleanBtn: HTMLElement | null = document.querySelector('.cleanBtn');
const filterLinks: NodeListOf<HTMLElement> = document.querySelectorAll('.filter-link');
const completedCount: HTMLElement | null = document.getElementById('completedCount');
const incompleteCount: HTMLElement | null = document.getElementById('incompleteCount');
const totalCount: HTMLElement | null = document.getElementById('totalCount');
const sortArrow: HTMLElement | null = document.querySelector('.sort-arrow');
const sortOptions: HTMLElement | null = document.querySelector('.sort-options');

document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('tasks') && myUL) {
        myUL.innerHTML = localStorage.getItem('tasks') || ''; 
       }

    updateTaskCount();
});

function updateLocalStorage(): void {
    if (myUL) {
        localStorage.setItem('tasks', myUL.innerHTML);
    }
}

function newElement(): void {
    if (myInput && myUL) {
        if (myInput.value.trim() === '') {
            alert("Вы должны что-то написать!");
            return;
        }

        const li = document.createElement("li");
        const inputValue = myInput.value;
        const t = document.createTextNode(inputValue.trim());
        li.appendChild(t);

        const editBtn = document.createElement("span");
        editBtn.className = "edit";
        editBtn.textContent = " ✎";
        li.appendChild(editBtn);

        const currentDate = new Date().toLocaleDateString();
        const dateSpan = document.createElement("span");
        dateSpan.textContent = ` (${currentDate})`;
        dateSpan.style.display = 'block';
        dateSpan.style.fontSize = '12px';
        dateSpan.style.marginLeft = '0px';
        li.appendChild(dateSpan);

        const closeBtn = document.createElement("span");
        closeBtn.className = "close";
        closeBtn.textContent = "\u00D7";
        li.appendChild(closeBtn);

        myUL.appendChild(li);
        myInput.value = "";

        updateTaskCount();
        updateLocalStorage();
        const whiteLine = document.querySelector('.white-line') as HTMLElement | null;
        const taskSummary = document.querySelector('.task-summary') as HTMLElement | null;
        if (whiteLine) whiteLine.classList.remove('inactive');
        if (taskSummary) taskSummary.classList.remove('inactive');

        checkTasks();
    }
}


function deleteAllElements(): void {
    if (myUL) {
        myUL.innerHTML = "";
        updateTaskCount();
        updateLocalStorage();
    }
}

function updateTaskCount(): void {
    if (myUL && totalCount && completedCount && incompleteCount) {
        const totalTasks: number = myUL.children.length;
        totalCount.querySelector('span')!.textContent = totalTasks.toString();

        let completedTasks: number = 0;
        let incompleteTasks: number = 0;

        for (let i = 0; i < myUL.children.length; i++) {
            if (myUL.children[i].classList.contains('checked')) {
                completedTasks++;
            } else {
                incompleteTasks++;
            }
        }

        completedCount.querySelector('span')!.textContent = completedTasks.toString();
        incompleteCount.querySelector('span')!.textContent = incompleteTasks.toString();

        const whiteLine = document.querySelector('.white-line') as HTMLElement;
        const taskSummary = document.querySelector('.task-summary') as HTMLElement;
        if (whiteLine) whiteLine.classList.remove('inactive');
        if (taskSummary) taskSummary.classList.remove('inactive');

        checkTasks();
    }
}

function sortTasksBy(criteria: 'newest' | 'oldest' | 'az' | 'za'): void {
    const tasksList: HTMLElement[] = Array.from(document.querySelectorAll('.myUL li'));

    tasksList.sort((a, b) => {
        if (criteria === 'newest') {
            return new Date(b.dataset.timestamp!).getTime() - new Date(a.dataset.timestamp!).getTime();
        } else if (criteria === 'oldest') {
            return new Date(a.dataset.timestamp!).getTime() - new Date(b.dataset.timestamp!).getTime();
        } else if (criteria === 'az') {
            return a.innerText.localeCompare(b.innerText);
        } else if (criteria === 'za') {
            return b.innerText.localeCompare(a.innerText);
        }
        return 0;
    });

    const myUL = document.querySelector('.myUL') as HTMLElement | null;
    if (myUL) {
        myUL.innerHTML = '';
        tasksList.forEach(task => myUL.appendChild(task));
    }
}

function filterTasks(status: string): void {
    const tasks: NodeListOf<HTMLLIElement> = document.querySelectorAll('.myUL li');

    tasks.forEach((task: HTMLLIElement) => {
        task.style.display = 'block'; // Показываем все дела
        if (status === 'completed' && !task.classList.contains('checked')) {
            task.style.display = 'none'; // Скрываем несделанные дела
        } else if (status === 'incomplete' && task.classList.contains('checked')) {
            task.style.display = 'none'; // Скрываем сделанные дела
        }
    });
}

if (myUL) {
    myUL.addEventListener('click', (ev: MouseEvent) => {
        const target = ev.target as HTMLElement;
        if (target.tagName === 'LI') {
            target.classList.toggle('checked');
            updateTaskCount();
            updateLocalStorage();
        } else if (target.classList.contains('close')) {
            target.parentElement?.remove();
            updateTaskCount();
            updateLocalStorage();
        }
    });
}

filterLinks.forEach((link: HTMLElement) => {
    link.addEventListener('click', function(this: HTMLElement) {
        filterLinks.forEach((elem: HTMLElement) => elem.classList.remove('active'));
        this.classList.add('active');

        const filter: string = this.id;
        myUL?.childNodes.forEach((item: Node) => {
            if (item instanceof HTMLElement) {
                const itemElement: HTMLElement = item;
                
                if (filter === 'all') {
                    itemElement.style.display = 'block';
                } else if (filter === 'completed' && itemElement.classList.contains('checked')) {
                    itemElement.style.display = 'block';
                } else if (filter === 'incomplete' && !itemElement.classList.contains('checked')) {
                    itemElement.style.display = 'block';
                } else {
                    itemElement.style.display = 'none';
                }
            }
        });
    });
});

if (sortOptions) {
    sortOptions.addEventListener('click', (ev: MouseEvent) => {
        const target = ev.target as HTMLElement;
        if (target.tagName === 'A' && myUL) {
            const sortOption = target.textContent || '';
            const allTasks = Array.from(myUL.children);

            if (sortOption === 'Самые новые') {
                allTasks.sort((a, b) => Number(b.getAttribute('data-timestamp') || '0') - Number(a.getAttribute('data-timestamp') || '0'));
            } else if (sortOption === 'Самые старые') {
                allTasks.sort((a, b) => Number(a.getAttribute('data-timestamp') || '0') - Number(b.getAttribute('data-timestamp') || '0'));
            } else if (sortOption === 'А-Я') {
                allTasks.sort((a, b) => (a.textContent || '').localeCompare(b.textContent || ''));
            } else if (sortOption === 'Я-А') {
                allTasks.sort((a, b) => (b.textContent || '').localeCompare(a.textContent || ''));
            }

            allTasks.forEach((task: Element) => myUL?.appendChild(task));
        }
    });
}


if (sortArrow) {
    sortArrow.addEventListener('click', () => {
        if (sortOptions) {
            sortOptions.style.display = sortOptions.style.display === 'none' ? 'block' : 'none';
        }
    });
}

function setActiveButton(buttonId: string): void {
    const buttons: NodeListOf<Element> = document.querySelectorAll('.count');
    buttons.forEach((button: Element) => {
        if (button.id === buttonId) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

function checkTasks(): void {
    const tasks: NodeListOf<HTMLLIElement> = document.querySelectorAll('li');
    const whiteLine: HTMLElement | null = document.querySelector('.white-line');
    const taskSummary: HTMLElement | null = document.querySelector('.task-summary');
    const placeholder: HTMLElement | null = document.querySelector('.placeholder');

    if (tasks.length === 0) {
        if (whiteLine) whiteLine.classList.add('inactive');
        if (taskSummary) taskSummary.classList.add('inactive');
        if (placeholder) placeholder.classList.add('hidden');
    } else {
        if (placeholder) placeholder.classList.remove('hidden');
    }
}

document.addEventListener('click', (event: MouseEvent) => {
    if (event.target instanceof Element) {
        if (event.target.classList.contains('edit') && event.target.parentElement && !event.target.parentElement.classList.contains('checked')) {
            const listItem: Element = event.target.parentElement;
            const taskText: string = (listItem.firstChild?.nodeValue || '').trim();

            const editInput: HTMLInputElement = document.createElement('input');
            editInput.type = 'text';
            editInput.value = taskText;
            editInput.className = 'edit-input';

            if (listItem.firstChild) {
                listItem.replaceChild(editInput, listItem.firstChild);
            }

            editInput.focus();

            editInput.addEventListener('keypress', (e: KeyboardEvent) => {
                if (e.key === 'Enter') {
                    const newTaskText: string = editInput.value.trim();
                    if (newTaskText !== '') {
                        if (listItem) listItem.replaceChild(document.createTextNode(newTaskText), editInput);
                    } else {
                        alert('Текст задачи не может быть пустым!');
                    }
                }
            });
        } else if (event.target.classList.contains('edit') && event.target.parentElement && event.target.parentElement.classList.contains('checked')) {
            alert('Нельзя редактировать выполненное дело!');
        }
    }
});

checkTasks();
