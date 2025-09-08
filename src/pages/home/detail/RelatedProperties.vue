<template>
  <div class="container mt-5">
    <div class="mt-5 tilte text-center">
      <h2>Bất động sản <span>liên quan</span></h2>
      <img
        src="https://bds49.giaodienwebmau.com/wp-content/uploads/2020/07/bg_title.png"
        alt="title"
      />
    </div>
    <!-- Content -->
    <div v-if="posts.length > 0">
      <div class="row mb-4 mt-4">
        <!-- Danh sách bất động sản liên quan -->
        <div
          class="out-item col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4"
          v-for="property in posts"
          :key="property._id"
        >
          <router-link
            :to="`/chi-tiet/${property.slug}`"
            class="image-wrapper-link text-decoration-none"
          >
            <div class="image-wrapper">
              <img
                :src="property.images?.[0]?.url || '/default-image.jpg'"
                :alt="property.title"
              />

              <div class="description-overlay">
                <p>{{ property.description }}</p>
              </div>
            </div>
          </router-link>

          <!-- Thông tin bất động sản -->
          <div class="bg-white p-3 box-text">
            <!-- Tiêu đề -->
            <div class="property-title">
              <p>{{ property.title }}</p>
            </div>

            <!-- Vị trí -->
            <div class="property-address">
              <p>
                <i class="fa-solid fa-location-dot me-1 icon-red"></i>
                {{ getFullAddress(property) }}
              </p>
            </div>

            <!-- Diện tích -->
            <div class="property-area">
              <span>
                <i class="fas fa-expand-arrows-alt me-1 icon-blue"></i>
                <strong>Diện tích:</strong> {{ property.area }} m²
              </span>
            </div>
            <hr />

            <!-- Giá và nút xem ngay -->
            <div class="d-flex justify-content-between align-items-center">
              <div class="property-price">
                <span>{{ property.price }} triệu</span>
              </div>
              <router-link :to="`/chi-tiet/${property.slug}`">
                <button class="btn custom-btn">Xem ngay ></button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- No data message -->
    <div v-else-if="!loading" class="text-center py-5">
      <p class="text-muted">Không có bất động sản liên quan.</p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
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
</template>

<script>
import axiosInstance from "@/services/AxiosServices";

export default {
  props: {
    currentSlug: { type: String, required: true },
    categoryId: { type: Number, required: false },
    provinceCode: { type: String, required: false },
  },

  data() {
    return {
      posts: [],
      loading: false,
      apiResponse: null,
      currentPage: 1,
      limit: 8, // mỗi trang 8 bài
      total: 0,
      totalPages: 0,
    };
  },

  watch: {
    currentSlug: {
      handler(newSlug) {
        console.log("RelatedProperties - currentSlug changed:", newSlug);
        if (newSlug && newSlug !== "undefined") {
          this.currentPage = 1;
          this.fetchRelatedPosts();
        }
      },
      immediate: true,
    },
  },

  methods: {
    async fetchRelatedPosts() {
      if (!this.currentSlug || this.currentSlug === "undefined") {
        console.log(
          "RelatedProperties - currentSlug not ready:",
          this.currentSlug
        );
        return;
      }

      try {
        this.loading = true;

        console.log("RelatedProperties - Fetching for slug:", this.currentSlug);

        const response = await axiosInstance.get(
          `/posts/related/${this.currentSlug}`,
          {
            params: {
              page: this.currentPage,
              limit: this.limit,
            },
          }
        );

        console.log("RelatedProperties - API Response:", response.data);

        // API trả về { items, total, page, limit }
        if (response.data && Array.isArray(response.data.data.items)) {
          this.posts = response.data.data.items;
          this.total = response.data.data.total;
          this.limit = response.data.data.limit;
          this.currentPage = response.data.data.page;
          this.totalPages = Math.ceil(this.total / this.limit);
        } else {
          console.warn(
            "RelatedProperties - Unexpected response structure:",
            response.data
          );
          this.posts = [];
          this.totalPages = 0;
        }
      } catch (error) {
        console.error("RelatedProperties - Error:", error);
        this.posts = [];
        this.totalPages = 0;
      } finally {
        this.loading = false;
      }
    },

    goToPage(page) {
      if (page < 1 || page > this.totalPages || page === this.currentPage) {
        return;
      }
      this.currentPage = page;
      this.fetchRelatedPosts();
    },

    getFullAddress(property) {
      const addressParts = [];

      if (property.street) {
        addressParts.push(property.street);
      }

      if (property.wardName) {
        addressParts.push(property.wardName);
      }

      if (property.districtName) {
        addressParts.push(property.districtName);
      }

      if (property.provinceName) {
        addressParts.push(property.provinceName);
      }

      const fullAddress = addressParts
        .filter((part) => part && part.trim())
        .join(", ");

      return fullAddress || "Chưa có địa chỉ";
    },
  },
};
</script>

<style scoped>
.tilte h2 {
  font-size: 30px;
}
.tilte span {
  color: #00abb8;
}

.tilte:hover {
  color: red;
}

.image-wrapper img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

/* ✅ Thêm styles cho debug box */
.alert-info {
  background-color: #d1ecf1;
  border: 1px solid #bee5eb;
  color: #0c5460;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}
</style>
