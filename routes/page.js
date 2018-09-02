var express = require('express')
, router = express.Router();
const metadataStore = require('../backend/metadataStore');
const path = require('path');
const fs = require('fs-extra');

router.get('/:name', function(req, res, next){
    console.log("getting page ", req.params.name);
    metadataStore.getPageContentsPromise(req.params.name)
    .then(
    (pageContents) => {
        console.log(pageContents);
        var contents = [];
        for (var pageContent of pageContents) {
            var pagePath = path.join(pageContent.pageContentDirectory, "page.html");
            var content = fs.readFileSync(pagePath).toString();
            contents.push(content);
        }     
        metadataStore.getAllPagesPromise()
        .then(pages => {
            res.render('page.ejs', {
                contents : contents, 
                pageName : req.params.name,
                pages: pages
            });
        });
    })
    .catch(console.error);
});


router.get('/:name/:resource', function(req, res, next){
    console.log("loading resource ", req.params.resource, "of page ", req.params.name);
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