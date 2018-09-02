var express = require('express')
, router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'data/archives' });
const {processArchive} = require('../backend/archiveManager');
const metadataStore = require('../backend/metadataStore');


router.get('/', function(req, res, next){
    metadataStore.getAllPagesPromise()
    .then(pages => {
        console.log("pages ", pages);
        for (var page of pages)
        {
            console.log(page);
        }
        res.render('upload.ejs', {pages : pages});
    })
    .catch(console.error);
});

router.post('/', upload.fields([{name: 'archive', maxCount: 1}]), (req, res) => {
    var archivePath = req.files.archive[0].path;
    processArchive(archivePath)
    .then(
    (sub) => {
        metadataStore.savePageContentPromise(
            sub.pageContentDirectory, 
            req.body.pageName, 
            req.body.name)
        .then(
        (pageContent) => {
            console.log(JSON.stringify(pageContent));
            res.send(JSON.stringify(pageContent));          
        })
    }).catch(console.error);
});

router.post('/page', (req, res) => {
    metadataStore.savePagePromise(req.body.name)
    .then(page => {
        res.send(JSON.stringify(page));
    }).catch(console.error);

});


module.exports = router;