var Subscription = require('../models/Subscription');
var User = require('../models/User');
var util = require('./util');

var SubscriptionController = module.exports = {

  ownedByUser: function(req, res, next) {
    if (!req.data.user) return res.status(500).end();
    if (!req.data.subscription) return res.status(500).end();

    if (req.data.user._id.toString() !== req.data.subscription.owner.toString()) {
      res.status(403).end();
    } else {
      next();
    }
  },

  loadById: function(req, res, next) {
    Subscription.findById(req.params.subId, function(err, subscription) {
      if (err) return res.status(500).end();
      if (!subscription) return res.status(404).send('Subscription not found');
      req.data.subscription = subscription;
      next();
    });
  },

  loadByTarget: function(req, res, next) {
    User.findOne({username: req.params.subId}, function(err, target) {
      if (err) return res.status(500).end();

      Subscription.findOne({target: target._id, owner: req.user._id}, function(err, subscription) {
        if (err) return res.status(500).end();
        if (!subscription) return res.status(404).send('Subscription not found');
        req.data.subscription = subscription;
        next();
      });
    });
  },

  loadByIdentifier: function(req, res, next) {
    if (util.validId(req.params.subId)) {
      SubscriptionController.loadById(req, res, next);
    } else {
      SubscriptionController.loadByTarget(req, res, next);
    }
  },

  sendOne: function(req, res) {
    res.json({subscription: req.data.subscription});
  },

  create: function(req, res, next) {
    if (!req.user) return res.status(401).end();

    var sub = new Subscription({
      owner: req.user._id,
      target: req.body.target
    });

    sub.save(function(err) {
      if (err) return res.status(500).end();

      req.data.subscription = sub;
      next();
    });
  },

  update: function(req, res, next) {
    if (!req.data.subscription) return res.status(500).end();

    if (req.body.filters) {
      req.data.subscription.filters = req.body.filters;
    }

    req.data.subscription.save(function(err) {
      if (err) res.status(500).end();

      next();
    });
  },

  remove: function(req, res, next) {
    if (!req.data.subscription) return res.status(500).end();
    req.data.subscription.remove(next);
  },

  end: function(req, res) {
    res.end();
  }

};