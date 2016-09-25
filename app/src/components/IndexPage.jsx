import React from 'react';
import { connect } from 'react-redux';
import PostListPageContainer from '../containers/PostListPageContainer';
import LoginPageContainer from '../containers/LoginPageContainer';

class IndexPage extends React.Component {
  render() {
    if (this.props.authenticated) return <PostListPageContainer />;
    else return <LoginPageContainer />;
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: Boolean(state.user)
  };
};

export default connect(mapStateToProps)(IndexPage);