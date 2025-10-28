const {readData, writeData} = require('../utils/helpers')

//ADD TASK to board
const addTaskToBoard =  (req, res) => {
    const boardId = parseInt(req.params.id);
    const data = readData();
    const board = data.find(b => b.id === boardId);

    if (!board) {
        return res.status(404).json({ error: 'Board not found' });
    }
    const newTask = {
        id: board.tasks.length ? board.tasks[board.tasks.length - 1].id + 1 : 1,
        text: req.body.text
    };

    board.tasks.push(newTask)
    writeData(data);
    res.status(201).json({ success: true });
};

// DELETE task from board
const deleteTask =  (req, res) => {
    const boardId = parseInt(req.params.boardId);
    const taskId = parseInt(req.params.id);
    const data = readData();
    const board = data.find(b => b.id === boardId);

    if (!board) {
        return res.status(404).json({ error: 'Board not found' });
    }

    const initialLength = board.tasks.length;
    board.tasks = board.tasks.filter(task => task.id !== taskId);

    if (board.tasks.length === initialLength) {
        return res.status(404).json({ error: 'Task not found' });
    }

    writeData(data);
    res.status(201).json({ success: true });
};

const moveTask = (req, res) => {
    const boardId = parseInt(req.params.boardId);
    const taskId = parseInt(req.params.id);
    const { targetBoardId, targetIndex } = req.body;

    const data = readData();
    const sourceBoard = data.find(b => b.id === boardId);
    const destBoard = data.find(b => b.id === targetBoardId);

    if (!sourceBoard || !destBoard) {
        return res.status(404).json({ error: 'Board not found' });
    }

    const taskIndex = sourceBoard.tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return res.status(404).json({ error: 'Task not found' });

    const [task] = sourceBoard.tasks.splice(taskIndex, 1);

    destBoard.tasks.splice(targetIndex, 0, task);

    writeData(data);
    res.json({ success: true });
};

module.exports = { addTaskToBoard, deleteTask, moveTask };