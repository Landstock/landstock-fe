<template>
  <div class="container">
    <h2 class="text-center mb-3">Quản lý người dùng</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>STT</th>
          <th>Tên người dùng</th>
          <th>Email</th>
          <th>Số điện thoại</th>
          <th>Vai trò</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in paginatedUsers" :key="user.id">
          <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phonenumber }}</td>
          <td>
            <span v-if="user.role === 0">Admin</span>
            <span v-else-if="user.role === 1">Operator</span>
            <span v-else>User</span>
          </td>
          <td>
            <!-- <button class="btn btn-primary btn-sm" @click="editUser(user)">
              Sửa
            </button> -->
            <button class="btn btn-danger btn-sm" @click="deleteUser(user.id)">
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Phân trang -->
    <nav>
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="changePage(currentPage - 1)">
            <i class="fa-solid fa-backward"></i>
          </button>
        </li>

        <li
          class="page-item"
          v-for="page in visiblePages"
          :key="page"
          :class="{ active: currentPage === page }"
        >
          <button class="page-link" @click="changePage(page)">
            {{ page }}
          </button>
        </li>

        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="changePage(currentPage + 1)">
            <i class="fa-solid fa-forward"></i>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1, // Trang hiện tại
      itemsPerPage: 25, // Số lượng người dùng hiển thị trên mỗi trang
      maxVisiblePages: 10, // Giới hạn chỉ hiển thị 10 số trang
    };
  },
  computed: {
    users() {
      return this.$store.getters["users/users"] || [];
    },
    totalPages() {
      return Math.ceil(this.users.length / this.itemsPerPage);
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.users.slice(start, end);
    },
    visiblePages() {
      const half = Math.floor(this.maxVisiblePages / 2);
      let startPage = Math.max(1, this.currentPage - half);
      let endPage = Math.min(
        this.totalPages,
        startPage + this.maxVisiblePages - 1
      );

      if (endPage - startPage + 1 < this.maxVisiblePages) {
        startPage = Math.max(1, endPage - this.maxVisiblePages + 1);
      }

      return Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      );
    },
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
  created() {
    this.$store.dispatch("users/getUsers");
  },
};
</script>
