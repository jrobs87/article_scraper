var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    index: true, // also isnt working.....
    unique: true // doesn't appear to work - duplicates continue to save
  },

  link: {
    type: String,
    required: true,
    unique: true // doesn't appear to work - duplicates continue to save
  },

  // note: [{
  //   type: Schema.Types.ObjectId, ref: 'Article'
  //   // ref: "Note"
  // }]
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
