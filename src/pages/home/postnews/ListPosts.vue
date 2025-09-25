<template>
  <div class="container-fluid">
    <div class="main-content">
      <!-- Header Section -->
      <div class="header-section mb-4">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h2 class="page-title">
              <i class="fas fa-home me-2"></i>
              Danh sách tin đã đăng
            </h2>
            <p class="text-muted mb-0">
              Quản lý thông tin và cài đặt tài khoản của bạn
            </p>
          </div>
          <div class="header-stats">
            <div class="stat-card">
              <div class="stat-number">{{ postnew.length }}</div>
              <div class="stat-label">Tổng tin đăng</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter and Search Section -->
      <div class="filter-section mb-4">
        <div class="row g-3 align-items-center">
          <!-- Ô tìm kiếm -->
          <div class="col-lg-4 col-md-6">
            <div class="search-box">
              <i class="fas fa-search search-icon"></i>
              <input
                type="text"
                class="form-control search-input"
                placeholder="Tìm kiếm theo tiêu đề..."
                v-model="searchQuery"
              />
            </div>
          </div>

          <!-- Trạng thái -->
          <div class="col-lg-3 col-md-6">
            <select class="form-select filter-select" v-model="filterStatus">
              <option value="">Tất cả trạng thái</option>
              <option value="approved">Đã duyệt</option>
              <option value="pending">Chờ duyệt</option>
              <option value="rejected">Bị từ chối</option>
            </select>
          </div>

          <!-- Loại tin -->
          <div class="col-lg-3 col-md-6">
            <select class="form-select filter-select" v-model="filterCategory">
              <option value="">Tất cả loại tin</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>

          <!-- Nút xóa bộ lọc -->
          <div class="col-lg-2 col-md-6">
            <button
              class="btn btn-outline-secondary w-100"
              @click="clearFilters"
            >
              <i class="fas fa-times me-1"></i>
              Xóa bộ lọc
            </button>
          </div>
        </div>
      </div>

      <!-- Posts Grid -->
      <div class="posts-grid">
        <div class="row g-4">
          <div
            class="col-lg-6 col-xl-4"
            v-for="(post, index) in filteredPosts"
            :key="post.id"
          >
            <div class="post-card">
              <!-- Image Section -->
              <div class="post-image-container">
                <img
                  :src="
                    post.imageUrls && post.imageUrls.length > 0
                      ? post.imageUrls[0]
                      : '/api/placeholder/300/200'
                  "
                  :alt="post.title"
                  class="post-image"
                />
                <div class="post-status">
                  <span :class="getStatusClass(post.status)">
                    {{ getStatusText(post.status) }}
                  </span>
                </div>
                <div class="post-index">#{{ index + 1 }}</div>
              </div>

              <!-- Content Section -->
              <div class="post-content">
                <div class="post-category">
                  {{ post.category }}
                </div>

                <h5 class="post-title">{{ post.title }}</h5>

                <div class="post-price">
                  <i class="fas fa-tag me-1"></i>
                  {{ post.price }}
                </div>

                <div class="post-details">
                  <div class="detail-item">
                    <i class="fas fa-expand-arrows-alt"></i>
                    <span>{{ post.area }}</span>
                  </div>
                  <div class="detail-item">
                    <i class="fas fa-calendar-alt"></i>
                    <span>{{ formatDate(post.createdAt) }}</span>
                  </div>
                </div>

                <div class="post-description">
                  {{ truncateText(post.description, 80) }}
                </div>

                <!-- Action Buttons -->
                <div class="post-actions">
                  <button
                    class="btn btn-edit"
                    @click="editPosts(post.id)"
                    title="Chỉnh sửa"
                  >
                    <i class="fas fa-edit"></i>
                    Sửa
                  </button>

                  <button
                    class="btn btn-delete"
                    @click="openDeleteModal(post.id)"
                    title="Xóa"
                  >
                    <i class="fas fa-trash"></i>
                    Xóa
                  </button>

                  <router-link
                    :to="`/chi-tiet/${post.slug}`"
                    class="btn btn-view"
                    title="Xem chi tiết"
                  >
                    <i class="fas fa-eye"></i>
                    Xem
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredPosts.length === 0" class="empty-state">
          <div class="empty-illustration">
            <i class="fas fa-home"></i>
          </div>
          <h4>Không tìm thấy tin đăng nào</h4>
          <p class="text-muted">Thử điều chỉnh bộ lọc hoặc tạo tin đăng mới</p>
        </div>
      </div>

      <!-- Enhanced Pagination -->
      <nav v-if="totalPages > 1" aria-label="Page navigation" class="mt-5">
        <div class="pagination-wrapper">
          <div class="pagination-info">
            Hiển thị {{ (currentPage - 1) * limit + 1 }} -
            {{ Math.min(currentPage * limit, totalPosts) }} trong tổng số
            {{ totalPosts }} tin đăng
          </div>
          <ul class="pagination pagination-modern">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link" @click.prevent="changePage(currentPage - 1)">
                <i class="fas fa-chevron-left"></i>
              </a>
            </li>

            <li v-if="currentPage > 3" class="page-item">
              <a class="page-link" @click.prevent="changePage(1)">1</a>
            </li>

            <li v-if="currentPage > 4" class="page-item disabled">
              <span class="page-link">...</span>
            </li>

            <li
              v-for="page in visiblePages"
              :key="page"
              class="page-item"
              :class="{ active: currentPage === page }"
            >
              <a class="page-link" @click.prevent="changePage(page)">{{
                page
              }}</a>
            </li>

            <li v-if="currentPage < totalPages - 3" class="page-item disabled">
              <span class="page-link">...</span>
            </li>

            <li v-if="currentPage < totalPages - 2" class="page-item">
              <a class="page-link" @click.prevent="changePage(totalPages)">{{
                totalPages
              }}</a>
            </li>

            <li
              class="page-item"
              :class="{ disabled: currentPage === totalPages }"
            >
              <a class="page-link" @click.prevent="changePage(currentPage + 1)">
                <i class="fas fa-chevron-right"></i>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Modal Sửa Bài Đăng (Enhanced) -->
      <div
        class="modal fade"
        :class="{ show: showEditModal }"
        tabindex="-1"
        v-if="showEditModal"
        :style="{ display: showEditModal ? 'block' : 'none' }"
      >
        <div
          class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
        >
          <div class="modal-content modern-modal">
            <div class="modal-header modern-modal-header">
              <h5 class="modal-title">
                <i class="fas fa-edit me-2"></i>
                Chỉnh sửa bài đăng
              </h5>
              <button
                type="button"
                class="btn-close"
                @click="closeEditModal"
              ></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="submitUpdatePost">
                <div class="row g-3">
                  <!-- Tiêu đề -->
                  <div class="col-12">
                    <label for="title" class="form-label fw-semibold">
                      <i class="fas fa-heading me-1"></i>
                      Tiêu đề
                    </label>
                    <input
                      type="text"
                      class="form-control modern-input"
                      v-model="newPost.title"
                      placeholder="Nhập tiêu đề bài đăng"
                      required
                    />
                  </div>

                  <!-- Giá và Diện tích -->
                  <div class="col-md-6">
                    <label for="price" class="form-label fw-semibold">
                      <i class="fas fa-dollar-sign me-1"></i>
                      Giá bán
                    </label>
                    <input
                      type="text"
                      v-model="newPost.price"
                      class="form-control modern-input"
                      placeholder="VD: 12 triệu, 1.2 tỷ"
                      required
                    />
                  </div>

                  <div class="col-md-6">
                    <label for="area" class="form-label fw-semibold">
                      <i class="fas fa-expand-arrows-alt me-1"></i>
                      Diện tích
                    </label>
                    <input
                      type="text"
                      v-model="newPost.area"
                      class="form-control modern-input"
                      placeholder="VD: 120 m²"
                      required
                    />
                  </div>

                  <!-- Loại tin -->
                  <div class="col-md-6">
                    <label for="category" class="form-label fw-semibold">
                      <i class="fas fa-tags me-1"></i>
                      Loại tin
                    </label>
                    <select
                      class="form-select modern-select"
                      v-model.number="newPost.categoryId"
                      required
                    >
                      <option value="" :disabled="newPost.categoryId !== null">
                        {{
                          newPost.categoryId
                            ? "Đã chọn loại tin"
                            : "Chọn loại tin đăng"
                        }}
                      </option>
                      <option
                        v-for="cat in categories"
                        :key="cat.id"
                        :value="cat.id"
                      >
                        {{ cat.name }}
                      </option>
                    </select>
                  </div>

                  <!-- Location Section -->
                  <div class="col-12">
                    <h6 class="section-title">
                      <i class="fas fa-map-marker-alt me-2"></i>
                      Thông tin địa chỉ
                    </h6>
                  </div>

                  <div class="col-md-4">
                    <label for="province" class="form-label fw-semibold"
                      >Tỉnh / Thành phố</label
                    >
                    <select
                      id="province"
                      v-model="newPost.provinceCode"
                      @change="fetchDistricts"
                      class="form-select modern-select"
                      required
                    >
                      <option value="">-- Chọn tỉnh / thành phố --</option>
                      <option
                        v-for="province in provinces"
                        :key="province.code"
                        :value="String(province.code)"
                      >
                        {{ province.name }}
                      </option>
                    </select>
                  </div>

                  <div class="col-md-4">
                    <label for="district" class="form-label fw-semibold"
                      >Quận / Huyện</label
                    >
                    <select
                      id="district"
                      v-model="newPost.districtCode"
                      @change="fetchWards"
                      class="form-select modern-select"
                      :disabled="!newPost.provinceCode"
                      required
                    >
                      <option value="">-- Chọn quận / huyện --</option>
                      <option
                        v-for="district in districts"
                        :key="district.code"
                        :value="String(district.code)"
                      >
                        {{ district.name }}
                      </option>
                    </select>
                  </div>

                  <div class="col-md-4">
                    <label for="ward" class="form-label fw-semibold"
                      >Phường / Xã</label
                    >
                    <select
                      id="ward"
                      v-model="newPost.wardCode"
                      @change="updateWardName"
                      class="form-select modern-select"
                      :disabled="!newPost.districtCode"
                      required
                    >
                      <option value="">-- Chọn phường / xã --</option>
                      <option
                        v-for="ward in wards"
                        :key="ward.code"
                        :value="String(ward.code)"
                      >
                        {{ ward.name }}
                      </option>
                    </select>
                  </div>

                  <div class="col-md-12">
                    <label class="form-label fw-semibold">
                      <i class="fas fa-road me-1"></i>
                      Tên đường
                    </label>
                    <input
                      v-model="newPost.street"
                      type="text"
                      class="form-control modern-input"
                      placeholder="VD: Nguyễn Trãi"
                    />
                  </div>

                  <!-- Mô tả -->
                  <div class="col-12">
                    <label for="description" class="form-label fw-semibold">
                      <i class="fas fa-align-left me-1"></i>
                      Mô tả chi tiết
                    </label>
                    <textarea
                      class="form-control modern-textarea"
                      v-model="newPost.description"
                      placeholder="Mô tả chi tiết về bất động sản..."
                      rows="4"
                      required
                    ></textarea>
                  </div>

                  <!-- Hình ảnh -->
                  <div class="col-12">
                    <label class="form-label fw-semibold">
                      <i class="fas fa-images me-1"></i>
                      Hình ảnh (tối thiểu 3 hình)
                    </label>
                    <div class="image-upload-section">
                      <input
                        type="file"
                        class="form-control modern-input"
                        id="imageUrls"
                        @change="handleImageUpload"
                        accept="image/*"
                        multiple
                      />
                      <div class="images-preview">
                        <div
                          v-for="(img, index) in newPost.imageUrls"
                          :key="index"
                          class="image-item"
                        >
                          <img :src="img" class="preview-image" />
                          <button
                            type="button"
                            class="remove-image-btn"
                            @click="removeImage(index)"
                          >
                            <i class="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="modal-actions">
                  <button type="submit" class="btn btn-primary btn-save">
                    <i class="fas fa-save me-2"></i>
                    Lưu thay đổi
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="closeEditModal"
                  >
                    <i class="fas fa-times me-2"></i>
                    Hủy bỏ
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Delete Confirmation Modal -->
    <div v-if="showDeleteConfirm" class="custom-modal-overlay">
      <div class="custom-modal-content modern-delete-modal">
        <div class="delete-icon">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <h5 class="delete-title">Xác nhận xóa bài đăng</h5>
        <p class="delete-message">
          Bạn có chắc chắn muốn xóa bài đăng này không? Hành động này không thể
          hoàn tác.
        </p>
        <div class="delete-actions">
          <button class="btn btn-outline-secondary" @click="cancelDelete">
            <i class="fas fa-times me-1"></i>
            Hủy bỏ
          </button>
          <button class="btn btn-danger" @click="confirmDelete">
            <i class="fas fa-trash me-1"></i>
            Xóa bài đăng
          </button>
        </div>
      </div>
    </div>

    <!-- Enhanced Toast -->
    <div
      class="toast-container position-fixed top-0 end-0 p-3"
      style="z-index: 2"
    >
      <div
        class="toast modern-toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        ref="toast"
      >
        <div class="toast-header">
          <i class="fas fa-check-circle text-success me-2"></i>
          <strong class="me-auto">Thông báo</strong>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="toast"
          ></button>
        </div>
        <div class="toast-body">
          {{ toastMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from "@/services/AxiosServices";
import axios from "axios";
import { Toast } from "bootstrap";

export default {
  data() {
    return {
      newPost: {
        title: "",
        price: "",
        area: "",
        provinceCode: "",
        provinceName: "",
        districtCode: "",
        districtName: "",
        wardCode: "",
        wardName: "",
        street: "",
        project: "",
        description: "",
        categoryId: null,
        imageUrls: [],
        id: null,
      },
      provinces: [],
      districts: [],
      wards: [],
      showEditModal: false,
      showDeleteConfirm: false,
      itemToDeleteId: null,
      toastMessage: "",
      currentPage: 1,
      limit: 12, // Giảm xuống 12 để hiển thị đẹp hơn trong grid
      searchQuery: "",
      filterStatus: "",
      filterCategory: "",
    };
  },

  computed: {
    postnew() {
      const postnewall = this.$store.getters["posts/posts"];
      return postnewall;
    },

    categories() {
      const cate = this.$store.getters["category/categories"];
      return cate.map((c) => ({
        ...c,
        id: c._id || c.id,
      }));
    },

    totalPages() {
      const total = this.$store.state.posts.total || 0;
      return Math.ceil(total / this.limit);
    },

    totalPosts() {
      return this.$store.state.posts.total || 0;
    },

    filteredPosts() {
      let filtered = [...this.postnew];

      if (this.searchQuery) {
        filtered = filtered.filter((post) =>
          post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      if (this.filterStatus) {
        filtered = filtered.filter((post) => post.status === this.filterStatus);
      }

      if (this.filterCategory) {
        filtered = filtered.filter(
          (post) =>
            post.categoryId === this.filterCategory ||
            (post.category && post.category.id === this.filterCategory)
        );
      }

      return filtered;
    },

    visiblePages() {
      const start = Math.max(1, this.currentPage - 2);
      const end = Math.min(this.totalPages, this.currentPage + 2);
      const pages = [];
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    },
  },

  methods: {
    getStatusText(status) {
      switch (status) {
        case "approved":
          return "Đã duyệt";
        case "rejected":
          return "Bị từ chối";
        default:
          return "Chờ duyệt";
      }
    },

    getStatusClass(status) {
      switch (status) {
        case "approved":
          return "status-approved";
        case "rejected":
          return "status-rejected";
        default:
          return "status-pending";
      }
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN");
    },

    truncateText(text, maxLength) {
      if (!text) return "";
      return text.length > maxLength
        ? text.substring(0, maxLength) + "..."
        : text;
    },

    clearFilters() {
      this.searchQuery = "";
      this.filterStatus = "";
      this.filterCategory = "";
    },

    async fetchProvinces() {
      try {
        const res = await axios.get(
          "https://provinces.open-api.vn/api/?depth=1"
        );
        this.provinces = res.data;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tỉnh/thành:", error);
        this.provinces = [];
      }
    },

    async fetchDistricts() {
      if (!this.newPost.provinceCode) {
        this.districts = [];
        this.wards = [];
        return;
      }

      try {
        const res = await axios.get(
          `https://provinces.open-api.vn/api/p/${this.newPost.provinceCode}?depth=2`
        );
        this.districts = res.data.districts;

        const selectedProvince = this.provinces.find(
          (p) => p.code == this.newPost.provinceCode
        );
        this.newPost.provinceName = selectedProvince
          ? selectedProvince.name
          : "";

        if (!this.districts.find((d) => d.code === this.newPost.districtCode)) {
          this.newPost.districtCode = "";
          this.newPost.districtName = "";
          this.wards = [];
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách quận/huyện:", error);
        this.districts = [];
      }
    },

    async fetchWards() {
      if (!this.newPost.districtCode) {
        this.wards = [];
        return;
      }

      try {
        const res = await axios.get(
          `https://provinces.open-api.vn/api/d/${this.newPost.districtCode}?depth=2`
        );
        this.wards = res.data.wards;

        const selectedDistrict = this.districts.find(
          (d) => d.code == this.newPost.districtCode
        );
        this.newPost.districtName = selectedDistrict
          ? selectedDistrict.name
          : "";

        if (!this.wards.find((w) => w.code === this.newPost.wardCode)) {
          this.newPost.wardCode = "";
          this.newPost.wardName = "";
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách phường/xã:", error);
        this.wards = [];
      }
    },

    updateWardName() {
      const selectedWard = this.wards.find(
        (ward) => ward.code == this.newPost.wardCode
      );
      this.newPost.wardName = selectedWard ? selectedWard.name : "";
    },

    closeEditModal() {
      this.showEditModal = false;
      this.resetForm();
    },

    async editPosts(id) {
      const post = this.postnew.find((p) => p.id === id);

      if (post) {
        await this.fetchProvinces();

        this.newPost = {
          title: post.title,
          price: post.price,
          area: post.area,
          provinceCode: String(post.province?.code || post.provinceCode || ""),
          provinceName: post.province?.name || post.provinceName || "",
          districtCode: String(post.district?.code || post.districtCode || ""),
          districtName: post.district?.name || post.districtName || "",
          wardCode: String(post.ward?.code || post.wardCode || ""),
          wardName: post.ward?.name || post.wardName || "",
          street: post.street || "",
          project: post.project || "",
          description: post.description,
          categoryId: post.category
            ? Number(post.category._id || post.category.id || post.categoryId)
            : post.categoryId
            ? Number(post.categoryId)
            : null,
          imageUrls: post.imageUrls ? [...post.imageUrls] : [],
          id: post.id,
        };

        if (this.newPost.provinceCode) {
          await this.fetchDistricts();
          if (this.newPost.districtCode) {
            await this.fetchWards();
          }
        }
        this.showEditModal = true;
      }
    },

    async submitUpdatePost() {
      try {
        if (!this.newPost.id) {
          alert("Vui lòng chọn một bài đăng để sửa!");
          return;
        }

        if (!this.newPost.title || !this.newPost.price) {
          alert("Vui lòng nhập đầy đủ thông tin bắt buộc!");
          return;
        }

        const payload = {
          id: this.newPost.id,
          title: this.newPost.title,
          price: this.newPost.price,
          area: this.newPost.area,
          provinceCode: this.newPost.provinceCode,
          provinceName: this.newPost.provinceName,
          districtCode: this.newPost.districtCode,
          districtName: this.newPost.districtName,
          wardCode: this.newPost.wardCode,
          wardName: this.newPost.wardName,
          street: this.newPost.street,
          project: this.newPost.project,
          description: this.newPost.description,
          categoryId: this.newPost.categoryId,
          imageUrls: this.newPost.imageUrls,
        };

        await this.$store.dispatch("posts/updatePost", payload);
        this.resetForm();
        this.showEditModal = false;
        this.showToast("✅ Cập nhật bài đăng thành công!", "success");
        await this.$store.dispatch("posts/getPost");
      } catch (error) {
        console.error("Lỗi khi sửa bài đăng:", error);
        this.showToast("❌ Có lỗi xảy ra khi cập nhật bài đăng!", "danger");
      }
    },

    async handleImageUpload(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await axiosInstance.post("/s3/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          const imageUrl = response.data.data;
          this.newPost.imageUrls.push(imageUrl);
        } catch (error) {
          console.error("Lỗi upload ảnh:", error);
          this.showToast("❌ Không thể upload ảnh!", "danger");
        }
      }
    },

    async removeImage(index) {
      const imageUrl = this.newPost.imageUrls[index];
      const imageKey = imageUrl.split("/").pop();

      try {
        await axiosInstance.delete(`/s3/delete/${imageKey}`, {
          data: { imageUrl },
        });
        this.newPost.imageUrls.splice(index, 1);
      } catch (error) {
        console.error("Lỗi xóa ảnh:", error);
        this.showToast("❌ Không thể xóa ảnh!", "danger");
      }
    },

    resetForm() {
      this.newPost = {
        title: "",
        price: "",
        area: "",
        provinceCode: "",
        provinceName: "",
        districtCode: "",
        districtName: "",
        wardCode: "",
        wardName: "",
        street: "",
        project: "",
        description: "",
        categoryId: null,
        imageUrls: [],
        id: null,
      };
      this.districts = [];
      this.wards = [];
    },

    openDeleteModal(id) {
      this.itemToDeleteId = id;
      this.showDeleteConfirm = true;
    },

    cancelDelete() {
      this.itemToDeleteId = null;
      this.showDeleteConfirm = false;
    },

    async confirmDelete() {
      try {
        await this.$store.dispatch("posts/deletePost", this.itemToDeleteId);
        this.showToast("🗑️ Đã xóa bài đăng!", "success");
        await this.$store.dispatch("posts/getPost");
      } catch (err) {
        this.showToast("❌ Xóa không thành công!", "danger");
      } finally {
        this.itemToDeleteId = null;
        this.showDeleteConfirm = false;
      }
    },

    showToast(message, type = "success") {
      this.toastMessage = message;
      const toastEl = this.$refs.toast;
      toastEl.className = `toast modern-toast text-bg-${type}`;
      const toast = new Toast(toastEl);
      toast.show();
    },

    async fetchPosts() {
      await this.$store.dispatch("posts/getPost", {
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

  async mounted() {
    await this.fetchPosts();
    await this.$store.dispatch("category/getCategoryManage");
    await this.fetchProvinces();
  },
};
</script>

<style scoped>
/* ==== MAIN LAYOUT ==== */
.container-fluid {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  padding: 2rem 1rem;
}

.main-content {
  max-width: 1400px;
  margin: 0 auto;
}

/* ==== HEADER SECTION ==== */
.header-section {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.page-title {
  color: #2d3748;
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.header-stats {
  display: flex;
  gap: 1rem;
}

.stat-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  min-width: 120px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
}

.stat-label {
  font-size: 0.875rem;
  opacity: 0.9;
  margin-top: 0.25rem;
}

/* ==== FILTER SECTION ==== */
.filter-section {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.search-box {
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  color: #aaa;
  font-size: 14px;
}

.search-input {
  padding-left: 36px; /* chừa chỗ cho icon */
  height: 44px;
  border-radius: 8px;
}

.search-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  outline: none;
}

.filter-select {
  height: 44px;
  border-radius: 8px;
}

.filter-select:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  outline: none;
}

.btn-outline-secondary {
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 8px;
}

/* ==== POSTS GRID ==== */
.posts-grid {
  margin-top: 2rem;
}

.post-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.post-image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.post-card:hover .post-image {
  transform: scale(1.05);
}

.post-status {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1;
}

.status-approved {
  background: linear-gradient(135deg, #48bb78, #38a169);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-pending {
  background: linear-gradient(135deg, #ed8936, #dd6b20);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-rejected {
  background: linear-gradient(135deg, #f56565, #e53e3e);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.post-index {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
}

.post-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.post-category {
  background: linear-gradient(135deg, #e6fffa, #b2f5ea);
  color: #38b2ac;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  align-self: flex-start;
  margin-bottom: 1rem;
}

.post-title {
  color: #2d3748;
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-price {
  color: #e53e3e;
  font-weight: 700;
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.post-details {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #718096;
  font-size: 0.875rem;
}

.detail-item i {
  color: #a0aec0;
  width: 14px;
}

.post-description {
  color: #718096;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  flex: 1;
}

.post-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
}

.post-actions .btn {
  flex: 1;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.3s ease;
  border: none;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-edit {
  background: linear-gradient(135deg, #4299e1, #3182ce);
  color: white;
}

.btn-edit:hover {
  background: linear-gradient(135deg, #3182ce, #2c5aa0);
  transform: translateY(-1px);
}

.btn-delete {
  background: linear-gradient(135deg, #f56565, #e53e3e);
  color: white;
}

.btn-delete:hover {
  background: linear-gradient(135deg, #e53e3e, #c53030);
  transform: translateY(-1px);
}

.btn-view {
  background: linear-gradient(135deg, #48bb78, #38a169);
  color: white;
}

.btn-view:hover {
  background: linear-gradient(135deg, #38a169, #2f855a);
  transform: translateY(-1px);
  color: white;
  text-decoration: none;
}

/* ==== EMPTY STATE ==== */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.empty-illustration {
  font-size: 4rem;
  color: #cbd5e0;
  margin-bottom: 1.5rem;
}

.empty-state h4 {
  color: #4a5568;
  margin-bottom: 0.5rem;
}

/* ==== PAGINATION ==== */
.pagination-wrapper {
  display: flex;
  justify-content: between;
  align-items: center;
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-top: 2rem;
}

.pagination-info {
  color: #718096;
  font-size: 0.875rem;
  font-weight: 500;
}

.pagination-modern {
  margin: 0;
  gap: 0.5rem;
}

.pagination-modern .page-item .page-link {
  border: none;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  color: #4a5568;
  font-weight: 500;
  transition: all 0.3s ease;
  background: #f7fafc;
}

.pagination-modern .page-item.active .page-link {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.pagination-modern .page-item:not(.disabled) .page-link:hover {
  background: #e2e8f0;
  transform: translateY(-1px);
}

.pagination-modern .page-item.disabled .page-link {
  color: #cbd5e0;
  background: #f7fafc;
}

/* ==== MODAL STYLES ==== */
.modern-modal {
  border: none;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.modern-modal-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1.5rem 2rem;
}

.modern-modal-header .modal-title {
  font-weight: 600;
  font-size: 1.25rem;
}

.modern-modal-header .btn-close {
  filter: invert(1);
  opacity: 0.8;
}

.modal-body {
  padding: 2rem;
  background: #fafafa;
}

.section-title {
  color: #4a5568;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
}

.modern-input,
.modern-select,
.modern-textarea {
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.modern-input:focus,
.modern-select:focus,
.modern-textarea:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  outline: none;
}

.modern-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-label {
  color: #4a5568;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

/* ==== IMAGE UPLOAD ==== */
.image-upload-section {
  border: 2px dashed #cbd5e0;
  border-radius: 12px;
  padding: 1.5rem;
  background: #f7fafc;
  transition: all 0.3s ease;
}

.image-upload-section:hover {
  border-color: #667eea;
  background: #edf2f7;
}

.images-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.image-item {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-image-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(239, 68, 68, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.remove-image-btn:hover {
  background: #e53e3e;
  transform: scale(1.1);
}

/* ==== MODAL ACTIONS ==== */
.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.btn-save {
  background: linear-gradient(135deg, #48bb78, #38a169);
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-save:hover {
  background: linear-gradient(135deg, #38a169, #2f855a);
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(72, 187, 120, 0.3);
}

/* ==== DELETE MODAL ==== */
.custom-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  backdrop-filter: blur(5px);
}

.modern-delete-modal {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 450px;
  text-align: center;
  animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.delete-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #fed7d7, #feb2b2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.delete-icon i {
  font-size: 2rem;
  color: #e53e3e;
}

.delete-title {
  color: #2d3748;
  font-weight: 600;
  margin-bottom: 1rem;
}

.delete-message {
  color: #718096;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.delete-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.delete-actions .btn {
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.delete-actions .btn-outline-secondary {
  border-color: #e2e8f0;
  color: #4a5568;
}

.delete-actions .btn-outline-secondary:hover {
  background: #f7fafc;
  border-color: #cbd5e0;
}

.delete-actions .btn-danger {
  background: linear-gradient(135deg, #f56565, #e53e3e);
  border: none;
}

.delete-actions .btn-danger:hover {
  background: linear-gradient(135deg, #e53e3e, #c53030);
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(245, 101, 101, 0.3);
}

/* ==== TOAST ==== */
.modern-toast {
  border: none;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
}

.modern-toast .toast-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.95);
}

.modern-toast .toast-body {
  background: rgba(255, 255, 255, 0.95);
  font-weight: 500;
}

/* ==== RESPONSIVE DESIGN ==== */
@media (max-width: 768px) {
  .container-fluid {
    padding: 1rem 0.5rem;
  }

  .header-section {
    padding: 1.5rem;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .stat-card {
    min-width: 100px;
    padding: 1rem;
  }

  .filter-section {
    padding: 1rem;
  }

  .post-actions {
    flex-direction: column;
  }

  .post-actions .btn {
    flex: none;
  }

  .pagination-wrapper {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .modal-actions {
    flex-direction: column;
  }

  .delete-actions {
    flex-direction: column;
  }
}

@media (max-width: 576px) {
  .post-image-container {
    height: 160px;
  }

  .post-content {
    padding: 1rem;
  }

  .modern-delete-modal {
    margin: 1rem;
    width: calc(100% - 2rem);
  }
}

/* ==== ANIMATION UTILITIES ==== */
.fade-in {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-up {
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* ==== LOADING STATES ==== */
.loading-shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* ==== SCROLLBAR STYLING ==== */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #5a6fd8, #6a42a0);
}
</style>
