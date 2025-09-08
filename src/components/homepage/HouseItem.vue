<template>
  <div class="container">
    <div class="my-4 tilte text-center">
      <h2 class="mt-4">Bất động sản <span>mới nhất</span></h2>
      <img
        src="https://bds49.giaodienwebmau.com/wp-content/uploads/2020/07/bg_title.png"
        alt=""
      />
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-skeleton">
      <div class="skeleton-card">
        <div class="row g-0">
          <div class="col-lg-6">
            <div class="skeleton-image"></div>
          </div>
          <div class="col-lg-6">
            <div class="skeleton-content">
              <div class="skeleton-title"></div>
              <div class="skeleton-address"></div>
              <div class="skeleton-area"></div>
              <div class="skeleton-price"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Swiper Component -->
    <swiper
      v-else-if="isReady && properties.length > 0"
      :slides-per-view="1"
      :space-between="30"
      :loop="properties.length > 1"
      navigation
      class="mySwiper"
    >
      <swiper-slide v-for="property in properties" :key="property.id">
        <div class="card h-100 shadow-sm border-0">
          <div class="row g-0 property-card">
            <router-link
              :to="`/chi-tiet/${property.slug}`"
              class="col-lg-6 col-md-6 col-sm-12 position-relative"
            >
              <img
                :src="property.image"
                :alt="property.title"
                class="img-fluid rounded-start h-100 object-fit-cover"
                @error="handleImageError"
              />
              <div class="description-overlay">
                <p>{{ property.description }}</p>
              </div>
            </router-link>
            <div
              class="col-lg-6 col-md-6 col-sm-12 d-flex flex-column justify-content-center px-3 py-4"
            >
              <div class="mb-3">
                <p class="fw-bold fs-5 mb-2">{{ property.title }}</p>
                <p class="text-muted mb-2">
                  <i class="fa-solid fa-location-dot me-1 icon-red"></i>
                  {{ property.address }}
                </p>
                <p class="mb-2">
                  <i class="fas fa-expand-arrows-alt me-1 icon-blue"></i>
                  Diện tích: {{ property.area }}
                </p>
                <p class="mb-0" v-if="property.views">
                  <i class="fas fa-eye me-1 text-muted"></i>
                  <span class="text-muted">{{ property.views }} lượt xem</span>
                </p>
                <hr class="mt-3 mb-2" />
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <p class="text-danger fw-bold mb-0 fs-5">
                    {{ property.price }}
                  </p>
                  <small class="text-muted">{{ property.category }}</small>
                </div>
                <div>
                  <router-link :to="{ path: `/chi-tiet/${property.slug}` }">
                    <button class="btn custom-btn">Xem ngay ></button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <!-- Empty State -->
    <div v-else-if="!loading && properties.length === 0" class="empty-state">
      <p class="text-center text-muted">Chưa có bất động sản mới nào</p>
    </div>
  </div>
</template>

<script>
import { nextTick } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore, { Navigation, Pagination } from "swiper";

SwiperCore.use([Navigation, Pagination]);

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      isReady: false,
      loading: true,
      properties: [],
    };
  },
  methods: {
    async fetchLatestProperties() {
      try {
        this.loading = true;

        // Lấy 8 bài đăng mới nhất
        await this.$store.dispatch("posts/getAllPosts", {
          page: 1,
          limit: 8,
        });

        // Lấy data từ state
        const posts = this.$store.state.posts.posts || [];

        // Transform data cho swiper
        this.properties = posts.map((post) => ({
          id: post.id,
          slug: post.slug,
          image: post.imageUrls?.[0] || this.getDefaultImage(),
          title: post.title,
          address: this.getFullAddress(post),
          price: post.price,
          area: post.area,
          description: post.description,
          category: post.category,
          views: post.views,
        }));

        console.log("Latest 8 properties loaded:", this.properties);
      } catch (error) {
        console.error("Lỗi khi lấy bất động sản mới nhất:", error);
        this.properties = [];
      } finally {
        this.loading = false;
      }
    },

    getFullAddress(post) {
      const addressParts = [];

      if (post.street) addressParts.push(post.street);
      if (post.wardName) addressParts.push(post.wardName);
      if (post.districtName) addressParts.push(post.districtName);
      if (post.provinceName) addressParts.push(post.provinceName);

      return addressParts.length > 0
        ? addressParts.join(", ")
        : "Chưa có địa chỉ";
    },

    getDefaultImage() {
      return "https://via.placeholder.com/600x400/f8f9fa/6c757d?text=Không+có+ảnh";
    },

    handleImageError(event) {
      event.target.src = this.getDefaultImage();
    },

    initSwiper() {
      nextTick(() => {
        requestAnimationFrame(() => {
          this.isReady = true;
        });
      });
    },
  },

  async mounted() {
    await this.fetchLatestProperties();
    this.initSwiper();
  },
};
</script>

<style scoped>
.tilte:hover {
  color: red;
}

.tilte span {
  color: #00abb8;
}

/* Loading Skeleton */
.loading-skeleton {
  padding: 2rem 0;
}

.skeleton-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.skeleton-image {
  height: 300px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

.skeleton-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skeleton-title {
  height: 30px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

.skeleton-address,
.skeleton-area {
  height: 20px;
  width: 80%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

.skeleton-price {
  height: 24px;
  width: 60%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

@keyframes loading {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

/* Empty State */
.empty-state {
  padding: 3rem 0;
  text-align: center;
}

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

/* Responsive */
@media (max-width: 768px) {
  .skeleton-content {
    padding: 1.5rem;
  }
}
</style>
