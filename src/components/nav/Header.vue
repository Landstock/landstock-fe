<template>
  <header>
    <div class="container">
      <div class="row align-items-center py-2">
        <!-- Logo / Tên website -->
        <div class="col-6 col-lg-2 text-start d-flex align-items-center">
          <router-link to="/" class="text-decoration-none">
            <img
              src="https://bds59.giaodienwebmau.com/wp-content/uploads/2022/07/logo-bd.png"
              alt=""
            />
          </router-link>
        </div>

        <!-- Điều hướng chính -->
        <div class="col-lg-6 d-none d-lg-block">
          <ul class="d-flex justify-content-between list-unstyled m-0">
            <li>
              <router-link to="/" class="text-decoration-none"
                >Trang chủ</router-link
              >
            </li>
            <li>
              <router-link to="/mua-ban-nha-dat" class="text-decoration-none"
                >Nhà đất bán</router-link
              >
            </li>
            <li>
              <router-link to="/mua-ban-dat" class="text-decoration-none"
                >Bán đất</router-link
              >
            </li>
            <li>
              <router-link to="/cho-thue-nha-dat" class="text-decoration-none"
                >Nhà đất cho thuê</router-link
              >
            </li>
            <li>
              <router-link to="/tin-tuc" class="text-decoration-none"
                >Tin tức</router-link
              >
            </li>
            <li>
              <router-link to="/ve-chung-toi" class="text-decoration-none"
                >Về chúng tôi</router-link
              >
            </li>
          </ul>
        </div>

        <!-- Đăng ký / Đăng nhập / Đăng tin -->
        <div class="col-lg-4 d-none d-lg-block">
          <div class="d-flex justify-content-end">
            <div class="pt-2">
              <ul class="d-flex list-unstyled m-0">
                <li class="me-3">
                  <router-link to="/register" class="text-decoration-none"
                    >Đăng ký</router-link
                  >
                </li>
                <li class="me-3">
                  <router-link to="/login" class="text-decoration-none"
                    >Đăng nhập</router-link
                  >
                </li>
              </ul>
            </div>
            <div class="d-flex align-items-center post-btn">
              <router-link
                to="/dang-tin"
                class="d-flex align-items-center text-white text-decoration-none"
              >
                <i class="fa-solid fa-pen me-2"></i>
                <span>Đăng tin</span>
              </router-link>
            </div>
          </div>
        </div>

        <!-- Menu button -->
        <div class="col-6 d-lg-none text-end menu-btn">
          <button class="btn text-decoration-none" @click="toggleMobileMenu">
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Menu mobile -->
    <div v-if="isMobileMenuOpen">
      <div class="mobile-menu-container d-lg-none">
        <div
          class="menu-header d-flex justify-content-between align-items-center px-3 py-2"
        >
          <router-link to="/">
            <img
              class="mt-1"
              src="https://bds59.giaodienwebmau.com/wp-content/uploads/2022/07/logo-bd.png"
              alt=""
          /></router-link>
          <button class="btn-close" @click="toggleMobileMenu"></button>
        </div>
        <div class="menu-body px-3">
          <!-- Nội dung menu -->
          <div class="mt-3 d-flex justify-content-between align-items-center">
            <div class="menu-botton-user">
              <router-link to="/register" class="text-decoration-none"
                >Đăng ký</router-link
              >
            </div>
            <div class="menu-botton-user">
              <router-link to="/login" class="text-decoration-none"
                >Đăng nhập</router-link
              >
            </div>
          </div>
          <div
            class="d-flex justify-content-center align-items-center post-btn"
          >
            <router-link to="/dang-tin" class="text-white text-decoration-none">
              <i class="fa-solid fa-pen me-2"></i>
              <span>Đăng tin</span>
            </router-link>
          </div>
          <ul class="menu-list list-unstyled mt-3">
            <li>
              <router-link to="/" class="text-decoration-none"
                >Trang chủ</router-link
              >
            </li>
            <li>
              <router-link to="/mua-ban-nha-dat" class="text-decoration-none"
                >Nhà đất bán</router-link
              >
            </li>
            <li>
              <router-link to="/mua-ban-dat" class="text-decoration-none"
                >Bán đất</router-link
              >
            </li>
            <li>
              <router-link to="/cho-thue-nha-dat" class="text-decoration-none"
                >Nhà đất cho thuê</router-link
              >
            </li>
            <li>
              <router-link to="/tin-tuc" class="text-decoration-none"
                >Tin tức</router-link
              >
            </li>
            <li>
              <router-link to="/ve-chung-toi" class="text-decoration-none"
                >Về chúng tôi</router-link
              >
            </li>
          </ul>
        </div>
      </div>
      <!-- Overlay -->
      <div class="overlay" @click="toggleMobileMenu"></div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isMobileMenuOpen: false, // Kiểm soát trạng thái menu mobile
    };
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen; // Đảo ngược trạng thái
    },
  },
};
</script>

<style scoped>
/* Header styles */
header {
  background-color: #7ccefe;
  /* text-align: center; */
  color: #fff;
  font-weight: bold;
  position: fixed;
  z-index: 1;
  width: 100%;
}

/* Menu chung */
ul {
  padding: 0;
}

li {
  list-style: none;
  cursor: pointer;
}

li:hover {
  color: yellow;
}

/* Nút đăng tin */
.post-btn {
  border: 2px solid red;
  background-color: red;
  padding: 5px 10px;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
}

.post-btn:hover {
  background-color: rgb(192, 14, 14);
  border-color: rgb(192, 14, 14);
}

/* Menu button */
.menu-btn button {
  font-size: 23px;
}
.menu-btn button:hover {
  color: yellow;
}

/* Mobile menu styles */
.mobile-menu-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  background-color: #f9faf9;
  color: #333;
  z-index: 2;
}

/* Header cho mobile menu */
.menu-header {
  background-color: #7ccefe;
  color: white;
}

/* Nút tài khoản */
.botton-user {
  width: 120px;
  line-height: 34px;
  margin: 0px 5px 10px 0px;
  color: #000;
  border: 1px solid #999;
  text-align: center;
  background: #fff;
  border-radius: 5px;
}

.botton-user:hover {
  background-color: #e0e0e0;
}

/* Menu  */
.menu-botton-user {
  width: 120px;
  line-height: 34px;
  margin: 0px 5px 10px 0px;
  color: #000;
  border: 1px solid #999;
  text-align: center;
  background: #fff;
  border-radius: 5px;
}

.menu-botton-user:hover {
  background-color: red;
  color: #fff;
  border: 1px solid red;
}

/* Các liên kết */
.menu-list li {
  border-bottom: 1px solid #eaeaeb;
  padding: 5px 0;
}

.text-decoration-none {
  text-decoration: none;
  color: inherit;
}
.menu-list li:hover {
  color: #7ccefe;
}

/* Overlay styles */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Màu đen với độ trong suốt 50% */
  z-index: 1; /* Đặt dưới menu mobile */
}
</style>
