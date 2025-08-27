export default {
  userEmail(state) {
    return state.userEmail;
  },

  token(state) {
    console.log("state.token: ", state.token);
    return state.token;
  },

  isAuthentication(state) {
    return !!state.token;
  },

  role(state) {
    return state.role;
  },
};
