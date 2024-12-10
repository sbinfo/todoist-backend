const { body, param } = require('express-validator');

const validateId = [param('id').isInt().withMessage('ID must be an integer')];

const validateTodo = [
	body('title').isString().notEmpty().withMessage('Title is required'),
];

const validateUpdateTodo = [
	body('title').optional().isString().withMessage('Title is required'),
	body('completed')
		.optional()
		.isBoolean()
		.withMessage('Completed must be a boolean'),
];

module.exports = {
	validateTodo,
	validateUpdateTodo,
	validateId,
};
