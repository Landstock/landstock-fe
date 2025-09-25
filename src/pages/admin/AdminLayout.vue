<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <aside :class="['sidebar', { collapsed: isSidebarCollapsed }]">
      <div class="d-flex align-items-center justify-content-between px-3 py-2">
        <!-- Logo -->
        <div
          v-show="!isCollapsed"
          class="logo px-2 py-2 text-center"
          style="
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          <router-link to="/">
            <img
              src="../../assets/image/logo.png"
              alt="Logo"
              style="max-height: 100px; height: 100px; object-fit: contain"
            />
          </router-link>
        </div>

        <!-- Nút toggle -->
        <button class="btn btn-light btn-sm toggle-btn" @click="toggleSidebar">
          <i class="fas fa-bars text-dark"></i>
        </button>
      </div>

      <ul class="nav flex-column px-2">
        <li class="nav-item">
          <router-link to="/admin/dashboard" class="nav-link">
            <i class="fas fa-tachometer-alt me-2"></i>
            <span>Dashboard</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/admin/users">
            <i class="fas fa-users me-2"></i>
            <span>Người dùng</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/admin/them-tin-tuc">
            <i class="fas fa-newspaper me-2"></i>
            <span>Tin tức</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/admin/quan-ly-loai-tin">
            <i class="fas fa-tags me-2"></i>
            <span>Loại tin</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/admin/quan-ly-bai-dang">
            <i class="fas fa-file-alt me-2"></i>
            <span>Quản lý bài đăng</span>
          </router-link>
        </li>

        <!-- Menu BĐS Bán  -->
        <li class="nav-item dropdown-nav">
          <a
            class="nav-link d-flex align-items-center justify-content-between"
            href="#"
            @click.prevent="toggleDropdown('ban')"
            :class="{ active: showDropdown1 }"
            role="button"
            aria-expanded="false"
          >
            <div class="d-flex align-items-center">
              <i class="fas fa-home me-2"></i>
              <span>BĐS Bán</span>
            </div>
            <i
              class="fas fa-chevron-down arrow-icon transition-all"
              :class="{ 'rotate-180': showDropdown1 }"
            ></i>
          </a>
          <transition name="dropdown">
            <ul v-if="showDropdown1" class="submenu list-unstyled ms-3 mt-2">
              <li
                v-for="item in loaiTinBan"
                :key="item._id"
                class="submenu-item mb-1"
              >
                <router-link
                  :to="`/admin/quan-ly-danh-sach-ban/${item._id}`"
                  class="submenu-link d-block px-3 py-2 rounded text-decoration-none"
                  active-class="active"
                >
                  <i class="fas fa-circle me-2" style="font-size: 0.5rem"></i>
                  {{ item.name }}
                </router-link>
              </li>
            </ul>
          </transition>
        </li>

        <!-- Menu BĐS Cho Thuê  -->
        <li class="nav-item dropdown-nav">
          <a
            class="nav-link d-flex align-items-center justify-content-between"
            href="#"
            @click.prevent="toggleDropdown('chothue')"
            :class="{ active: showDropdown2 }"
            role="button"
            aria-expanded="false"
          >
            <div class="d-flex align-items-center">
              <i class="fas fa-key me-2"></i>
              <span>BĐS Cho Thuê</span>
            </div>
            <i
              class="fas fa-chevron-down arrow-icon transition-all"
              :class="{ 'rotate-180': showDropdown2 }"
            ></i>
          </a>
          <transition name="dropdown">
            <ul v-if="showDropdown2" class="submenu list-unstyled ms-3 mt-2">
              <li
                v-for="item in loaiTinChoThue"
                :key="item._id"
                class="submenu-item mb-1"
              >
                <router-link
                  :to="`/admin/quan-ly-danh-sach-cho-thue/${item._id}`"
                  class="submenu-link d-block px-3 py-2 rounded text-decoration-none"
                  active-class="active"
                >
                  <i class="fas fa-circle me-2" style="font-size: 0.5rem"></i>
                  {{ item.name }}
                </router-link>
              </li>
            </ul>
          </transition>
        </li>

        <li class="nav-item text-center mt-auto">
          <a href="#" class="nav-link text-danger" @click.prevent="logout">
            <i class="fas fa-sign-out-alt me-2"></i>
            <span>Đăng xuất</span>
          </a>
        </li>
      </ul>
    </aside>

    <!-- Overlay for mobile -->
    <div
      v-if="isSidebarCollapsed && isMobile"
      class="sidebar-overlay"
      @click="closeSidebar"
    ></div>

    <!-- Main content -->
    <div class="main-content">
      <!-- Header -->
      <header
        class="admin-header d-flex justify-content-between align-items-center px-3 px-md-4 py-3 shadow-sm"
      >
        <!-- Mobile menu button -->
        <button
          class="btn btn-outline-secondary d-md-none mobile-menu-btn"
          @click="toggleMobileSidebar"
        >
          <i class="fas fa-bars"></i>
        </button>

        <div class="user-info d-flex align-items-center gap-2">
          <span class="fw-semibold d-none d-sm-inline">Admin</span>
          <img
            src="https://i.pravatar.cc/40"
            alt="avatar"
            class="rounded-circle"
            width="40"
            height="40"
          />
        </div>
      </header>

      <!-- Page content -->
      <div class="content-wrapper p-3 p-md-4">
        <router-view :key="$route.fullPath" />
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      isSidebarCollapsed: false,
      isCollapsed: false,
      showDropdown1: false,
      showDropdown2: false,
      isMobile: false,
    };
  },
  computed: {
    loaiTinBan() {
      return this.$store.state.category.category.filter(
        (c) => c.type === "ban"
      );
    },
    loaiTinChoThue() {
      return this.$store.state.category.category.filter(
        (c) => c.type === "chothue"
      );
    },
  },
  created() {
    // Load category nếu chưa có
    if (!this.$store.state.category.category.length) {
      this.$store.dispatch("category/getCategoryManage");
    }
    // Check screen size
    this.checkScreenSize();
  },
  mounted() {
    // Listen for window resize
    window.addEventListener("resize", this.checkScreenSize);
    // Close dropdowns when clicking outside
    document.addEventListener("click", this.closeDropdownsOnClickOutside);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreenSize);
    document.removeEventListener("click", this.closeDropdownsOnClickOutside);
  },
  methods: {
    checkScreenSize() {
      this.isMobile = window.innerWidth < 768;
      if (this.isMobile) {
        this.isSidebarCollapsed = true;
        this.isCollapsed = true;
      } else {
        this.isSidebarCollapsed = false;
        this.isCollapsed = false;
      }
    },
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
      this.isCollapsed = !this.isCollapsed;
    },
    toggleMobileSidebar() {
      if (this.isMobile) {
        this.isSidebarCollapsed = !this.isSidebarCollapsed;
        this.isCollapsed = !this.isCollapsed;
      }
    },
    closeSidebar() {
      if (this.isMobile) {
        this.isSidebarCollapsed = true;
        this.isCollapsed = true;
      }
    },
    toggleDropdown(menu) {
      if (menu === "ban") {
        this.showDropdown1 = !this.showDropdown1;
        this.showDropdown2 = false;
      } else if (menu === "chothue") {
        this.showDropdown2 = !this.showDropdown2;
        this.showDropdown1 = false;
      }
    },
    closeDropdownsOnClickOutside(event) {
      // Close dropdowns if clicking outside the sidebar
      if (!event.target.closest(".sidebar")) {
        this.showDropdown1 = false;
        this.showDropdown2 = false;
      }
    },
    logout() {
      Swal.fire({
        title: "Đăng xuất?",
        text: "Bạn có chắc chắn muốn đăng xuất?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đăng xuất",
        cancelButtonText: "Huỷ",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("auth/logout");
          this.$router.replace("/login");
          Swal.fire("Đã đăng xuất", "Bạn đã đăng xuất thành công", "success");
        }
      });
    },
  },
};
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f4f6f9;
}

