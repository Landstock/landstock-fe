export default {
  setPost(state, payload) {
    state.posts = payload;
  },

  addPost(state, payload) {
    state.posts.push(payload);
  },

  // setAdminPosts(state, posts) {
  //   state.adminPosts = posts;
  // },

  updatePost(state, payload) {
    const postIndex = state.posts.findIndex((post) => post.id === payload.id);
    if (postIndex !== -1) {
      state.posts[postIndex] = {
        ...state.posts[postIndex],
        ...payload, // cập nhật thông tin mới
      };
    }
  },

  deletePostUser(state, payload) {
    state.posts = state.posts.filter((p) => p._id != payload);
  },

  // phân trang
  setTotalPosts(state, total) {
    state.total = total;
  },

  // Cập nhật trạng thái bài đăng
  updatePostStatus(state, { postId, status }) {
    const post = state.posts.find((p) => p.id === postId);
    if (post) {
      post.status = status;
    }
  },

  // Set danh sách bài chờ duyệt
  setPendingPosts(state, posts) {
    state.pendingPosts = posts;
  },

  // Set tổng số bài chờ duyệt
  setTotalPendingPosts(state, total) {
    state.totalPendingPosts = total;
  },

  // Remove bài đã duyệt/từ chối khỏi pending list
  removePendingPost(state, postId) {
    state.pendingPosts = state.pendingPosts.filter((p) => p.id !== postId);
    state.totalPendingPosts = state.totalPendingPosts - 1;
  },
};
