var unzip = require("unzip");
var fs = require("fs-extra");
const uniqid = require('uniqid');
const path = require('path');

const dataPath = 'data/pageSources';

function getDataDirectory () {
    return path.resolve(dataPath, uniqid());
}

function validateArchive(page)
{
    if (fs.existsSync(page) == false) {
        return {err : "Wrong archive format - no page.html" };
    }
    return true;  
}

function handleArchivePromise(archivePath) {
    return new Promise( (res, rej ) => {
        var datadir= getDataDirectory();
        fs.createReadStream(archivePath).pipe(unzip.Extract({path : datadir}))
            .on("close", () => {

                fs.removeSync(archivePath);
                var pagePath = path.join(datadir, "page.html");
                var validArch = validateArchive(pagePath); 
                
                if (validArch.err ) rej(validArch);
                else {
                    
                    res({
                        pageContentDirectory : datadir
                    });
                }
            })
            .on("error", () => {
                rej({err : "Wrong format of archive"});
        });
    });   
}

async function processArchive (archivePath) {
    try {
        var sub = await handleArchivePromise(archivePath);
        return sub;
    } catch(err) {
        return err;
    }
};

module.exports = {processArchive : processArchive};