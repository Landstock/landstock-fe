<template>
  <div class="container" style="padding-top: 80px">
    <div class="row">
      <!-- Nội dung bài đăng -->
      <div class="col-lg-9">
        <h3 class="section-title">Mua bán nhà đất</h3>
        <p class="section-subtitle">Bán nhà đất</p>

        <!-- Nếu không có bài đăng -->
        <div
          v-if="postall.length === 0"
          class="alert alert-info d-flex align-items-center"
        >
          Hiện chưa có bài đăng nào.
        </div>

        <div v-else class="row">
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

          <!-- Pagination -->
          <nav
            v-if="totalPages > 1"
            aria-label="Page navigation"
            class="mt-4 z-0"
          >
            <ul class="pagination justify-content-center">
              <!-- Mũi tên sang trái -->
              <li
                class="page-item"
                :class="{ disabled: currentPage === 1 }"
                v-if="currentPage > 1"
                @click="changePage(currentPage - 1)"
              >
                <a class="page-link" href="#">
                  <i class="fas fa-chevron-left"></i>
                </a>
              </li>

              <!-- Các số trang -->
              <li
                v-for="page in totalPages"
                :key="page"
                class="page-item"
                :class="{ active: currentPage === page }"
                @click="changePage(page)"
              >
                <a class="page-link" href="#">{{ page }}</a>
              </li>

              <!-- Mũi tên sang phải -->
              <li
                class="page-item"
                :class="{ disabled: currentPage === totalPages }"
                v-if="currentPage < totalPages"
                @click="changePage(currentPage + 1)"
              >
                <a class="page-link" href="#">
                  <i class="fas fa-chevron-right"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <!-- bên phải  -->
      <div class="col-lg-3 pb-3">
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

  data() {
    return {
      currentPage: 1,

      limit: 1,
    };
  },
  computed: {
    postall() {
      return this.$store.getters["posts/posts"];
    },
    categories() {
      return this.$store.state.category.category;
    },
    totalPages() {
      const total = this.$store.state.posts.total || 0;
      return Math.ceil(total / this.limit);
    },
  },
  created() {
    this.fetchPosts();
    this.$store.dispatch("category/getCategoryManage");
  },
  methods: {
    fetchPosts() {
      const categoryId = 9;
      this.$store.dispatch("posts/getAdPost", {
        categoryId,
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
