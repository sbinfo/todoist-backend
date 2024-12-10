require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const todosRouter = require('./routes/todos');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/todos', todosRouter);

// Централизованная обработка ошибок (должна быть последней!)
app.use(errorHandler);

module.exports = app;
