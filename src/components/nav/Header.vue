<template>
  <header>
    <div class="container">
      <div class="row align-items-center py-2">
        <!-- Logo -->
        <div class="col-6 col-lg-2 d-flex align-items-center">
          <router-link
            to="/"
            class="d-flex align-items-center text-decoration-none"
          >
            <img
              src="../../img/logo.png"
              alt="Logo"
              style="width: 135px; height: auto"
            />
          </router-link>
        </div>

        <!-- Menu điều hướng -->
        <div class="col-lg-7 col-md-6 d-none d-lg-block">
          <ul
            class="d-flex justify-content-center gap-md-3 gap-lg-5 list-unstyled m-0"
          >
            <li>
              <router-link to="/" class="text-decoration-none"
                >Trang chủ</router-link
              >
            </li>
            <li class="has-submenu">
              <span class="text-decoration-none">Bán</span>
              <ul class="submenu">
                <li>
                  <router-link
                    to="/mua-ban-nha-dat"
                    class="text-decoration-none"
                    >Nhà đất bán</router-link
                  >
                </li>
                <li>
                  <router-link
                    to="/mua-ban-biet-thu"
                    class="text-decoration-none"
                    >Biệt thự bán</router-link
                  >
                </li>
                <li>
                  <router-link
                    to="/mua-ban-chung-cu"
                    class="text-decoration-none"
                    >Chung cư bán</router-link
                  >
                </li>
              </ul>
            </li>

            <li>
              <router-link to="/cho-thue-nha-dat" class="text-decoration-none"
                >Cho thuê</router-link
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

        <!-- Tài khoản và Đăng tin -->
        <div
          class="col-lg-3 col-md-4 d-none d-lg-flex justify-content-end align-items-center gap-lg-3 gap-md-4"
        >
          <!-- Tài khoản -->
          <div class="d-flex align-items-center">
            <template v-if="!isLoggedIn">
              <ul class="d-flex list-unstyled gap-3 m-0">
                <li>
                  <router-link to="/register" class="text-decoration-none"
                    >Đăng ký</router-link
                  >
                </li>
                <li>
                  <router-link to="/login" class="text-decoration-none"
                    >Đăng nhập</router-link
                  >
                </li>
              </ul>
            </template>
            <template v-else>
              <ul class="list-unstyled m-0">
                <li v-if="role === 2">
                  <router-link to="/thong-tin" class="text-decoration-none"
                    >Tài khoản của tôi</router-link
                  >
                </li>
                <li v-if="role === 0">
                  <router-link to="/admin" class="text-decoration-none"
                    >Tài khoản Admin</router-link
                  >
                </li>
                <li v-if="role === 1">
                  <router-link to="/" class="text-decoration-none"
                    >Tài khoản Operator</router-link
                  >
                </li>
              </ul>
            </template>
          </div>
          <!-- Nút đăng tin -->
          <router-link
            v-if="isLoggedIn"
            to="/dang-tin"
            class="d-flex align-items-center text-white text-decoration-none post-btn px-3 py-2 rounded"
          >
            <i class="fa-solid fa-pen me-2"></i>
            <span>Đăng tin</span>
          </router-link>
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
              src="../../img/logo.png"
              alt="Logo"
              style="width: 135px; height: auto"
              class="me-2"
            />
          </router-link>
          <button class="btn-close" @click="toggleMobileMenu"></button>
        </div>
        <div class="menu-body px-3">
          <!-- Nội dung menu -->
          <div
            class="mt-3 d-flex justify-content-between align-items-center"
            v-if="isMobileMenuOpen"
          >
            <div class="menu-botton-user" v-if="!isLoggedIn">
              <router-link to="/register" class="text-decoration-none"
                >Đăng ký</router-link
              >
              <router-link to="/login" class="text-decoration-none"
                >Đăng nhập</router-link
              >
            </div>
            <div class="menu-botton-user" v-else>
              <router-link
                v-if="role === 2"
                to="/dang-tin"
                class="text-decoration-none w-100"
                >Tài khoản của tôi</router-link
              >
              <router-link
                v-if="role === 0"
                to="/admin"
                class="text-decoration-none"
                >Tài khoản của Admin</router-link
              >
              <router-link
                v-if="role === 1"
                to="/operator-dashboard"
                class="text-decoration-none"
                >Tài khoản của Operator</router-link
              >
            </div>
          </div>
          <!-- Đăng tin  -->
          <router-link
            v-if="isLoggedIn"
            to="/dang-tin"
            class="d-flex justify-content-center align-items-center post-btn text-white text-decoration-none"
          >
            <i class="fa-solid fa-pen me-2"></i>
            <span>Đăng tin</span>
          </router-link>
          <!-- các mục  -->
          <ul class="menu-list list-unstyled mt-3">
            <li>
              <router-link to="/" class="text-decoration-none"
                >Trang chủ</router-link
              >
            </li>
            <li>
              <router-link to="/mua-ban-nha-dat" class="text-decoration-none"
                >Bán</router-link
              >
            </li>
            <!-- <li>
              <router-link to="/mua-ban-dat" class="text-decoration-none"
                >Bán đất</router-link
              >
            </li> -->
            <li>
              <router-link to="/cho-thue-nha-dat" class="text-decoration-none"
                >Cho thuê</router-link
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
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "Header",
  setup() {
    const store = useStore();
    const isMobileMenuOpen = ref(false);

    const isLoggedIn = computed(() => !!store.state.auth.token);
    const role = computed(() => parseInt(store.state.auth.role));

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    return {
      isLoggedIn,
      role,
      toggleMobileMenu,
      isMobileMenuOpen,
    };
  },
};
</script>

<style scoped>
/* Header styles */
header {
  background-color: #2e8abf;
  /* text-align: center; */
  color: #fff;
  font-weight: bold;
  position: fixed;
  z-index: 2;
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

/* mục menu bán  */
.has-submenu {
  position: relative;
}

.has-submenu > span::after {
  content: " ▼";
  font-size: 0.7em;
}

.submenu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  padding: 10px 0;
  list-style: none;
  min-width: 180px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

.submenu li {
  padding: 8px 16px;
}

.submenu li:hover {
  background-color: #f5f5f5;
}

.has-submenu:hover .submenu {
  display: block;
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
