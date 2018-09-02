var express = require('express')
, router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'data/archives' });
const {processArchive} = require('../backend/archiveManager');
const metadataStore = require('../backend/metadataStore');


router.get('/', function(req, res, next){
    metadataStore.getAllPagesPromise()
    .then(pages => {
        metadataStore.getAllPageContentsPromise()
        .then(pageContents => {
            pageContents = pageContents.sort((a, b) => {
                if (a.pageName < b.pageName) return -1;
                if (a.pageName > b.pageName) return 1;
                return a.name < b.name;
            });
            console.log(pageContents);
            res.render('upload.ejs', {pages : pages, pageContents : pageContents});
        });
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