require('dotenv').config()
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let productsRouter = require('./routes/products');
let shoppingListRouter = require('./routes/shoppingList')

let app = express();

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

// CORS CONFIGURATION
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

// Routes
app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/shoppingLists', shoppingListRouter);

module.exports = app;
