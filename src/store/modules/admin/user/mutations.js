export default {
  setUsers(state, users) {
    console.log("setUsers được gọi:", users);
    state.users = users;
  },

  setTotal(state, total) {
    state.total = total;
  },

  updateUser(state, payload) {
    const userIndex = state.users.findIndex((u) => u.id === payload.id);
    if (userIndex !== -1) {
      state.users[userIndex] = {
        ...state.users[userIndex],
        ...payload,
      };
    }
  },
  deleteUser(state, userId) {
    state.users = state.users.filter((user) => user.id !== userId);
  },
};
