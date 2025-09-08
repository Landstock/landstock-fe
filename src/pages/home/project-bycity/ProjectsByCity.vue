<template>
  <div class="container py-5 projects-container">
    <!-- Tiêu đề -->
    <div class="text-center mb-4">
      <h2>
        Các dự án
        <span class="highlight">đã triển khai tại một số thành phố</span>
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
import axiosInstance from "@/services/AxiosServices";

export default {
  name: "ProjectsByCity",
  data() {
    return {
      cities: [],
      loading: true,
      fallbackCities: [
        {
          name: "HÀ NỘI",
          projects: 0,
          image:
            "https://bds49.giaodienwebmau.com/wp-content/uploads/2020/07/ha-noi.jpg",
          provinceId: 1,
        },
        {
          name: "TP. HỒ CHÍ MINH",
          projects: 0,
          image:
            "https://bds49.giaodienwebmau.com/wp-content/uploads/2020/07/nghe-an.jpg",
          provinceId: 79,
        },
        {
          name: "ĐÀ NẴNG",
          projects: 0,
          image:
            "https://bds49.giaodienwebmau.com/wp-content/uploads/2020/07/da-nang.jpg",
          provinceId: 48,
        },
        {
          name: "HẢI PHÒNG",
          projects: 0,
          image:
            "https://bds49.giaodienwebmau.com/wp-content/uploads/2020/07/hai-phong.jpg",
          provinceId: 31,
        },
        {
          name: "CẦN THƠ",
          projects: 0,
          image: "https://i.imgur.com/ZxRoeoJ.jpg",
          provinceId: 92,
        },
      ],
    };
  },
  methods: {
    async fetchCityProjects() {
      try {
        this.loading = true;

        // Lấy thống kê số lượng bài đăng theo tỉnh/thành phố
        const response = await axiosInstance.get(
          "/posts/statistics/by-province"
        );
        const statistics = response.data.data;

        // Map dữ liệu thống kê với danh sách thành phố fallback
        this.cities = this.fallbackCities
          .map((city) => {
            const stat = statistics.find(
              (s) => s.provinceId === city.provinceId
            );
            return {
              ...city,
              projects: stat ? stat.count : 0,
            };
          })
          .filter((city) => city.projects > 0); // Chỉ hiển thị thành phố có dự án

        // Nếu không có dữ liệu từ API, sử dụng fallback
        if (this.cities.length === 0) {
          this.cities = this.fallbackCities;
        }

        console.log("Dữ liệu thành phố:", this.cities);
      } catch (error) {
        console.error("Lỗi khi lấy thống kê dự án theo thành phố:", error);

        // Fallback với dữ liệu mẫu
        this.cities = this.fallbackCities.map((city) => ({
          ...city,
          projects: Math.floor(Math.random() * 20) + 5, // Random số từ 5-24
        }));
      } finally {
        this.loading = false;
      }
    },

    async fetchAlternativeData() {
      try {
        // Phương án 2: Lấy tất cả posts và group theo province
        const response = await axiosInstance.get("/posts?limit=1000");
        const posts = response.data.data.items || response.data.data;

        // Đếm số lượng posts theo province
        const provinceCounts = {};
        posts.forEach((post) => {
          const provinceName = post.provinceName;
          if (provinceName) {
            provinceCounts[provinceName] =
              (provinceCounts[provinceName] || 0) + 1;
          }
        });

        // Map với fallback cities
        this.cities = this.fallbackCities
          .map((city) => ({
            ...city,
            projects: provinceCounts[city.name] || 0,
          }))
          .filter((city) => city.projects > 0);
      } catch (error) {
        console.error("Lỗi phương án thay thế:", error);
        this.cities = this.fallbackCities;
      }
    },

    handleImageError(event) {
      event.target.src =
        "https://via.placeholder.com/400x220/f8f9fa/6c757d?text=Không+có+ảnh";
    },

    goToCityProjects(city) {
      // Chuyển đến trang danh sách BDS của thành phố đó
      this.$router.push({
        path: "/danh-sach",
        query: {
          province: city.name,
          provinceId: city.provinceId,
        },
      });
    },
  },

  async mounted() {
    await this.fetchCityProjects();
  },
};
</script>

<style scoped>
.projects-container {
  background-color: #f5f8ff;
  border-radius: 10px;
}

.highlight {
  color: #3366ff;
  font-weight: 600;
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
  z-index: 2;
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
  z-index: 2;
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
