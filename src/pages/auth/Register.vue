<template>
  <div class="container">
    <div class="row">
      <div class="wapper-form col-xl-6 col-lg-7 col-md-9 col-sm-12 mx-auto">
        <div class="col-12 col-md-10 mx-auto">
          <form @submit.prevent="submitForm">
            <h2 class="frame_auto_head text-center pt-2">Đăng Ký</h2>

            <!-- Email -->
            <div class="row mb-1 align-items-center">
              <label for="email" class="col-md-4 col-form-label text-md-end">
                <span style="color: #e30000">*</span> Email:
              </label>
              <div class="col-md-8">
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Nhập email"
                  v-model.trim="email"
                  required
                />
              </div>
            </div>

            <!-- Mật khẩu -->
            <div class="row mb-1 align-items-center">
              <label for="password" class="col-md-4 col-form-label text-md-end">
                <span style="color: #e30000">*</span> Mật khẩu:
              </label>
              <div class="col-md-8">
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Nhập mật khẩu"
                  v-model.trim="password"
                  required
                />
              </div>
            </div>

            <!-- Họ và tên -->
            <div class="row mb-1 align-items-center">
              <label for="username" class="col-md-4 col-form-label text-md-end">
                <span style="color: #e30000">*</span>Họ và tên:</label
              >
              <div class="col-md-8">
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  placeholder="Nhập họ và tên"
                  v-model.trim="username"
                  required
                />
              </div>
            </div>

            <!-- Số điện thoại 1 -->
            <div class="row mb-1 align-items-center">
              <label
                for="phonenumber"
                class="col-md-4 col-form-label text-md-end"
              >
                <span style="color: #e30000">*</span> Số điện thoại :
              </label>
              <div class="col-md-8">
                <input
                  type="tel"
                  class="form-control"
                  id="phonenumber"
                  placeholder="Nhập số điện thoại "
                  v-model.trim="phonenumber"
                  required
                />
              </div>
            </div>

            <!-- Số điện thoại 2 -->
            <!-- <div class="row mb-1 align-items-center">
              <label for="phone2" class="col-md-4 col-form-label text-md-end"
                >Số điện thoại 02:</label
              >
              <div class="col-md-8">
                <input
                  type="tel"
                  class="form-control"
                  id="phone2"
                  placeholder="Nhập số điện thoại 02"
                  v-model.trim="phone2"
                />
              </div>
            </div> -->

            <!-- Mô tả dịch vụ -->
            <!-- <div class="row mb-1 align-items-center">
              <label
                for="serviceDescription"
                class="col-md-4 col-form-label text-md-end"
              >
                <span style="color: #e30000">*</span> Mô tả dịch vụ:
              </label>
              <div class="col-md-8">
                <textarea
                  class="form-control"
                  id="serviceDescription"
                  rows="3"
                  placeholder="Nhập mô tả dịch vụ"
                  v-model.trim="serviceDescription"
                  required
                ></textarea>
              </div>
            </div> -->

            <!-- Thành viên giới thiệu -->
            <!-- <div class="row mb-1 align-items-center">
              <label for="referrer" class="col-md-4 col-form-label text-md-end"
                >Thành viên giới thiệu:</label
              >
              <div class="col-md-8">
                <input
                  type="text"
                  class="form-control"
                  id="referrer"
                  placeholder="Nhập tên thành viên giới thiệu"
                  v-model.trim="referrer"
                />
              </div>
            </div> -->

            <!-- Button Đăng Ký -->
            <div class="row">
              <div class="col-12 text-center">
                <button type="submit" class="btn btn-danger my-3 px-5">
                  Đăng Ký
                </button>
              </div>
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
      username: "",
      phonenumber: "",
    };
  },
  methods: {
    async submitForm() {
      await this.$store.dispatch("signup", {
        email: this.email,
        password: this.password,
        username: this.username,
        phonenumber: this.phonenumber,
      });
      this.$router.push("/login");
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
</style>
