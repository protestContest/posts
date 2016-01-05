var React = require('react');

module.exports = {

  renderPage: function(pageName) {
    var Page = this.reactView(pageName);

    return function(req, res) {
      res.renderReact(Page, req.data);
    };
  },

  reactView: function(pageName) {
    return React.createFactory(require('../components/scripts/dist/' + pageName));
  }

};