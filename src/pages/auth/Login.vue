<template>
  <div class="container">
    <div class="row">
      <div class="wapper-form col-xl-6 col-lg-7 col-md-9 col-sm-12 mx-auto">
        <div class="col-12 col-md-10 mx-auto">
          <form @submit.prevent="submitForm">
            <h2 class="frame_auto_head text-center pt-2">Đăng Nhập</h2>
            <!-- Thông tin  -->
            <div class="mb-2">
              <label for="email" class="form-label"
                ><span style="color: #e30000">*</span> SĐT / Email:</label
              >
              <input
                type="email"
                class="form-control"
                placeholder="Nhập Số điện thoại hoặc Email của bạn"
                v-model.trim="email"
                required
              />
            </div>
            <div class="mb-2">
              <label for="password" class="form-label"
                ><span style="color: #e30000">*</span> Mật khẩu:</label
              >
              <input
                type="password"
                class="form-control"
                v-model.trim="password"
                required
              />
            </div>
            <!-- check mk  -->
            <div class="">
              <div class="form-check">
                <input
                  type="checkbox"
                  id="remember"
                  class="form-check-input"
                  v-model="rememberMe"
                />
                <label for="remember" class="form-check-label"
                  >Lưu mật khẩu</label
                >
              </div>
              <div class="forgot-password-link">
                <a href="#" @click="forgotPassword">
                  Quên mật khẩu? Vui lòng nhấn vào đây
                </a>
              </div>
            </div>
            <!-- button đăng nhập  -->
            <div class="text-center">
              <button type="submit" class="btn btn-danger my-3 px-5">
                Đăng Nhập
              </button>
            </div>
            <div class="support-text">
              <p>
                Nếu bạn cần hỗ trợ vui lòng liên hệ hotline/zalo: 081.6666.444
              </p>
              <p>Trân trọng !</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      rememberMe: false, // Lưu trạng thái "Lưu mật khẩu"
    };
  },
  methods: {
    submitForm() {
      // Xử lý logic đăng nhập
      console.log("Email:", this.email);
      console.log("Password:", this.password);
      console.log("Remember Me:", this.rememberMe);
    },
    forgotPassword() {
      // Xử lý logic quên mật khẩu
      alert("Chức năng quên mật khẩu đang được phát triển.");
    },
  },
};
</script>

<style scoped>
.wapper-form {
  background-color: #fbfbfb;
  border: 1px solid #ddd;
  border-radius: 3px;
  margin: 80px auto 70px auto;
  padding: 20px;
}

.frame_auto_head {
  font-size: 25px;
  text-transform: uppercase;
  margin-bottom: 20px;
  line-height: 25px;
  padding-bottom: 25px;
  margin-top: 25px;
  font-weight: bold;
  border-bottom: 1px solid #e6e6e6;
}

.support-text {
  margin-bottom: 30px;
}

.support-text p {
  margin-bottom: 4px;
}

.forgot-password-link {
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
}

.forgot-password-link:hover {
  text-decoration: underline;
}
</style>
