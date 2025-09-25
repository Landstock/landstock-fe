<template>
  <header :class="{ scrolled: isScrolled }">
    <div class="container">
      <div class="row align-items-center py-2">
        <!-- Logo -->
        <div
          class="col-lg-1 col-md-6 col-6 d-flex align-items-center justify-content-start justify-content-md-start logo-container"
          style="height: 55px"
        >
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
          <ul class="d-flex justify-content-start list-unstyled m-0">
            <!-- Trang chủ -->
            <li class="menu-item">
              <router-link to="/" class="menu-link"> Trang chủ </router-link>
            </li>

            <!-- Danh sách các mục động từ database -->
            <li
              v-for="(item, index) in menuItems"
              :key="index"
              class="menu-item has-submenu"
            >
              <div class="menu-link dropdown-toggle">
                {{ item.title }}
              </div>
              <ul class="submenu">
                <li
                  v-for="(child, i) in item.children"
                  :key="i"
                  class="submenu-item"
                >
                  <router-link :to="child.path" class="submenu-link">
                    {{ child.label }}
                  </router-link>
                </li>
              </ul>
            </li>

            <!-- Tin tức -->
            <li class="menu-item">
              <router-link to="/tin-tuc" class="menu-link">
                Tin tức
              </router-link>
            </li>

            <!-- Về chúng tôi -->
            <li class="menu-item">
              <router-link to="/ve-chung-toi" class="menu-link">
                Về chúng tôi
              </router-link>
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
                <li class="menu-item">
                  <router-link to="/register" class="menu-link">
                    Đăng ký
                  </router-link>
                </li>
                <li class="menu-item">
                  <router-link to="/login" class="menu-link">
                    Đăng nhập
                  </router-link>
                </li>
              </ul>
            </template>
            <template v-else>
              <ul class="list-unstyled m-0">
                <li v-if="role === 2" class="menu-item">
                  <router-link to="/thong-tin" class="menu-link">
                    Tài khoản của tôi
                  </router-link>
                </li>
                <li v-if="role === 0" class="menu-item">
                  <router-link to="/admin" class="menu-link">
                    Tài khoản Admin
                  </router-link>
                </li>
                <li v-if="role === 1" class="menu-item">
                  <router-link to="/" class="menu-link">
                    Tài khoản Operator
                  </router-link>
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
        <div class="col-md-6 d-lg-none text-end menu-btn">
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
          style="height: 72px"
        >
          <router-link to="/">
            <img
              src="../../assets/image/logotg.png"
              alt="Logo"
              style="
                width: 126px;
                height: auto;
                max-height: 250%;
                max-width: 130%;
                object-fit: contain;
              "
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

          <!-- Navigation Menu -->
          <nav class="mobile-nav">
            <ul class="list-unstyled">
              <li class="nav-item">
                <router-link to="/" class="nav-link" @click="closeMobileMenu">
                  <i class="fas fa-home me-3"></i>
                  Trang chủ
                </router-link>
              </li>

              <!-- Dynamic menu items -->
              <li
                v-for="(group, index) in menuItems"
                :key="index"
                class="nav-item has-children"
              >
                <div
                  class="nav-link parent-nav"
                  @click="toggleSubmenu(index)"
                  :class="{ active: activeSubmenu === index }"
                >
                  <i class="fas fa-list me-3"></i>
                  <span>{{ group.title }}</span>
                  <i class="fas fa-chevron-down ms-auto toggle-icon"></i>
                </div>
                <ul
                  class="submenu-mobile"
                  :class="{ show: activeSubmenu === index }"
                >
                  <li
                    v-for="(child, i) in group.children"
                    :key="i"
                    class="submenu-item-mobile"
                  >
                    <router-link
                      :to="child.path"
                      class="submenu-link-mobile"
                      @click="closeMobileMenu"
                    >
                      {{ child.label }}
                    </router-link>
                  </li>
                </ul>
              </li>

              <li class="nav-item">
                <router-link
                  to="/tin-tuc"
                  class="nav-link"
                  @click="closeMobileMenu"
                >
                  <i class="fas fa-newspaper me-3"></i>
                  Tin tức
                </router-link>
              </li>

              <li class="nav-item">
                <router-link
                  to="/ve-chung-toi"
                  class="nav-link"
                  @click="closeMobileMenu"
                >
                  <i class="fas fa-info-circle me-3"></i>
                  Về chúng tôi
                </router-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <!-- Overlay -->
      <div class="overlay" @click="toggleMobileMenu"></div>
    </div>
  </header>
