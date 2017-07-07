//Require Mongoose
var mongoose = require('mongoose');
//Create Schema class
var Schema = mongoose.Schema;

//Create article schema
var ArticleSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    url : {
        type: String,
        required: true
    }
})

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;