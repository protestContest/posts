var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {

  renderPage: function(pageName) {
    return function(req, res) {
      res.renderReact(pageName, req.data);
    };
  },

  validId: function(id) {
    return ObjectId.isValid(id) && new ObjectId(id).toString() === id;
  },

  redirect: function(url) {
    return function(req, res, next) {
      if (req.accepts('html')) {
        res.redirect(url);
      } else {
        next();
      }
    };
  }

};