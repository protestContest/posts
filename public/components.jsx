var React = require('react');

var HelloMessage = React.createClass({
  handleClick: function() {
    alert('you clicked!');
  },

  render: function() {
    return <div onClick={this.handleClick}>Hello {this.props.name}</div>;
  }
});

module.exports.LoginPage = React.createClass({
  render: function() {
    var style = {
      content: {
        'width': '100%',
        'height': '100%',
        'display': "flex",
        'flex-direction': "column",
        'align-items': "center"
      },
      title: {
        'flex': 1,
        'display': 'flex',
        'flex-direction': 'column',
        'justify-content': 'center'
      },
      form: {
        'flex': 1
      }
    };

    return (
      <div style={style.content}>
        <div style={style.title}>
          <h1>Log in</h1>
        </div>
        <div style={style.form}>
          <form method="post">
            <div class="form-row">
              <label>Username
                <input type="text" name="username" />
              </label>
            </div>
            <div class="form-row">
              <label>Password
                <input type="password" name="password" />
              </label>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

module.exports.HomePage = React.createClass({

  render: function() {

    return (
      <div>

      </div>
    );
  }

});