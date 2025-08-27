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

  setTotalPost(state, total) {
    state.total = total;
  },
};
