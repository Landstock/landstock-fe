import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default {
  namespaced: true,
  state() {
    return {
      posts: [],
      cityProjects: [],
      total: 0,
      pendingPosts: [],
      totalPendingPosts: 0,
      postsStatistics: {
        totalPosts: 0,
        totalBanPosts: 0,
        totalChoThuePosts: 0,
      },
    };
  },
  actions,
  mutations,
  getters,
};
