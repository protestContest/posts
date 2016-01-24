var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var slug = require('slug');
var HashIds = require('hashids');
var hashid = new HashIds('507f191e810c19729de860ea');

var PostSchema = new Schema({
  slug: {type: String, unique: true},
  title: {type: String, required: true},
  body: {type: String, required: true},
  created: {type: Date, default: Date.now},
  updated: {type: Date, default: Date.now},
  published: {type: Date},
  isPrivate: {type: Boolean, default: true},
  owner: {type: Schema.Types.ObjectId, ref: 'User'}
});

PostSchema.pre('save', function(next) {
  var that = this;

  if (this.isNew) {
    this.slug = slug(this.title);
    Post.findOne({slug: this.slug}, function(err, res) {
      if (err) return next(err);

      if (res) {
        that.slug = that.slug + '-' + hashid.encodeHex(new Buffer(that.title + that.created + that.owner).toString('hex')).slice(0, 6);
      }

      next();
    });
  } else {
    next();
  }
});

mongoose.model('Post', PostSchema);
var Post = mongoose.model('Post');
module.exports = Post;