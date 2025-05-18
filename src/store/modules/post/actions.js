import axiosInstance from "@/services/AxiosServices";

export default {
  async addPostNew(context, payload) {
    try {
      console.log("Payload gửi đi:", payload);
      const response = await axiosInstance.post("/posts/create", payload);
      console.log("Toàn bộ response: ", response);
      const responseData = response.data;
      console.log("responseData post: ", responseData);
      // eslint-disable-next-line no-debugger
      // debugger;

      payload.title = responseData.title;
      payload.price = responseData.price;
      payload.area = responseData.area;
      payload.address = responseData.address;
      payload.categoryId = responseData.categoryId;
      payload.description = responseData.description;
      payload.image = responseData.image;

      context.commit("addPost", payload);
    } catch (error) {
      // eslint-disable-next-line no-debugger
      // debugger;
      console.log(error);
      throw new Error(
        error.response?.data?.message || "thêm bài mới không thành công"
      );
    }
  },

  async getPost(context) {
    try {
      const response = await axiosInstance("/posts/myPosts");
      const responseData = response.data;
      console.log("responseData", responseData);

      const { items } = responseData.data;
      const postnew = items.map((post) => ({
        id: post._id,
        title: post.title,
        price: post.price,
        area: post.area,
        address: post.address,
        categoryId: post.categoryId,
        description: post.description,
        createdAt: new Date(post.createdAt).toLocaleDateString("vi-VN"),
      }));
      context.commit("setPost", postnew);
    } catch (error) {
      console.log(error);
      throw new Error(
        error.response?.data?.message || "không lấy được get thành công"
      );
    }
  },

  async updatePost(context, id) {
    try {
      await axiosInstance.put(`/posts/update/${id}`);
      context.commit("updatePost", id);
    } catch (error) {
      console.log(error);
      throw new Error(
        error.response?.data?.message || "Sửa thông tin không thành công"
      );
    }
  },
};
