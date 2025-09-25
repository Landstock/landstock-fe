export default {
  setAdminPosts(state, posts) {
    state.adminPosts = posts;
  },
  setTotal(state, total) {
    state.total = total;
  },

  // hoạt động gần đây
  setRecentActivities(state, activities) {
    state.recentActivities = activities;
  },
};
