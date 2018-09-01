var express = require('express')
, router = express.Router();
const fs = require('fs-extra');



router.get('/', function(req, res, next){
    res.render('home.ejs');
});

router.get('/img/logo_hazus.png', function(req, res, next){
    console.log("whbhbs");
    var img = fs.readFileSync('./public/img/logo_hazuss.png');
    res.writeHead(200, {'Content-Type': 'image/gif' });
    res.end(img, 'binary');
});


module.exports = router;