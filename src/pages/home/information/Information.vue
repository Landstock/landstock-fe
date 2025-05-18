<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Sidebar bên trái -->
      <nav class="col-lg-3 col-md-4 bg-light sidebar-custom">
        <div class="sidebar-sticky pt-4">
          <h5 class="mb-4 text-center">👤 Hau</h5>
          <ul class="nav flex-column px-3">
            <li class="nav-item mb-3">
              <router-link to="/dang-tin" class="nav-link-custom"
                >📌 Đăng tin BĐS</router-link
              >
            </li>
            <li class="nav-item mb-3">
              <router-link to="/danh-sach-tin-dang" class="nav-link-custom"
                >📋 Danh sách tin đăng</router-link
              >
            </li>
            <li class="nav-item mb-3">
              <router-link to="/sua-thong-tin-ca-nhan" class="nav-link-custom"
                >🛠️ Sửa thông tin cá nhân</router-link
              >
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link-custom text-danger" @click="logout"
                >🚪 Thoát</a
              >
            </li>
          </ul>
        </div>
      </nav>

      <!-- Nội dung bên phải -->
      <main class="col-lg-9 col-md-8 content-area">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/login");
    },
  },
};
</script>

<style scoped>
.sidebar-custom {
  margin-top: 70px;
  height: auto;
  border-right: 1px solid #ddd;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.05);
}

.nav-link-custom {
  display: block;
  padding: 10px 15px;
  border-radius: 8px;
  color: #333;
  background-color: transparent;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

.nav-link-custom:hover {
  background-color: #f1c150;
  color: #fff;
  text-decoration: none;
}

.content-area {
  background-color: #fff;
  min-height: 100vh;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
  margin-top: 40px;
}
</style>
