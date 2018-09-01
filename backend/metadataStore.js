const PageContent = require('../models/PageContent');
const Page = require('../models/Page');

function savePagePromise(name)
{
    console.log("saving page");

    return new Promise((res, rej) =>{
        var page = new Page({
            name: name
        });

        Page.save((err) => {
            if (err) rej(err);
            res(page);
        })
    });
}

function savePageContentPromise(path, name)
{
    console.log("saving page content");

    return new Promise((res, rej) => {
        var pageContent = new PageContent({
            pageContentDirectory : path,
            name : name
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

function getPageContentPromise(contentName)
{
    console.log("loading page content");

    return new Promise((res, rej) => {
        PageContent.findOne({name : contentName}, (err, pageContent) => {
            if (err) rej(err);
            res(pageContent);
        });
    });
}

module.exports = {
    savePageContentPromise : savePagePromise,
    savePageContentPromise : savePageContentPromise,
    getPagePromise : getPagePromise,
    getAllPagesPromise : getAllPagesPromise,
    getPageContentPromise : getPageContentPromise   
}