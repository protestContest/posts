var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  slug: String,
  title: String,
  body: String
});


mongoose.model('Post', PostSchema);
var Post = mongoose.model('Post');
module.exports = Post;