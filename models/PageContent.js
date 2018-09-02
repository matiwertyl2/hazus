var mongoose = require('mongoose')

var PageContentSchema = mongoose.Schema({
    pageContentDirectory : {type : String, required : true },
    name : {type : String, required : true},
    pageName : {type : String, required : true}
});

module.exports = mongoose.model('PageContent', PageContentSchema);
