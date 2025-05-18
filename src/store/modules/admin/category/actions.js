import axiosInstance from "@/services/AxiosServices";

export default {
  // add category
  async addCategoryManage(context, payload) {
    try {
      const response = await axiosInstance.post("/category/create", payload);
      const responseData = response.data.data;
      console.log("Loại tin: ", responseData);

      payload.id = responseData._id;
      payload.name = responseData.name;
      payload.type = responseData.type;

      context.commit("addCategory", payload);
    } catch (error) {
      console.log(error);
      throw new Error(
        error.response?.data?.message || "thêm bài mới không thành công"
      );
    }
  },

  // get category
  async getCategoryManage({ commit }) {
    const response = await axiosInstance.get("/category/all");
    commit("setCategories", response.data.data);
  },

  // update category
  async updateCategoryManage(context, payload) {
    try {
      const { id, name, type } = payload;
      // Gửi body không chứa id hay _id
      await axiosInstance.put(`/category/update/${id}`, { name, type });

      context.commit("updateCategory", payload);
    } catch (error) {
      console.log(error);
      throw new Error(
        error.response?.data?.message || "update không thành công"
      );
    }
  },
  // delete category
  async deleteCategoryManage(context, id) {
    try {
      await axiosInstance.delete(`/category/delete/${id}`);
      context.commit("deleteCategory", id);
    } catch (error) {
      console.log(error);
      error.response?.data?.message || "Xóa không thành công";
    }
  },
};
