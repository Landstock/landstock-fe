import axiosInstance from "@/services/AxiosServices";

export default {
  async getUsers({ commit }, { page = 1, limit = 20 } = {}) {
    try {
      const response = await axiosInstance.get(
        `/user/all?page=${page}&limit=${limit}`
      );
      const responseData = response.data;

      // Xử lý dữ liệu user từ API
      const users = responseData.data.data.map((user) => ({
        id: user._id,
        username: user.username,
        email: user.email,
        phonenumber: user.phonenumber,
        role: user.role,
      }));
      console.log("lấy dl user: ", users);

      commit("setUsers", users);
      commit("setTotal", responseData.data.total);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng:", error);
    }
  },

  async updateUser({ commit }, payload) {
    try {
      console.log("Dữ liệu update gửi đi:", payload);

      const response = await axiosInstance.put(`/user/${payload.id}`, payload);

      commit("updateUser", response.data);
    } catch (error) {
      console.error("Lỗi khi cập nhật người dùng:", error);
    }
  },
  async deleteUser({ commit }, userId) {
    try {
      await axiosInstance.delete(`/user/${userId}`);
      commit("deleteUser", userId);
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
    }
  },
};
