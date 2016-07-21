export default class Cache {
  restore() {
    if (!localStorage.appState) return {};
    return JSON.parse(localStorage.appState);
  }

  persistState(state) {
    localStorage.setItem('appState', JSON.stringify(state));
  }
}