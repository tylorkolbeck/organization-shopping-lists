require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var productsRouter = require('./routes/products');

var app = express();

// MONGOOSE SETUP
let mongoose = require('mongoose')
mongoose.connect(`${process.env.DB_HOST}`, { useNewUrlParser: true })

let db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection Error:'))
db.once('open', () =>  {
    console.log('Connected to mongoDB at ' + process.env.DB_HOST)
})


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/products', productsRouter);

module.exports = app;
