import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default {
  namespaced: true,
  state() {
    return {
      adminPosts: [],
      total: 0,
      recentActivities: [],
    };
  },
  actions,
  mutations,
  getters,
};