</template>

<script>
import { onMounted, onUnmounted, computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "Header",
  setup() {
    const store = useStore();
    const isMobileMenuOpen = ref(false);
    const activeSubmenu = ref(null);

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
      if (isMobileMenuOpen.value) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
        activeSubmenu.value = null;
      }
    };

    const closeMobileMenu = () => {
      isMobileMenuOpen.value = false;
      document.body.style.overflow = "";
      activeSubmenu.value = null;
    };

    const toggleSubmenu = (index) => {
      activeSubmenu.value = activeSubmenu.value === index ? null : index;
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
      document.body.style.overflow = "";
    });

    return {
      isLoggedIn,
      role,
      toggleMobileMenu,
      closeMobileMenu,
      toggleSubmenu,
      isMobileMenuOpen,
      activeSubmenu,
      isScrolled,
      menuItems,
    };
  },
};
</script>

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
  box-shadow: none;
}

header.scrolled {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Menu Item Improvements - Tăng vùng hover và click */
.menu-item {
  position: relative;
  list-style: none;
  cursor: pointer;
}

.menu-link {
  display: inline-block;
  padding: 12px 16px; /* Tăng padding để dễ click hơn */
  text-decoration: none;
  color: #333;
  font-weight: bold;
  transition: all 0.3s ease;
  border-radius: 8px; /* Bo góc để đẹp hơn */
  min-width: 80px; /* Đảm bảo vùng click tối thiểu */
  text-align: center;
}

.menu-link:hover {
  color: #ff6600;
  background-color: rgba(255, 102, 0, 0.1); /* Thêm background khi hover */
  transform: translateY(-1px); /* Hiệu ứng nhẹ */
}

/* Dropdown Menu Improvements */
.has-submenu {
  position: relative;
}

.dropdown-toggle {
  cursor: pointer;
  user-select: none;
}

.dropdown-toggle::after {
  transition: transform 0.3s ease;
}

.has-submenu:hover .dropdown-toggle::after {
  transform: rotate(180deg); /* Xoay icon khi hover */
}

/* Submenu Improvements */
.submenu {
  display: none;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 0;
  list-style: none;
  min-width: 220px;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  z-index: 2;
  border: 1px solid rgba(0, 0, 0, 0.08);
  opacity: 0;
  visibility: hidden;
  transform: translateX(-50%) translateY(-10px);
  transition: all 0.3s ease;
}

/* Hiển thị submenu khi hover vào parent */
.has-submenu:hover .submenu {
  display: block;
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

/* Submenu items */
.submenu-item {
  list-style: none;
}

.submenu-link {
  display: block;
  padding: 12px 20px; /* Tăng padding để dễ click */
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: all 0.2s ease;
  border-radius: 0;
}

.submenu-link:hover {
  background-color: #f8f9fa;
  color: #ff6600;
  border-radius: 12px;
}

/* Tạo vùng hover lớn hơn cho submenu */
.has-submenu::before {
  content: "";
  position: absolute;
  top: 0;
  left: -10px;
  right: -10px;
  bottom: -10px;
  z-index: -1;
}

/* Triangle indicator cho submenu */
.submenu::before {
  content: "";
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid white;
  filter: drop-shadow(0 -2px 2px rgba(0, 0, 0, 0.1));
}

/* Active state cho router-link */
.router-link-active {
  color: #ff6600;
  background-color: rgba(255, 102, 0, 0.1);
}

/* Nút đăng tin */
.post-btn {
  border: 2px solid red;
  background-color: red;
  padding: 8px 16px; /* Tăng padding */
  border-radius: 8px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
  min-width: 120px; /* Đảm bảo kích thước tối thiểu */
}

.post-btn:hover {
  background-color: rgb(192, 14, 14);
  border-color: rgb(192, 14, 14);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(192, 14, 14, 0.3);
}

/* Menu button */
.menu-btn button {
  font-size: 23px;
  padding: 8px 12px; /* Tăng vùng click */
}
.menu-btn button:hover {
  color: #ff6600;
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
  padding: 8px 12px; /* Tăng padding */
}

.botton-user:hover {
  background-color: #e0e0e0;
}

/* Menu mobile */
.menu-botton-user {
  width: 120px;
  line-height: 34px;
  margin: 0px 5px 10px 0px;
  color: #000;
  border: 1px solid #999;
  text-align: center;
  background: #fff;
  border-radius: 5px;
  padding: 8px 12px; /* Tăng padding */
}

.da-login {
  width: 100%;
}

.menu-botton-user:hover {
  background-color: red;
  color: #fff;
  border: 1px solid red;
}

/* ================================
   CSS cho Mobile Navigation Menu
   ================================ */

/* Mobile Navigation - Container chính */
.mobile-nav {
  margin-top: 20px;
}

/* Nav Items - Các mục menu chính */
.nav-item {
  border-bottom: 1px solid #f1f3f4;
}

/* Nav Links - Links cho các mục menu */
.nav-link {
  display: flex;
  align-items: center;
  padding: 16px 12px;
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background-color: #f8f9fa;
  color: #ff6600;
}

/* Parent Nav - Mục cha có submenu */
.parent-nav {
  cursor: pointer;
  user-select: none;
}

.parent-nav.active {
  background-color: #f8f9fa;
  color: #ff6600;
}

/* Toggle Icon - Icon mũi tên dropdown */
.toggle-icon {
  font-size: 12px;
  transition: transform 0.3s ease;
}

.parent-nav.active .toggle-icon {
  transform: rotate(180deg);
}

/* Mobile Submenu - Menu con */
.submenu-mobile {
  max-height: 0;
  overflow: hidden;
  background-color: #f8f9fa;
  transition: max-height 0.3s ease;
  list-style: none;
  padding: 0;
  margin: 0;
}

.submenu-mobile.show {
  max-height: 300px;
  padding: 8px 0;
}

/* Submenu Items - Các mục trong menu con */
.submenu-item-mobile {
  border-bottom: 1px solid #e9ecef;
}

.submenu-item-mobile:last-child {
  border-bottom: none;
}

/* Submenu Links - Links trong menu con */
.submenu-link-mobile {
  display: block;
  padding: 12px 24px 12px 48px;
  color: #666;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s ease;
}

.submenu-link-mobile:hover {
  background-color: #e9ecef;
  color: #ff6600;
}

/* Router Link Active - Trạng thái active cho navigation */
.router-link-active.nav-link {
  color: #ff6600;
  background-color: #f8f9fa;
}

/* Mobile Portrait - Màn hình nhỏ */
@media (max-width: 575.98px) {
  .nav-link {
    padding: 14px 8px;
    font-size: 15px;
  }

  .submenu-link-mobile {
    padding: 10px 20px 10px 40px;
    font-size: 13px;
  }
}

@media (max-width: 767px) {
  .menu-header {
    height: 94px !important;
  }

  .logo-container img {
    padding-top: 14px;
  }
  .menu-btn button {
    margin-top: -70px;
  }
}

/* Overlay styles */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

/* Responsive improvements */
@media (max-width: 991px) {
  .menu-item {
    margin: 0 5px;
  }

  .menu-link {
    padding: 8px 12px;
    min-width: 60px;
    font-size: 14px;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .menu-link,
  .submenu-link,
  .submenu,
  .dropdown-toggle::after {
    transition: none;
  }
}

/* Focus states for keyboard navigation */
.menu-link:focus,
.submenu-link:focus,
.nav-link:focus,
.submenu-link-mobile:focus {
  outline: 2px solid #ff6600;
  outline-offset: 2px;
}
</style>
