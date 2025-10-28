const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');

router.post('/:id', tasksController.addTaskToBoard);
router.delete('/:boardId/:id', tasksController.deleteTask);
router.put('/:boardId/:id', tasksController.moveTask);


module.exports = router;


