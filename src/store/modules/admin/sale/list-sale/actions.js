import axiosInstance from "@/services/AxiosServices";

export default {
  async getAdPost(context, categoryId) {
    try {
      const response = await axiosInstance.get(
        `/posts/by-category/${categoryId}`
      );

      const responseData = response.data.data;
      console.log("responseData: ", responseData);

      const sales = responseData.map((sale) => ({
        id: sale._id,
        name: sale.title,
        image: sale.price,
        area: sale.area,
        description: sale.description,
        category: sale.category,
      }));
      context.commit("setSale", sales);
    } catch (error) {
      console.log(error);
      throw new Error(
        error.response?.data?.message || "không lấy được get thành công"
      );
    }
  },
};
