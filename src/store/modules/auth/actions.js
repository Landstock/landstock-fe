import axiosInstance from "@/services/AxiosServices";

export default {
  async login(context, payload) {
    try {
      // Đăng nhập và lấy access_token
      const response = await axiosInstance.post("/auth/login", {
        email: payload.email,
        password: payload.password,
      });

      const responseData = response.data;
      console.log("Response từ API:", response.data);

      // Tính thời gian hết hạn token
      const expiresIn = +responseData.token.access_token.expiresIn * 1000; // giờ đã đúng
      const expirationDate = new Date().getTime() + expiresIn;

      // Lưu access_token vào localStorage và thời gian hết hạn
      localStorage.setItem("token", responseData.token.access_token);
      localStorage.setItem("tokenExpiration", expirationDate);

      // Commit access_token vào state Vuex
      context.commit("setUser", {
        token: responseData.token.access_token,
        tokenExpiration: expirationDate,
      });

      // eslint-disable-next-line no-debugger
      // debugger;

      // Lấy thông tin người dùng
      const userInfo = await axiosInstance.get("/user/me");
      // console.log("User Info đây:", userInfo.data);

      const email = userInfo.data.data.email;
      const role = userInfo.data.data.role;

      localStorage.setItem("email", email);
      localStorage.setItem("role", role);

      context.commit("setUserEmail", { userEmail: email });
      context.commit("setUserRole", { role });
      // Tự động logout khi token hết hạn
      // setTimeout(() => {
      //   context.dispatch("logout");
      // }, expiresIn);
    } catch (error) {
      console.log(error);
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
    const token = localStorage.getItem("token");
    const expirationDate = Number(localStorage.getItem("tokenExpiration"));

    const now = new Date().getTime();

    if (!token || !expirationDate || now >= expirationDate) {
      return; // token hết hạn rồi
    }

    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");

    context.commit("setUser", {
      token,
      tokenExpiration: expirationDate,
    });

    if (email) context.commit("setUserEmail", { userEmail: email });
    if (role) context.commit("setUserRole", { role });

    // tính thời gian còn lại và tự logout
    const timeLeft = +expirationDate - now;
    setTimeout(() => {
      context.dispatch("logout");
    }, timeLeft);
  },

  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");

    localStorage.removeItem("tokenExpiration");

    context.commit("setUser", {
      token: null,
      role: null,
      userEmail: null,
    });
  },
};
