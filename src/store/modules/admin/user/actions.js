import axiosInstance from "@/services/AxiosServices";

export default {
  async getUsers(context) {
    try {
      // gọi danh sách tất cả ng dùng admin quản lý
      const response = await axiosInstance.get("/user/all");
      const responseData = response.data;
      console.log("response.data của user:", responseData);

      // Lấy danh sách user từ responseData.data
      const users = responseData.data.map((user) => ({
        id: user._id,
        username: user.username,
        email: user.email,
        phonenumber: user.phonenumber,
        role: user.role,
      }));

      context.commit("setUsers", users);
      // eslint-disable-next-line no-debugger
      // debugger;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng:", error);
    }
  },
};
