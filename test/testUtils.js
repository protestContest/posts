var request = require('supertest');

module.exports = {

  loginUser: function(app, user, next) {
    request(app)
        .post('/login')
        .send({username: user.username, password: user.password})
        .accept('json')
        .expect(200)
        .end(function(err, res) {
          if (err) return next(err);

          var cookies = res.headers['set-cookie'].pop().split(';')[0];
          next(null, cookies);
        });
  }

};