<script>
import { onMounted, onUnmounted, computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "Header",
  setup() {
    const store = useStore();
    const isMobileMenuOpen = ref(false);

    // Load categories from store
    const categories = computed(() => store.state.category.category || []);

    // Dynamic menu items from database
    const menuItems = computed(() => [
      {
        title: "Bán",
        children: categories.value
          .filter((cat) => cat.type === "ban")
          .map((cat) => ({
            label: cat.name,
            path: `/danh-sach/${cat.slug}`,
          })),
      },
      {
        title: "Cho thuê",
        children: categories.value
          .filter((cat) => cat.type === "chothue")
          .map((cat) => ({
            label: cat.name,
            path: `/danh-sach/${cat.slug}`,
          })),
      },
    ]);

    const isLoggedIn = computed(() => store.getters["auth/isAuthentication"]);
    const role = computed(() => parseInt(store.getters["auth/role"]));

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    const isScrolled = ref(false);
    const handleScroll = () => {
      isScrolled.value = window.scrollY > 10;
    };

    // Load categories when component mounts
    onMounted(() => {
      window.addEventListener("scroll", handleScroll);

      // Load categories if not already loaded
      if (!store.state.category.category.length) {
        store.dispatch("category/getCategoryManage");
      }
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return {
      isLoggedIn,
      role,
      toggleMobileMenu,
      isMobileMenuOpen,
      isScrolled,
      menuItems,
    };
  },
};
</script>

<template>
  <header :class="{ scrolled: isScrolled }">
    <div class="container">
      <div class="row align-items-center py-2">
        <!-- Logo -->
        <div class="col-lg-1 d-flex align-items-center" style="height: 55px">
          <router-link
            to="/"
            class="d-flex align-items-center text-decoration-none w-100 h-100"
          >
            <img
              src="../../assets/image/logo.png"
              alt="Logo"
              style="max-height: 250%; max-width: 130%; object-fit: contain"
            />
          </router-link>
        </div>

        <!-- Menu điều hướng -->
        <div
          class="col-lg-7 col-md-6 d-none d-lg-block"
          style="padding-left: 30px"
        >
          <ul
            class="d-flex justify-content-start gap-md-2 gap-lg-5 list-unstyled m-0"
          >
            <li>
              <router-link to="/" class="text-decoration-none"
                >Trang chủ</router-link
              >
            </li>
            <!-- danh sách các mục  -->
            <li
              v-for="(item, index) in menuItems"
              :key="index"
              class="has-submenu"
            >
              <span class="text-decoration-none">{{ item.title }}</span>
              <ul class="submenu">
                <li v-for="(child, i) in item.children" :key="i">
                  <router-link :to="child.path" class="text-decoration-none">
                    {{ child.label }}
                  </router-link>
                </li>
              </ul>
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
          class="col-lg-4 col-md-4 d-none d-lg-flex justify-content-end align-items-center gap-lg-3 gap-md-4"
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
        <!-- Header logo + close -->
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
          <!-- Auth -->
          <div class="mt-3 d-flex justify-content-around" v-if="!isLoggedIn">
            <div class="menu-botton-user mb-2">
              <router-link to="/register" class="text-decoration-none"
                >Đăng ký</router-link
              >
            </div>
            <div class="menu-botton-user mb-2">
              <router-link to="/login" class="text-decoration-none"
                >Đăng nhập</router-link
              >
            </div>
          </div>

          <div class="mt-3" v-else>
            <div class="menu-botton-user da-login mb-2" v-if="role === 2">
              <router-link to="/thong-tin" class="text-decoration-none"
                >Tài khoản của tôi</router-link
              >
            </div>
            <div class="menu-botton-user da-login mb-2" v-if="role === 0">
              <router-link to="/admin" class="text-decoration-none"
                >Tài khoản Admin</router-link
              >
            </div>
            <div class="menu-botton-user da-login mb-2" v-if="role === 1">
              <router-link to="/operator-dashboard" class="text-decoration-none"
                >Tài khoản Operator</router-link
              >
            </div>
          </div>

          <!-- Nút đăng tin -->
          <router-link
            v-if="isLoggedIn"
            to="/dang-tin"
            class="d-flex justify-content-center align-items-center post-btn text-white text-decoration-none mt-3"
          >
            <i class="fa-solid fa-pen me-2"></i>
            <span>Đăng tin</span>
          </router-link>

          <!-- Danh mục -->
          <ul class="menu-list list-unstyled mt-2">
            <li>
              <router-link to="/" class="text-decoration-none"
                >Trang chủ</router-link
              >
            </li>

            <!-- Duyệt từ menuItems -->
            <li v-for="(group, index) in menuItems" :key="index" class="mt-3">
              <strong class="menu-group-title">{{ group.title }}</strong>
              <ul class="list-unstyled ps-3 menu-group-list">
                <li
                  v-for="(child, i) in group.children"
                  :key="i"
                  class="menu-child-item"
                >
                  <router-link :to="child.path" class="text-decoration-none">{{
                    child.label
                  }}</router-link>
                </li>
              </ul>
            </li>

            <!-- Các mục thêm -->
            <li class="mt-3">
              <router-link to="/tin-tuc" class="text-decoration-none"
                >Tin tức</router-link
              >
            </li>
            <li>
              <router-link to="/ve-chung-toi" class="text-decoration-none"
                >Về chúng tôi</router-link
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

<style scoped>
/* Header styles */
header {
  background-color: #fff;
  color: #333;
  font-weight: bold;
  position: fixed;
  z-index: 2;
  width: 100%;
  transition: box-shadow 0.3s ease;
  box-shadow: none; /* ban đầu không có bóng */
}

header.scrolled {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* thêm bóng khi cuộn */
}

/* Menu chung */
ul {
  padding: 0;
}

li {
  list-style: none;
  cursor: pointer;
}

li > .text-decoration-none:hover {
  color: #ff6600;
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
  padding: 8px 0;
  list-style: none;
  min-width: 200px;
  border-radius: 8px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  z-index: 2;
  transition: all 0.3s ease;
}

.submenu li {
  padding: 10px 20px;
  white-space: nowrap;
}

.submenu li:hover {
  background-color: #f0f0f0;
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
  z-index: 4;
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

.da-login {
  width: 100%;
}

.menu-botton-user:hover {
  background-color: red;
  color: #fff;
  border: 1px solid red;
}

/* Các liên kết */
.menu-list li {
  border-bottom: 1px solid #eaeaeb;
  padding: 5px 5px;
}

/* Nhóm tiêu đề */
.menu-group-title {
  font-weight: bold;
  color: #333;
  padding-left: 5px;
  margin-bottom: 5px;
  display: block;
}

/* Mục con */
.menu-child-item {
  border-bottom: 1px solid #eaeaeb;
  padding: 8px 0;
  transition: background-color 0.2s ease;
}

/* Hover */
.menu-child-item:hover {
  background-color: #f5f5f5;
}

.menu-child-item:hover .text-decoration-none {
  color: #ff6600;
  font-weight: 500;
}

.menu-child-item:last-child {
  border-bottom: none;
}

.text-decoration-none {
  text-decoration: none;
  color: inherit;
}
.menu-list li:hover {
  color: #ff6600;
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
