import axios from "axios";
import router from "@/router";

// import store from "../store/index";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    // Kiểm tra xem token có được lấy đúng không
    // console.log("Token axios:", token);

    const role = localStorage.getItem("role");
    // Kiểm tra xem role có được lấy đúng không
    // console.log("Token gửi đi:", token); // Kiểm tra token có tồn tại không
    // console.log("Role gửi đi:", role);
    // console.log("Token trong request:", token);
    // console.log("Headers trước khi gửi:", config.headers);
    // console.log("Token nhận được từ API:", token);

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // console.log("config.headers: ", config.headers);
    // console.log("Token nhận được từ API:", token);

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
    // console.log("Response Error:", error.response); // In ra thông tin lỗi c
    if (error.response?.status === 401) {
      alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("email");
      localStorage.removeItem("tokenExpiration");

      // window.location.href = "/login"; // hoặc dùng router.push('/login')
      router.push("/login");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
