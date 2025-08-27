import axiosInstance from "@/services/AxiosServices";
import { jwtDecode } from "jwt-decode";

export default {
  async login(context, payload) {
    try {
      // Gọi API đăng nhập
      const response = await axiosInstance.post("/auth/login", {
        email: payload.email,
        password: payload.password,
      });

      const responseData = response.data;
      const token = responseData.token.access_token;

      // ✅ Giải mã token để lấy thời gian hết hạn
      const decodedToken = jwtDecode(token);
      const expirationDate = decodedToken.exp * 1000; // Đổi sang milliseconds

      // ✅ Lưu token và thời gian hết hạn vào localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("tokenExpiration", expirationDate);

      // ✅ Commit token vào Vuex
      context.commit("setUser", {
        token,
        tokenExpiration: expirationDate,
      });

      // ✅ Gọi API để lấy thông tin user
      const userInfo = await axiosInstance.get("/user/me");

      const email = userInfo.data.data.email;
      const role = userInfo.data.data.role;

      localStorage.setItem("email", email);
      localStorage.setItem("role", role);

      context.commit("setUserEmail", { userEmail: email });
      context.commit("setUserRole", { role });
    } catch (error) {
      console.error(error);
      throw new Error(
        error.response?.data?.message || "Đăng nhập không thành công"
      );
    }
  },

  async signup(context, payload) {
    try {
      const response = await axiosInstance.post("/auth/signup", {
        email: payload.email,
        password: payload.password,
        username: payload.username,
        phonenumber: payload.phonenumber,
      });

      const responseData = response.data;

      // console.log("responseData: ", responseData);

      localStorage.setItem("token", responseData.access_token);

      context.commit("setUser", {
        token: responseData.access_token,
        tokenExpiration: responseData.expiresIn,
      });
    } catch (error) {
      console.log(error);
      throw new Error(
        error.response?.data?.message || "Đăng ký không thành công"
      );
    }
  },

  autoLogin(context) {
    return new Promise((resolve) => {
      const token = localStorage.getItem("token");
      const expirationDate = Number(localStorage.getItem("tokenExpiration"));
      const now = new Date().getTime();

      if (!token || !expirationDate || now >= expirationDate) {
        return resolve(); // Không có hoặc hết hạn → resolve luôn
      }

      const email = localStorage.getItem("email");
      const role = localStorage.getItem("role");

      context.commit("setUser", {
        token,
        tokenExpiration: expirationDate,
      });

      if (email) context.commit("setUserEmail", { userEmail: email });
      if (role) context.commit("setUserRole", { role });

      // Tự động logout khi token hết hạn
      const timeLeft = expirationDate - now;
      setTimeout(() => {
        context.dispatch("logout");
      }, timeLeft);
    });
  },

  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    context.commit("setUser", {
      token: null,
      tokenExpiration: null,
    });
    context.commit("setUserEmail", { userEmail: null });
    context.commit("setUserRole", { role: null });
  },
};
