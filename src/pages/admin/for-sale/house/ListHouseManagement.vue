<template>
  <div class="container">
    <h3 class="text-center">Quản lý danh sách nhà đất bán</h3>

    <div class="card p-3 mb-4">
      <h5>Thêm bài đăng mới</h5>
      <form @submit.prevent="submitPost">
        <div class="row">
          <div class="col-md-6 mb-2">
            <input
              type="text"
              class="form-control"
              v-model="newPost.title"
              placeholder="Tiêu đề"
              required
            />
          </div>
          <div class="col-md-3 mb-2">
            <input
              type="number"
              class="form-control"
              v-model="newPost.price"
              placeholder="Giá"
              required
            />
          </div>
          <div class="col-md-3 mb-2">
            <input
              type="number"
              class="form-control"
              v-model="newPost.area"
              placeholder="Diện tích"
              required
            />
          </div>
          <div class="col-md-8 mb-2">
            <input
              type="text"
              class="form-control"
              v-model="newPost.address"
              placeholder="Địa chỉ"
              required
            />
          </div>
          <div class="col-md-4 mb-2">
            <select class="form-select" v-model="newPost.categoryId" required>
              <option disabled value="">Chọn loại tin đăng</option>
              <option value="9">Nhà đất bán</option>
            </select>
          </div>
          <div class="col-md-12 mb-2">
            <textarea
              class="form-control"
              v-model="newPost.description"
              placeholder="Mô tả"
              required
            ></textarea>
          </div>

          <div class="col-md-12 mb-2">
            <input
              type="file"
              class="form-control"
              multiple
              @change="handleFileUpload"
              accept="image/*"
            />
          </div>
        </div>
        <button type="submit" class="btn btn-success">Thêm bài đăng</button>
      </form>
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
  data() {
    return {
      newPost: {
        title: "",
        price: "",
        area: "",
        address: "",
        description: "",
        categoryId: "",
        image: [],
      },
    };
  },

  computed: {
    postall() {
      return this.$store.getters["adminPost/adminPosts"];
    },
  },
  created() {
    const categoryId = 9;
    this.$store.dispatch("adminPost/getAdPost", categoryId);
  },
};
</script>
