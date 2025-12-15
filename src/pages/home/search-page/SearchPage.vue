<template>
  <div class="container" style="padding-top: 80px">
    <div class="row">
      <div class="col-lg-9 col-md-12">
        <h3 class="mb-3">Kết quả tìm kiếm</h3>

        <div v-if="filteredPosts.length === 0" class="alert alert-warning">
          Không tìm thấy bất động sản nào phù hợp.
        </div>

        <div v-else class="row">
          <div
            class="out-item col-lg-4 col-md-6 col-sm-12 mb-4 text-decoration-none"
            v-for="(post, index) in filteredPosts"
            :key="index"
          >
            <!-- Hình ảnh bất động sản -->
            <router-link
              :to="`/chi-tiet/${post.slug}`"
              class="image-wrapper-link"
            >
              <div class="image-wrapper">
                <img
                  :src="
                    post.imageUrls?.[0] || 'https://via.placeholder.com/400x300'
                  "
                  :alt="post.title"
                />

                <div class="description-overlay">
                  <p>{{ post.description }}</p>
                </div>
              </div>
            </router-link>

            <!-- Thông tin bất động sản -->
            <router-link
              :to="{ path: `/chi-tiet/${post.slug}` }"
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
                    <i class="fa-solid fa-location-dot me-1 icon-red"></i>
                    {{ getFullAddress(post) }}
                  </p>
                </div>

                <!-- diện tích -->
                <div class="property-area">
                  <span>
                    <i class="fas fa-expand-arrows-alt me-1 icon-blue"></i>
                    <strong>Diện tích: </strong>
                    {{ post.area }}
                  </span>
                </div>
                <hr />

                <!-- Giá  -->
                <div class="d-flex justify-content-between align-items-center">
                  <div class="property-price">
                    <span class="pr-3">
                      {{ post.price }}
                    </span>
                  </div>
                  <div>
                    <router-link :to="{ path: `/chi-tiet/${post.slug}` }">
                      <button class="btn custom-btn">Xem ngay ></button>
                    </router-link>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-12 mb-3">
        <sidebar></sidebar>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/homepage/Sidebar.vue";

export default {
  name: "SearchPage",
  components: {
    Sidebar,
  },

  computed: {
    searchPosts() {
      return this.$store.state.posts.posts;
    },

    // Thêm computed để lọc bài đăng theo categoryId
    filteredPosts() {
      const posts = Array.isArray(this.searchPosts) ? this.searchPosts : [];
      const { categoryId } = this.$route.query || {};

      // Nếu không có categoryId hoặc rỗng → trả về tất cả
      if (!categoryId) return posts;

      // Lọc theo categoryId (có kiểm tra null an toàn)
      return posts.filter(
        (post) => String(post.categoryId || "") === String(categoryId)
      );
    },
  },

  methods: {
    async fetchSearchResults() {
      try {
        const {
          categoryId,
          provinceName,
          keyword,
          page = 1,
          limit = 12,
        } = this.$route.query;

        console.log("Query params:", { categoryId, provinceName, keyword });

        await this.$store.dispatch("posts/searchPosts", {
          categoryId,
          provinceName,
          keyword,
          page,
          limit,
        });

        console.log("Posts từ store:", this.searchPosts);
        console.log("Posts sau khi lọc:", this.filteredPosts);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
      }
    },
    getFullAddress(property) {
      const addressParts = [];
      if (property.street) addressParts.push(property.street);
      if (property.wardName) addressParts.push(property.wardName);
      if (property.districtName) addressParts.push(property.districtName);
      if (property.provinceName) addressParts.push(property.provinceName);
      return (
        addressParts.filter((p) => p && p.trim()).join(", ") ||
        "Chưa có địa chỉ"
      );
    },
  },
  watch: {
    $route() {
      this.fetchSearchResults();
    },
  },

  mounted() {
    this.fetchSearchResults();
  },
};
</script>

<style scoped>
/* Card bất động sản */
.out-item {
  cursor: pointer;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Card khi hover */
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

/* Hình ảnh bất động sản */
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

/* Mô tả ảnh */
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
  box-sizing: border-box;
}

.out-item:hover .description-overlay {
  transform: translateY(0);
}

.description-overlay p {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  max-height: 100%;
  text-align: center;
}

/* Tiêu đề bất động sản */
.property-title {
  min-height: 48px;
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
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

/* Vị trí bất động sản */
.property-address,
.property-area {
  min-height: 40px;
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  color: #555;
  line-height: 1.5;
  height: 40px;
}

.property-address {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.property-area {
  padding-top: 10px;
}

/* Giá */
.property-price {
  font-weight: bold;
  color: #00abb8;
}

/* Button */
.custom-btn {
  position: relative;
  overflow: hidden;
  z-index: 1;
  border: 1px dashed #00abb8;
  color: #00abb8;
  padding: 5px 15px;
  border-radius: 5px;
  background-color: transparent;
  transition: color 0.3s ease;
}

.custom-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  background-color: #00abb8;
  z-index: -1;
  transition: width 0.4s ease;
}

.custom-btn:hover::before {
  width: 100%;
}

.custom-btn:hover {
  color: #fff;
}

.icon-red {
  color: red;
  padding-right: 2px;
}

.icon-blue {
  color: #00abb8;
}
</style>
