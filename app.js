const express = require('express');
const jokesRoute = require('./routes/jokesRoute');
const app = express();

app.use('/jokes', jokesRoute);

app.all('*', (req, res, next) => {
    next(new Error(`Unable to find ${req.originalUrl}`, 404));
})

module.exports = app;