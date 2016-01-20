module.exports = {

  renderPage: function(pageName) {
    return function(req, res) {
      res.renderReact(pageName, req.data);
    };
  }

};