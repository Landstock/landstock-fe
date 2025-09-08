import axiosInstance from "@/services/AxiosServices";

export default {
  async getAdPost(context, { categoryId, page = 1, limit = 20 }) {
    try {
      const response = await axiosInstance.get(
        `/admin/by-category/${categoryId}?page=${page}&limit=${limit}`
      );

      const responseData = response.data.data;
      console.log("responseData ad: ", responseData);
      // eslint-disable-next-line no-debugger
      // debugger;
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
        createdAt: new Date(sale.createdAt).toLocaleDateString("vi-VN"),
      }));
      context.commit("setAdminPosts", sales);
      context.commit("setTotal", responseData.total);
    } catch (error) {
      console.log(error);
      throw new Error(
        error.response?.data?.message || "không lấy được get thành công"
      );
    }
  },

  async updateAdPost(context, { id, updateData }) {
    try {
      const response = await axiosInstance.put(`/admin/post/${id}`, updateData);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi cập nhật bài đăng:", error);
      throw new Error(
        error.response?.data?.message || "Không cập nhật được bài đăng"
      );
    }
  },
};
