<template>
  <div class="container">
    <div class="my-4 tilte text-center">
      <h2 class="mt-4">Dự án nhà đất <span>nổi bật</span></h2>
      <img
        src="https://bds49.giaodienwebmau.com/wp-content/uploads/2020/07/bg_title.png"
        alt=""
      />
    </div>

    <div id="realEstateCarousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div
          class="carousel-item"
          style="margin-bottom: 40px"
          :class="{ active: index === 0 }"
          v-for="(property, index) in properties"
          :key="property.id"
        >
          <div class="card h-100 shadow-sm border-0">
            <div class="row g-0 property-card">
              <router-link
                :to="`/chi-tiet/${property.id}`"
                class="col-6 position-relative"
              >
                <img
                  :src="property.image"
                  alt=""
                  class="img-fluid rounded-start h-100 object-fit-cover"
                />
                <div class="description-overlay">
                  <p>{{ property.description }}</p>
                </div>
              </router-link>
              <div
                class="col-6 d-flex flex-column justify-content-center px-3 py-4"
              >
                <div class="mb-3">
                  <p class="fw-bold fs-5 mb-2">{{ property.title }}</p>
                  <p class="text-muted mb-2">
                    <i class="fa-solid fa-location-dot me-1 icon-red"></i>
                    {{ property.address }}
                  </p>
                  <p class="mb-0">
                    <i class="fas fa-expand-arrows-alt me-1 icon-blue"></i>
                    Diện tích: {{ property.area }}
                  </p>
                  <hr class="mt-3 mb-2" />
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <p class="text-danger fw-bold mb-0 fs-5">
                    {{ property.price }}
                  </p>
                  <div>
                    <router-link :to="{ path: `/chi-tiet/${property.id}` }">
                      <button class="btn custom-btn">Xem ngay ></button>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Điều khiển -->
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#realEstateCarousel"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon"></span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#realEstateCarousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon"></span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      properties: [
        {
          id: 1,
          image:
            "https://bds49.giaodienwebmau.com/wp-content/uploads/2020/07/img24.jpg",
          title:
            "VinHomes Grand Park Quận 9 - 0979.79.79.69 - Giá Gốc Chủ Đầu Tư ✔️",
          address: "Quận 9 TPHCM",
          price: "2.79 tỷ",
          area: "278.6 m2",
          description:
            "Vinhomes Green Bay là một trong những sản phẩm BĐS nổi bật khu vực phía Tây Hà Nội Vinhomes Green Bay là một trong những sản phẩm BĐS nổi bật khu vực phía Tây Hà Nộido tập đoàn Vingroup đầu tư và triển khai. Dự án được định hướng trở thành tổ hợp đô thị hiện đại sang trọng bậc nhất đất Hà Thành với các sản phẩm BĐS hấp dẫn nhất hiện nay gồm Liền kề – Biệt thự Vinhomes Greenbay Mễ Trì – Shophouse Mễ Trì – Căn hộ chung cư cao cấp",
        },
        {
          id: 2,
          image:
            "	https://bds49.giaodienwebmau.com/wp-content/uploads/2020/07/img22.jpg",
          title:
            "VinHomes Grand Park Quận 9 - 0979.79.79.69 - Giá Gốc Chủ Đầu Tư ✔️",
          address: "Quận 9 TPHCM",
          price: "2.79 tỷ",
          area: "278.6 m2",
          description:
            "Vinhomes Green Bay là một trong những sản phẩm BĐS nổi bật khu vực phía Tây Hà Nội Vinhomes Green Bay là một trong những sản phẩm BĐS nổi bật khu vực phía Tây Hà Nộido tập đoàn Vingroup đầu tư và triển khai. Dự án được định hướng trở thành tổ hợp đô thị hiện đại sang trọng bậc nhất đất Hà Thành với các sản phẩm BĐS hấp dẫn nhất hiện nay gồm Liền kề – Biệt thự Vinhomes Greenbay Mễ Trì – Shophouse Mễ Trì – Căn hộ chung cư cao cấp",
        },
        {
          id: 3,
          image:
            "	https://bds49.giaodienwebmau.com/wp-content/uploads/2020/07/img14.jpg",
          title:
            "VinHomes Grand Park Quận 9 - 0979.79.79.69 - Giá Gốc Chủ Đầu Tư ✔️",
          address: "Quận 9 TPHCM",
          price: "2.79 tỷ",
          area: "278.6 m2",
          description:
            "Vinhomes Green Bay là một trong những sản phẩm BĐS nổi bật khu vực phía Tây Hà Nội Vinhomes Green Bay là một trong những sản phẩm BĐS nổi bật khu vực phía Tây Hà Nộido tập đoàn Vingroup đầu tư và triển khai. Dự án được định hướng trở thành tổ hợp đô thị hiện đại sang trọng bậc nhất đất Hà Thành với các sản phẩm BĐS hấp dẫn nhất hiện nay gồm Liền kề – Biệt thự Vinhomes Greenbay Mễ Trì – Shophouse Mễ Trì – Căn hộ chung cư cao cấp",
        },
        {
          id: 4,
          image:
            "	https://bds49.giaodienwebmau.com/wp-content/uploads/2020/07/img1.jpg",
          title:
            "VinHomes Grand Park Quận 9 - 0979.79.79.69 - Giá Gốc Chủ Đầu Tư ✔️",
          address: "Quận 9 TPHCM",
          price: "2.79 tỷ",
          area: "278.6 m2",
          description:
            "Vinhomes Green Bay là một trong những sản phẩm BĐS nổi bật khu vực phía Tây Hà Nội Vinhomes Green Bay là một trong những sản phẩm BĐS nổi bật khu vực phía Tây Hà Nộido tập đoàn Vingroup đầu tư và triển khai. Dự án được định hướng trở thành tổ hợp đô thị hiện đại sang trọng bậc nhất đất Hà Thành với các sản phẩm BĐS hấp dẫn nhất hiện nay gồm Liền kề – Biệt thự Vinhomes Greenbay Mễ Trì – Shophouse Mễ Trì – Căn hộ chung cư cao cấp",
        },
      ],
    };
  },
};
</script>

<style scoped>
.property-card {
  position: relative;
  overflow: hidden;
}

.description-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: #21417ab3;
  color: white;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  padding: 15px;
  font-size: 14px;
  max-height: 100%;
  overflow: auto;
}

.property-card:hover .description-overlay {
  transform: translateY(0);
}

.icon-red {
  color: red;
}

.icon-blue {
  color: #00abb8;
}

.custom-btn {
  position: relative;
  overflow: hidden;
  z-index: 2;
  border: 1px dashed #00abb8;
  color: #00abb8;
  padding: 5px 15px;
  border-radius: 5px;
  background-color: transparent;
  transition: color 0.3s ease;
}

.custom-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  background-color: #00abb8;
  z-index: -1;
  transition: width 0.4s ease;
}

.custom-btn:hover::before {
  width: 100%;
}

.custom-btn:hover {
  color: #fff;
}
</style>
