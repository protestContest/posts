import { types } from './actions';

export default function(state, action) {
  switch(action.type) {
  case types.AUTHENTICATE:
    return {
      ...state,
      user: action.user,
      apiToken: action.token
    };
  case types.FETCH_POSTS:
    return {
      ...state,
      posts: action.posts
    };
  default:
    return state;
  }
}