<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Sidebar bên trái -->
      <nav class="col-lg-3 col-md-4 sidebar-custom">
        <div class="sidebar-sticky text-center pt-4">
          <img
            v-if="user.avatar"
            :src="user.avatar"
            class="user-avatar mb-2"
            alt="avatar"
          />
          <p v-else class="text-muted">Chưa có ảnh đại diện</p>
          <h5>{{ user.username }}</h5>

          <ul class="nav flex-column">
            <li class="nav-item mb-2">
              <router-link to="/dang-tin" class="nav-link-custom">
                <i class="fas fa-thumbtack"></i> <span>Đăng tin BĐS</span>
              </router-link>
            </li>
            <li class="nav-item mb-2">
              <router-link to="/danh-sach-tin-dang" class="nav-link-custom">
                <i class="fas fa-list"></i> <span>Danh sách tin đăng</span>
              </router-link>
            </li>
            <li class="nav-item mb-2">
              <router-link to="/sua-thong-tin-ca-nhan" class="nav-link-custom">
                <i class="fas fa-user-edit"></i>
                <span>Sửa thông tin cá nhân</span>
              </router-link>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link-custom text-danger" @click="logout">
                <i class="fas fa-sign-out-alt"></i> <span>Thoát</span>
              </a>
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
import axiosInstance from "@/services/AxiosServices";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      user: {
        avatar: "",
        username: "",
      },
    };
  },
  methods: {
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
  async created() {
    try {
      const res = await axiosInstance.get("/user/me");
      this.user = res.data.data;
    } catch (err) {
      console.error("Lỗi lấy thông tin người dùng:", err);
    }
  },
};
</script>

<style scoped>
.user-avatar {
  border-radius: 50%;
  width: 110px;
  height: 110px;
  object-fit: cover;
}

.sidebar-custom {
  background: #fff;
  border-right: 1px solid #eee;
  height: 100vh;
  padding-top: 40px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.04);
}

.nav-link-custom {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  color: #333;
  font-weight: 500;
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.nav-link-custom:hover,
.router-link-exact-active {
  background-color: #f1c150 !important;
  color: #000 !important;
  font-weight: bold;
}
</style>
