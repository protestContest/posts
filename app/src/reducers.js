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
      posts: action.posts.map((post) => {
        return {
          ...post,
          updated: new Date(post.updated),
          created: new Date(post.created)
        };
      })
    };

  case types.SET_ERROR:
    return {
      ...state,
      currentError: action.error
    };

  default:
    return state;
  }
}