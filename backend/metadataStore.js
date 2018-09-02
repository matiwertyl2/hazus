const PageContent = require('../models/PageContent');
const Page = require('../models/Page');

function savePagePromise(name)
{
    console.log("saving page " + name);

    return new Promise((res, rej) =>{
        var page = new Page({
            name: name
        });

        page.save((err) => {
            if (err) rej(err);
            res(page);
        })
    });
}

function savePageContentPromise(path, pageName, name)
{
    console.log("saving page content " + name + "of page " + pageName);

    return new Promise((res, rej) => {
        var pageContent = new PageContent({
            pageContentDirectory : path,
            name : name,
            pageName : pageName
        });

        pageContent.save((err) => {
            if (err) rej(err);
            res(pageContent);
        });
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
    console.log("loading page content");

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

module.exports = {
    savePagePromise : savePagePromise,
    savePageContentPromise : savePageContentPromise,
    getPagePromise : getPagePromise,
    getAllPagesPromise : getAllPagesPromise,
    getPageContentPromise : getPageContentPromise,
    getPageContentsPromise : getPageContentsPromise 
}