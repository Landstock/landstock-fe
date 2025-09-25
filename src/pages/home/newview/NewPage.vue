<template>
  <div class="bg-view position-relative overflow-hidden">
    <div class="overlay"></div>
    <img
      class="w-100"
      src="https://bds59.giaodienwebmau.com/wp-content/uploads/2022/07/ve-chung-toi.jpg"
      alt="Về chúng tôi"
    />
    <div
      class="view-text position-absolute top-50 start-50 translate-middle text-center p-3"
    >
      <h1 class="text-white fw-bold display-4">Tin tức</h1>
    </div>
  </div>

  <div class="container news-list">
    <div class="row pt-5 pb-5">
      <div class="col-lg-9">
        <div class="row">
          <div
            class="col-lg-4 col-md-6 col-sm-12 mb-4"
            v-for="news in newsList"
            :key="news.id"
          >
            <div class="card shadow-sm news-card h-100 d-flex flex-column">
              <img
                :src="
                  getFirstImage(news.content) ||
                  require('@/assets/image/no-image.jpg')
                "
                class="card-img-top"
                alt="Ảnh đại diện"
                style="height: 200px; object-fit: cover"
              />
              <div class="card-body d-flex flex-column">
                <h5 class="card-title fw-bold flex-grow-0">
                  <router-link
                    :to="`/tin-tuc/${news.slug}`"
                    class="text-decoration-none news-link"
                  >
                    {{ news.title }}
                  </router-link>
                </h5>
                <p class="card-text text-muted flex-grow-1">
                  {{ truncateContent(news.content, 100) }}
                </p>
                <div class="mt-auto">
                  <!-- Nếu bạn muốn thêm nút "Xem chi tiết" thì đặt ở đây -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- bên phải  -->
      <div class="col-lg-3 col-sm-12">
        <sidebar />
      </div>
    </div>
    <!-- Pagination -->
    <nav v-if="totalPages > 1" aria-label="Page navigation" class="mt-4">
      <ul class="pagination justify-content-center">
        <li
          class="page-item"
          :class="{ disabled: currentPage === 1 }"
          v-if="currentPage > 1"
          @click="goToPage(currentPage - 1)"
        >
          <a class="page-link" href="#"><i class="fas fa-chevron-left"></i></a>
        </li>

        <li
          v-for="page in totalPages"
          :key="page"
          class="page-item"
          :class="{ active: currentPage === page }"
          @click="goToPage(page)"
        >
          <a class="page-link" href="#">{{ page }}</a>
        </li>

        <li
          class="page-item"
          :class="{ disabled: currentPage === totalPages }"
          v-if="currentPage < totalPages"
          @click="goToPage(currentPage + 1)"
        >
          <a class="page-link" href="#"><i class="fas fa-chevron-right"></i></a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axiosInstance from "@/services/AxiosServices";
import Sidebar from "@/components/homepage/Sidebar.vue";

const newsList = ref([]);

// phân trang
const totalPages = ref(1);
const currentPage = ref(1);
const limit = 15;

// Lấy danh sách tin
const fetchNews = async (page = 1) => {
  try {
    const res = await axiosInstance.get(
      `/news/all?page=${page}&limit=${limit}`
    );

    console.log("Tất cả response:", res.data);

    const responseData = res.data.data || res.data;
    newsList.value = responseData.data || responseData || [];

    totalPages.value = responseData.totalPages || 1;
    currentPage.value = responseData.currentPage || 1;
  } catch (err) {
    console.error("Lỗi khi gọi danh sách tin tức:", err);
  }
};

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    // fetchNews(page);
  }
};

onMounted(async () => {
  // eslint-disable-next-line no-debugger
  debugger;
  await fetchNews(1);
});

// Cắt nội dung
const truncateContent = (html, length) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  const text = div.textContent || div.innerText || "";
  return text.slice(0, length) + "...";
};

// Lấy ảnh đầu tiên trong nội dung
const getFirstImage = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  const img = div.querySelector("img");
  return img ? img.src : null;
};
</script>

<style scoped>
.bg-view {
  position: relative;
  height: 300px;
  overflow: hidden;
}
.bg-view img {
  object-fit: cover;
  height: 100%;
}
.overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
}

.news-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.news-card:hover .news-link {
  color: #007bff;
}
.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}
.card-title {
  font-size: 1.2rem;
}
.card-text {
  font-size: 0.95rem;
}

.news-link {
  color: #000;
}
</style>
