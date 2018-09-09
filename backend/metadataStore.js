const PageContent = require('../models/PageContent');
const Page = require('../models/Page');

function savePagePromise(name)
{
    console.log("saving page " + name);

    return new Promise((res, rej) =>{
        var page = new Page({
            name: name
        });

        getPagePromise(name)
        .then(existingPage => {
            if (existingPage) rej({err: "Given page already exists"});
            else {
                page.save((err) => {
                    if (err) rej(err);
                    res(page);
                })
            }          
        })
        .catch(console.error);
    });
}

function savePageContentPromise(path, pageName, name)
{
    console.log("saving page content " + name + "of page " + pageName);

    return new Promise((res, rej) => {

        getPageContentPromise(name, pageName)
        .then(content => {

            if (content) rej({err: "Given content already exists"});

            getPageContentsPromise(pageName)
            .then(contents => {
                
                var pageContent = new PageContent({
                    pageContentDirectory : path,
                    name : name,
                    pageName : pageName,
                    rank: contents.length
                });

                pageContent.save((err) => {
                    if (err) rej(err);
                    res(pageContent);
                });
            });          
        })
        .catch(console.error);  
    });
}

function getPagePromise(name)
{
    console.log("loading page " + name);

    return new Promise((res, rej) => {
        Page.findOne({name : name}, (err, page) => {
            if (err) rej(err);
            res(page);
        });
    });
}

function getAllPagesPromise()
{
    console.log("loading all pages");
    
    return new Promise((res, rej) => {
        Page.find({}, (err, pages) => {
            if (err) rej(err);
            res(pages);
        })
    });
}

function getPageContentPromise(contentName, pageName)
{
    console.log("loading page content ",  contentName);

    return new Promise((res, rej) => {
        PageContent.findOne({name : contentName, pageName : pageName}, (err, pageContent) => {
            if (err) rej(err);
            res(pageContent);
        });
    });
}

function getPageContentsPromise(pageName)
{
    console.log("loading page ", pageName, "contents");

    return new Promise((res, rej) => {
        PageContent.find({pageName : pageName}, (err, pageContents) => {
            if (err) rej(err);
            res(pageContents);
        });
    });
}

function getAllPageContentsPromise()
{
    console.log("loading all pages content")
    
    return new Promise((res, rej) => {
        PageContent.find({}, (err, pageContents) => {
            if (err) rej(err);
            res(pageContents);
        });
    });
}

function updatePageContentRankPromise(pageName, contentName, rank)
{
    console.log("updating rank of content ", contentName, " of page ", pageName);

    return new Promise((res, rej) => {
        PageContent.findOneAndUpdate({
            name : contentName, 
            pageName : pageName},
            {rank : rank},
            (err, doc, updatedContent) => {
                if (err) rej(err);
                res(updatedContent);
        });
    });
}

async function updateAllPageContensRanks(pageName, contents) {
    console.log("updating ranks");
    for (var rank = 0; rank < contents.length; rank++) {
        try {
            await updatePageContentRankPromise(pageName, contents[rank], rank);
        }
        catch(err) {
            return err;
        }
    }
    return {success : true};
}

module.exports = {
    savePagePromise : savePagePromise,
    savePageContentPromise : savePageContentPromise,
    getPagePromise : getPagePromise,
    getAllPagesPromise : getAllPagesPromise,
    getPageContentPromise : getPageContentPromise,
    getPageContentsPromise : getPageContentsPromise,
    getAllPageContentsPromise : getAllPageContentsPromise,
    updatePageContentRankPromise : updatePageContentRankPromise,
    updateAllPageContensRanks : updateAllPageContensRanks
}