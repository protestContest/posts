export default class Cache {
  restore(initialState) {
    if (!localStorage.appState) return initialState;
    const state = JSON.parse(localStorage.appState);

    return {
      ...initialState,
      ...state
    };
  }

  persistState(state) {
    localStorage.setItem('appState', JSON.stringify(state));
  }
}