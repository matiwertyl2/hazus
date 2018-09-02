var express = require("express")
    , path = require('path')
    , logger = require('morgan')
    , mongo = require('./config/mongo.js')
    , bodyParser = require('body-parser');

mongo.init();

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());



var page = require('./routes/page'),
    upload = require('./routes/upload'),
    update = require('./routes/update');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/page', page);
app.use('/upload', upload);
app.use('/update', update);

module.exports = app;
