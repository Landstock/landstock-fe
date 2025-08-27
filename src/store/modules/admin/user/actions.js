import axiosInstance from "@/services/AxiosServices";

export default {
  async getUsers(context, { page = 1, limit = 20 }) {
    try {
      const response = await axiosInstance.get(
        `/user/all?page=${page}&limit=${limit}`
      );
      const responseData = response.data;

      // Lấy danh sách user từ response và định dạng lại
      const users = responseData.data.data.map((user) => ({
        id: user._id,
        username: user.username,
        email: user.email,
        phonenumber: user.phonenumber,
        role: user.role,
      }));

      console.log("Danh sách users:", users);

      context.commit("setUsers", users);
      context.commit("setTotal", responseData.data.total); // Gửi tổng số lượng user
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng:", error);
    }
  },
};
