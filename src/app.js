const express = require('express');
require('express-async-errors');

const loginRoutes = require('./routers/login.routes');
const handleError = require('./middlewares/handleError');

const app = express();

app.use(express.json());

app.use('/login', loginRoutes);

app.use((_req, res) => res.sendStatus(404));

app.use(handleError);

module.exports = app;