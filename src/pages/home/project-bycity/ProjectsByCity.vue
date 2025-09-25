<template>
  <div class="container py-5 projects-container">
    <!-- Tiêu đề -->
    <div class="text-center tilte mb-4">
      <h2>
        Các dự án
        <span>đã triển khai tại một số thành phố</span>
      </h2>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="row g-4 justify-content-center">
        <div v-for="i in 5" :key="i" class="col-lg-4 col-md-6">
          <div class="city-skeleton">
            <div class="skeleton-image"></div>
            <div class="skeleton-count"></div>
            <div class="skeleton-name"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="cities.length === 0" class="empty-state">
      <div class="empty-icon">
        <i class="fas fa-city"></i>
      </div>
      <h5>Chưa có dữ liệu dự án</h5>
      <p>Hiện tại chưa có thông tin dự án ở các thành phố</p>
    </div>

    <!-- Danh sách các thành phố -->
    <div v-else class="row g-4 justify-content-center">
      <div
        v-for="(city, index) in cities"
        :key="index"
        class="col-lg-4 col-md-6"
      >
        <div
          class="city-card position-relative"
          @click="goToCityProjects(city)"
        >
          <img
            :src="city.image"
            class="img-fluid rounded shadow"
            :alt="city.name"
            @error="handleImageError"
          />

          <!-- Số dự án -->
          <div class="project-count" v-if="city.projects">
            <span>{{ city.projects }}</span>
            <small>Dự án</small>
          </div>

          <!-- Tên thành phố -->
          <div class="city-name">
            {{ city.name }}
          </div>

          <!-- Hover overlay -->
          <div class="hover-overlay">
            <div class="overlay-content">
              <i class="fas fa-search-plus"></i>
              <p>Xem các dự án tại {{ city.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectsByCity",
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    cities() {
      return this.$store.state.posts.cityProjects || [];
    },
  },
  methods: {
    async fetchCityProjects() {
      try {
        await this.$store.dispatch("posts/getCityProject");
      } finally {
        this.loading = false;
      }
    },
    handleImageError(event) {
      event.target.src =
        "https://via.placeholder.com/400x220/f8f9fa/6c757d?text=Không+có+ảnh";
    },

    goToCityProjects(city) {
      this.$router.push(
        `/danh-sach-tinh-thanh?province=${city.provinceCode || city.name}`
      );
    },
  },
  mounted() {
    this.fetchCityProjects();
  },
};
</script>

<style scoped>
.projects-container {
  background-color: #f5f8ff;
  border-radius: 10px;
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

/* Loading State */
.loading-state {
  animation: pulse 1.5s ease-in-out infinite;
}

.city-skeleton {
  position: relative;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  height: 220px;
}

.skeleton-image {
  width: 100%;
  height: 220px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 10px;
}

.skeleton-count {
  position: absolute;
  top: 15px;
  left: 15px;
  width: 60px;
  height: 50px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 5px;
}

.skeleton-name {
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 100px;
  height: 20px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
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
  color: #3366ff;
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

/* City Card Styles */
.city-card {
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.city-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.city-card img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.city-card:hover img {
  transform: scale(1.1);
}

.project-count {
  position: absolute;
  top: 15px;
  left: 15px;
  background-color: #ff3b30;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 12px rgba(255, 59, 48, 0.4);
  z-index: 1;
}

.project-count span {
  font-size: 20px;
  line-height: 1;
  font-weight: 700;
}

.project-count small {
  font-size: 11px;
  text-transform: uppercase;
  margin-top: 2px;
}

.city-name {
  position: absolute;
  bottom: 15px;
  right: 15px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8);
  z-index: 1;
  background: rgba(0, 0, 0, 0.3);
  padding: 8px 12px;
  border-radius: 6px;
  backdrop-filter: blur(4px);
}

/* Hover Overlay */
.hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(51, 102, 255, 0.9);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.city-card:hover .hover-overlay {
  opacity: 1;
}

.overlay-content {
  text-align: center;
}

.overlay-content i {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.overlay-content p {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
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
  .city-name {
    font-size: 16px;
    padding: 6px 10px;
  }

  .project-count {
    padding: 6px 10px;
  }

  .project-count span {
    font-size: 18px;
  }

  .overlay-content i {
    font-size: 2rem;
  }

  .overlay-content p {
    font-size: 1rem;
  }
}

@media (max-width: 576px) {
  .city-card img {
    height: 180px;
  }

  .city-name {
    font-size: 14px;
    bottom: 10px;
    right: 10px;
  }

  .project-count {
    top: 10px;
    left: 10px;
    padding: 5px 8px;
  }
}
</style>
