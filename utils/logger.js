const { createLogger, format, transports } = require('winston');

// Форматирование логов
const logFormat = format.combine(
	format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Добавляем метку времени
	format.printf(
		({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`
	)
);

// Создаём логгер
const logger = createLogger({
	level: 'info', // Минимальный уровень логов (info и выше)
	format: logFormat,
	transports: [
		new transports.Console(), // Логирование в консоль
		new transports.File({ filename: 'logs/error.log', level: 'error' }), // Логи ошибок
		new transports.File({ filename: 'logs/combined.log' }), // Все логи
	],
});

module.exports = logger;
