export default {
  setUsers(state, users) {
    console.log("setUsers được gọi:", users);
    state.users = users;
  },

  setTotal(state, total) {
    state.total = total;
  },
};
