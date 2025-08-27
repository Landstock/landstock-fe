<template>
  <div class="container" v-if="news" style="padding-top: 80px">
    <div class="row">
      <div class="col-9">
        <h2>{{ news.title }}</h2>
        <div v-html="news.content"></div>
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

<style>
/* Căn giữa ảnh trong mọi div chứa nội dung tin tức */
.col-9 img {
  display: block;
  margin: 10px auto;
  max-width: 100%;
  height: auto;
}
</style>
