export default class Cache {
  restore(initialState) {
    if (!localStorage.appState) return initialState;
    const state = JSON.parse(localStorage.appState);

    return {
      ...state,
      posts: state.posts || []
    };
  }

  persistState(state) {
    localStorage.setItem('appState', JSON.stringify(state));
  }
}