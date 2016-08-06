var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
  created: {type: Date, default: Date.now}
});

UserSchema.method('validPassword', function(password) {
  return password === this.password;
});

UserSchema.method('setPassword', function(password) {
  this.password = password;
  return this.save();
});

mongoose.model('User', UserSchema);
var User = mongoose.model('User');
module.exports = User;