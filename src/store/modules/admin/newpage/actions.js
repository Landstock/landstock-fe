// import axiosInstance from "@/services/AxiosServices";

// export default {
//   async getNewPage(context) {
//     try {
//       const response = await axiosInstance.get("/news/allnewpage");
//       context.commit("setNewPage", response.data.data);
//     } catch (error) {
//       console.log(error);
//       error.response?.data?.message || "lấy dữ liệu không thành công";
//     }
//   },

//   async addNew(context, payload) {
//     try {
//       const response = await axiosInstance.post("/new/create-new", payload);

//       const responseData = response.data.data;
//       console.log("Tin tức: ", responseData);

//       context.commit("addNewPage", responseData);
//     } catch (error) {
//       console.log(error);
//     }
//   },
// };
