const express = require('express');
const router = express.Router();
const boardsController = require('../controllers/boardsController');

router.get('/', boardsController.getAllBoards);
router.get('/:id', boardsController.getBoard);
router.post('/', boardsController.createBoard);
router.put('/:id', boardsController.updateBoardTitle);
router.delete('/:id', boardsController.deleteBoard);

module.exports = router;
