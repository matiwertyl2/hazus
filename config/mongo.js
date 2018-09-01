var mongoose = require('mongoose');

var mongoURI = "mongodb://localhost:27017/hazus_website_db";

module.exports = {
    init: function () {
        mongoose.connect(mongoURI, { useNewUrlParser: true });

        mongoose.connection.on('connected', function() { 
            var MongoDB = mongoose.connection;
            MongoDB.on('error', function (err) {
                if (err) {
                    console.log('mongodb connection error', err);
                } else {
                    console.log('mongodb connection successful');
                }
            });
    
            MongoDB.once('open', function () {
                console.log('mongodb connection open');
            });
        });
    }
};