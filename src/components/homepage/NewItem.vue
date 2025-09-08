<template>
  <div class="container">
    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="row">
        <div
          class="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4"
          v-for="i in 8"
          :key="i"
        >
          <div class="property-skeleton">
            <div class="skeleton-image"></div>
            <div class="skeleton-content">
              <div class="skeleton-title"></div>
              <div class="skeleton-address"></div>
              <div class="skeleton-area"></div>
              <div class="skeleton-divider"></div>
              <div class="skeleton-footer">
                <div class="skeleton-price"></div>
                <div class="skeleton-button"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="!properties.posts || properties.posts.length === 0"
      class="empty-state"
    >
      <div class="empty-icon">
        <i class="fas fa-home"></i>
      </div>
      <h5>Chưa có bất động sản nào</h5>
      <p>Hiện tại chưa có bất động sản nào được đăng tải</p>
    </div>

    <!-- Properties Content -->
    <div v-else class="row">
      <div
        class="out-item col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4 text-decoration-none"
        v-for="(property, index) in properties.posts"
        :key="index"
      >
        <!-- Hình ảnh bất động sản -->
        <router-link
          :to="`/chi-tiet/${property.slug}`"
          class="image-wrapper-link"
        >
          <div class="image-wrapper">
            <img
              :src="property.imageUrls?.[0]"
              :alt="property.title"
              @error="handleImageError"
            />

            <div class="description-overlay">
              <p>{{ property.description }}</p>
            </div>
          </div>
        </router-link>

        <!-- Thông tin bất động sản -->
        <router-link
          :to="{ path: `/chi-tiet/${property.slug}` }"
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
                <i class="fa-solid fa-location-dot me-1 icon-red"></i>
                {{ getFullAddress(property) }}
              </p>
            </div>

            <!-- diện tích -->
            <div class="property-area">
              <span
                ><i class="fas fa-expand-arrows-alt me-1 icon-blue"></i>
                <strong>Diện tích: </strong>{{ property.area }}</span
              >
            </div>
            <hr />
            <!-- Giá  -->
            <div class="d-flex justify-content-between align-items-center">
              <div class="property-price">
                <span class="pr-3">{{ property.price }}</span>
              </div>
              <div>
                <router-link :to="{ path: `/chi-tiet/${property.slug}` }">
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
      properties: { posts: [] },
      loading: true,
    };
  },
  methods: {
    async fetchLatestProperties() {
      try {
        this.loading = true;
        console.log("Bắt đầu fetch properties...");

        // Lấy 8 bài đăng mới nhất
        await this.$store.dispatch("posts/getAllPosts", {
          page: 1,
          limit: 8,
        });

        // Debug: Kiểm tra state
        console.log("Store state:", this.$store.state);
        console.log("Posts state:", this.$store.state.posts);

        // Lấy data từ state
        const posts = this.$store.state.posts.posts || [];
        console.log("Posts from store:", posts);
        console.log("Posts length:", posts.length);

        if (posts.length === 0) {
          console.warn("Không có posts nào!");
          this.properties = { posts: [] };
          return;
        }

        // SỬA: Gán đúng structure để khớp với template
        this.properties = {
          posts: posts.map((post) => ({
            id: post.id,
            slug: post.slug,
            imageUrls: post.imageUrls || [
              "https://placehold.co/400x250?text=Không+có+ảnh&font=roboto",
            ],
            title: post.title,
            price: post.price,
            area: post.area,
            description: post.description,
            category: post.category,
            views: post.views,
            street: post.street,
            wardName: post.wardName,
            districtName: post.districtName,
            provinceName: post.provinceName,
          })),
        };

        console.log("Final properties:", this.properties);
        console.log("Final properties.posts:", this.properties.posts);
      } catch (error) {
        console.error("Lỗi khi lấy bất động sản mới nhất:", error);
        this.properties = { posts: [] };
      } finally {
        this.loading = false;
        console.log("Loading finished");
      }
    },

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

    handleImageError(event) {
      event.target.src =
        "https://placehold.co/400x250?text=Không+có+ảnh&font=roboto";
    },
  },
  async mounted() {
    console.log("Component mounted");
    await this.fetchLatestProperties();
  },
};
</script>

<style scoped>
/* Container */
.container {
  margin-top: 20px;
}

/* Loading State Styles */
.loading-state {
  animation: pulse 1.5s ease-in-out infinite;
}

.property-skeleton {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.skeleton-image {
  height: 200px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

.skeleton-content {
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skeleton-title {
  height: 48px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

.skeleton-address {
  height: 40px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

.skeleton-area {
  height: 40px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
  width: 80%;
}

.skeleton-divider {
  height: 1px;
  background: #e9ecef;
  margin: 0.5rem 0;
}

.skeleton-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.skeleton-price {
  height: 24px;
  width: 80px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

.skeleton-button {
  height: 32px;
  width: 90px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 5px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #6c757d;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  opacity: 0.5;
  color: #00abb8;
}

.empty-state h5 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #495057;
}

.empty-state p {
  font-size: 1rem;
  margin: 0;
  max-width: 400px;
  margin: 0 auto;
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
  transition: transform 0.3s ease;
}

.out-item:hover .image-wrapper img {
  transform: scale(1.05);
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
  align-items: flex-start;
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
.property-address,
.property-area {
  min-height: 40px;
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  color: #555;
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

/* Animations */
@keyframes loading {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .empty-state {
    padding: 3rem 1rem;
  }

  .empty-icon {
    font-size: 3rem;
  }

  .empty-state h5 {
    font-size: 1.25rem;
  }
}
</style>
