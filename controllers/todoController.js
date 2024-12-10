const prisma = require('../prismaClient');

class TodoController {
	async create(req, res, next) {
		try {
			const { title } = req.body;
			const newTodo = await prisma.todo.create({
				data: {
					title,
				},
			});

			res.status(201).json(newTodo);
		} catch (err) {
			next(err);
		}
	}

	async delete(req, res, next) {
		try {
			const { id } = req.params;
			await prisma.todo.delete({
				where: { id: parseInt(id) },
			});
			res.status(204).send();
		} catch (err) {
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
			res.json(updatedTodo);
		} catch (err) {
			next(err);
		}
	}

	async getAll(req, res, next) {
		try {
			const todos = await prisma.todo.findMany();
			res.json(todos);
		} catch (err) {
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

			res.json(todo);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = new TodoController();
