<template>
  <div class="container">
    <h2>Chỉnh sửa sản phẩm</h2>
    <form @submit.prevent="submitEdit">
      <!-- Tên sản phẩm -->
      <div class="mb-3">
        <label for="title" class="form-label">Tên sản phẩm</label>
        <input
          type="text"
          v-model="product.name"
          class="form-control"
          id="name"
          required
        />
      </div>

      <!-- Link ảnh -->
      <div class="mb-3">
        <label for="image" class="form-label">Link ảnh</label>
        <input
          type="text"
          v-model="product.image"
          class="form-control"
          id="image"
          required
        />
      </div>

      <!-- Mô tả sản phẩm -->
      <div class="mb-3">
        <label for="description" class="form-label">Mô tả</label>
        <textarea
          v-model="product.description"
          class="form-control"
          id="description"
          required
        ></textarea>
      </div>

      <!-- Giá sản phẩm -->
      <div class="mb-3">
        <label for="price" class="form-label">Giá</label>
        <input
          type="number"
          v-model="product.price"
          class="form-control"
          id="price"
          required
        />
      </div>

      <!-- Loại sản phẩm -->
      <div class="mb-3">
        <label for="category" class="form-label">Loại sản phẩm</label>
        <select
          v-model="product.category"
          class="form-select"
          id="category"
          required
        >
          <option disabled value="">Chọn loại sản phẩm</option>
          <!-- Hiển thị danh mục từ Vuex store -->
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <div>
        <button type="submit" class="btn btn-primary">Lưu chỉnh sửa</button>
        <button @click="prev" class="btn btn-primary" style="margin-left: 10px">
          Quay lại
        </button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      product: {
        name: "",
        image: "",
        description: "",
        price: 0,
        category: "",
      },
    };
  },
  computed: {
    categories() {
      return this.$store.getters["category/categories"];
    },
  },
  created() {
    const productId = this.$route.params.id;
    const product = this.$store.getters["products/products"].find(
      (prod) => prod.id === productId
    );
    if (product) {
      this.product = { ...product };
    }
  },
  methods: {
    async submitEdit() {
      try {
        await this.$store.dispatch("products/editProducts", this.product);
        this.$router.push("/admin/products");
      } catch (error) {
        console.error("Error updating product:", error);
      }
    },
    prev() {
      return this.$router.push("/admin/products");
    },
  },
};
</script>
