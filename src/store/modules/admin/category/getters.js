export default {
  categories(state) {
    return state.category;
  },

  // Tổng tất cả category
  totalCategories(state) {
    return state.category.length;
  },

  // Tổng số BĐS Bán
  totalForSale(state) {
    return state.category.filter((cat) => cat.type === "ban").length;
  },

  // Tổng số BĐS Cho thuê
  totalForRent(state) {
    return state.category.filter((cat) => cat.type === "chothue").length;
  },
};
