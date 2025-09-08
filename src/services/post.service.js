import axiosInstance from "@/services/AxiosServices";

const PostService = {
  // Lấy tất cả bài đăng
  async getAllPosts(page = 1, limit = 20) {
    return axiosInstance.get(`/posts/allpost?page=${page}&limit=${limit}`);
  },

  // Duyệt bài đăng
  async approvePost(id) {
    return axiosInstance.put(`/posts/update-status/${id}`, {
      status: "approved",
    });
  },

  // Huỷ bài đăng
  async rejectPost(id) {
    return axiosInstance.put(`/posts/update-status/${id}`, {
      status: "rejected",
    });
  },
};

export default PostService;
