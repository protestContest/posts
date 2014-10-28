var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  slug: String,
  title: String,
  body: String,
  time: {type: Date, default: Date.now}
});


mongoose.model('Post', PostSchema);
var Post = mongoose.model('Post');
module.exports = Post;