// Централизованный обработчик ошибок
const errorHandler = (err, req, res, next) => {
	// Логирование ошибки в консоль (для продакшена можно использовать winston или другую библиотеку)
	console.error(err.stack);

	// Определяем статус ошибки
	const statusCode = err.status || 500;

	// Возвращаем унифицированный ответ клиенту
	res.status(statusCode).json({
		error: err.message || 'Internal Server Error',
	});
};

module.exports = errorHandler;
