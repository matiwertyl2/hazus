var express = require('express')
, router = express.Router();
const fs = require('fs-extra');
const metadataStore = require('../backend/metadataStore');


router.get('/', function(req, res, next){
    metadataStore.getAllPagesPromise()
    .then(pages => {
        res.render('home.ejs', {
            pages: pages
        });
    })
    .catch(console.error);
});

module.exports = router;