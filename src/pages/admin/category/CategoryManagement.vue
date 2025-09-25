<template>
  <div class="container py-4">
    <h3 class="mb-4 text-center">📂 Quản lý Loại Tin</h3>

    <!-- Nút mở form thêm -->
    <div class="text-end mb-3">
      <button class="btn btn-primary" @click="openForm(null)">
        ➕ Thêm Loại Tin
      </button>
    </div>

    <!-- Danh sách -->
    <div class="row">
      <div class="col-md-6">
        <h5 class="text-success">📋 Bán</h5>
        <table class="table table-bordered">
          <thead class="table-light">
            <tr>
              <th>#</th>
              <th>Tên</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in loaiTinBan" :key="item._id">
              <td>{{ index + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>
                <button
                  class="btn btn-sm btn-warning me-1"
                  @click="openForm(item)"
                >
                  ✏️
                </button>
                <button
                  class="btn btn-sm btn-danger"
                  @click="deleteCategory(item._id)"
                >
                  🗑️
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="col-md-6">
        <h5 class="text-primary">📋 Cho thuê</h5>
        <table class="table table-bordered">
          <thead class="table-light">
            <tr>
              <th>#</th>
              <th>Tên</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in loaiTinChoThue" :key="item._id">
              <td>{{ index + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>
                <button
                  class="btn btn-sm btn-warning me-1"
                  @click="openForm(item)"
                >
                  ✏️
                </button>
                <button
                  class="btn btn-sm btn-danger"
                  @click="deleteCategory(item._id)"
                >
                  🗑️
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Thêm/Sửa Loại Tin -->
    <div
      class="modal fade"
      :class="{ show: showModal }"
      tabindex="-1"
      style="display: block"
      v-if="showModal"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ isEdit ? "✏️ Chỉnh sửa Loại Tin" : "➕ Thêm Loại Tin" }}
            </h5>
            <button type="button" class="btn-close" @click="closeForm"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitCategory">
              <div class="mb-3">
                <label class="form-label">Tên loại tin</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nhà Đất Bán"
                  v-model="category.name"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Loại danh mục</label>
                <select class="form-select" v-model="category.type" required>
                  <option disabled value="">-- Chọn loại --</option>
                  <option value="ban">Bán</option>
                  <option value="chothue">Cho thuê</option>
                </select>
              </div>
              <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-success">
                  {{ isEdit ? "💾 Cập nhật" : "➕ Thêm mới" }}
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="closeForm"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Overlay mờ -->
      <div class="modal-backdrop fade show" @click="closeForm"></div>
    </div>
  </div>
  <!-- Modal xác nhận xoá -->
  <div v-if="showDeleteConfirm" class="custom-modal">
    <div class="custom-modal-content">
      <h5 class="text-danger">Xác nhận xoá</h5>
      <p>Bạn có chắc chắn muốn xoá loại tin này không?</p>
      <div class="text-end">
        <button class="btn btn-secondary me-2" @click="cancelDelete">
          Huỷ
        </button>
        <button class="btn btn-danger" @click="confirmDelete">Xoá</button>
      </div>
    </div>
    <div class="custom-modal-backdrop" @click="cancelDelete"></div>
  </div>
  <!-- Bootstrap Toast -->
  <div
    class="toast-container position-fixed top-0 end-0 p-3"
    style="z-index: 1"
  >
    <div
      class="toast align-items-center border-0"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      ref="toast"
    >
      <div class="d-flex">
        <div class="toast-body">
          {{ toastMessage }}
        </div>
        <button
          type="button"
          class="btn-close me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "bootstrap";

export default {
  data() {
    return {
      category: {
        _id: null,
        name: "",
        type: "",
      },
      isEdit: false,
      showModal: false,
      showDeleteConfirm: false,
      itemToDeleteId: null,
      toastMessage: "",

      // toastPosition: { X: "Right", Y: "Top" },

      // Dialog xoá
      // isDeleteDialogVisible: false,
      // itemToDeleteId: null,
      // dialogButtons: [
      //   {
      //     buttonModel: {
      //       content: "❌ Huỷ",
      //       cssClass: "e-flat",
      //     },
      //     click: () => {
      //       this.isDeleteDialogVisible = false;
      //     },
      //   },
      //   {
      //     buttonModel: {
      //       content: "🗑️ Xoá",
      //       isPrimary: true,
      //       cssClass: "e-flat e-danger",
      //     },
      //     click: () => this.confirmDelete(),
      //   },
      // ],
    };
  },
  computed: {
    loaiTinBan() {
      return this.$store.state.category.category.filter(
        (item) => item.type === "ban"
      );
    },
    loaiTinChoThue() {
      return this.$store.state.category.category.filter(
        (item) => item.type === "chothue"
      );
    },
  },
  methods: {
    // onToastCreated() {
    //   this.toastObj = this.$refs.toast.ej2Instances;
    // },

    // showToast(message, type = "Success") {
    //   const cssClass = {
    //     Success: "e-toast-success",
    //     Error: "e-toast-danger",
    //     Warning: "e-toast-warning",
    //   };

    //   if (this.toastObj) {
    //     this.toastObj.show({
    //       title: type,
    //       content: message,
    //       cssClass: cssClass[type],
    //       icon: type === "Success" ? "e-icons e-check" : "e-icons e-error",
    //       timeOut: 3000,
    //     });
    //   } else {
    //     console.warn("Toast chưa được khởi tạo!");
    //   }
    // },

    async submitCategory() {
      try {
        if (this.isEdit) {
          await this.$store.dispatch("category/updateCategoryManage", {
            id: this.category._id,
            name: this.category.name,
            type: this.category.type,
          });
          this.showToast("✅ Cập nhật thành công!", "success");
        } else {
          await this.$store.dispatch("category/addCategoryManage", {
            name: this.category.name,
            type: this.category.type,
          });
          this.showToast("✅ Thêm mới thành công!", "success");
        }
        this.showModal = false;
        this.resetCategory();
      } catch (err) {
        this.showToast("❌ Có lỗi xảy ra. Vui lòng thử lại!");
      }
    },
    openForm(item = null) {
      this.resetCategory();
      if (item) {
        this.category = { ...item };
        this.isEdit = true;
      }
      this.showModal = true;
    },
    closeForm() {
      this.showModal = false;
      this.resetCategory();
    },

    editCategory(item) {
      this.category = { ...item };
      this.isEdit = true;
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    resetCategory() {
      this.category = {
        _id: null,
        name: "",
        type: "",
      };
      this.isEdit = false;
    },

    deleteCategory(_id) {
      if (!_id) {
        console.error("ID không hợp lệ khi xoá:", _id);
        return;
      }
      this.itemToDeleteId = _id;
      this.showDeleteConfirm = true;
    },
    cancelDelete() {
      this.itemToDeleteId = null;
      this.showDeleteConfirm = false;
    },

    async confirmDelete() {
      try {
        await this.$store.dispatch(
          "category/deleteCategoryManage",
          this.itemToDeleteId
        );
        this.showToast("🗑️ Đã xoá loại tin!", "success");
      } catch (err) {
        // this.showToast("❌ Xoá không thành công!", "Error");
        this.showToast("❌ Có lỗi xảy ra!", "danger");
      } finally {
        // this.isDeleteDialogVisible = false;
        this.itemToDeleteId = null;
        this.showDeleteConfirm = false;
      }
    },

    showToast(message, type = "success") {
      this.toastMessage = message;

      const toastEl = this.$refs.toast;

      // Đổi màu nền theo loại
      toastEl.className = `toast align-items-center text-bg-${type} border-0`;

      // Hiển thị
      const toast = new Toast(toastEl);
      toast.show();
    },
  },
  async created() {
    await this.$store.dispatch("category/getCategoryManage");
  },
};
</script>

<style scoped>
.modal-content {
  z-index: 2;
}

.modal {
  background-color: rgba(0, 0, 0, 0.5); /* overlay mờ */
  z-index: 1;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.custom-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-modal-content {
  background: white;
  padding: 20px;
  z-index: 2;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  width: 90%;
  max-width: 400px;
}

.custom-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
