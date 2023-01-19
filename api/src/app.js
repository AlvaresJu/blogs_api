const express = require('express');
require('express-async-errors');

const loginRoutes = require('./routers/login.routes');
const userRoutes = require('./routers/user.routes');
const categoriesRoutes = require('./routers/categories.routes');
const blogPostRoutes = require('./routers/blogPost.routes');

const handleError = require('./middlewares/handleError');

const app = express();

app.use(express.json());

app.use('/login', loginRoutes);
app.use('/user', userRoutes);
app.use('/categories', categoriesRoutes);
app.use('/post', blogPostRoutes);

app.use(handleError);

module.exports = app;
