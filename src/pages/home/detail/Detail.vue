<template>
  <div class="property-wrapper py-4">
    <!-- Hình ảnh -->
    <div class="information-image mb-4">
      <!-- Swiper nhỏ -->
      <swiper
        :modules="modules"
        :slides-per-view="3"
        :space-between="50"
        :loop="true"
        :centered-slides="true"
        navigation
        :pagination="{ clickable: true }"
        class="thumbnail-swiper"
      >
        <swiper-slide
          v-for="(image, index) in properties[0]?.image || []"
          :key="index"
          class="custom-slide"
        >
          <img :src="image" @click="openImage(index)" />
          <div class="overlay"></div>
        </swiper-slide>
      </swiper>

      <!-- Modal Swiper lớn -->
      <div
        v-if="selectedImageIndex !== null"
        class="modal"
        @click.self="closeImage"
      >
        <swiper
          :modules="modules"
          :initial-slide="selectedImageIndex"
          :loop="true"
          :centered-slides="true"
          navigation
          :pagination="{ clickable: true }"
          class="modal-swiper"
        >
          <swiper-slide
            v-for="(image, index) in properties[0]?.image || []"
            :key="'modal-' + index"
          >
            <img :src="image" class="modal-image" />
          </swiper-slide>
        </swiper>
        <button class="close-modal" @click="closeImage">×</button>
      </div>
    </div>
  </div>
  <div class="container">
    <!-- Nội dung chính -->
    <div class="row" v-for="(property, index) in properties" :key="index">
      <!-- Thông tin bất động sản -->
      <div class="col-md-7 mb-4">
        <div class="description p-4 e rounded">
          <div class="breadcrumb text-muted mb-2">Trang chủ / Nhà bán</div>
          <h2 class="mb-3">{{ property.title }}</h2>
          <p class="mb-2">
            <i class="fa-solid fa-location-dot me-2 text-danger"></i>
            {{ property.address }}
          </p>
          <p class="text-muted">{{ property.description }}</p>
        </div>
      </div>

      <!-- Thông tin liên hệ -->
      <div class="col-md-5 mb-4">
        <div class="contact-card p-4 rounded">
          <div
            class="price-wrapper d-flex justify-content-between align-items-center mb-3"
          >
            <h4 class="fw-bold mb-0">{{ property.price }}</h4>
            <div class="text-end">
              <i class="fas fa-expand-arrows-alt me-1"></i>
              Diện tích: {{ property.area }}
            </div>
          </div>

          <hr />

          <div class="avatar-section d-flex align-items-center mb-3">
            <img
              class="avatar-img me-3"
              src="https://bds.com.vn/images/avartarmember.png"
              alt="Avatar"
            />
            <div>
              <p class="name fw-semibold mb-1">Nguyễn Văn A</p>
              <p class="phone text-white text-center fw-bold">
                <a
                  href="tel:0123456789"
                  class="contact-item-phone d-flex align-items-center justify-content-center text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="https://bds49.giaodienwebmau.com/wp-content/uploads/2020/08/phone-call-red.gif"
                    alt="Gọi"
                    style="width: 28px"
                  />
                  <span>0123 456 789</span>
                </a>
              </p>

              <p class="status text-success mb-0">Hỗ trợ quý khách 24/7</p>
            </div>
          </div>

          <div class="contact-info d-flex justify-content-between mb-3">
            <a
              href="tel:0123456789"
              class="contact-item-call animated-link call-glow"
            >
              Gọi điện
            </a>

            <a
              href="https://zalo.me/0123456789"
              class="contact-item-zalo animated-link zalo-glow"
              target="_blank"
            >
              Chat Zalo
            </a>
          </div>

          <hr />

          <a href="#" class="view-more text-decoration-none d-block">
            <img
              src="https://bds.com.vn/modules/products/assets/images/arrow04.gif"
              alt="Xem thêm"
              class="me-1"
              style="width: 14px"
            />
            <span>Xem tất cả tin đăng của người đăng </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      properties: [
        {
          id: 1,
          image: [
            "https://bds49.giaodienwebmau.com/wp-content/uploads/2020/07/img23.jpg",
            "https://bds49.giaodienwebmau.com/wp-content/uploads/2020/07/img19.jpg",
            "https://bds49.giaodienwebmau.com/wp-content/uploads/2020/07/img12.jpg",
            "https://bds49.giaodienwebmau.com/wp-content/uploads/2020/07/img13.jpg",
            "https://bds49.giaodienwebmau.com/wp-content/uploads/2020/07/img21.jpg",
            "https://bds.com.vn/images/products/2025/05/large/20240523164832-0473_wm.jpg",
          ],
          price: "2.79 tỷ",
          area: "278.6 m2",
          title:
            "Chính chủ bán 278.6m² đất tại Phường Phú Khương, Tp Bến Tre...",
          address: "Số 7 Đại lộ Thăng Long, Nam Từ Liêm, Hà Nội",
          description:
            "Tiện nghi cuộc sống tại dự án chung cư có thể kể tới như: tuyến phố thương mại, phòng sinh hoạt cộng đồng, tuyến phố thương mại quảng trường, dịch vụ thương mại, quảng trường mùa hạ, vườn treo, cung đường tình yêu, vườn nướng BBQ, vườn mặt trời, quảng trường mùa xuân, vườn cọ 1, vườn cọ 2…. Có thể thấy rằng, mọi tiện nghi cuộc sống tại dự án đều hướng cư dân tại đây đến cuộc sống gắn kết, sống chan hòa, vui vẻ; bên cạnh đó, mật độ cây xanh và hồ nước nhân tạo tại dự án lớn, mang đến màu xanh bao phủ toàn dự án căn hộ Chung cư An Bình City, mang lại bầu không khí trong lành, mát mẻ đến từng căn hộ tại dự án.",
        },
      ],
      selectedImageIndex: null,
      modules: [Navigation, Pagination, Scrollbar, A11y],
    };
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeydown);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKeydown);
  },
  methods: {
    openImage(index) {
      this.selectedImageIndex = index;
    },
    closeImage() {
      this.selectedImageIndex = null;
    },
    handleKeydown(e) {
      if (e.key === "Escape") this.closeImage();
    },
  },
};
</script>

