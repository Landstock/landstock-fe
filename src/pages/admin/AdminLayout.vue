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

        <!-- Menu BÁN -->
        <div>
          <a class="nav-link" href="#" @click.prevent="toggleDropdown('ban')">
            <i class="fas fa-home me-2"></i> <span>BĐS Bán</span>
            <i class="fas fa-chevron-down float-end mt-1"></i>
          </a>
          <ul v-if="showDropdown1" class="ml-3 space-y-1 submenu">
            <li
              v-for="item in loaiTinBan"
              :key="item._id"
              class="nav-link sub-link text-decoration-none"
            >
              <router-link
                class="block px-2 py-1 rounded hover:bg-gray-200"
                :to="`/admin/quan-ly-danh-sach-ban/${item._id}`"
              >
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Menu CHO THUÊ -->
        <div>
          <a
            class="nav-link"
            href="#"
            @click.prevent="toggleDropdown('chothue')"
          >
            <i class="fas fa-key me-2"></i> <span>BĐS Cho thuê</span>
            <i class="fas fa-chevron-down float-end mt-1"></i>
          </a>
          <ul v-if="showDropdown2" class="ml-3 space-y-1 submenu">
            <li
              v-for="item in loaiTinChoThue"
              :key="item._id"
              class="nav-link sub-link"
            >
              <router-link
                class="block px-2 py-1 rounded hover:bg-gray-200"
                :to="`/admin/quan-ly-danh-sach-cho-thue/${item._id}`"
              >
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <li class="nav-item text-center mt-auto">
          <a href="#" class="nav-link text-danger" @click.prevent="logout">
            <i class="fas fa-sign-out-alt me-2"></i>
            <span>Đăng xuất</span>
          </a>
        </li>
      </ul>
    </aside>

    <!-- Main content -->
    <div class="main-content">
      <!-- Header -->
      <header
        class="admin-header d-flex justify-content-end align-items-center px-4 py-3 shadow-sm"
      >
        <div class="user-info d-flex align-items-center gap-2">
          <span class="fw-semibold">Admin</span>
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
      <div class="content-wrapper p-4">
        <!-- $route.fullPath: nó là biến có sẵn trong Vue Router, dùng trực tiếp được trong template -->
        <!-- Vue Router luôn inject một object $route vào tất cả component.
          $route chứa các thông tin về URL hiện tại: path, params, query, fullPath…
          fullPath là toàn bộ đường dẫn đang hiển thị, bao gồm cả query string nếu có.
          Khi bạn thêm :key="$route.fullPath", Vue sẽ thấy “key” đổi → hủy component cũ → render lại từ đầu. -->
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
    // load category nếu chưa có
    if (!this.$store.state.category.category.length) {
      this.$store.dispatch("category/getCategoryManage");
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
      this.isCollapsed = !this.isCollapsed;
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
  width: 250px;
  background: #ffffff;
  border-right: 1px solid #dee2e6;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
}

.sidebar.collapsed {
  width: 70px;
}

.toggle-btn {
  box-shadow: none;
  border: none;
  background-color: #f8f9fa;
}

.toggle-btn:hover {
  background-color: #e2e6ea;
}

/* .logo img {
  max-width: 120px;
  transition: max-width 0.3s ease;
} */

.sidebar.collapsed .logo img {
  max-width: 40px;
}

.nav-link {
  color: #333;
  font-size: 1rem;
  padding: 10px 15px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  transition: background 0.2s;
}

.nav-link i {
  width: 20px;
}

.nav-link span {
  margin-left: 8px;
  transition: opacity 0.3s ease;
}

.sidebar.collapsed .nav-link span,
.sidebar.collapsed .submenu {
  display: none;
}

.nav-link:hover {
  background: #eaf3ff;
  color: #0d6efd;
}

.submenu {
  list-style: none;
  padding-left: 20px;
}

.sub-link {
  font-size: 0.95rem;
  padding: 6px 15px;
  color: #555;
}

.sub-link:hover {
  background: #f0f2f5;
  color: #0d6efd;
  border-radius: 4px;
}

.nav-link.active {
  background-color: #d9e8fb;
  color: #0d6efd;
  font-weight: 600;
}

/* === HEADER === */
.admin-header {
  background: #e3eaf2;
  height: 64px;
}

/* === CONTENT === */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content-wrapper {
  background: #fff;
  flex-grow: 1;
  border-radius: 8px;
  margin: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
</style>
