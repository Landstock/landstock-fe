export default {
  setCategories(state, payload) {
    return (state.category = payload);
  },

  addCategory(state, payload) {
    return state.category.push(payload);
  },

  updateCategory(state, payload) {
    const categoryIndex = state.category.findIndex(
      (cat) => cat._id === payload.id // payload.id là đúng vì bạn truyền id ở trên
    );
    if (categoryIndex !== -1) {
      state.category[categoryIndex] = {
        _id: payload.id,
        name: payload.name,
        type: payload.type,
      };
    }
  },

  deleteCategory(state, payload) {
    state.category = state.category.filter((cat) => cat._id != payload);
  },
};
