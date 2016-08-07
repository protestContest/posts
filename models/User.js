var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
  created: {type: Date, default: Date.now}
});

UserSchema.static('create', function(username, password) {
  var hash = bcrypt.hashSync(password, 12);
  return new User({
    username,
    password: hash
  });
});

UserSchema.method('validPassword', function(password) {
  return bcrypt.compareSync(password, this.password);
});

UserSchema.method('setPassword', function(password) {
  var hash = bcrypt.hashSync(password, 12);
  this.password = hash;
  return this.save();
});

mongoose.model('User', UserSchema);
var User = mongoose.model('User');
module.exports = User;