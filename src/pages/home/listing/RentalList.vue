<template>
  <div class="container" style="padding-top: 80px">
    <div class="row">
      <!-- Nội dung chính -->
      <div class="col-lg-9">
        <h3 class="section-title">{{ pageTitle }}</h3>
        <p class="section-subtitle">Danh sách bài đăng</p>

        <div
          v-if="postall.length === 0"
          class="alert alert-info d-flex align-items-center"
        >
          Hiện chưa có bài đăng nào.
        </div>

        <div v-else class="row">
          <div
            class="out-item col-lg-4 col-md-6 col-sm-12 mb-4"
            v-for="post in postall"
            :key="post.id"
          >
            <!-- Debug info - ĐẶT Ở ĐÂY -->
            <!-- <div style="background: yellow; padding: 5px; font-size: 12px">
              <p>Debug - Post ID: {{ post.id }}</p>
              <p>
                Debug - ImageUrls length:
                {{ post.imageUrls ? post.imageUrls.length : "undefined" }}
              </p>
              <p>
                Debug - First Image:
                {{
                  post.imageUrls && post.imageUrls[0]
                    ? post.imageUrls[0]
                    : "No image"
                }}
              </p>
            </div> -->
            <router-link
              :to="`/chi-tiet/${post.slug}`"
              class="image-wrapper-link"
            >
              <div class="image-wrapper">
                <img
                  :src="
                    post.imageUrls.length > 0
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
                    <span>{{ post.price }}</span>
                  </div>
                  <!-- <p>Slug: {{ post.slug }}</p> -->
                  <router-link :to="`/chi-tiet/${post.slug}`">
                    <button class="btn custom-btn">Xem ngay ></button>
                  </router-link>
                </div>
              </div>
            </router-link>
          </div>

          <!-- Pagination -->
          <nav v-if="totalPages > 1" aria-label="Page navigation" class="mt-4">
            <ul class="pagination justify-content-center">
              <li
                class="page-item"
                :class="{ disabled: currentPage === 1 }"
                v-if="currentPage > 1"
                @click="changePage(currentPage - 1)"
              >
                <a class="page-link" href="#"
                  ><i class="fas fa-chevron-left"></i
                ></a>
              </li>

              <li
                v-for="page in totalPages"
                :key="page"
                class="page-item"
                :class="{ active: currentPage === page }"
                @click="changePage(page)"
              >
                <a class="page-link" href="#">{{ page }}</a>
              </li>

              <li
                class="page-item"
                :class="{ disabled: currentPage === totalPages }"
                v-if="currentPage < totalPages"
                @click="changePage(currentPage + 1)"
              >
                <a class="page-link" href="#"
                  ><i class="fas fa-chevron-right"></i
                ></a>
              </li>
            </ul>
          </nav>
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
  components: {
    Sidebar,
  },
  props: ["slug"],
  data() {
    return {
      currentPage: 1,
      limit: 12,
      categoryId: null,
    };
  },
  computed: {
    postall() {
      return this.$store.getters["posts/posts"];
    },
    totalPages() {
      const total = this.$store.state.posts.total || 0;
      return Math.ceil(total / this.limit);
    },

    // Dynamic category mapping from store
    categories() {
      return this.$store.state.category.category || [];
    },

    // Find category by slug dynamically
    currentCategory() {
      return this.categories.find((cat) => cat.slug === this.slug);
    },

    pageTitle() {
      return this.currentCategory
        ? this.currentCategory.name
        : "Danh sách bất động sản";
    },
  },

  created() {
    // Load categories if not already loaded
    if (!this.$store.state.category.category.length) {
      this.$store.dispatch("category/getCategoryManage");
    }
  },

  watch: {
    slug: {
      immediate: true,
      handler(newSlug) {
        this.updateCategoryId(newSlug);
      },
    },

    // Watch for categories to load
    categories: {
      handler() {
        if (this.categories.length && this.slug) {
          this.updateCategoryId(this.slug);
        }
      },
    },
  },

  methods: {
    getFullAddress(post) {
      // Tạo mảng chứa các phần của địa chỉ dựa trên dữ liệu từ action getTopViewedPosts
      const addressParts = [];

      // Thêm tên đường nếu có
      if (post.street) {
        addressParts.push(post.street);
      }

      // Thêm phường/xã (từ wardName)
      if (post.wardName) {
        addressParts.push(post.wardName);
      }

      // Thêm quận/huyện (từ districtName)
      if (post.districtName) {
        addressParts.push(post.districtName);
      }

      // Thêm tỉnh/thành phố (từ provinceName)
      if (post.provinceName) {
        addressParts.push(post.provinceName);
      }

      // Nối các phần với dấu phẩy, lọc bỏ các phần trống
      const fullAddress = addressParts
        .filter((part) => part && part.trim())
        .join(", ");

      // Trả về địa chỉ đầy đủ hoặc thông báo nếu không có
      return fullAddress || "Chưa có địa chỉ";
    },
    updateCategoryId(slug) {
      const category = this.categories.find((cat) => cat.slug === slug);
      this.categoryId = category ? category._id : null;
      this.fetchPosts();
    },

    fetchPosts() {
      if (!this.categoryId) return;
      this.$store.dispatch("posts/getAdPost", {
        categoryId: this.categoryId,
        page: this.currentPage,
        limit: this.limit,
      });
    },

    changePage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
      this.fetchPosts();
    },
  },
};
</script>
<style>
.background {
  background-color: #f3f4f7;
  padding: 20px 0;
}

.section-title {
  font-size: 24px;
  font-weight: bold;
}

.section-subtitle {
  font-size: 18px;
  color: #666;
}

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
  height: 200px; /* Đảm bảo hình ảnh có chiều cao cố định */
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Giữ tỷ lệ ảnh khi thay đổi kích thước */
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
  -webkit-line-clamp: 2; /* Giới hạn 2 dòng */
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

  /* white-space: normal;
  word-wrap: break-word;  */
  line-height: 1.5;
  height: 40px;
}

.property-address {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Giới hạn 2 dòng */
  -webkit-box-orient: vertical;
}

.property-area {
  padding-top: 10px;
}

/* Giá và diện tích */
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

/* Danh mục */
.city {
  background-color: #f8f8f8;
  padding: 25px;
}

.city-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
}

.city-list {
  padding-left: 0;
}

.category-item {
  font-size: 14px;
  color: #333;
  cursor: pointer;
  padding: 5px 0;
  transition: all 0.2s;
}

.category-item:hover {
  color: #007bff;
  transform: translateX(4px);
}
</style>
