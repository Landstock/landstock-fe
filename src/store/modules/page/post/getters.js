export default {
  posts(state) {
    return state.posts;
  },
  // adminPosts(state) {
  //   return state.adminPosts;
  // },
  pendingPosts(state) {
    return state.pendingPosts;
  },
  totalPendingPosts(state) {
    return state.totalPendingPosts;
  },
  // số lượng bài đăng theo type
  totalBanPosts(state) {
    return state.postsStatistics.totalBanPosts || 0;
  },
  totalChoThuePosts(state) {
    return state.postsStatistics.totalChoThuePosts || 0;
  },
  totalApprovedPosts(state) {
    return (
      (state.postsStatistics.totalBanPosts || 0) +
      (state.postsStatistics.totalChoThuePosts || 0)
    );
  },
};