/* === SIDEBAR === */
.sidebar {
  width: 280px;
  background: #ffffff;
  border-right: 1px solid #dee2e6;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 2;
}

.sidebar.collapsed {
  width: 70px;
}

/* Mobile sidebar */
@media (max-width: 767.98px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 280px;
    transform: translateX(-100%);
    z-index: 2;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }

  .sidebar:not(.collapsed) {
    transform: translateX(0);
  }

  .main-content {
    margin-left: 0 !important;
    width: 100% !important;
  }
}

/* Sidebar overlay for mobile */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: none;
}

/* @media (max-width: 767.98px) {
  .sidebar-overlay {
    display: block;
  }
} */

/* Toggle button */
.toggle-btn {
  box-shadow: none;
  border: none;
  background-color: #f8f9fa;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-btn:hover {
  background-color: #e2e6ea;
}

/* Mobile menu button */
.mobile-menu-btn {
  border: 1px solid #dee2e6;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Navigation */
.nav-link {
  color: #495057;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  margin-bottom: 4px;
  position: relative;
}

.nav-link:hover {
  background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
  color: #1976d2;
  transform: translateX(2px);
}

.nav-link.active,
.nav-link.router-link-active {
  background: linear-gradient(135deg, #1976d2 0%, #7b1fa2 100%);
  color: #ffffff !important;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.3);
}

.nav-link i {
  width: 20px;
  min-width: 20px;
  text-align: center;
  font-size: 1rem;
}

.nav-link span {
  margin-left: 12px;
  transition: opacity 0.3s ease;
  white-space: nowrap;
}

/* Collapsed sidebar styles */
.sidebar.collapsed .nav-link span,
.sidebar.collapsed .submenu {
  display: none;
}

.sidebar.collapsed .nav-link {
  justify-content: center;
  padding: 12px 2px;
}

/* Dropdown Navigation */
.dropdown-nav {
  margin-bottom: 8px;
}

.dropdown-toggle {
  cursor: pointer;
  user-select: none;
}

.dropdown-toggle.active {
  background: linear-gradient(135deg, #1976d2 0%, #7b1fa2 100%);
}

/* Arrow Icon Animation */
.arrow-icon {
  font-size: 0.75rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.rotate-180 {
  transform: rotate(180deg);
}

/* Submenu */
.submenu {
  overflow: hidden;
  padding-left: 0;
}

.submenu-item {
  position: relative;
}

.submenu-link {
  color: #6c757d;
  font-size: 0.9rem;
  font-weight: 400;
  padding: 10px 16px;
  border-radius: 6px;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.submenu-link:hover {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  color: #495057;
  border-left-color: #007bff;
  transform: translateX(3px);
}

.submenu-link.active,
.submenu-link.router-link-active {
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  color: #ffffff;
  border-left-color: #ffffff;
  font-weight: 500;
}

/* Dropdown Animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: top;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scaleY(0.8) translateY(-10px);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: scaleY(1) translateY(0);
}

/* === HEADER === */
.admin-header {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-bottom: 1px solid #dee2e6;
  height: 70px;
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 1;
}

.user-info {
  background: rgba(255, 255, 255, 0.8);
  padding: 8px 16px;
  border-radius: 50px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

/* === CONTENT === */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 0;
  transition: margin-left 0.3s ease;
}

.content-wrapper {
  background: #fff;
  flex-grow: 1;
  border-radius: 12px;
  margin: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  min-height: calc(100vh - 118px);
}

/* Responsive adjustments */
@media (max-width: 575.98px) {
  .content-wrapper {
    margin: 12px;
    border-radius: 8px;
  }

  .admin-header {
    height: 60px;
  }

  .nav-link {
    padding: 10px 14px;
    font-size: 0.9rem;
  }

  .submenu-link {
    padding: 8px 14px;
    font-size: 0.85rem;
  }
}

@media (min-width: 576px) and (max-width: 767.98px) {
  .content-wrapper {
    margin: 14px;
  }
}

@media (min-width: 768px) and (max-width: 991.98px) {
  .sidebar {
    width: 260px;
  }

  /* .main-content {
    margin-left: 260px;
  } */

  /* .sidebar.collapsed + .main-content {
    margin-left: 70px;
  } */
}

@media (min-width: 1200px) {
  .sidebar {
    width: 300px;
  }
  /* 
  .main-content {
    margin-left: 300px;
  } */

  /* .sidebar.collapsed + .main-content {
    margin-left: 70px;
  } */

  .content-wrapper {
    margin: 24px;
  }
}

/* Utility classes */
.transition-all {
  transition: all 0.3s ease;
}

/* Focus states for accessibility */
.nav-link:focus,
.submenu-link:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

/* Print styles */
@media print {
  .sidebar {
    display: none;
  }

  .main-content {
    margin-left: 0;
  }
}
</style>
