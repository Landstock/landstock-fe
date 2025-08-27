<template>
  <div class="search-container container p-4 rounded-4 text-white">
    <!-- Tabs -->
    <div class="d-flex justify-content-center gap-3 mb-4">
      <button
        class="btn btn-tab"
        :class="{ active: selectedTab === 'ban' }"
        @click="selectedTab = 'ban'"
      >
        Nhà đất bán
      </button>
      <button
        class="btn btn-tab"
        :class="{ active: selectedTab === 'thue' }"
        @click="selectedTab = 'thue'"
      >
        Nhà đất cho thuê
      </button>
    </div>

    <!-- Basic Search -->
    <div class="row g-3 mb-3">
      <div class="col-md-3">
        <select v-model="selectedType" class="form-select shadow-sm rounded-3">
          <option value="">Loại nhà đất</option>
          <option value="canho">Căn hộ cho thuê</option>
          <option value="bietthu">Biệt thự bán</option>
          <option value="chungcu">Chung cư bán</option>
          <option value="nhapho">Nhà đất bán</option>
          <!-- <option value="vanphong"></option>
          <option value="cuahang">Cửa hàng</option> -->
        </select>
      </div>

      <div class="col-md-5">
        <input
          v-model="keyword"
          type="text"
          class="form-control shadow-sm rounded-3"
          placeholder="Nhập từ khóa hoặc địa điểm (VD: Vinhomes)"
        />
      </div>

      <div class="col-md-2">
        <button
          class="btn btn-primary w-100 rounded-3 d-flex justify-content-center align-items-center gap-2"
          @click="search"
        >
          <i class="bi bi-search"></i> Tìm kiếm
        </button>
      </div>

      <div class="col-md-2">
        <button
          class="btn btn-outline-light w-100 rounded-3 d-flex justify-content-center align-items-center gap-2"
          @click="toggleAdvanced"
        >
          <i class="bi bi-sliders"></i> Thêm
        </button>
      </div>
    </div>

    <!-- Advanced Filters -->
    <transition name="fade">
      <div v-if="showAdvanced" class="bg-white text-dark rounded-4 p-3 mt-3">
        <div class="row g-3">
          <div class="col-md-3">
            <select v-model="selectedCity" class="form-select rounded-3">
              <option value="">Tỉnh/Thành phố</option>
              <option value="hanoi">Hà Nội</option>
              <option value="hcm">TP. HCM</option>
            </select>
          </div>
          <div class="col-md-3">
            <select v-model="selectedDistrict" class="form-select rounded-3">
              <option value="">Quận/Huyện</option>
              <option value="q1">Quận 1</option>
              <option value="q2">Quận 2</option>
            </select>
          </div>
          <div class="col-md-3">
            <select v-model="selectedArea" class="form-select rounded-3">
              <option value="">Diện tích</option>
              <option value="50">Dưới 50m²</option>
              <option value="100">50-100m²</option>
              <option value="100+">Trên 100m²</option>
            </select>
          </div>
          <div class="col-md-3">
            <select v-model="selectedPrice" class="form-select rounded-3">
              <option value="">Mức giá</option>
              <option value="1">Dưới 1 tỷ</option>
              <option value="3">1 - 3 tỷ</option>
              <option value="5">3 - 5 tỷ</option>
              <option value="5+">Trên 5 tỷ</option>
            </select>
          </div>
        </div>
      </div>
    </transition>

    <!-- Category Icons -->
    <div
      class="category-icons d-flex justify-content-around text-center mt-4 flex-wrap gap-3"
    >
      <div
        v-for="item in categories"
        :key="item.name"
        class="category-item p-2"
      >
        <img
          v-if="item.icon"
          :src="item.icon"
          alt="icon"
          class="img-fluid"
          style="margin-bottom: 15px"
        />
        <h3>{{ item.name }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTab: "ban",
      selectedType: "",
      keyword: "",
      selectedCity: "",
      selectedDistrict: "",
      selectedArea: "",
      selectedPrice: "",
      showAdvanced: false,
      categories: [
        {
          name: "Căn hộ",
          icon: "https://bizweb.dktcdn.net/100/393/384/themes/894826/assets/collection_1.png?1753167401033",
        },
        {
          name: "Biệt thự",
          icon: "https://bizweb.dktcdn.net/100/393/384/themes/894826/assets/collection_2.png?1753167401033",
        },
        {
          name: "Chung cư",
          icon: "https://bizweb.dktcdn.net/100/393/384/themes/894826/assets/collection_3.png?1753167401033",
        },
        {
          name: "Nhà phố",
          icon: "https://bizweb.dktcdn.net/100/393/384/themes/894826/assets/collection_4.png?1753167401033",
        },
      ],
    };
  },
  methods: {
    toggleAdvanced() {
      this.showAdvanced = !this.showAdvanced;
    },
    search() {
      console.log("Tìm kiếm:", {
        tab: this.selectedTab,
        type: this.selectedType,
        keyword: this.keyword,
        city: this.selectedCity,
        district: this.selectedDistrict,
        area: this.selectedArea,
        price: this.selectedPrice,
      });
    },
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
  padding: 10px 14px;
}

.category-item {
  width: 80px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}
.category-item:hover {
  transform: scale(1.2);
}
.category-item .img {
  /* font-size: 15px; */
  color: white;
}
.category-item h3 {
  font-size: 15px;
  color: white;
}
.category-item:hover h3 {
  color: #2f80ed;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
