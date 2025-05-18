<template>
  <!-- Tìm kiếm -->
  <div class="background">
    <div class="container">
      <div class="row">
        <div class="tab-search">
          <!-- <Search /> -->
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row mt-4">
      <!-- Cột nội dung chính -->
      <div class="col-lg-9">
        <h3 class="section-title">Mua bán đất</h3>
        <p class="section-subtitle">Bán đất</p>
        <div class="row mb-4 border g-0">
          <div class="col-md-6">
            <img
              class="property-img"
              src="https://bds.com.vn/images/products/2025/01/small/1_1736919286_1.jpg"
              alt="Nhà đất"
            />
          </div>
          <div class="col-md-6 property">
            <div class="property-title">
              <router-link class="text-decoration-none">
                QUẢNG TIẾN 07 MẶT TIỀN ĐƯỜNG NHỰA THÔNG BÀN CỜ SÁT BÊN THỊ TRẤN
                TRẢNG BOM
              </router-link>
            </div>
            <div class="property-info">
              <span class="price">460 triệu</span>
              <span class="area">500 m²</span>
            </div>
            <div class="property-location">
              <span
                ><i class="fa-solid fa-location-dot"></i> Huyện Hớn Quản, Bình
                Phước</span
              >
              <span>11/01/2025</span>
            </div>
            <div class="property-description">
              <span>
                Bao gồm 2 khu: 1. Khu nhà ở: gồm Căn nhà 1 trệt 2 lầu. Sân
                thượng. 4 phòng ngủ, 4 toilet, phòng Karaoke, định cư nước ngoài
                nên cần bán gấp.
              </span>
            </div>
            <div class="property-contact">
              <div>
                <img
                  class="avatar-img"
                  src="https://bds.com.vn/images/avartarmember.png"
                  alt="Avatar"
                />
              </div>
              <div class="contact-details">
                <a href="tel:0123456789" class="contact-item">
                  <i class="fa-solid fa-phone"></i> 0123456789
                </a>
                <a href="tel:0987654321" class="contact-item">
                  <i class="fa-solid fa-phone"></i> 0987654321
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cột danh sách tỉnh -->
      <div class="col-lg-3 city">
        <!-- <h6 class="city-title">Các tỉnh</h6>
        <div class="city-list">
          <p>Hà Nội (98760)</p>
          <p>Hồ Chí Minh (65432)</p>
          <p>Đà Nẵng (32145)</p>
          <p>Bình Dương (12345)</p>
          <p>Hà Nội (98760)</p>
          <p>Hồ Chí Minh (65432)</p>
          <p>Đà Nẵng (32145)</p>
          <p>Bình Dương (12345)</p>
          <p>Hà Nội (98760)</p>
          <p>Hồ Chí Minh (65432)</p>
          <p>Đà Nẵng (32145)</p>
          <p>Bình Dương (12345)</p>
          <p>Hà Nội (98760)</p>
          <p>Hồ Chí Minh (65432)</p>
          <p>Đà Nẵng (32145)</p>
          <p>Bình Dương (12345)</p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
// import Search from "@/components/nav/Search.vue";
export default {
  components: {
    // Search,
  },
};
</script>

<style scoped>
/* Tổng quan */
.background {
  background-color: #f3f4f7;
  padding: 20px 0;
}

.tab-search {
  margin-top: 40px;
}

.section-title {
  font-size: 24px;
  font-weight: bold;
}

.section-subtitle {
  font-size: 18px;
  color: #666;
}

/* Phần hình ảnh và chi tiết */
.property {
  padding: 10px 15px;
}

.property-img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.property-title {
  font-size: 16px;
  font-weight: bold;
  color: #007bff;
  text-decoration: none;
}

.property-title:hover {
  text-decoration: underline;
}

.property-info span {
  display: inline-block;
  margin-right: 10px;
  font-size: 14px;
  font-weight: bold;
  color: red;
}

.property-location {
  display: flex;
  justify-content: space-between;
}

.property-location span {
  display: inline-block;
  margin-right: 15px;
  font-size: 14px;
  color: #666;
}

.property-description p {
  font-size: 14px;
  line-height: 1.6;
  color: #444;
}

/* Liên hệ */
.property-contact {
  display: flex;
  align-items: center; /* Căn giữa theo trục dọc */
}

.contact-details {
  display: flex;
  gap: 10px; /* Khoảng cách giữa các nút liên hệ */
  align-items: center; /* Căn giữa các nút liên hệ */
}

.avatar-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.contact-details a {
  border: 1px solid #009ba1;
  color: #fff;
  background-color: #009ba1;
  padding: 4px 10px;
  border-radius: 6px;
}

.contact-item {
  font-size: 14px;
  color: #007bff;
  text-decoration: none;
  margin-bottom: 5px;
}

.contact-item:hover {
  text-decoration: underline;
}

.property-title,
.property-info,
.property-location,
.property-description {
  border-bottom: 1px solid #ddd;
  padding-bottom: 4px;
  margin-bottom: 4px;
}

/* Danh sách tỉnh */
.city {
  background-color: #f0f2f5;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  height: 400px;
  top: 75px;
}

.city-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
}

.city p {
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
}

.city-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Chia thành 3 cột */
  gap: 10px; /* Khoảng cách giữa các cột */
}

.city-list p {
  margin: 0;
  font-size: 14px;
  color: #333;
}
</style>
