var mongoose = require('mongoose')

var PageSchema = mongoose.Schema({
    name : {type : String, required : true}
});

module.exports = mongoose.model('Page', PageSchema);
