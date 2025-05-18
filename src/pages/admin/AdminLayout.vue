<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Navbar bên trái -->
      <nav class="col-lg-3 col-md-3 d-md-block sidebar">
        <div class="position-sticky h-100">
          <router-link to="/" class="logo text-decoration-none">
            <img src="../../img/logo.png" alt="" />
          </router-link>
          <ul class="nav flex-column">
            <li class="nav-link">Hi! admin</li>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/users"
                >Quản lý người dùng</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/products"
                >Quản lý tin tức
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/quan-ly-loai-tin"
                >Quản lý loại tin
              </router-link>
            </li>
            <li
              class="nav-item"
              @mouseenter="showDropdown1 = true"
              @mouseleave="showDropdown1 = false"
            >
              <router-link to="/quan-ly-danh-sach-ban" class="nav-link" href="#"
                >Quản lý danh sách bán <i class="fas fa-chevron-down arrow"></i
              ></router-link>
              <ul v-if="showDropdown1" class="submenu">
                <li>
                  <router-link
                    class="nav-link sub-link"
                    to="/admin/quan-ly-danh-sach-ban/nha-dat-ban"
                  >
                    Nhà đất bán
                  </router-link>
                </li>
                <li>
                  <router-link
                    class="nav-link sub-link"
                    to="/admin/quan-ly-danh-sach-ban/biet-thu-ban"
                  >
                    Biệt thự bán
                  </router-link>
                </li>
                <li>
                  <router-link
                    class="nav-link sub-link"
                    to="/admin/quan-ly-danh-sach-ban/chung-cu-ban"
                  >
                    Chung cư bán
                  </router-link>
                </li>
              </ul>
            </li>

            <li
              class="nav-item"
              @mouseenter="showDropdown2 = true"
              @mouseleave="showDropdown2 = false"
            >
              <a class="nav-link" href="#"
                >Quản lý danh sách cho thuê
                <i class="fas fa-chevron-down arrow"></i
              ></a>
              <ul v-if="showDropdown2" class="submenu">
                <li>
                  <router-link
                    class="nav-link sub-link"
                    to="/admin/quan-ly-danh-sach-cho-thue/nha-cho-thue"
                  >
                    Nhà
                  </router-link>
                </li>
                <li>
                  <router-link
                    class="nav-link sub-link"
                    to="/admin/quan-ly-danh-sach-cho-thue/can-ho-cho-thue"
                  >
                    Căn hộ
                  </router-link>
                </li>
                <li>
                  <router-link
                    class="nav-link sub-link"
                    to="/admin/quan-ly-danh-sach-cho-thue/chung-cu-cho-thue"
                  >
                    Chung cư
                  </router-link>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link" @click.prevent="logout">Logout</a>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Nội dung bên phải -->
      <main class="col-lg-9 col-md-9 px-md-4">
        <h1 class="text-center my-4">MANAGER</h1>
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDropdown1: false,
      showDropdown2: false,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/login");
    },
  },
};
</script>

<style scoped>
.sidebar {
  border-right: 1px solid #ddd;
  background-color: rgba(31, 30, 30, 0.24);
  padding-bottom: 20px;
}

.logo img {
  width: 100%;
  margin: 15px 0;
}

span {
  color: red;
}

.nav-link {
  font-size: 1.4rem;
  padding: 10px;
  color: #333;
  font-weight: bold;
}

.nav-link:hover {
  background: #f8f9fa;
  font-weight: bold;
  color: #29acb5;
}

h1 {
  font-size: 3.3em;
  letter-spacing: 0.4em;
}

.arrow {
  font-size: 16px;
}

/* Submenu nằm cùng nền sidebar, không tạo khối nền riêng */
.submenu {
  list-style: none;
  margin: 0;
  padding: 0 0 0 20px; /* thụt vào bên trái */
}

/* Link submenu thụt vào nhưng có phong cách giống nav-link */
.sub-link {
  font-size: 1.3rem;
  padding: 8px 10px;
  color: #333;
  display: block;
  font-weight: bold;
}

/* .sub-link:hover {
  background: #f8f9fa;
  color: #29acb5;
} */
</style>
