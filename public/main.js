// main.js
import {
    getBoards,
    createBoard,
    deleteBoard,
    addTask,
    updateBoardTitle,
    deleteTask,
    moveTask
} from './js/api.js';
import { renderBoards } from './js/ui.js';

const boardsContainer = document.querySelector('.boards');
const addBoardBtn = document.querySelector('.button');

// === Load and Render Boards ===
const loadBoards = async () => {
    try {
        const boardsData = await getBoards();
        renderBoards(boardsContainer, boardsData);
        handleTaskForm();
        dragAndDrop();
    } catch (err) {
        console.error(err);
        alert("Failed to load boards. Please try again later.");
    }
};

// === Add New Board ===
addBoardBtn.addEventListener('click', async () => {
    try {
        await createBoard();
        await loadBoards();
    } catch (err) {
        console.error(err);
        alert("Couldn't create board. Try again later.");
    }
});

// === Delete Board ===
boardsContainer.addEventListener('click', async (e) => {
    const boardEl = e.target.closest('.boards__item');
    if (!boardEl) return;

    const boardId = boardEl.dataset.boardId;

    if (e.target.classList.contains('delete__btn')) {
        try {
            await deleteBoard(boardId);
            await loadBoards();
        } catch (err) {
            console.error(err);
            alert("Failed to delete board. Please try again.");
        }
    }
});

// === Delete Task (on double-click) ===
boardsContainer.addEventListener('dblclick', async (e) => {
    const item = e.target.closest('.list__item');
    if (!item) return;

    const board = item.closest('.boards__item');

    try {
        await deleteTask(board.dataset.boardId, item.dataset.taskId);
        await loadBoards();
    } catch (err) {
        console.error(err);
        alert("Failed to delete task. Please try again.");
    }
});

// === Editable Title (Clear Placeholder Text) ===
boardsContainer.addEventListener('focusin', (e) => {
    if (!e.target.classList.contains('title')) return;
    if (e.target.textContent.trim() === 'Add title for this panel') {
        e.target.textContent = '';
    }
});

// === Update Board Title ===
boardsContainer.addEventListener('focusout', async (e) => {
    if (!e.target.classList.contains('title')) return;

    const boardEl = e.target.closest('.boards__item');
    const boardId = boardEl.dataset.boardId;
    const newTitle = e.target.textContent.trim();
    if (!newTitle) return;

    try {
        await updateBoardTitle(boardId, newTitle);
        await loadBoards();
    } catch (err) {
        console.error(err);
        alert("Failed to update board title. Please try again.");
    }
});

// === Task Form for the First Board ===
const handleTaskForm = () => {
    const firstBoard = boardsContainer.querySelector('.boards__item[data-board-id="1"]');
    if (!firstBoard) return;

    const form = firstBoard.querySelector('.form');
    const textarea = form.querySelector('.textarea');
    const addBtn = form.querySelector('.add__item-btn');
    const cancelBtn = form.querySelector('.cancel__item-btn');
    const openBtn = firstBoard.querySelector('.add__btn');

    let inputValue = '';

    openBtn.addEventListener('click', () => {
        form.style.display = 'block';
        openBtn.style.display = 'none';
        addBtn.style.display = 'none';
        textarea.focus();
    });

    textarea.addEventListener('input', (e) => {
        inputValue = e.target.value;
        addBtn.style.display = inputValue.trim() ? 'block' : 'none';
    });

    cancelBtn.addEventListener('click', () => {
        textarea.value = '';
        inputValue = '';
        form.style.display = 'none';
        openBtn.style.display = 'block';
        addBtn.style.display = 'none';
    });

    addBtn.addEventListener('click', async () => {
        if (!inputValue.trim()) return;

        try {
            await addTask(1, inputValue.trim());
            textarea.value = '';
            inputValue = '';
            form.style.display = 'none';
            openBtn.style.display = 'block';
            addBtn.style.display = 'none';
            await loadBoards();
        } catch (err) {
            console.error(err);
            alert("Failed to add task. Please try again.");
        }
    });
};

// === Drag and Drop Tasks Between Boards ===
const dragAndDrop = () => {
    const listItems = document.querySelectorAll('.list__item');
    const lists = document.querySelectorAll('.list');
    let draggedItem = null;
    let sourceBoardId = null;
    let taskId = null;

    listItems.forEach(item => {
        item.addEventListener('dragstart', e => {
            const boardElement = e.target.closest('.boards__item');
            sourceBoardId = parseInt(boardElement.dataset.boardId);
            taskId = parseInt(item.dataset.taskId);

            draggedItem = item;
            setTimeout(() => {
                item.style.display = 'none';
            }, 0);
        });

        item.addEventListener('dragend', () => {
            setTimeout(() => {
                item.style.display = 'block';
                draggedItem = null;
            }, 0);
        });
    });

    lists.forEach(list => {
        list.addEventListener('dragover', e => e.preventDefault());

        list.addEventListener('dragenter', e => {
            e.preventDefault();
            list.style.backgroundColor = 'rgba(0,0,0,.1)';
        });

        list.addEventListener('dragleave', () => {
            list.style.backgroundColor = 'transparent';
        });

        list.addEventListener('drop', async e => {
            e.preventDefault();
            list.style.backgroundColor = 'transparent';

            const boardElement = list.closest('.boards__item');
            const targetBoardId = parseInt(boardElement.dataset.boardId);

            list.appendChild(draggedItem);

            const targetIndex = Array.from(list.children).indexOf(draggedItem);

            try {
                await moveTask(sourceBoardId, taskId, targetBoardId, targetIndex);
                await loadBoards();
            } catch (err) {
                console.error(err);
                alert("Failed to move task. Please try again.");
            }
        });
    });
};

// === Initialize ===
window.addEventListener('DOMContentLoaded', loadBoards);
