<template>
  <div class="container">
    <div class="row">
      <div
        class="out-item col-lg-3 col-md-4 col-sm-12 mb-4 text-decoration-none"
        v-for="(property, index) in properties"
        :key="index"
      >
        <!-- Hình ảnh bất động sản -->
        <router-link
          :to="`/chi-tiet/${property.id}`"
          class="image-wrapper-link"
        >
          <div class="image-wrapper">
            <img :src="property.image" :alt="property.title" />
            <div class="description-overlay">
              <p>{{ property.description }}</p>
            </div>
          </div>
        </router-link>

        <!-- Thông tin bất động sản -->
        <router-link
          :to="{ path: `/chi-tiet/${property.id}` }"
          class="bg-white p-3 text-decoration-none"
        >
          <div class="box-text">
            <!-- Tiêu đề -->
            <div class="property-title">
              <p>{{ property.title }}</p>
            </div>

            <!-- Vị trí -->
            <div class="property-address">
              <p>
                <i class="fa-solid fa-location-dot me-1 icon-red"></i
                >{{ property.address }}
              </p>
            </div>

            <!-- diện tích -->
            <div class="property-area">
              <span
                ><i class="fas fa-expand-arrows-alt me-1 icon-blue"></i>
                <strong>Diện tích: </strong>{{ property.area }}</span
              >
            </div>
            <hr />
            <!-- Giá  -->
            <div class="d-flex justify-content-between align-items-center">
              <div class="property-price">
                <span class="pr-3">{{ property.price }}</span>
              </div>
              <div>
                <router-link :to="{ path: `/chi-tiet/${property.id}` }">
                  <button class="btn custom-btn">Xem ngay ></button>
                </router-link>
              </div>
            </div>
          </div>
        </router-link>
      </div>
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
          title:
            "Chính chủ bán 278.6m² đất tại Phường Phú Khương, Tp Bến Tre Nhà phố sang trọng tại trung tâm thành phố",
          address: "Số 7 Đại lộ Thăng Long, Nam Từ Liêm, Hà Nội",
          description:
            "Vinhomes Green Bay là một trong những sản phẩm BĐS nổi bật khu vực phía Tây Hà Nội Vinhomes Green Bay là một trong những sản phẩm BĐS nổi bật khu vực phía Tây Hà Nộido tập đoàn Vingroup đầu tư và triển khai. Dự án được định hướng trở thành tổ hợp đô thị hiện đại sang trọng bậc nhất đất Hà Thành với các sản phẩm BĐS hấp dẫn nhất hiện nay gồm Liền kề – Biệt thự Vinhomes Greenbay Mễ Trì – Shophouse Mễ Trì – Căn hộ chung cư cao cấp",
        },
        {
          id: 2,
          image:
            "https://bds.com.vn/images/products/2024/12/small/z6095730901769_41a52be28eca70d893b8bc6d0119f1ff.jpg",
          price: "3.5 tỷ",
          area: "350 m2",
          title: "Nhà phố sang trọng tại trung tâm thành phố",
          address: "Quận 1 - Hồ Chí Minh",
        },
        {
          id: 3,
          image:
            "https://bds.com.vn/images/products/2024/12/small/z6095730901769_41a52be28eca70d893b8bc6d0119f1ff.jpg",
          price: "1.8 tỷ",
          area: "150 m2",
          title: "Đất nền giá rẻ khu vực ngoại ô",
          address: "Huyện Củ Chi - Hồ Chí Minh",
        },
        {
          id: 4,
          image:
            "https://bds.com.vn/images/products/2024/12/small/z6095730901769_41a52be28eca70d893b8bc6d0119f1ff.jpg",
          price: "1.8 tỷ",
          area: "150 m2",
          title: "Đất nền giá rẻ khu vực ngoại ô",
          address:
            "Huyện Củ Chi - Hồ Chí Minh Huyện Củ Chi - Hồ Chí Minh Huyện Củ Chi - Hồ Chí Minh",
        },
        {
          id: 5,
          image:
            "https://bds.com.vn/images/products/2024/12/small/z6095730901769_41a52be28eca70d893b8bc6d0119f1ff.jpg",
          price: "1.8 tỷ",
          area: "150 m2",
          title: "Đất nền giá rẻ khu vực ngoại ô",
          address: "Huyện Củ Chi - Hồ Chí Minh",
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
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Card khi hover */
.bg-white {
  background-color: #ffffff;
  border-radius: 5px;
  transition: box-shadow 0.3s ease;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
}

/* Hình ảnh bất động sản */
.image-wrapper {
  position: relative;
  overflow: hidden;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 200px; /* Đảm bảo hình ảnh có chiều cao cố định */
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Giữ tỷ lệ ảnh khi thay đổi kích thước */
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

/* Mô tả ảnh */
.description-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: #21417ab3;
  font-size: 13px;
  color: white;
  opacity: 1;
  padding: 10px;
  transform: translateY(100%);
  transition: transform 0.3s ease-in-out;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  box-sizing: border-box;
}

.out-item:hover .description-overlay {
  transform: translateY(0);
}

.description-overlay p {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  max-height: 100%;
  text-align: center;
}

/* Tiêu đề bất động sản */
.property-title {
  min-height: 48px;
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 10px;
}

.property-title p {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  line-height: 24px;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Giới hạn 2 dòng */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Vị trí bất động sản */
/* Vị trí bất động sản */
.property-address,
.property-area {
  min-height: 40px;
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  color: #555;

  /* white-space: normal;
  word-wrap: break-word;  */
  line-height: 1.5;
  height: 40px;
}

.property-address {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Giới hạn 2 dòng */
  -webkit-box-orient: vertical;
}

.property-area {
  padding-top: 10px;
}

/* Giá và diện tích */
.property-price {
  font-weight: bold;
  color: #00abb8;
}

/* Button */
.custom-btn {
  position: relative;
  overflow: hidden;
  z-index: 1;
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

.icon-red {
  color: red;
  padding-right: 2px;
}

.icon-blue {
  color: #00abb8;
}
</style>
