var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubscriptionSchema = new Schema({
  owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  target: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  filters: [String]
});

SubscriptionSchema.index({ owner: 1, target: 1}, {unique: true});

mongoose.model('Subscription', SubscriptionSchema);
var Subscription = mongoose.model('Subscription');
module.exports = Subscription;