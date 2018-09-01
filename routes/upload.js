var express = require('express')
, router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'data/archives' });
const {processArchive} = require('../backend/archiveManager');
const metadataStore = require('../backend/metadataStore');


router.get('/', function(req, res, next){
    res.render('upload.ejs');
});

router.post('/', upload.fields([{name: 'archive', maxCount: 1}]), (req, res) => {
        
    var archivePath = req.files.archive[0].path;
    processArchive(archivePath)
    .then(
    (sub) => {
        metadataStore.savePageContentPromise(sub.pageContentDirectory, req.body.name)
        .then(
        (pageContent) => {
            console.log(JSON.stringify(pageContent));
            res.send(JSON.stringify(pageContent));          
        })
    }).catch(console.error);
});


module.exports = router;