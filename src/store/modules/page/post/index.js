import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default {
  namespaced: true,
  state() {
    return {
      posts: [],
      // adminPosts: [],
      total: 0,
      pendingPosts: [],
      totalPendingPosts: 0,
    };
  },
  actions,
  mutations,
  getters,
};
