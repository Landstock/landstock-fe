<template>
  <div class="news-wrapper container my-5">
    <div
      class="section-header d-flex justify-content-between align-items-center mb-4"
    >
      <div class="title-wrapper">
        <h3 class="section-title">Tin tức</h3>
        <p class="section-subtitle">
          Cập nhật thông tin mới nhất về bất động sản
        </p>
      </div>
      <router-link to="/tin-tuc" class="text-decoration-none">
        <button class="btn-more">
          <span>Xem thêm</span>
          <i class="fas fa-arrow-right ms-2"></i>
        </button>
      </router-link>
    </div>

    <!-- Content -->
    <div class="news-content">
      <div v-if="loading" class="loading-state">
        <div class="row g-4">
          <div class="col-lg-4 col-md-6">
            <div class="skeleton-card">
              <div class="skeleton-image"></div>
              <div class="skeleton-text"></div>
              <div class="skeleton-text short"></div>
            </div>
          </div>
          <div class="col-lg-5 col-md-6">
            <div v-for="i in 3" :key="i" class="skeleton-news-item mb-3">
              <div class="skeleton-thumb"></div>
              <div class="skeleton-content">
                <div class="skeleton-line"></div>
                <div class="skeleton-line short"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="newsList.length === 0" class="empty-state">
        <div class="empty-icon">
          <i class="fas fa-newspaper"></i>
        </div>
        <h5>Chưa có tin tức</h5>
        <p>Hiện tại chưa có tin tức nào được đăng tải</p>
      </div>

      <div v-else class="row g-4">
        <!-- Tin lớn bên trái -->
        <div class="col-lg-4 col-md-6 col-12">
          <router-link
            :to="`/tin-tuc/${newsList[0].slug}`"
            class="main-news-card"
          >
            <div class="image-wrapper">
              <img
                :src="getFirstImage(newsList[0].content) || '/default-news.jpg'"
                class="main-image"
                alt="main-news"
                @error="handleImageError"
              />
              <div class="image-overlay">
                <span class="news-badge">Tin chính</span>
              </div>
            </div>
            <div class="content-wrapper">
              <div class="meta-info">
                <span class="date">
                  <i class="fas fa-calendar-alt me-1"></i>
                  {{ formatDate(newsList[0].createdAt) }}
                </span>
                <span class="category">Tin tức</span>
              </div>
              <h4 class="news-title">{{ newsList[0].title }}</h4>
              <p class="news-excerpt">
                {{ truncateContent(newsList[0].content, 120) }}
              </p>
              <span class="read-more">
                Đọc thêm
                <i class="fas fa-arrow-right ms-1"></i>
              </span>
            </div>
          </router-link>
        </div>

        <!-- 3 tin nhỏ bên phải -->
        <div class="col-lg-5 col-md-6 col-12">
          <div class="news-list">
            <div
              v-for="item in newsList.slice(1, 4)"
              :key="item._id"
              class="news-item"
            >
              <router-link :to="`/tin-tuc/${item.slug}`" class="news-item-link">
                <div class="item-image">
                  <img
                    :src="getFirstImage(item.content) || '/default-news.jpg'"
                    :alt="item.title"
                    @error="handleImageError"
                  />
                </div>
                <div class="item-content">
                  <span class="item-date">
                    {{ formatDate(item.createdAt) }}
                  </span>
                  <h5 class="item-title">{{ item.title }}</h5>
                  <p class="item-excerpt">
                    {{ truncateContent(item.content, 80) }}
                  </p>
                </div>
              </router-link>
            </div>
          </div>
        </div>

        <!-- Banner quảng cáo cải thiện -->
        <div class="col-lg-3 d-none d-lg-block">
          <div class="ad-banner">
            <img
              src="https://bds49.giaodienwebmau.com/wp-content/uploads/2020/08/banner_right_1.jpg"
              alt="Quảng cáo bất động sản"
              class="banner-image"
            />
            <div class="banner-overlay">
              <span class="banner-label">Quảng cáo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axiosInstance from "@/services/AxiosServices";

const newsList = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    loading.value = true;
    const res = await axiosInstance.get("/news/latest?limit=4");
    newsList.value = res.data.data;
    console.log("Tin ở giao diện:", newsList.value);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách tin tức:", err);
  } finally {
    loading.value = false;
  }
});

