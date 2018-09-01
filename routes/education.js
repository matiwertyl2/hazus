var express = require('express')
, router = express.Router();
const metadataStore = require('../backend/metadataStore');
const path = require('path');
const fs = require('fs-extra');

router.get('/', function(req, res, next){
    metadataStore.getPageContentPromise('name')
    .then(
    (res, rej) =>
    {
        console.log(res);   
    });
    res.render('education.ejs');
});

router.get('/:name', function(req, res, next){
    metadataStore.getPageContentPromise(req.params.name)
    .then(
    (pageContent) => {
        var pagePath = path.join(pageContent.pageContentDirectory, "page.html");
        var content = fs.readFileSync(pagePath).toString();
        res.render('education.ejs', {content : content});
    })
    .catch(console.error);
});

router.get('/:name/:resource', function(req, res, next){
    metadataStore.getPageContentPromise(req.params.name)
    .then(
    (pageContent) =>{
        var resourcePath = path.join(pageContent.pageContentDirectory, req.params.resource);
        var file = fs.readFileSync(resourcePath);
        res.writeHead(200, {'Content-Type': 'image/gif' });
        res.end(file, 'binary');
    })
    .catch(console.error);
});


module.exports = router;