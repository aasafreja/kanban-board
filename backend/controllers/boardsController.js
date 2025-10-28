const {readData, writeData} = require('../utils/helpers')

const getAllBoards = (req , res) => {
    const data = readData();
    res.json(data);
};

const getBoard = (req, res) => {
    const boardId = parseInt(req.params.id);
    const data = readData();
    const board = data.find(b => b.id === boardId);
    res.json(board);
};

const createBoard =  (req, res) => {
    const data = readData();
    const newBoard = {
        id: data.length ? data[data.length - 1].id + 1 : 1, // auto-increment id
        title: req.body.title || 'Add title for this panel',
        tasks: []
    };

    data.push(newBoard);
    writeData(data);
    res.status(201).json(newBoard);
};


const updateBoardTitle =  (req, res) => {
    const boardId = parseInt(req.params.id);
    let data = readData();
    const board = data.find(b => b.id === boardId);
    const newTitle = req.body.title

    board.title = newTitle
    writeData(data);
    res.json({ success: true });
};


const deleteBoard =  (req, res) => {
    const boardId = parseInt(req.params.id);
    let data = readData();
    const updatedData = data.filter(board => board.id !== boardId)
    writeData(updatedData);
    res.json({ success: true });
};

module.exports = {
    getAllBoards,
    getBoard,
    createBoard,
    updateBoardTitle,
    deleteBoard
};