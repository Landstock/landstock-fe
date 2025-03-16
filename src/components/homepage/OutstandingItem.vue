<template>
  <div class="container">
    <div class="row">
      <router-link
        :to="{ path: `/home/${property.id}` }"
        class="out-item col-lg-4 col-md-6 col-sm-12 mb-4 text-decoration-none"
        v-for="(property, index) in properties"
        :key="index"
      >
        <!-- Hình ảnh bất động sản -->
        <img :src="property.image" :alt="property.title" />

        <!-- Thông tin bất động sản -->
        <div class="bg-white p-3">
          <!-- Giá và diện tích -->
          <div class="property-price">
            <span class="pr-3">{{ property.price }}</span>
            <span>{{ property.area }}</span>
          </div>

          <!-- Tiêu đề -->
          <div class="property-title">
            <p>{{ property.title }}</p>
          </div>

          <!-- Vị trí -->
          <div class="property-location">
            <p>{{ property.location }}</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "OutstandingProperties",
  data() {
    return {
      properties: [
        {
          id: 1,
          image:
            "https://bds.com.vn/images/products/2024/12/small/z6095730901769_41a52be28eca70d893b8bc6d0119f1ff.jpg",
          price: "2.79 tỷ",
          area: "278.6 m2",
          title: "Chính chủ bán 278.6m² đất tại Phường Phú Khương, Tp Bến Tre ",
          location: "Thành Phố Bến Tre - Bến Tre",
        },
        {
          id: 2,
          image:
            "https://bds.com.vn/images/products/2024/12/small/z6095730901769_41a52be28eca70d893b8bc6d0119f1ff.jpg",
          price: "3.5 tỷ",
          area: "350 m2",
          title: "Nhà phố sang trọng tại trung tâm thành phố",
          location: "Quận 1 - Hồ Chí Minh",
        },
        {
          id: 3,
          image:
            "https://bds.com.vn/images/products/2024/12/small/z6095730901769_41a52be28eca70d893b8bc6d0119f1ff.jpg",
          price: "1.8 tỷ",
          area: "150 m2",
          title: "Đất nền giá rẻ khu vực ngoại ô",
          location: "Huyện Củ Chi - Hồ Chí Minh",
        },
        {
          id: 4,
          image:
            "https://bds.com.vn/images/products/2024/12/small/z6095730901769_41a52be28eca70d893b8bc6d0119f1ff.jpg",
          price: "1.8 tỷ",
          area: "150 m2",
          title: "Đất nền giá rẻ khu vực ngoại ô",
          location: "Huyện Củ Chi - Hồ Chí Minh",
        },
      ],
    };
  },
};
</script>
<style scoped>
/* Container */
.container {
  margin-top: 20px;
}

/* Card bất động sản */
.out-item {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.out-item:hover {
  transform: scale(1.05); /* Phóng to nhẹ khi hover */
}

.bg-white {
  background-color: #ffffff;
  border-radius: 5px;
  transition: box-shadow 0.3s ease;
}

.out-item:hover .bg-white {
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); /* Đổ bóng khi hover */
}

/* Hình ảnh bất động sản */
img {
  width: 100%;
  border-radius: 5px;
}

/* Giá và diện tích */
.property-price {
  display: flex;
  gap: 10px; /* Khoảng cách giữa giá và diện tích */
  color: red; /* Chữ màu đỏ */
  font-weight: bold; /* Đậm chữ */
  transition: color 0.3s ease; /* Hiệu ứng chuyển màu */
}

.out-item:hover .property-price {
  color: #d80000; /* Màu chữ khi hover */
}

/* Tiêu đề bất động sản */
.property-title {
  min-height: 48px; /* Chiều cao cố định cho tiêu đề */
  display: flex;
  align-items: center; /* Căn giữa nội dung theo chiều dọc */
  overflow: hidden; /* Ẩn phần văn bản tràn */
  text-overflow: ellipsis; /* Thêm dấu "..." nếu văn bản quá dài */
}

.property-title p {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: #333; /* Màu chữ mặc định */
  transition: color 0.3s ease;
  line-height: 24px; /* Chiều cao dòng */
}

.out-item:hover .property-title p {
  color: #009ba1; /* Đổi màu tiêu đề khi hover */
}

/* Vị trí bất động sản */
.property-location {
  color: #b7b6b6; /* Màu chữ xám nhạt */
  font-size: 14px;
}

.property-location p {
  margin: 0;
}
</style>
