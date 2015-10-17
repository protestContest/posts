var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var slug = require('slug');

var PostSchema = new Schema({
  slug: String,
  title: {type: String, required: true},
  body: {type: String, required: true},
  time: {type: Date, default: Date.now},
  private: {type: Boolean, default: false}
});

PostSchema.pre('save', function(next) {
  this.slug = slug(this.title);
  next();
});

mongoose.model('Post', PostSchema);
var Post = mongoose.model('Post');
module.exports = Post;