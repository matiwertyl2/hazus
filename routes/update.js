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

module.exports = router;