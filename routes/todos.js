const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/todoController');
const {
	validateTodo,
	validateUpdateTodo,
	validateId,
} = require('../middleware/validators/todoValidators');
const {
	validateRequest,
} = require('../middleware/validators/sharedValidators');

router
	.route('/')
	.post(validateTodo, validateRequest, TodoController.create)
	.get(TodoController.getAll);

router
	.route('/:id')
	.get(validateId, validateRequest, TodoController.getOne)
	.put(validateId, validateUpdateTodo, validateRequest, TodoController.update)
	.delete(validateId, validateRequest, TodoController.delete);

// router.post('/', validateTodo, validateRequest, TodoController.create);

// router.delete('/:id', validateId, validateRequest, TodoController.delete);

module.exports = router;
