<template>
  <div class="search-container container p-3 rounded-4 text-white">
    <!-- Basic Search -->
    <div class="row g-3 mb-3 mt-1">
      <div class="col-lg-3 col-md-6">
        <select
          v-model="selectedCategory"
          class="form-select shadow-sm rounded-3"
        >
          <option value="">Loại dự án</option>
          <option v-for="item in categories" :key="item._id" :value="item._id">
            {{ item.name }}
          </option>
        </select>
      </div>

      <div class="col-lg-3 col-md-6">
        <select
          v-model="selectedProvince"
          class="form-select rounded-3 shadow-sm"
        >
          <option value="">Chọn tỉnh/thành</option>
          <option
            v-for="province in provinces"
            :key="province.code"
            :value="province.name"
          >
            {{ province.name }}
          </option>
        </select>
      </div>

      <div class="col-lg-4 col-md-9">
        <input
          v-model="keyword"
          type="text"
          class="form-control shadow-sm rounded-3"
          placeholder="Nhập từ khóa hoặc địa điểm (VD: Vinhomes)"
        />
      </div>

      <div class="col-lg-2 col-md-3">
        <button
          class="btn btn-primary w-100 rounded-3 d-flex justify-content-center align-items-center gap-2"
          @click="search"
        >
          <i class="bi bi-search"></i> Tìm kiếm
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selectedCategory: "",
      selectedProvince: "",
      keyword: "",
      provinces: [],
    };
  },
  computed: {
    categories() {
      return this.$store.state.category.category;
    },
  },
  methods: {
    async fetchCategories() {
      try {
        await this.$store.dispatch("category/getCategoryManage");
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      }
    },

    async fetchProvinces() {
      try {
        const response = await axios.get(
          "https://provinces.open-api.vn/api/p/"
        );
        this.provinces = response.data;
      } catch (error) {
        console.error("Lỗi khi tải danh sách tỉnh/thành:", error);
      }
    },

    // Hàm tìm kiếm
    search() {
      console.log("Selected Category:", this.selectedCategory);
      console.log("Selected Province:", this.selectedProvince);
      console.log("Keyword:", this.keyword);
      this.$router.push({
        path: "/search",
        query: {
          categoryId: this.selectedCategory || "",
          provinceName: this.selectedProvince || "",
          keyword: this.keyword || "",
        },
      });
    },
  },
  mounted() {
    this.fetchCategories();
    this.fetchProvinces();
  },
};
</script>

<style scoped>
.search-container {
  background: #ffffff20;
}

.btn-tab {
  background: transparent;
  border: 2px solid #fff;
  font-weight: 500;
  padding: 8px 20px;
  border-radius: 30px;
  color: #fff;
  transition: all 0.3s;
}
.btn-tab.active {
  background-color: #fff;
  color: #2f80ed;
}
.btn-tab:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

input.form-control,
select.form-select {
  /* padding: 10px 14px; */
}
</style>
