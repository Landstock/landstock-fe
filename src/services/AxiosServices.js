import axios from "axios";
import store from "../store/index";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.state.auth.token;
    // Kiểm tra xem token có được lấy đúng không
    // console.log("Token axios:", token);

    const role = localStorage.getItem("role");
    // Kiểm tra xem role có được lấy đúng không
    // console.log("Role retrieved from localStorage in axios:", role);

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (role) {
      config.headers["Role"] = role; // Đảm bảo rằng role đang được gửi đi
      // console.log("Role in header: ", role);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("Response Error:", error.response); // In ra thông tin lỗi c
    if (error.response && error.response.status === 401) {
      store.dispatch("logout");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
