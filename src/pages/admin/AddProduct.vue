<template>
  <div class="container">
    <h2>Thêm sản phẩm mới</h2>
    <form @submit.prevent="submitProduct">
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
          <!-- Lặp qua danh sách danh mục từ Vuex store -->
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">Thêm sản phẩm</button>
      <button @click="prev" class="btn btn-primary" style="margin-left: 10px">
        Quay lại
      </button>
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
    // Lấy danh sách danh mục
    categories() {
      const cate = this.$store.getters["category/categories"];
      // eslint-disable-next-line no-debugger
      // debugger;
      console.log("cate day:", cate);
      return cate;
    },
  },
  methods: {
    checkCategory() {
      console.log("Giá trị category hiện tại:", this.product.category);
    },
    async submitProduct() {
      // let role = localStorage.getItem("role");
      // console.log("role đây:", role);

      // console.log("Trước khi gửi:", {
      //   name: this.product.name,
      //   image: this.product.image,
      //   description: this.product.description,
      //   price: this.product.price,
      //   category: this.product.category,
      // });

      // Kiểm tra xem category có phải là chuỗi không và không phải là rỗng
      if (
        typeof this.product.category !== "string" ||
        this.product.category.trim() === ""
      ) {
        // console.error("Category không hợp lệ:", this.product.category);
        return;
      }

      try {
        // console.log("Trước khi gửi:", this.product);

        await this.$store.dispatch("products/addProductsManage", {
          name: this.product.name,
          image: this.product.image,
          description: this.product.description,
          price: this.product.price,
          category: this.product.category,
        });
        this.$router.push("/admin/products");
        // alert("Sản phẩm đã được thêm thành công!");
      } catch (error) {
        console.error("Error adding product:", error);
      }
    },
    prev() {
      return this.$router.push("/admin/products");
    },
  },
  created() {
    // Lấy danh sách danh mục khi component được khởi tạo
    this.$store.dispatch("category/getCategories");
  },
  watch: {
    "product.category"(newVal) {
      console.log("Giá trị category hiện tại:", newVal);
    },
  },
};
</script>
