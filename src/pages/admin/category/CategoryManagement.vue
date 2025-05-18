<template>
  <div class="container py-4">
    <h3 class="mb-4 text-center">Quản lý loại tin</h3>

    <!-- Form thêm/sửa -->
    <div class="card mb-4">
      <div class="card-body">
        <h5 class="card-title">
          {{ isEdit ? "Chỉnh sửa Loại Tin" : "Thêm mới Loại Tin" }}
        </h5>
        <form
          @submit.prevent="submitCategory"
          class="row g-3 align-items-center"
        >
          <div class="col-md-4">
            <input
              type="text"
              class="form-control"
              placeholder="Nhập tên loại tin vd: Nhà đất bán"
              v-model="category.name"
              required
            />
          </div>
          <div class="col-md-3">
            <select class="form-select" v-model="category.type" required>
              <option value="">Chọn loại danh mục</option>
              <option value="ban">Bán</option>
              <option value="chothue">Cho thuê</option>
            </select>
          </div>
          <div class="col-md-5">
            <button type="submit" class="btn btn-primary">
              {{ isEdit ? "Cập nhật" : "Thêm" }}
            </button>
            <button
              type="button"
              class="btn btn-secondary ms-2"
              @click="resetCategory"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Danh sách loại tin - Bán -->
    <h5 class="mt-4">Loại Tin - Bán</h5>
    <table class="table table-bordered">
      <thead class="table-light">
        <tr>
          <th>#</th>
          <th>Tên loại</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in loaiTinBan" :key="item._id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>
            <button
              class="btn btn-sm btn-warning me-2"
              @click="editCategory(item)"
            >
              Sửa
            </button>
            <button
              class="btn btn-sm btn-danger"
              @click="deleteCategory(item._id)"
            >
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Danh sách loại tin - Cho thuê -->
    <h5 class="mt-5">Loại Tin - Cho thuê</h5>
    <table class="table table-bordered">
      <thead class="table-light">
        <tr>
          <th>#</th>
          <th>Tên loại</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in loaiTinChoThue" :key="item._id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>
            <button
              class="btn btn-sm btn-warning me-2"
              @click="editCategory(item)"
            >
              Sửa
            </button>
            <button
              class="btn btn-sm btn-danger"
              @click="deleteCategory(item._id)"
            >
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category: {
        _id: null,
        name: "",
        type: "",
      },
      isEdit: false,
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
    async submitCategory() {
      try {
        if (this.isEdit) {
          console.log("Payload gửi đi:", {
            id: this.category._id,
            name: this.category.name,
            type: this.category.type,
          });
          await this.$store.dispatch("category/updateCategoryManage", {
            id: this.category._id,
            name: this.category.name,
            type: this.category.type,
          });

          alert("Cập nhật loại tin thành công!");
        } else {
          await this.$store.dispatch("category/addCategoryManage", {
            name: this.category.name,
            type: this.category.type,
          });
          alert("Thêm loại tin thành công!");
        }
        this.resetCategory();
      } catch (err) {
        alert("Lỗi vui lòng làm lại!!!");
      }
    },
    editCategory(item) {
      console.log("Editing category:", item);
      this.category = {
        _id: item._id,
        name: item.name,
        type: item.type,
      };
      this.isEdit = true;
    },
    resetCategory() {
      this.category = {
        _id: null,
        name: "",
        type: "",
      };
      this.isEdit = false;
    },
    async deleteCategory(_id) {
      if (confirm("Bạn có chắc muốn xóa loại tin này?")) {
        try {
          await this.$store.dispatch("category/deleteCategoryManage", _id);
          alert("Xóa thành công!");
        } catch (err) {
          alert("Xoá không thành công!");
        }
      }
    },
  },
  async created() {
    await this.$store.dispatch("category/getCategoryManage");
  },
};
</script>
