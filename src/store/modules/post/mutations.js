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
    const postId = state.posts.findIndex((post) => post._id != payload.id);
    if (postId !== -1) {
      state.posts[postId] = {
        _id: payload.id,
        title: payload.title,
        price: payload.price,
        area: payload.area,
        address: payload.address,
        categoryId: payload.categoryId,
        description: payload.description,
      };
    }
  },
};
