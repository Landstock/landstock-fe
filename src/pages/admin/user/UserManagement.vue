<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2 class="fw-bold">Quản lý người dùng</h2>

      <div class="d-flex gap-2">
        <input
          v-model="search"
          type="text"
          class="form-control"
          placeholder="Tìm kiếm theo tên hoặc email"
        />
        <select v-model="roleFilter" class="form-select">
          <option value="">Tất cả vai trò</option>
          <option value="0">Admin</option>
          <option value="1">Operator</option>
          <option value="2">User</option>
        </select>
      </div>
    </div>

    <div class="table-responsive shadow rounded">
      <table class="table table-bordered table-hover text-center align-middle">
        <thead class="table-primary">
          <tr>
            <th>STT</th>
            <th>Tên người dùng</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Vai trò</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in filteredUsers" :key="user.id">
            <td>{{ index + 1 }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phonenumber || "Chưa có" }}</td>
            <td>
              <span
                class="badge"
                :class="{
                  'bg-danger': user.role === 0,
                  'bg-warning text-dark': user.role === 1,
                  'bg-success': user.role === 2,
                }"
              >
                {{ getRoleName(user.role) }}
              </span>
            </td>
            <td>
              <button
                class="btn btn-sm btn-primary me-2"
                @click="openEditModal(user)"
              >
                <i class="bi bi-pencil-square"></i> Sửa
              </button>
              <button
                class="btn btn-sm btn-danger"
                :disabled="user.role === 0"
                @click="confirmDelete(user.id)"
              >
                <i class="bi bi-trash"></i> Xóa
              </button>
            </td>
          </tr>
          <tr v-if="filteredUsers.length === 0">
            <td colspan="6" class="text-center text-muted">
              Không tìm thấy người dùng nào.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal chỉnh sửa -->
    <div
      class="modal fade"
      id="editUserModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editUserModalLabel"
      aria-hidden="true"
      ref="editModal"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="editUserModalLabel">
              Chỉnh sửa người dùng
            </h5>
            <button type="button" class="close" @click="closeEditModal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveUser">
              <div class="mb-3">
                <label class="form-label">Tên người dùng</label>
                <input
                  v-model="editForm.username"
                  type="text"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input
                  v-model="editForm.email"
                  type="email"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Số điện thoại</label>
                <input
                  v-model="editForm.phonenumber"
                  type="text"
                  class="form-control"
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Vai trò</label>
                <select v-model="editForm.role" class="form-select">
                  <option value="0">Admin</option>
                  <option value="1">Operator</option>
                  <option value="2">User</option>
                </select>
              </div>
              <div class="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="closeEditModal"
                >
                  Hủy
                </button>
                <button type="submit" class="btn btn-primary">
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal xóa -->
    <div
      class="modal fade"
      id="deleteUserModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="deleteUserModalLabel"
      aria-hidden="true"
      ref="deleteModal"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="deleteUserModalLabel">Xác nhận xóa</h5>
            <button type="button" class="close" @click="closeDeleteModal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Bạn có chắc chắn muốn xóa người dùng này không?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="closeDeleteModal"
            >
              Hủy
            </button>
            <button type="button" class="btn btn-danger" @click="deleteUser">
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";

export default {
  name: "UserManagement",
  data() {
    return {
      search: "",
      roleFilter: "",
      editForm: {},
      deleteUserId: null,
      editModalInstance: null,
      deleteModalInstance: null,
    };
  },
  computed: {
    users() {
      return this.$store.state.users.users;
    },
    filteredUsers() {
      const searchText = this.search.toLowerCase();
      return this.users.filter((user) => {
        const matchName = user.username.toLowerCase().includes(searchText);
        const matchEmail = user.email.toLowerCase().includes(searchText);
        const matchRole =
          this.roleFilter === "" || user.role === Number(this.roleFilter);
        return (matchName || matchEmail) && matchRole;
      });
    },
  },
  methods: {
    getRoleName(role) {
      if (role === 0) return "Admin";
      if (role === 1) return "Operator";
      return "User";
    },
    openEditModal(user) {
      this.editForm = { ...user };
      const modal = new bootstrap.Modal(this.$refs.editModal);
      modal.show();
      this.editModalInstance = modal;
    },
    closeEditModal() {
      this.editModalInstance.hide();
    },
    async saveUser() {
      await this.$store.dispatch("users/updateUser", this.editForm);

      this.closeEditModal();
    },
    confirmDelete(userId) {
      this.deleteUserId = userId;
      const modal = new bootstrap.Modal(this.$refs.deleteModal);
      modal.show();
      this.deleteModalInstance = modal;
    },
    closeDeleteModal() {
      this.deleteModalInstance.hide();
    },
    async deleteUser() {
      await this.$store.dispatch("users/deleteUser", this.deleteUserId);
      this.closeDeleteModal();
    },
  },
  mounted() {
    this.$store.dispatch("users/getUsers");
  },
};
</script>

<style scoped>
.table-responsive {
  background: white;
  border-radius: 8px;
}
.table th,
.table td {
  vertical-align: middle;
}
</style>