<style scoped>
.information-image {
  margin-top: 37px;
}
/* swipper  */
.swiper-slide {
  margin-right: 0;
}

/* Swiper thumbnail */
.thumbnail-swiper img {
  width: 100%;
  height: 375px;
  object-fit: cover;
}

/* Định dạng slide */
.custom-slide {
  margin-right: 0;
  position: relative;
}

/* Lớp phủ mờ cho tất cả ảnh */

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  transition: opacity 0.3s;
  z-index: 1;
  pointer-events: none;
}

/* Ẩn overlay cho slide đang active */
.swiper-slide-active .overlay {
  opacity: 0;
}

/* Modal hiển thị ảnh lớn */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
}

/* Ảnh trong modal */
.modal-image {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  border-radius: 8px;
  margin: auto;
}

/* Swiper trong modal */
.modal-swiper {
  width: 80%;
  height: 80%;
  text-align: center;
}

/* Nút đóng modal */
.close-modal {
  position: absolute;
  top: -16px;
  right: 10px;
  font-size: 3rem;
  color: white;
  background: transparent;
  border: none;
  cursor: pointer;
}

/* thông tin  */
.description {
  background-color: #ffffff;
  border-radius: 5px;
  transition: box-shadow 0.3s ease;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
}

.breadcrumb,
.fas {
  color: #00abb8;
}
.price-wrapper h4 {
  color: #00abb8;
}

.contact-card {
  background-color: #ffffff;
  border-radius: 5px;
  transition: box-shadow 0.3s ease;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
}

.name {
  line-height: 30px;
  color: #3d4d65;
  font-size: 25px;
  margin-bottom: 5px;
  display: block;
}
.phone {
  padding: 4px;
  background: #eb5155;
  border-radius: 20px;
  margin: 0;
}

.status {
  margin-bottom: 0;
  font-style: italic;
  font-size: 12px;
  text-align: center;
  margin-top: 5px;
}

.contact-info {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  padding: 0.375rem 0.75rem;
  font-size: 25px;
  line-height: 1.5;
  border-radius: 4px;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

@keyframes glowing-green {
  0% {
    box-shadow: 0 0 5px rgba(40, 167, 69, 0.3);
  }
  50% {
    box-shadow: 0 0 15px rgba(40, 167, 69, 0.8), 0 0 25px rgba(40, 167, 69, 0.5);
  }
  100% {
    box-shadow: 0 0 5px rgba(40, 167, 69, 0.3);
  }
}

@keyframes glowing-blue {
  0% {
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 15px rgba(0, 123, 255, 0.8), 0 0 25px rgba(0, 123, 255, 0.5);
  }
  100% {
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
  }
}

.animated-link {
  padding: 10px 20px;
  border-radius: 6px;
  color: white;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  transition: box-shadow 0.3s ease-in-out;
}

.call-glow {
  background-color: #28a745; /* Màu xanh lá */
  animation: glowing-green 1.5s infinite ease-in-out;
}

.zalo-glow {
  background-color: #007bff; /* Màu xanh dương Zalo */
  animation: glowing-blue 1.5s ease-in-out 5s infinite;
}

.contact-item-call,
.contact-item-zalo {
  color: #fff;
  text-decoration: none;
  padding: 5px 20px;
  width: 47%;
}

.contact-item-call {
  background-color: #28a745;
  border-color: #28a745;
  margin-right: 15px;
}

.contact-item-zalo {
  background-color: #00abb8;
  border-color: #00abb8;
}

.avatar-img {
  display: inline-block;
  width: 115px;
  height: 115px;
  object-position: center;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid #ececec;
  padding: 5px;
}

.view-more {
  font-weight: 500;
  color: #333;
}

.view-more:hover {
  color: #00abb8;
  text-decoration: underline;
}
</style>