const getFirstImage = (html) => {
  if (!html) return null;
  const div = document.createElement("div");
  div.innerHTML = html;
  const img = div.querySelector("img");
  return img ? img.src : null;
};

const truncateContent = (html, length) => {
  if (!html) return "";
  const div = document.createElement("div");
  div.innerHTML = html;
  const text = div.textContent || div.innerText || "";
  return text.length > length ? text.slice(0, length) + "..." : text;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const handleImageError = (event) => {
  event.target.src =
    "https://placehold.co/400x250?text=Không+có+ảnh&font=roboto";
};
</script>

<style scoped>
/* Header Styles */
.section-header {
  margin-bottom: 2rem;
}

.title-wrapper {
  flex: 1;
}

.section-title {
  color: #00abb8;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #00abb8, #00d4aa);
  border-radius: 2px;
}

.section-subtitle {
  color: #6c757d;
  font-size: 1rem;
  margin: 0;
}

.btn-more {
  background: linear-gradient(135deg, #00abb8, #00d4aa);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 171, 184, 0.3);
}

.btn-more:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 171, 184, 0.4);
}

/* Main News Card */
.main-news-card {
  display: block;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  height: 100%;
}

.main-news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  text-decoration: none;
  color: inherit;
}

.image-wrapper {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.main-news-card:hover .main-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 16px;
  left: 16px;
}

.news-badge {
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.content-wrapper {
  padding: 1.5rem;
}

.meta-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.date {
  color: #6c757d;
  font-size: 0.9rem;
}

.category {
  background: #e9ecef;
  color: #495057;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.news-title {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 1rem;
  color: #212529;
}

.news-excerpt {
  color: #6c757d;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.read-more {
  color: #00abb8;
  font-weight: 600;
  font-size: 0.9rem;
}

/* News List */
.news-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.news-item {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.news-item:hover {
  transform: translateX(5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}

.news-item-link {
  display: flex;
  text-decoration: none;
  color: inherit;
  padding: 1rem;
  gap: 1rem;
}

.news-item-link:hover {
  text-decoration: none;
  color: inherit;
}

.item-image {
  flex-shrink: 0;
  width: 100px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.news-item:hover .item-image img {
  transform: scale(1.1);
}

.item-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.item-date {
  color: #6c757d;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
}

.item-title {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 0.5rem;
  color: #212529;
  transition: color 0.3s ease;
}

.news-item:hover .item-title {
  color: #00abb8;
}

.item-excerpt {
  color: #6c757d;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
}

/* Ad Banner */
.ad-banner {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  height: 100%;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 400px;
}

.banner-overlay {
  position: absolute;
  top: 12px;
  right: 12px;
}

.banner-label {
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  text-transform: uppercase;
}

/* Loading State */
.loading-state {
  animation: pulse 1.5s ease-in-out infinite;
}

.skeleton-card,
.skeleton-news-item {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1rem;
}

.skeleton-image {
  height: 200px;
  background: #e9ecef;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.skeleton-text {
  height: 20px;
  background: #e9ecef;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.skeleton-text.short {
  width: 60%;
}

.skeleton-news-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.skeleton-thumb {
  width: 100px;
  height: 80px;
  background: #e9ecef;
  border-radius: 8px;
  flex-shrink: 0;
}

.skeleton-content {
  flex: 1;
}

.skeleton-line {
  height: 16px;
  background: #e9ecef;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.skeleton-line.short {
  width: 70%;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #6c757d;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

/* Responsive */
@media (max-width: 991px) {
  .news-wrapper {
    padding: 1.5rem;
  }

  .section-title {
    font-size: 1.75rem;
  }
}

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .news-item-link {
    flex-direction: column;
    text-align: center;
  }

  .item-image {
    width: 100%;
    height: 150px;
  }
}

@media (max-width: 576px) {
  .news-wrapper {
    padding: 1rem;
  }

  .main-news-card {
    margin-bottom: 1.5rem;
  }

  .image-wrapper {
    height: 180px;
  }

  .news-title {
    font-size: 1.1rem;
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
