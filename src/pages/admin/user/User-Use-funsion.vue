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
        <tr v-for="(user, index) in users" :key="index">
          <td>{{ (currentPage - 1) * limit + index + 1 }}</td>
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

    <!-- Pagination -->
    <nav v-if="totalPages > 1" aria-label="Page navigation" class="mt-4">
      <ul class="pagination justify-content-center">
        <li
          class="page-item"
          :class="{ disabled: currentPage === 1 }"
          v-if="currentPage > 1"
          @click="changePage(currentPage - 1)"
        >
          <a class="page-link" href="#"><i class="fas fa-chevron-left"></i></a>
        </li>

        <li
          v-for="page in totalPages"
          :key="page"
          class="page-item"
          :class="{ active: currentPage === page }"
          @click="changePage(page)"
        >
          <a class="page-link" href="#">{{ page }}</a>
        </li>

        <li
          class="page-item"
          :class="{ disabled: currentPage === totalPages }"
          v-if="currentPage < totalPages"
          @click="changePage(currentPage + 1)"
        >
          <a class="page-link" href="#"><i class="fas fa-chevron-right"></i></a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      limit: 20,
    };
  },
  computed: {
    users() {
      const getuser = this.$store.getters["users/users"] || [];
      console.log("lấy user bên admin: ", getuser);
      return getuser;
    },
    totalPages() {
      const total = this.$store.state.users.total || 0;
      const pages = Math.ceil(total / this.limit);
      console.log("Tổng user:", total, "Số trang:", pages);
      return pages;
    },
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.$store.dispatch("users/getUsers", {
          page: this.currentPage,
          limit: this.limit,
        });
      }
    },
  },
  created() {
    this.$store.dispatch("users/getUsers", {
      page: this.currentPage,
      limit: this.limit,
    });
  },
};
</script>
