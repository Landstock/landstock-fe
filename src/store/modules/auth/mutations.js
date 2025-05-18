export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.tokenExpiration = payload.tokenExpiration;
  },

  setUserRole(state, payload) {
    state.role = payload.role;
  },

  setUserEmail(state, payload) {
    state.userEmail = payload.userEmail;
  },
};
