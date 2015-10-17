var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String, unique: true },
  password: String
});

UserSchema.method('validPassword', function(password) {
  return password === this.password;
});

mongoose.model('User', UserSchema);
var User = mongoose.model('User');
module.exports = User;