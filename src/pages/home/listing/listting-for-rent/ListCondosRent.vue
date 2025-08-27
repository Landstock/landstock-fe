<template>
  <div class="container" style="padding-top: 80px">
    <div class="row g-4">
      <!-- Nội dung bài đăng -->
      <div class="col-lg-9">
        <h3 class="section-title">Cho thuê</h3>
        <p class="section-subtitle">Thuê căn hộ</p>

        <!-- Nếu không có bài đăng -->
        <div
          v-if="postall.length === 0"
          class="alert alert-info d-flex align-items-center"
        >
          Hiện chưa có bài đăng nào.
        </div>

        <div v-else class="row g-4">
          <div
            class="out-item col-lg-4 col-md-4 col-sm-12 mb-4 text-decoration-none"
            v-for="post in postall"
            :key="post.id"
          >
            <!-- Hình ảnh bất động sản -->
            <router-link
              :to="`/chi-tiet/${post.id}`"
              class="image-wrapper-link"
            >
              <div class="image-wrapper">
                <img :src="post.imageUrls?.[0]" :alt="post.title" />

                <div class="description-overlay">
                  <p>{{ post.description }}</p>
                </div>
              </div>
            </router-link>

            <!-- Thông tin bất động sản -->
            <router-link
              :to="{ path: `/chi-tiet/${post.id}` }"
              class="bg-white p-3 text-decoration-none"
            >
              <div class="box-text">
                <!-- Tiêu đề -->
                <div class="property-title">
                  <p>{{ post.title }}</p>
                </div>

                <!-- Vị trí -->
                <div class="property-address">
                  <p>
                    <i class="fa-solid fa-location-dot me-1 icon-red"></i
                    >{{ post.address }}
                  </p>
                </div>

                <!-- diện tích -->
                <div class="property-area">
                  <span
                    ><i class="fas fa-expand-arrows-alt me-1 icon-blue"></i>
                    <strong>Diện tích: </strong>{{ post.area }}</span
                  >
                </div>
                <hr />
                <!-- Giá  -->
                <div class="d-flex justify-content-between align-items-center">
                  <div class="property-price">
                    <span class="pr-3">{{ post.price }}</span>
                  </div>
                  <div>
                    <router-link :to="{ path: `/chi-tiet/${post.id}` }">
                      <button class="btn custom-btn">Xem ngay ></button>
                    </router-link>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Danh mục -->
      <div class="col-lg-3">
        <sidebar />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/homepage/Sidebar.vue";
export default {
  components: {
    Sidebar,
  },
  computed: {
    postall() {
      return this.$store.getters["posts/posts"];
    },
    categories() {
      return this.$store.state.category.category;
    },
  },

  created() {
    const categoryId = 7;
    this.$store.dispatch("posts/getAdPost", categoryId);
    this.$store.dispatch("category/getCategoryManage");
  },

  methods: {
    filterByCategory(id) {
      this.$store.dispatch("posts/getAdPost", id);
    },
  },
};
</script>
