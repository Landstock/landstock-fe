<template>
  <div class="container" style="padding-top: 80px">
    <div class="row">
      <!-- Nội dung chính -->
      <div class="col-lg-9">
        <h3 class="section-title">
          Danh sách bất động sản tại
          <span class="text-primary">{{ provinceName || "tỉnh/thành" }}</span>
        </h3>
        <p class="section-subtitle">Danh sách bài đăng</p>

        <!-- Loading -->
        <div v-if="loading" class="text-center my-5">
          <div class="spinner-border text-primary" role="status"></div>
          <p class="mt-3">Đang tải dữ liệu...</p>
        </div>

        <!-- Empty -->
        <div
          v-else-if="posts.length === 0"
          class="alert alert-info d-flex align-items-center"
        >
          Hiện chưa có bài đăng nào cho tỉnh/thành này.
        </div>

        <!-- Danh sách bài đăng -->
        <div v-else class="row">
          <div
            class="out-item col-lg-4 col-md-6 col-sm-12 mb-4"
            v-for="post in posts"
            :key="post.id"
          >
            <router-link
              :to="`/chi-tiet/${post.slug}`"
              class="image-wrapper-link"
            >
              <div class="image-wrapper">
                <img
                  :src="
                    post.imageUrls?.length > 0
                      ? post.imageUrls[0]
                      : '/no-image.png'
                  "
                  :alt="post.title"
                />

                <div class="description-overlay">
                  <p>{{ post.description }}</p>
                </div>
              </div>
            </router-link>

            <router-link
              :to="{ path: `/chi-tiet/${post.slug}` }"
              class="bg-white p-3 text-decoration-none"
            >
              <div class="box-text">
                <div class="property-title">
                  <p>{{ post.title }}</p>
                </div>
                <!-- Vị trí -->
                <div class="property-address">
                  <p>
                    <i class="fa-solid fa-location-dot me-1 icon-red"></i>
                    {{ getFullAddress(post) }}
                  </p>
                </div>
                <div class="property-area">
                  <span>
                    <i class="fas fa-expand-arrows-alt me-1 icon-blue"></i>
                    <strong>Diện tích: </strong>{{ post.area }}
                  </span>
                </div>
                <hr />
                <div class="d-flex justify-content-between align-items-center">
                  <div class="property-price">
                    <span>{{ post.price }} VNĐ</span>
                  </div>
                  <router-link :to="`/chi-tiet/${post.slug}`">
                    <button class="btn custom-btn">Xem ngay ></button>
                  </router-link>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="col-lg-3 mb-3">
        <Sidebar />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/homepage/Sidebar.vue";

export default {
  name: "DanhSach",
  components: {
    Sidebar,
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    posts() {
      return this.$store.state.posts.posts || [];
    },
    provinceName() {
      return this.posts[0]?.provinceName || "";
    },
  },
  async mounted() {
    const provinceCode = this.$route.query.province;
    if (provinceCode) {
      await this.$store.dispatch("posts/getPostsByProvince", {
        provinceCode,
        page: 1,
        limit: 12,
      });
    }
    this.loading = false;
  },
  methods: {
    getFullAddress(post) {
      const parts = [];
      if (post.street) parts.push(post.street);
      if (post.wardName) parts.push(post.wardName);
      if (post.districtName) parts.push(post.districtName);
      if (post.provinceName) parts.push(post.provinceName);
      return parts.filter((p) => p && p.trim()).join(", ") || "Chưa có địa chỉ";
    },
  },
};
</script>

<style scoped>
/* Copy nguyên style từ component kia cho đồng bộ */
.section-title {
  font-size: 24px;
  font-weight: bold;
}
.section-subtitle {
  font-size: 18px;
  color: #666;
}
.out-item {
  cursor: pointer;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}
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
.image-wrapper {
  position: relative;
  overflow: hidden;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 200px;
}
.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
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
}
.out-item:hover .description-overlay {
  transform: translateY(0);
}
.property-title {
  min-height: 48px;
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-bottom: 10px;
}
.property-title p {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  line-height: 24px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.property-address,
.property-area {
  font-size: 14px;
  color: #555;
}
.property-price {
  font-weight: bold;
  color: #00abb8;
}
.custom-btn {
  border: 1px dashed #00abb8;
  color: #00abb8;
  padding: 5px 15px;
  border-radius: 5px;
  background-color: transparent;
  transition: color 0.3s ease;
}
.custom-btn:hover {
  background: #00abb8;
  color: white;
}
.icon-red {
  color: red;
}
.icon-blue {
  color: #00abb8;
}
</style>
