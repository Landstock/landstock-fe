<template>
  <div class="bg-view position-relative overflow-hidden">
    <div class="overlay"></div>
    <img
      class="w-100"
      src="https://bds59.giaodienwebmau.com/wp-content/uploads/2022/07/3b1DPpW.jpeg"
      alt="Thông tin thị trường nhà đất"
    />
    <div
      class="view-text position-absolute top-50 start-50 translate-middle text-center p-3"
    >
      <h1 class="text-white">THÔNG TIN THỊ TRƯỜNG NHÀ ĐẤT</h1>
      <p class="text-white">Thông tin nhanh chóng, chuyên nghiệp</p>
    </div>
  </div>

  <!-- Tin tức -->
  <div class="container mt-4">
    <div class="row">
      <!-- Bộ lọc -->
      <div class="col-md-3">
        <h5>Danh mục</h5>
        <ul class="list-group">
          <li
            v-for="(category, index) in categories"
            :key="index"
            class="list-group-item"
            @click="filterNews(category)"
            :class="{ active: selectedCategory === category }"
          >
            {{ category }}
          </li>
        </ul>
      </div>

      <!-- Danh sách tin tức -->
      <div class="col-md-9">
        <div class="row">
          <div
            v-for="(news, index) in filteredNews"
            :key="index"
            class="col-md-4 mb-4"
          >
            <div class="card h-100 shadow-sm">
              <img :src="news.image" class="card-img-top" alt="news image" />
              <div class="card-body">
                <h5 class="card-title">{{ news.title }}</h5>
                <p class="card-text">{{ news.description }}</p>
                <a href="#" class="btn btn-primary btn-sm">Xem chi tiết</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bảng giá nhà đất -->
    <div class="row mt-5">
      <div class="col-md-12">
        <h4 class="text-center">Bảng giá nhà đất theo khu vực</h4>
        <table class="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Khu vực</th>
              <th>Giá trung bình (Triệu/m²)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(area, index) in priceTable" :key="index">
              <td>{{ area.location }}</td>
              <td>{{ area.price }} triệu/m²</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: ["Tất cả", "Nhà phố", "Chung cư", "Đất nền", "Biệt thự"],
      selectedCategory: "Tất cả",
      newsList: [
        {
          title: "Giá nhà đất TP.HCM tăng mạnh",
          description:
            "Thị trường BĐS TP.HCM đang nóng với mức giá tăng 10% so với năm ngoái.",
          image: "https://via.placeholder.com/300",
          category: "Nhà phố",
        },
        {
          title: "Xu hướng đầu tư chung cư năm 2025",
          description:
            "Nhu cầu mua chung cư đang tăng, đặc biệt là ở các quận trung tâm.",
          image: "https://via.placeholder.com/300",
          category: "Chung cư",
        },
        {
          title: "Đất nền ngoại ô có đáng đầu tư?",
          description:
            "Xu hướng dịch chuyển ra vùng ven đang làm đất nền trở thành lựa chọn tiềm năng.",
          image: "https://via.placeholder.com/300",
          category: "Đất nền",
        },
      ],
      priceTable: [
        { location: "TP.HCM", price: 200 },
        { location: "Hà Nội", price: 180 },
        { location: "Đà Nẵng", price: 150 },
        { location: "Cần Thơ", price: 100 },
      ],
    };
  },
  computed: {
    filteredNews() {
      if (this.selectedCategory === "Tất cả") {
        return this.newsList;
      }
      return this.newsList.filter(
        (news) => news.category === this.selectedCategory
      );
    },
  },
  methods: {
    filterNews(category) {
      this.selectedCategory = category;
    },
  },
};
</script>

<style scoped>
/* Ảnh header */
.bg-view img {
  height: 400px;
  object-fit: cover;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

/* Danh mục */
.list-group-item {
  cursor: pointer;
}
.list-group-item.active {
  background-color: #007bff;
  color: white;
}

/* Tin tức */
.card img {
  height: 180px;
  object-fit: cover;
}

/* Bảng giá */
.table th {
  background-color: #007bff;
  color: white;
  text-align: center;
}
</style>
