<template>
  <div class="container">
    <h2>Quản lý</h2>

    <div class="d-flex justify-content-between">
      <div>
        <!-- thêm sản phẩm mới -->
        <button class="btn btn-success mb-3" @click="addProduct">
          Thêm sản phẩm mới
        </button>
      </div>
      <!-- Dropdown chọn loại sản phẩm để lọc -->
      <div class="col-3 justify-content-end">
        <div class="form-group">
          <select
            v-model="selectedCategory"
            class="form-control mb-3"
            id="category-filter"
          >
            <option value="">Loại sản phẩm</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- hiển thị danh sách sản phẩm -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col-1">STT</th>
          <th scope="col">Ảnh</th>
          <th scope="col">Tên sản phẩm</th>
          <th scope="col">Giá</th>
          <th scope="col">Loại sản phẩm</th>
          <th scope="col">Hành động</th>
        </tr>
      </thead>
      <tbody>
        <!-- Lặp qua danh sách đã được lọc -->
        <tr v-for="(product, index) in filteredProducts" :key="product.id">
          <td>{{ index + 1 }}</td>
          <td>
            <img
              :src="product.image"
              alt="Ảnh sản phẩm"
              style="width: 70px; height: 70px"
            />
          </td>
          <td>{{ product.name }}</td>
          <td>{{ product.price }} VND</td>
          <td>{{ product.categoryName }}</td>
          <td>
            <!-- Nút sửa sản phẩm -->
            <button
              class="btn btn-primary btn-sm mx-2"
              @click="editProduct(product)"
            >
              Sửa
            </button>
            <!-- Nút xóa sản phẩm -->
            <button
              class="btn btn-danger btn-sm"
              @click="deleteProduct(product)"
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
  // data() {
  //   return {
  //     selectedCategory: "",
  //   };
  // },
  // computed: {
  //   products() {
  //     const products = this.$store.getters["products/products"];
  //     console.log("Dữ liệu sản phẩm:", products);
  //     return products;
  //   },
  //   categories() {
  //     return this.$store.getters["category/categories"];
  //   },
  //   filteredProducts() {
  //     const filtered = this.selectedCategory
  //       ? this.products.filter(
  //           (product) => product.category === this.selectedCategory
  //         )
  //       : this.products;
  //     return filtered.map((product) => {
  //       const category = this.categories.find(
  //         (cate) => cate.id === product.category
  //       );
  //       return {
  //         ...product,
  //         categoryName: category ? category.name : "không có category",
  //       };
  //     });
  //   },
  // },
  // methods: {
  //   addProduct() {
  //     this.$router.push("/admin/add-products");
  //   },
  //   editProduct(product) {
  //     this.$router.push(`/admin/edit-products/${product.id}`);
  //   },
  //   deleteProduct(product) {
  //     this.$store.dispatch("products/deleteProducts", product.id);
  //   },
  // },
  // created() {
  //   this.$store.dispatch("products/getProducts"); // Lấy danh sách sản phẩm
  //   this.$store.dispatch("category/getCategories"); // Lấy danh sách danh mục sản phẩm
  // },
};
</script>
