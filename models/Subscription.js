var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubscriptionSchema = new Schema({
  owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  target: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  filters: [String]
});

mongoose.model('Subscription', SubscriptionSchema);
var Subscription = mongoose.model('Subscription');
module.exports = Subscription;