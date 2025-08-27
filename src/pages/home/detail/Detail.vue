<template>
  <div class="property-wrapper py-4">
    <!-- Hình ảnh -->
    <div class="information-image mb-4">
      <!-- Swiper nhỏ -->
      <swiper
        v-if="property.imageUrls && property.imageUrls.length > 0"
        :modules="modules"
        :slides-per-view="3"
        :loop="true"
        :looped-slides="property.imageUrls.length"
        :centered-slides="true"
        navigation
        :pagination="{ clickable: true }"
        class="thumbnail-swiper"
      >
        <swiper-slide
          v-for="(image, index) in property.imageUrls"
          :key="index"
          class="custom-slide"
        >
          <img :src="image" @click="openImage(index)" />
          <div class="overlay"></div>
        </swiper-slide>
      </swiper>

      <div
        v-else
        class="alert alert-info d-flex align-items-center justify-content-center"
      >
        Không có hình ảnh hiển thị
      </div>

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
            v-for="(image, index) in property.imageUrls"
            :key="'modal-' + index"
          >
            <img :src="image" class="modal-image" />
          </swiper-slide>
        </swiper>
        <button class="close-modal" @click="closeImage">×</button>
      </div>
    </div>
  </div>

  <!-- Loading state -->
  <div v-if="loading" class="text-center py-5">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <!-- Main content -->
  <div class="container" v-else-if="property.slug">
    <!-- Nội dung chính -->
    <div class="row">
      <!-- Thông tin bất động sản -->
      <div class="col-md-7 mb-4">
        <div class="description p-4 e rounded">
          <div class="breadcrumb text-muted mb-2">Trang chủ / Nhà bán</div>
          <h2 class="mb-3">{{ property.title }}</h2>
          <p class="mb-2">
            <i class="fa-solid fa-location-dot me-1 icon-red"></i>
            {{ getFullAddress(property) }}
          </p>

          <p class="text-muted">{{ property.description }}</p>
          <p class="text-muted">Lượt xem: {{ property.views || 0 }}</p>
        </div>
      </div>

      <!-- Thông tin liên hệ -->
      <div class="col-md-5 mb-4">
        <div class="contact-card p-4 rounded">
          <div
            class="price-wrapper d-flex justify-content-between align-items-center mb-3"
          >
            <h4 class="fw-bold mb-0">{{ property.price }} triệu</h4>
            <div class="text-end">
              <i class="fas fa-expand-arrows-alt me-1"></i>
              Diện tích: {{ property.area }} m²
            </div>
          </div>

          <hr />

          <div class="avatar-section d-flex align-items-center mb-3">
            <img
              class="avatar-img me-3"
              :src="
                property.user?.avatar ||
                'https://bds.com.vn/images/avartarmember.png'
              "
              alt="Avatar"
            />
            <div>
              <p class="name fw-semibold mb-1">
                {{ property.user?.username || "Nguyễn Văn A" }}
              </p>
              <p class="phone text-white text-center fw-bold">
                <a
                  :href="`tel:${property.user?.phonenumber || '0123456789'}`"
                  class="contact-item-phone d-flex align-items-center justify-content-center text-white"
                  style="text-decoration: none"
                >
                  <img
                    src="https://bds49.giaodienwebmau.com/wp-content/uploads/2020/08/phone-call-red.gif"
                    alt="Gọi"
                    style="width: 28px"
                  />
                  <span>{{ property.user?.phonenumber || "0123456789" }}</span>
                </a>
              </p>
              <p class="status text-success mb-0">Hỗ trợ quý khách 24/7</p>
            </div>
          </div>

          <div class="contact-info d-flex justify-content-between mb-3">
            <a
              :href="`tel:${property.user?.phonenumber || '0123456789'}`"
              class="contact-item-call animated-link call-glow"
            >
              Gọi điện
            </a>
            <a
              :href="`https://zalo.me/${
                property.user?.phonenumber || '0123456789'
              }`"
              class="contact-item-zalo animated-link zalo-glow"
              target="_blank"
            >
              Chat Zalo
            </a>
          </div>

          <hr />
        </div>
      </div>
    </div>

    <!-- ✅ Chỉ render RelatedProperties khi có property.slug -->
    <RelatedProperties v-if="property.slug" :currentSlug="property.slug" />
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import RelatedProperties from "./RelatedProperties.vue";

export default {
  props: ["slug"],
  components: {
    Swiper,
    SwiperSlide,
    RelatedProperties,
  },
  data() {
    return {
      loading: true, // ✅ Thêm loading state
      property: {
        id: "",
        title: "",
        price: "",
        area: "",
        provinceCode: "",
        provinceName: "",
        districtCode: "",
        districtName: "",
        wardCode: "",
        wardName: "",
        street: "",
        project: "",
        description: "",
        imageUrls: [],
        user: { username: "", phonenumber: "", avatar: "" },
        views: 0,
        category: "",
        slug: "", // ✅ Đảm bảo slug được khởi tạo
      },
      selectedImageIndex: null,
      modules: [Navigation, Pagination, Scrollbar, A11y],
      showModal: false,
    };
  },
  created() {
    console.log("Slug hiện tại:", this.slug);
    this.fetchPostDetail();
  },

  watch: {
    slug(newSlug, oldSlug) {
      if (newSlug !== oldSlug) {
        this.loading = true; // ✅ Set loading khi đổi slug
        this.fetchPostDetail();
      }
    },
  },

  mounted() {
    window.addEventListener("keydown", this.handleKeydown);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKeydown);
  },
  methods: {
    getFullAddress(property) {
      const addressParts = [];

      if (property.street) {
        addressParts.push(property.street);
      }

      if (property.wardName) {
        addressParts.push(property.wardName);
      }

      if (property.districtName) {
        addressParts.push(property.districtName);
      }

      if (property.provinceName) {
        addressParts.push(property.provinceName);
      }

      const fullAddress = addressParts
        .filter((part) => part && part.trim())
        .join(", ");

      return fullAddress || "Chưa có địa chỉ";
    },
    async fetchPostDetail() {
      try {
        this.loading = true;
        const postId = this.slug;
        console.log("postId là lấy slug", postId);

        const postDetail = await this.$store.dispatch(
          "posts/getPostDetail",
          postId
        );
        console.log("Chi tiết bài viết:", postDetail);
        this.property = postDetail;
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết bài đăng:", error);
        alert("Không thể tải chi tiết bài đăng. Vui lòng thử lại.");
      } finally {
        this.loading = false;
      }
    },

    openImage(index) {
      this.selectedImageIndex = index;
      this.showModal = true;
    },
    closeImage() {
      this.selectedImageIndex = null;
      this.showModal = false;
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

.swiper-slide {
  margin-right: 0;
}

.thumbnail-swiper img {
  width: 100%;
  max-height: 100%;
  height: 375px;
  object-fit: cover;
}

.custom-slide {
  margin-right: 0;
  position: relative;
}

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

.swiper-slide-active .overlay {
  opacity: 0;
}

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

.modal-image {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  border-radius: 8px;
  margin: auto;
}

.modal-swiper {
  width: 80%;
  height: 80%;
  text-align: center;
}

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
  background-color: #28a745;
  animation: glowing-green 1.5s infinite ease-in-out;
}

.zalo-glow {
  background-color: #007bff;
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

.tilte h2 {
  font-size: 30px;
}

.tilte:hover {
  color: red;
}

.tilte span {
  color: #00abb8;
}
</style>
