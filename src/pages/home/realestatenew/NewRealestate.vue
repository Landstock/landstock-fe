<template>
  <div class="news-wrapper container my-5">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="section-title">Tin tức</h3>
      <router-link to="/tin-tuc">
        <button class="btn-more">Xem thêm</button>
      </router-link>
    </div>

    <!-- Content -->
    <div class="row g-4">
      <!-- Tin lớn bên trái -->
      <div class="col-lg-4 col-md-6 col-12 mb-3">
        <router-link
          v-if="newsList.length"
          :to="`/tin-tuc/${newsList[0].slug}`"
          class="main-news d-block"
        >
          <img
            :src="getFirstImage(newsList[0].content)"
            class="img-fluid rounded"
            alt="main-news"
          />
          <div class="mt-3">
            <p class="text-muted mb-1">
              {{ formatDate(newsList[0].createdAt) }}
            </p>
            <h5 class="fw-bold">{{ newsList[0].title }}</h5>
            <p class="desc">
              {{ truncateContent(newsList[0].content, 120) }}
            </p>
          </div>
        </router-link>
      </div>

      <!-- 3 tin nhỏ bên phải -->

      <div class="col-lg-5 col-md-6 col-12">
        <div
          v-for="item in newsList.slice(1, 4)"
          :key="item._id"
          class="news-item d-flex align-items-start mb-4"
        >
          <router-link
            :to="`/tin-tuc/${item.slug}`"
            class="d-flex text-decoration-none text-dark"
          >
            <img
              :src="getFirstImage(item.content)"
              alt="small-news"
              class="news-thumbnail me-3"
            />
            <div>
              <p class="text-muted mb-1">{{ formatDate(item.createdAt) }}</p>
              <p class="fw-semibold mb-0">{{ item.title }}</p>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Banner quảng cáo -->
      <div class="col-lg-3 d-none d-lg-block">
        <img
          src="https://bds49.giaodienwebmau.com/wp-content/uploads/2020/08/banner_right_1.jpg"
          alt="banner"
          class="img-fluid rounded"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axiosInstance from "@/services/AxiosServices";

const newsList = ref([]);

onMounted(async () => {
  try {
    const res = await axiosInstance.get("/news/latest?limit=4");
    newsList.value = res.data.data;
    console.log(" Tin ở giao diện:", newsList.value);
  } catch (err) {
    console.error("Lỗi khi lấy danh sách tin tức:", err);
  }
});

const getFirstImage = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  const img = div.querySelector("img");
  return img ? img.src : "https://via.placeholder.com/300x200";
};

const truncateContent = (html, length) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  const text = div.textContent || div.innerText || "";
  return text.length > length ? text.slice(0, length) + "..." : text;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN");
};
</script>

<style scoped>
.section-title {
  color: #00abb8;
  border-bottom: 2px solid #00abb8;
  padding-bottom: 4px;
  font-weight: bold;
}

.btn-more {
  background-color: #00abb8;
  color: #fff;
  border: none;
  padding: 6px 16px;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.btn-more:hover {
  background-color: #fff;
  color: #00abb8;
  border: 1px solid #00abb8;
}

.desc {
  color: #666;
  font-size: 14px;
  line-height: 1.4;
}

.news-thumbnail {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
}

.news-item:hover p.fw-semibold {
  color: #00abb8;
  /* text-decoration: underline;   */
}
</style>
