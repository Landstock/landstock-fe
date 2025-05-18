import axiosInstance from "@/services/AxiosServices";

export default {
  async getAdPost(context, categoryId) {
    try {
      const response = await axiosInstance.get(
        `/admin/by-category/${categoryId}`
      );

      const responseData = response.data.data;
      console.log("responseData ad: ", responseData);

      const sales = responseData.items.map((sale) => ({
        id: sale._id,
        title: sale.title,
        price: sale.price,
        area: sale.area,
        description: sale.description,
        categoryId: sale.category.name,
      }));
      context.commit("setAdminPosts", sales);
    } catch (error) {
      console.log(error);
      throw new Error(
        error.response?.data?.message || "không lấy được get thành công"
      );
    }
  },
};
