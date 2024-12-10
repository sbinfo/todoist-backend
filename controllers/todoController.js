const prisma = require('../prismaClient');
const logger = require('../utils/logger');

class TodoController {
	async create(req, res, next) {
		try {
			const { title } = req.body;
			const newTodo = await prisma.todo.create({
				data: {
					title,
				},
			});

			logger.info(`Todo created: ${JSON.stringify(newTodo)}`);

			res.status(201).json(newTodo);
		} catch (err) {
			logger.error(`Error creating Todo: ${err.message}`);
			next(err);
		}
	}

	async delete(req, res, next) {
		try {
			const { id } = req.params;
			await prisma.todo.delete({
				where: { id: parseInt(id) },
			});
			logger.info(`Todo with id:${id} is deleted`);
			res.status(204).send();
		} catch (err) {
			logger.error(`Error deleting todo: ${err.message}`);
			next(err);
		}
	}

	async update(req, res, next) {
		try {
			const { id } = req.params;
			const { title, completed } = req.body;
			const updatedTodo = await prisma.todo.update({
				where: { id: parseInt(id) },
				data: { title, completed },
			});
			logger.info(`Todo is updated: ${JSON.stringify(updatedTodo)}`);
			res.json(updatedTodo);
		} catch (err) {
			logger.error(`Error updating todo: ${err.message}`);
			next(err);
		}
	}

	async getAll(req, res, next) {
		try {
			const todos = await prisma.todo.findMany();
			logger.info(`Fetched all todos, count: ${todos.length}`);
			res.json(todos);
		} catch (err) {
			logger.error(`Error fetching todos: ${err.message}`);
			next(err);
		}
	}

	async getOne(req, res, next) {
		try {
			const { id } = req.params;
			const todo = await prisma.todo.findUnique({
				where: { id: parseInt(id) },
			});

			if (!todo) {
				const error = new Error('Todo not Found!');
				error.status = 404;
				throw error;
			}

			logger.info(`Fetched Todo: ${JSON.stringify(todo)}`);
			res.json(todo);
		} catch (err) {
			logger.error(`Error fetching todo: ${err.message}`);
			next(err);
		}
	}
}

module.exports = new TodoController();
