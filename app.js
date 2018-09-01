//const createError = require('http-errors');
const express = require('express');
const path = require('path');
const favicon = require('static-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const toDosRouter = require('./routes/toDos');

const app = express();

const DB_USER = 'maryana';
const DB_PASSWORD = 'logic10';
mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@ds121345.mlab.com:21345/maryana`);
//mongoose.connect(`mongodb://127.0.0.1:27017`);
//express is like middleware(stack of function) to parse the request
//middleware: logger, express.json, etc
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/', routes);
app.use('/todos', toDosRouter);


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
