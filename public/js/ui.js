//ui.js

export const renderBoards = (container, boardsData) => {
    container.innerHTML = boardsData.map(board => `
        <div class="boards__item" data-board-id="${board.id}">
            <span contenteditable="true" class="title">${board.title}</span>

            ${board.id !== 1 ? `<button class="delete__btn">X</button>` : ''}

            <div class="list">
                ${board.tasks.map(task => `
                    <div class="list__item" draggable="true" data-task-id="${task.id}">${task.text}</div>
                `).join('')}
            </div>

            ${board.id === 1
            ? `
                    <div class="form">
                        <textarea class="textarea" placeholder="Enter name for the task"></textarea>
                        <div class="buttons">
                            <button class="add__item-btn">Add</button>
                            <button class="cancel__item-btn">Cancel</button>
                        </div>
                    </div>

                    <div class="add__btn">
                        <span>+</span> Add card
                    </div>
                `
            : ''
        }
        </div>
    `).join('');
}