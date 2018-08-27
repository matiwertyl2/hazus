var express = require("express"),
    path = require('path');


var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var home = require('./routes/home'),
    experience = require('./routes/experience'),
    education = require('./routes/education'),
    projects = require('./routes/projects');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', home);
app.use('/experience', experience);
app.use('/education', education);
app.use('/projects', projects);

module.exports = app;
