var express = require('express')
, router = express.Router();


router.get('/', function(req, res, next){
    res.render('projects.ejs');
});


module.exports = router;