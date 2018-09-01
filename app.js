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



var home = require('./routes/home'),
    experience = require('./routes/experience'),
    education = require('./routes/education'),
    projects = require('./routes/projects'),
    upload = require('./routes/upload');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', home);
app.use('/experience', experience);
app.use('/education', education);
app.use('/projects', projects);
app.use('/upload', upload);

module.exports = app;
