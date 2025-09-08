import axiosInstance from "@/services/AxiosServices";

export default {
  async updateUser(context, payload) {
    try {
      const response = await axiosInstance.put(`/user/update/me`, payload);
      const responseData = response.data;

      console.log("responseData:", responseData);

      const userInfor = await axiosInstance.get(`/user/me`);
      console.log("Dữ liệu user:", userInfor.data);
      context.commit("setUser", userInfor.data);
    } catch (error) {
      console.log(error);
      throw new Error(
        error.response?.data?.message || "Sửa thông tin không thành công"
      );
    }
  },
};
