<!-- <template>
  <div class="container">
    <h3 class="text-center">Quản lý danh sách bán</h3>

    <div class="card mb-4">
      <div class="card-body">
        <h5 class="card-title">Thêm mới</h5>
        <form @submit.prevent="" class="row g-3 align-items-center">
          <div class="col-md-4">
            <input
              type="text"
              class="form-control"
              placeholder="Nhập tên loại tin vd: Nhà đất bán"
            />
          </div>
          <div class="col-md-3">
            <select class="form-select">
              <option value="">Chọn loại danh mục</option>
              <option value="ban">Bán</option>
              <option value="chothue">Cho thuê</option>
            </select>
          </div>
          <div class="col-md-5">
            <button type="submit" class="btn btn-primary">Thêm</button>
            <button type="button" class="btn btn-secondary ms-2">Hủy</button>
          </div>
        </form>
      </div>
    </div>

    <div>
      <table class="table table-bordered">
        <thead class="table-light">
          <tr>
            <th>#</th>
            <th>Tiêu đề</th>
            <th>Giá</th>
            <th>Diện tích</th>
            <th>Mô tả</th>
            <th>Loại tin đăng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(sale, index) in postall" :key="sale.id">
            <td>{{ index + 1 }}</td>
            <td>{{ sale.title }}</td>
            <td>{{ sale.price }}</td>
            <td>{{ sale.area }}</td>
            <td>{{ sale.description }}</td>
            <td>{{ sale.categoryId }}</td>
            <td>
              <button class="btn btn-sm btn-warning me-2">Sửa</button>
              <button class="btn btn-sm btn-danger">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    postall() {
      return this.$store.getters["posts/adminPosts"];
    },
  },
  created() {
    // const categoryId = 3;
    this.$store.dispatch("posts/getAdPost");
  },
};
</script> -->
<template><div></div></template>
