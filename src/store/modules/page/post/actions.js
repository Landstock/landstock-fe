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
      payload.provinceCode = responseData.provinceCode;
      payload.provinceName = responseData.provinceName;
      payload.districtCode = responseData.districtCode;
      payload.districtName = responseData.districtName;
      payload.wardCode = responseData.wardCode;
      payload.wardName = responseData.wardName;
      payload.street = responseData.street;
      payload.project = responseData.project;
      payload.categoryId = responseData.categoryId;
      payload.description = responseData.description;
      payload.imageUrls = responseData.imageUrls;

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

  // Lấy tất cả các bài đăng
  async getAllPosts(context, { page = 1, limit = 20 }) {
    try {
      const response = await axiosInstance.get(
        `/posts/allpost?page=${page}&limit=${limit}`
      );
      const responseData = response.data.data;

      console.log("Lấy tất cả các bài đăng post: ", responseData);

      const posts = responseData.items.map((post) => ({
        id: post._id,
        title: post.title,
        price: post.price,
        area: post.area,
        provinceCode: post.provinceCode,
        provinceName: post.provinceName,
        districtCode: post.districtCode,
        districtName: post.districtName,
        wardCode: post.wardCode,
        wardName: post.wardName,
        street: post.street,
        project: post.project,
        categoryId: post.category._id,
        category: post.category.name,
        description: post.description,
        imageUrls: post.images?.map((img) => img.url) || [],
        user: post.user,
        createdAt: new Date(post.createdAt).toLocaleDateString("vi-VN"),
        views: post.views,
        slug: post.slug,
      }));

      context.commit("setPost", posts);

      context.commit("setTotalPosts", responseData.total);
      return posts;
    } catch (error) {
      console.log(error);
      throw new Error(
        error.response?.data?.message || "Không lấy được tất cả bài đăng"
      );
    }
  },
  // Duyệt hoặc từ chối bài đăng (Admin only)
  async updatePostStatus(context, { postId, status }) {
    try {
      console.log(`Updating post ${postId} status to: ${status}`);

      const response = await axiosInstance.put(
        `/posts/update-status/${postId}`,
        { status }
      );

      const updatedPost = response.data.data || response.data;
      console.log("Post status updated:", updatedPost);

      // Nếu duyệt hoặc từ chối, xóa ngay khỏi pending list
      if (status !== "pending") {
        context.commit("removePendingPost", postId);
      }

      return updatedPost;
    } catch (error) {
      console.log(error);
      throw new Error(
        error.response?.data?.message ||
          "Không thể cập nhật trạng thái bài đăng"
      );
    }
  },
  // Lấy danh sách bài đăng chờ duyệt (Admin only)
  async getPendingPosts(context, { page = 1, limit = 12 }) {
    try {
      const response = await axiosInstance.get(
        `/posts/pending?page=${page}&limit=${limit}`
      );

      const responseData = response.data.data;
      console.log("Pending posts:", responseData);

      const pendingPosts = responseData.items.map((post) => ({
        id: post._id,
        title: post.title,
        price: post.price,
        area: post.area,
        provinceCode: post.provinceCode,
        provinceName: post.provinceName,
        districtCode: post.districtCode,
        districtName: post.districtName,
        wardCode: post.wardCode,
        wardName: post.wardName,
        street: post.street,
        project: post.project,
        categoryId: post.category._id,
        category: post.category.name,
        description: post.description,
        imageUrls: post.images?.map((img) => img.url) || [],
        user: post.user,
        createdAt: new Date(post.createdAt).toLocaleDateString("vi-VN"),
        views: post.views,
        slug: post.slug,
        status: post.status,
      }));

      context.commit("setPendingPosts", pendingPosts);
      context.commit("setTotalPendingPosts", responseData.total);

      return pendingPosts;
    } catch (error) {
      console.log(error);
      throw new Error(
        error.response?.data?.message ||
          "Không lấy được danh sách bài chờ duyệt"
      );
    }
  },
  // lấy các bài đã đăng của tôi
  async getPost(context, { page = 1, limit = 15 }) {
    try {
      const response = await axiosInstance(
        `/posts/myPosts?page=${page}&limit=${limit}`
      );
      const responseData = response.data;
      console.log("responseData mypost", responseData);

      const { items } = responseData.data;
      const postnew = items.map((post) => ({
        id: post._id,
        title: post.title,
        price: post.price,
        area: post.area,
        provinceCode: post.provinceCode,
        provinceName: post.provinceName,
        districtCode: post.districtCode,
        districtName: post.districtName,
        wardCode: post.wardCode,
        wardName: post.wardName,
        street: post.street,
        project: post.project,
        categoryId: post.category._id,
        category: post.category.name,
        description: post.description,
        slug: post.slug,
        imageUrls: post.images?.map((img) => img.url) || [],
        createdAt: new Date(post.createdAt).toLocaleDateString("vi-VN"),
        status: post.status || "pending",
      }));
      context.commit("setPost", postnew);
      context.commit("setTotalPosts", response.data.data.total);
    } catch (error) {
      console.log(error);
      throw new Error(
        error.response?.data?.message || "không lấy được get thành công"
      );
    }
  },

  // lấy bài đăng theo category
  async getAdPost(context, { categoryId, page = 1, limit = 12 }) {
    try {
      const response = await axiosInstance.get(
        `/posts/by-category/${categoryId}?page=${page}&limit=${limit}`
      );

      const responseData = response.data.data;
      console.log("responseData lấy bài đăng theo category: ", responseData);

      const sales = responseData.items.map((sale) => ({
        id: sale._id,
        title: sale.title,
        price: sale.price,
        area: sale.area,
        provinceCode: sale.provinceCode,
        provinceName: sale.provinceName,
        districtCode: sale.districtCode,
        districtName: sale.districtName,
        wardCode: sale.wardCode,
        wardName: sale.wardName,
        street: sale.street,
        project: sale.project,
        categoryId: sale.category._id,
        category: sale.category.name,
        description: sale.description,
        imageUrls: sale.images?.map((img) => img.url) || [],
        user: sale.user,
        createdAt: new Date(sale.createdAt).toLocaleDateString("vi-VN"),
        slug: sale.slug,
      }));
      context.commit("setPost", sales);
      context.commit("setTotalPost", responseData.total);
    } catch (error) {
      console.log(error);
      throw new Error(
        error.response?.data?.message || "không lấy được get thành công"
      );
    }
  },

  // update
  async updatePost(context, payload) {
    try {
      console.log("Payload gửi đi để update:", {
        title: payload.title,
        price: payload.price,
        area: payload.area,
        provinceCode: payload.provinceCode,
        provinceName: payload.provinceName,
        districtCode: payload.districtCode,
        districtName: payload.districtName,
        wardCode: payload.wardCode,
        wardName: payload.wardName,
        street: payload.street,
        project: payload.project,
        categoryId: Number(payload.categoryId),
        description: payload.description,
        imageUrls: payload.imageUrls,
      });
      // Gửi đúng payload đã lọc
      const response = await axiosInstance.put(`/posts/update/${payload.id}`, {
        title: payload.title,
        price: payload.price,
        area: payload.area,
        provinceCode: payload.provinceCode,
        provinceName: payload.provinceName,
        districtCode: payload.districtCode,
        districtName: payload.districtName,
        wardCode: payload.wardCode,
        wardName: payload.wardName,
        street: payload.street,
        project: payload.project,
        categoryId: Number(payload.categoryId),
        description: payload.description,
        imageUrls: payload.imageUrls,
      });

      console.log("Update thành công:", response.data);

      const updatedPost = {
        id: response.data._id,
        title: response.data.title,
        price: response.data.price,
        area: response.data.area,
        provinceCode: response.data.provinceCode,
        provinceName: response.data.provinceName,
        districtCode: response.data.districtCode,
        districtName: response.data.districtName,
        wardCode: response.data.wardCode,
        wardName: response.data.wardName,
        street: response.data.street,
        project: response.data.project,
        categoryId: response.data.categoryId,
        description: response.data.description,
        imageUrls: response.data.images?.map((img) => img.url) || [],
        createdAt: new Date(response.data.createdAt).toLocaleDateString(
          "vi-VN"
        ),
      };

      context.commit("updatePost", updatedPost);
    } catch (error) {
      console.log(error);
      throw new Error(
        error.response?.data?.message || "Sửa thông tin không thành công"
      );
    }
  },

  // delete
  async deletePost(context, id) {
    try {
      await axiosInstance.delete(`/posts/delete/${id}`);

      context.commit("deletePostUser", id);
    } catch (error) {
      console.log(error);
      throw new Error(
        error.response?.data?.message || "Xóa thông tin không thành công"
      );
    }
  },

  // Thêm action để lấy chi tiết bài đăng
  async getPostDetail(context, slug) {
    try {
      const response = await axiosInstance.get(`/posts/view/${slug}`); // Sử dụng endpoint tăng lượt xem
      const post = response.data.data;
      console.log("chi tiết bài đăng: ", post);
      const postDetail = {
        id: post._id,
        title: post.title,
        price: post.price,
        area: post.area,
        provinceCode: post.provinceCode,
        provinceName: post.provinceName,
        districtCode: post.districtCode,
        districtName: post.districtName,
        wardCode: post.wardCode,
        wardName: post.wardName,
        street: post.street,
        project: post.project,
        categoryId: post.category._id,
        category: post.category.name,
        description: post.description,
        imageUrls: post.images?.map((img) => img.url) || [],
        createdAt: new Date(post.createdAt).toLocaleDateString("vi-VN"),
        user: post.user,
        views: post.views, // Thêm lượt xem nếu cần hiển thị
        slug: post.slug,
      };
      return postDetail; // Trả về dữ liệu chi tiết
    } catch (error) {
      console.log(error);
      throw new Error(
        error.response?.data?.message || "Không lấy được chi tiết bài đăng"
      );
    }
  },

  // Lấy danh sách bài đăng có lượt xem cao nhất
  async getTopViewedPosts(context) {
    try {
      const response = await axiosInstance.get("/posts/top-viewed");
      const responseData = response.data.data;
      console.log("lấy bài đăng view cao nhất: ", responseData);

      // Giả sử dữ liệu trả về có dạng:
      // { data: { items: [...] } } hoặc trực tiếp array, tùy backend

      const items =
        responseData.data?.data || responseData.data || responseData;
      console.log("lấy bài đăng view cao nhất: ", items);

      const topViewedPosts = items.map((post) => ({
        id: post._id,
        title: post.title,
        price: post.price,
        area: post.area,
        provinceCode: post.provinceCode,
        provinceName: post.provinceName,
        districtCode: post.districtCode,
        districtName: post.districtName,
        wardCode: post.wardCode,
        wardName: post.wardName,
        street: post.street,
        project: post.project,
        categoryId: post.category._id,
        category: post.category.name,
        description: post.description,
        imageUrls: post.images?.map((img) => img.url) || [],
        createdAt: new Date(post.createdAt).toLocaleDateString("vi-VN"),
        views: post.views,
        slug: post.slug,
      }));

      context.commit("setPost", topViewedPosts);
    } catch (error) {
      console.log(error);
      throw new Error(
        error.response?.data?.message ||
          "Không lấy được bài đăng có lượt xem cao nhất"
      );
    }
  },

  // tìm kiếm
  async searchPosts(
    context,
    { categoryId, provinceName, keyword, page = 1, limit = 12 }
  ) {
    try {
      let posts = [];

      // Lấy bài đăng theo category hoặc tất cả
      if (categoryId) {
        await context.dispatch("getAdPost", { categoryId, page, limit });
        posts = context.state.posts;
      } else {
        await context.dispatch("getAllPosts", { page, limit });
        posts = context.state.posts;
      }

      // Lọc theo province
      if (provinceName) {
        posts = posts.filter((post) => post.provinceName === provinceName);
      }

      // Lọc theo keyword
      if (keyword) {
        const searchTerm = keyword.toLowerCase();
        posts = posts.filter(
          (post) =>
            post.title.toLowerCase().includes(searchTerm) ||
            post.project.toLowerCase().includes(searchTerm) ||
            post.street.toLowerCase().includes(searchTerm) ||
            post.description.toLowerCase().includes(searchTerm)
        );
      }

      // Cập nhật state
      context.commit("setPost", posts);
      return posts;
    } catch (error) {
      console.log(error);
      throw new Error(
        error.response?.data?.message ||
          "Không tìm kiếm được bất động sản đó!!!"
      );
    }
  },
};
