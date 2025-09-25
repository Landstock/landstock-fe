<template>
  <div class="news-detail container" style="padding-top: 100px">
    <!-- Breadcrumb -->
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">Trang chủ</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/tin-tuc">Tin tức</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ news?.title }}
        </li>
      </ol>
    </nav>

    <div class="row">
      <div class="col-lg-9">
        <!-- Tiêu đề -->
        <h1 class="news-title">{{ news?.title }}</h1>

        <!-- Metadata -->
        <div class="news-meta mb-4 text-muted">
          <span>{{
            new Date(news?.createdAt).toLocaleDateString("vi-VN")
          }}</span>
        </div>

        <!-- Nội dung -->
        <div class="news-content" v-html="news?.content"></div>
      </div>

      <!-- Sidebar -->
      <div class="col-lg-3">
        <Sidebar />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axiosInstance from "@/services/AxiosServices";
import Sidebar from "@/components/homepage/Sidebar.vue";

const route = useRoute();
const news = ref(null);

onMounted(async () => {
  const slug = route.params.slug;
  console.log("Route slug:", slug);

  if (!slug) {
    console.error("Không tìm thấy slug từ URL!");
    return;
  }

  try {
    const res = await axiosInstance.get(`/news/viewnew/${slug}`);
    news.value = res.data.data;
  } catch (error) {
    console.error("Không lấy được chi tiết tin:", error);
  }
});
</script>

<style scoped>
.breadcrumb {
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
  margin-bottom: 15px;
}

.breadcrumb a {
  color: #333;
  text-decoration: none;
  font-size: 16px;
}

.breadcrumb a:hover {
  color: #000;
  text-decoration: underline;
}

.breadcrumb-item.active {
  font-size: 16px;
  color: #000;
}

/* Căn giữa ảnh trong mọi div chứa nội dung tin tức */
.col-lg-9 :deep(img) {
  display: block;
  margin: 20px auto;
  max-width: 100%;
  height: auto;
}

.news-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 15px;
}

.news-meta {
  font-size: 14px;
}

.news-content img {
  display: block;
  margin: 20px auto;
  max-width: 100%;
  border-radius: 8px;
}
</style>
