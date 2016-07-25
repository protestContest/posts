import { types } from './actions';

export default function(state, action) {
  switch(action.type) {
  case types.AUTHENTICATE_START:
    return {
      ...state,
      sync: {
        ...state.sync,
        authenticating: true
      }
    };

  case types.AUTHENTICATE_FAIL:
    return {
      ...state,
      sync: {
        ...state.sync,
        authenticating: false
      }
    };

  case types.AUTHENTICATE_PASS:
    return {
      ...state,
      user: action.user,
      apiToken: action.token,
      sync: {
        ...state.sync,
        authenticating: false
      }
    };

  case types.FETCH_POST_START:
    return {
      ...state,
      sync: {
        ...state.sync,
        fetchingPosts: true
      }
    };
    
  case types.FETCH_POSTS_END:
    return {
      ...state,
      posts: action.posts.map((post) => {
        return {
          ...post,
          updated: new Date(post.updated),
          created: new Date(post.created)
        };
      }),
      sync: {
        ...state.sync,
        fetchingPosts: false
      }
    };

  case types.CREATE_POST:
    return {
      ...state,
      posts: [
        ...state.posts,
        action.post
      ]
    };

  case types.UPDATE_POST:
    return {
      ...state,
      posts: state.posts.map((post) => {
        if (post._id !== action.post._id) return post;
        else return action.post;
      })
    };

  case types.SET_ERROR:
    return {
      ...state,
      currentError: action.error
    };

  case types.SET_MESSAGE:
    return {
      ...state,
      syncStatus: action.message
    };

  default:
    return state;
  }
}