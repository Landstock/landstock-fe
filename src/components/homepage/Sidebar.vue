<script setup>
import axiosInstance from "@/services/AxiosServices";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const categories = [
  { name: "Nhà đất bán", path: "/danh-sach/mua-ban-nha-dat" },
  { name: "Biệt thự bán", path: "/danh-sach/mua-ban-biet-thu" },
  { name: "Chung cư bán", path: "/danh-sach/mua-ban-chung-cu" },
  { name: "Nhà cho thuê", path: "/danh-sach/cho-thue-nha" },
  { name: "Căn hộ cho thuê", path: "/danh-sach/cho-thue-can-ho" },
  { name: "Chung cư cho thuê", path: "/danh-sach/cho-thue-chung-cu" },
];

const latestNews = ref([]);

onMounted(async () => {
  try {
    const res = await axiosInstance.get("/news/latest?limit=4");
    latestNews.value = res.data.data;
  } catch (err) {
    console.error("Lỗi khi lấy tin tức:", err);
  }
});

const getFirstImage = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  const img = div.querySelector("img");
  return img ? img.src : "https://via.placeholder.com/60x60?text=No+Img";
};
</script>

<template>
  <div class="sidebar p-3 bg-color rounded shadow-sm">
    <!-- Danh mục -->
    <div class="mb-4">
      <h5 class="fw-bold border-bottom pb-2">Danh mục</h5>
      <ul class="list-unstyled mb-0">
        <li v-for="(item, index) in categories" :key="index" class="mb-2">
          <router-link
            :to="item.path"
            class="category-link d-flex align-items-center text-decoration-none"
            :class="route.path === item.path ? 'fw-bold active-link' : ''"
          >
            <img
              src="https://bds49.giaodienwebmau.com/wp-content/uploads/2020/09/right-arrow.png"
              alt="arrow"
              class="me-2"
              style="width: 10px; height: auto"
            />
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </div>

    <!-- Tin tức mới nhất -->
    <div>
      <h5 class="fw-bold border-bottom pb-2">Tin tức mới nhất</h5>
      <div
        v-for="(news, index) in latestNews"
        :key="index"
        class="d-flex align-items-start mb-3"
      >
        <img
          :src="getFirstImage(news.content)"
          alt="news"
          class="me-2 rounded"
          style="width: 60px; height: 60px; object-fit: cover"
        />
        <router-link
          :to="`/tin-tuc/${news.slug}`"
          class="text-decoration-none text-dark"
          style="font-size: 0.9rem"
        >
          <p class="mt-2 text-truncate-2">{{ news.title }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-color {
  background: #f8f8f8;
}

.category-link {
  color: #6c757d;
  transition: color 0.3s;
}

.category-link:hover {
  color: #00abb8;
}

.active-link {
  font-weight: bold;
  color: #000;
}

.text-truncate-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}

.text-truncate-2:hover {
  color: #00abb8;
}
</style>
