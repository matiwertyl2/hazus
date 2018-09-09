var express = require('express')
, router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'data/archives' });
const {processArchive} = require('../backend/archiveManager');
const metadataStore = require('../backend/metadataStore');
const path = require('path');
const fs = require('fs-extra');

router.post('/:pageName/:contentName', (req, res, next) => {
    metadataStore.getPageContentPromise(req.params.contentName, req.params.pageName)
    .then(content => {
        var pagePath = path.join(content.pageContentDirectory, "page.html");
        fs.writeFileSync(pagePath, req.body.html);
        res.send(JSON.stringify({success : true}));
    })
    .catch(console.error);
});

router.get('/:pageName', (req, res, next) => {
    metadataStore.getPageContentsPromise(req.params.pageName)
    .then(contents => {
        var sortedContents = contents.sort((a, b) => {
            return a.rank > b.rank;
        });
        res.send(JSON.stringify({contents : sortedContents}));
    })
    .catch(console.error);
});

router.post('/:pageName', (req, res, next) => {
    console.log(req.body);
    metadataStore.updateAllPageContensRanks(req.params.pageName, req.body.names)
    .then(result => {
        res.send(JSON.stringify(result));
    })
});

module.exports = router;