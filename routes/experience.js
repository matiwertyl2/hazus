var express = require('express')
, router = express.Router();


router.get('/', function(req, res, next){
    res.render('experience.ejs');
});


module.exports = router;