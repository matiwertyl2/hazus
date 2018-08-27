var express = require('express')
, router = express.Router();


router.get('/', function(req, res, next){
    res.render('home.ejs');
});


module.exports = router;