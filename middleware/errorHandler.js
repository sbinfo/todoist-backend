const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
	// Логируем ошибку
	logger.error(err.message); // Логируем только сообщение
	logger.error(err.stack); // Логируем весь стек ошибки (для отладки)

	const statusCode = err.status || 500;

	res.status(statusCode).json({
		error: err.message || 'Internal Server Error',
	});
};

module.exports = errorHandler;
