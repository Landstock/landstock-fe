<template>
  <div class="container">
    <div class="d-flex justify-content-between">
      <h3>Danh sách {{ title }}</h3>

      <!-- Nút mở form thêm -->
      <!-- <div>
        <button class="btn btn-success" @click="openForm(null)">
          ➕ Thêm bài đăng
        </button>
      </div> -->
    </div>

    <!-- Modal Thêm/Sửa bài đăng -->
    <div
      class="modal fade"
      :class="{ show: showModal }"
      tabindex="-1"
      style="display: block"
      v-if="showModal"
    >
      <!-- Form -->
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content p-4">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ isEdit ? "✏️ Chỉnh sửa bài đăng" : "📝 Thêm mới" }}
            </h5>
            <button type="button" class="btn-close" @click="closeForm"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitPost">
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Tiêu đề *</label>
                    <input
                      v-model="newPost.title"
                      class="form-control"
                      required
                      placeholder="Nhập tiêu đề bài đăng"
                    />
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="mb-3">
                    <label class="form-label">Giá *</label>
                    <input
                      v-model="newPost.price"
                      class="form-control"
                      required
                      placeholder="VD: 2.5 tỷ"
                    />
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="mb-3">
                    <label class="form-label">Diện tích *</label>
                    <input
                      v-model="newPost.area"
                      class="form-control"
                      required
                      placeholder="VD: 80m²"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-3">
                  <div class="mb-3">
                    <label class="form-label">Tỉnh/Thành phố *</label>
                    <input
                      v-model="newPost.provinceName"
                      class="form-control"
                      required
                      placeholder="VD: Hà Nội"
                    />
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="mb-3">
                    <label class="form-label">Quận/Huyện *</label>
                    <input
                      v-model="newPost.districtName"
                      class="form-control"
                      required
                      placeholder="VD: Cầu Giấy"
                    />
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="mb-3">
                    <label class="form-label">Phường/Xã *</label>
                    <input
                      v-model="newPost.wardName"
                      class="form-control"
                      required
                      placeholder="VD: Dịch Vọng"
                    />
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="mb-3">
                    <label class="form-label">Đường</label>
                    <input
                      v-model="newPost.street"
                      class="form-control"
                      placeholder="VD: Xuân Thủy"
                    />
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Mô tả *</label>
                <textarea
                  v-model="newPost.description"
                  class="form-control"
                  rows="4"
                  required
                  placeholder="Mô tả chi tiết về bất động sản..."
                ></textarea>
              </div>

              <!-- Upload ảnh -->
              <div class="mb-3">
                <label class="form-label">Hình ảnh (tối thiểu 3 hình)</label>
                <div class="image-upload-section">
                  <input
                    type="file"
                    multiple
                    @change="handleImageUpload"
                    class="form-control"
                    accept="image/*"
                    :disabled="isUploading"
                  />
                  <small class="form-text text-muted">
                    Chỉ chấp nhận file ảnh (JPG, PNG, WEBP). Tối đa 10 ảnh.
                    {{ isUploading ? "Đang upload..." : "" }}
                  </small>

                  <!-- Loading indicator -->
                  <div v-if="isUploading" class="text-center mt-2">
                    <div
                      class="spinner-border spinner-border-sm text-primary"
                      role="status"
                    >
                      <span class="visually-hidden">Đang upload...</span>
                    </div>
                    <span class="ms-2 text-muted">Đang upload ảnh...</span>
                  </div>

                  <!-- Images preview -->
                  <div
                    class="images-preview mt-3"
                    v-if="imagePreviews.length > 0"
                  >
                    <div
                      v-for="(img, idx) in imagePreviews"
                      :key="idx"
                      class="image-item"
                    >
                      <img
                        :src="img"
                        class="preview-image"
                        :alt="`Ảnh ${idx + 1}`"
                      />
                      <button
                        type="button"
                        class="remove-image-btn"
                        @click="removeImage(idx)"
                        :disabled="isUploading"
                        title="Xóa ảnh"
                      >
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="closeForm"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="isSubmitting || isUploading"
                >
                  <span
                    v-if="isSubmitting"
                    class="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  {{ isEdit ? "Cập nhật" : "Thêm mới" }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- Overlay -->
      <div class="modal-backdrop fade show" @click="closeForm"></div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-4">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Đang tải...</span>
      </div>
    </div>

    <!-- Table -->
    <div v-else>
      <table class="table table-bordered table-hover">
        <thead class="table-light">
          <tr>
            <th style="width: 50px">#</th>
            <th style="width: 200px">Tiêu đề</th>
            <th style="width: 120px">Giá</th>
            <th style="width: 100px">Diện tích</th>
            <th style="width: 150px">Địa chỉ</th>
            <th>Mô tả</th>
            <th style="width: 100px">Ảnh</th>
            <th style="width: 100px">Ngày đăng</th>
            <th style="width: 150px">Hành động</th>
          </tr>
        </thead>
        <tbody v-if="posts && posts.length">
          <tr v-for="(post, index) in posts" :key="post.id">
            <td>{{ (currentPage - 1) * limit + index + 1 }}</td>
            <td>
              <div class="fw-bold">{{ post.title }}</div>
              <small class="text-muted">{{ post.category }}</small>
            </td>
            <td class="fw-bold text-success">{{ post.price }}</td>
            <td>{{ post.area }}</td>
            <td>
              <div>{{ post.wardName }}, {{ post.districtName }}</div>
              <small class="text-muted">{{ post.provinceName }}</small>
            </td>
            <td>
              <div class="description-cell" :title="post.description">
                {{ truncateText(post.description, 80) }}
              </div>
            </td>
            <td>
              <div
                v-if="post.imageUrls && post.imageUrls.length > 0"
                class="images-thumbnail"
              >
                <img
                  :src="post.imageUrls[0]"
                  class="img-thumbnail"
                  style="width: 60px; height: 60px; object-fit: cover"
                  :alt="post.title"
                />
                <small class="text-muted d-block"
                  >{{ post.imageUrls.length }} ảnh</small
                >
              </div>
              <span v-else class="text-muted">Chưa có ảnh</span>
            </td>
            <td>
              <small>{{ post.createdAt }}</small>
            </td>
            <td>
              <div class="d-flex gap-1">
                <button
                  class="btn btn-warning btn-sm"
                  @click="editPost(post)"
                  title="Sửa bài đăng"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  class="btn btn-danger btn-sm"
                  @click="deletePost(post.id)"
                  title="Xóa bài đăng"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="9" class="text-center py-4">
              <i class="fas fa-inbox fa-2x text-muted mb-2"></i>
              <div>Không có bài đăng nào</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <nav v-if="totalPages > 1" aria-label="Page navigation" class="mt-4">
      <ul class="pagination justify-content-center">
        <li
          class="page-item"
          :class="{ disabled: currentPage === 1 }"
          v-if="currentPage > 1"
        >
          <a
            class="page-link"
            href="#"
            @click.prevent="goToPage(currentPage - 1)"
          >
            <i class="fas fa-chevron-left"></i>
          </a>
        </li>

        <li
          v-for="page in getVisiblePages()"
          :key="page"
          class="page-item"
          :class="{ active: currentPage === page }"
        >
          <a class="page-link" href="#" @click.prevent="goToPage(page)">
            {{ page }}
          </a>
        </li>

        <li
          class="page-item"
          :class="{ disabled: currentPage === totalPages }"
          v-if="currentPage < totalPages"
        >
          <a
            class="page-link"
            href="#"
            @click.prevent="goToPage(currentPage + 1)"
          >
            <i class="fas fa-chevron-right"></i>
          </a>
        </li>
      </ul>
    </nav>

    <!-- Toast notifications -->
    <div class="toast-container position-fixed top-0 end-0 p-3">
      <div
        class="toast"
        :class="{ show: showToast }"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="toast-header">
          <i class="fas" :class="toastIcon" :style="{ color: toastColor }"></i>
          <strong class="me-auto ms-2">Thông báo</strong>
          <button type="button" class="btn-close" @click="hideToast"></button>
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

export default {
  props: ["id"],
  data() {
    return {
      title: "Bài đăng",
      newPost: {
        id: null,
        title: "",
        price: "",
        area: "",
        description: "",
        provinceCode: "",
        provinceName: "",
        districtCode: "",
        districtName: "",
        wardCode: "",
        wardName: "",
        street: "",
        project: "",
        categoryId: this.id,
        imageUrls: [], // Chứa URLs của ảnh đã upload
      },
      imagePreviews: [], // URLs để hiển thị preview
      currentPage: 1,
      limit: 20,
      isEdit: false,
      showModal: false,
      isSubmitting: false,
      isLoading: false,
      isUploading: false,
      // Toast notification
      showToast: false,
      toastMessage: "",
      toastIcon: "fa-info-circle",
      toastColor: "#17a2b8",
    };
  },

  computed: {
    posts() {
      return this.$store.getters["adminPost/adminPosts"] || [];
    },
    totalPages() {
      const total = this.$store.state.adminPost.total || 0;
      const pages = Math.ceil(total / this.limit);
      return pages;
    },
  },

  methods: {
    openForm(post) {
      this.showModal = true;
      if (post) {
        this.editPost(post);
      } else {
        this.resetForm();
      }
    },

    closeForm() {
      this.showModal = false;
      this.resetForm();
    },

    async handleImageUpload(event) {
      const files = Array.from(event.target.files);

      if (files.length === 0) return;

      // Giới hạn số lượng ảnh
      if (this.imagePreviews.length + files.length > 10) {
        this.showToastMessage("Chỉ được upload tối đa 10 ảnh", "warning");
        return;
      }

      // Kiểm tra định dạng file
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      const invalidFiles = files.filter(
        (file) => !validTypes.includes(file.type)
      );

      if (invalidFiles.length > 0) {
        this.showToastMessage("Chỉ chấp nhận file JPG, PNG, WEBP", "error");
        return;
      }

      // Kiểm tra kích thước file (tối đa 5MB mỗi file)
      const maxSize = 5 * 1024 * 1024; // 5MB
      const oversizedFiles = files.filter((file) => file.size > maxSize);

      if (oversizedFiles.length > 0) {
        this.showToastMessage("Mỗi ảnh không được vượt quá 5MB", "error");
        return;
      }

      this.isUploading = true;
      let uploadedCount = 0;

      try {
        for (const file of files) {
          const formData = new FormData();
          formData.append("file", file);

          try {
            const response = await axiosInstance.post("/s3/upload", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });

            const imageUrl = response.data.data;
            this.imagePreviews.push(imageUrl);
            this.newPost.imageUrls.push(imageUrl);
            uploadedCount++;
          } catch (error) {
            console.error("Lỗi upload ảnh:", error);
            this.showToastMessage(`Không thể upload ảnh ${file.name}`, "error");
          }
        }

        if (uploadedCount > 0) {
          this.showToastMessage(
            `Đã upload ${uploadedCount} ảnh thành công`,
            "success"
          );
        }
      } finally {
        this.isUploading = false;
        // Reset input file
        event.target.value = "";
      }
    },

    async removeImage(index) {
      if (this.isUploading) return;

      if (!confirm("Bạn có muốn xóa ảnh này?")) return;

      try {
        const imageUrl = this.imagePreviews[index];

        // Nếu là URL từ S3, thực hiện xóa trên server
        if (imageUrl && imageUrl.includes("amazonaws.com")) {
          const imageKey = imageUrl.split("/").pop();

          await axiosInstance.delete(`/s3/delete/${imageKey}`, {
            data: { imageUrl },
          });
        }

        // Xóa khỏi arrays
        this.imagePreviews.splice(index, 1);
        this.newPost.imageUrls.splice(index, 1);

        this.showToastMessage("Ảnh đã được xóa thành công", "success");
      } catch (error) {
        console.error("Lỗi xóa ảnh:", error);
        this.showToastMessage("Không thể xóa ảnh từ server", "error");
      }
    },

    async submitPost() {
      this.isSubmitting = true;
      try {
        // Validate basic fields
        if (
          !this.newPost.title ||
          !this.newPost.price ||
          !this.newPost.area ||
          !this.newPost.description
        ) {
          this.showToastMessage(
            "Vui lòng điền đầy đủ thông tin bắt buộc",
            "warning"
          );
          return;
        }

        if (this.isEdit) {
          // Khi edit: gửi JSON với imageUrls
          const updateData = {
            title: this.newPost.title,
            price: this.newPost.price,
            area: this.newPost.area,
            description: this.newPost.description,
            provinceCode: this.newPost.provinceCode,
            provinceName: this.newPost.provinceName,
            districtCode: this.newPost.districtCode,
            districtName: this.newPost.districtName,
            wardCode: this.newPost.wardCode,
            wardName: this.newPost.wardName,
            street: this.newPost.street,
            project: this.newPost.project,
            imageUrls: this.newPost.imageUrls, // Array các URL đã upload
          };

          await this.$store.dispatch("adminPost/updateAdPost", {
            id: this.newPost.id,
            updateData: updateData,
          });

          this.showToastMessage("Cập nhật bài đăng thành công!", "success");
        } else {
          // Khi thêm mới: kiểm tra có ít nhất 3 ảnh
          if (this.newPost.imageUrls.length < 3) {
            this.showToastMessage("Vui lòng upload ít nhất 3 ảnh", "warning");
            return;
          }

          // Gửi JSON với imageUrls
          const postData = {
            title: this.newPost.title,
            price: this.newPost.price,
            area: this.newPost.area,
            description: this.newPost.description,
            provinceCode: this.newPost.provinceCode,
            provinceName: this.newPost.provinceName,
            districtCode: this.newPost.districtCode,
            districtName: this.newPost.districtName,
            wardCode: this.newPost.wardCode,
            wardName: this.newPost.wardName,
            street: this.newPost.street,
            project: this.newPost.project,
            categoryId: this.id,
            imageUrls: this.newPost.imageUrls, // Array các URL đã upload
          };

          await this.$store.dispatch("adminPost/addPost", postData);
          this.showToastMessage("Thêm bài đăng mới thành công!", "success");
        }

        this.closeForm();
        await this.loadPosts();
      } catch (error) {
        console.error("Error submitting post:", error);
        this.showToastMessage(
          error.message || "Có lỗi xảy ra khi lưu bài đăng",
          "error"
        );
      } finally {
        this.isSubmitting = false;
      }
    },

    editPost(post) {
      this.isEdit = true;
      this.newPost = {
        id: post.id,
        title: post.title,
        price: post.price,
        area: post.area,
        description: post.description,
        provinceCode: post.provinceCode || "",
        provinceName: post.provinceName || "",
        districtCode: post.districtCode || "",
        districtName: post.districtName || "",
        wardCode: post.wardCode || "",
        wardName: post.wardName || "",
        street: post.street || "",
        project: post.project || "",
        categoryId: this.id,
        imageUrls: post.imageUrls ? [...post.imageUrls] : [],
      };
      this.imagePreviews = post.imageUrls ? [...post.imageUrls] : [];
      this.showModal = true;
    },

    async deletePost(id) {
      if (!confirm("Bạn có chắc chắn muốn xóa bài đăng này?")) return;

      try {
        await this.$store.dispatch("adminPost/deletePost", id);
        await this.loadPosts();
        this.showToastMessage("Đã xóa bài đăng thành công!", "success");
      } catch (error) {
        console.error("Error deleting post:", error);
        this.showToastMessage("Không thể xóa bài đăng", "error");
      }
    },

    resetForm() {
      this.newPost = {
        id: null,
        title: "",
        price: "",
        area: "",
        description: "",
        provinceCode: "",
        provinceName: "",
        districtCode: "",
        districtName: "",
        wardCode: "",
        wardName: "",
        street: "",
        project: "",
        categoryId: this.id,
        imageUrls: [],
      };
      this.imagePreviews = [];
      this.isEdit = false;
    },

    async loadPosts() {
      if (this.id) {
        this.isLoading = true;
        try {
          await this.$store.dispatch("adminPost/getAdPost", {
            categoryId: this.id,
            page: this.currentPage,
            limit: this.limit,
          });
        } catch (error) {
          console.error("Error loading posts:", error);
          this.showToastMessage("Không thể tải danh sách bài đăng", "error");
        } finally {
          this.isLoading = false;
        }
      }
    },

    async goToPage(page) {
      if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
        this.currentPage = page;
        await this.loadPosts();
      }
    },

    getVisiblePages() {
      const start = Math.max(1, this.currentPage - 2);
      const end = Math.min(this.totalPages, this.currentPage + 2);
      const pages = [];
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    },

    truncateText(text, maxLength) {
      if (!text) return "";
      return text.length > maxLength
        ? text.substring(0, maxLength) + "..."
        : text;
    },

    // Toast notification methods
    showToastMessage(message, type = "info") {
      this.toastMessage = message;

      switch (type) {
        case "success":
          this.toastIcon = "fa-check-circle";
          this.toastColor = "#28a745";
          break;
        case "error":
          this.toastIcon = "fa-times-circle";
          this.toastColor = "#dc3545";
          break;
        case "warning":
          this.toastIcon = "fa-exclamation-triangle";
          this.toastColor = "#ffc107";
          break;
        default:
          this.toastIcon = "fa-info-circle";
          this.toastColor = "#17a2b8";
      }

      this.showToast = true;

      // Auto hide after 3 seconds
      setTimeout(() => {
        this.hideToast();
      }, 3000);
    },

    hideToast() {
      this.showToast = false;
    },
  },

  watch: {
    id: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.loadPosts();
        }
      },
    },
  },

  mounted() {
    // Load initial data if id is available
    if (this.id) {
      this.loadPosts();
    }
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

/* Modal styles */
.modal-dialog {
  margin: 1.75rem auto;
}

.modal-content {
  z-index: 1050;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: none;
}

.modal-header {
  border-bottom: 1px solid #e9ecef;
  padding: 1.5rem;
}

.modal-body {
  padding: 1.5rem;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}

/* Form styles */
.form-label {
  font-weight: 600;
  color: #495057;
  margin-bottom: 0.5rem;
}

.form-control {
  border: 1px solid #ced4da;
  border-radius: 6px;
  padding: 0.75rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control:focus {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

/* Image upload section */
.image-upload-section {
  border: 2px dashed #ced4da;
  border-radius: 8px;
  padding: 1.5rem;
  background-color: #f8f9fa;
  transition: all 0.3s ease;
}

.image-upload-section:hover {
  border-color: #007bff;
  background-color: #e3f2fd;
}

.images-preview {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.image-item {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.image-item:hover {
  transform: scale(1.02);
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
  background: rgba(220, 53, 69, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.remove-image-btn:hover:not(:disabled) {
  background: #dc3545;
  transform: scale(1.1);
}

.remove-image-btn:disabled {
  background: rgba(108, 117, 125, 0.6);
  cursor: not-allowed;
}

/* Table styles */
.table {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #495057;
  border-bottom: 2px solid #dee2e6;
}

.table td {
  vertical-align: middle;
  padding: 1rem 0.75rem;
}

.table-hover tbody tr:hover {
  background-color: #f5f5f5;
}

.description-cell {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.images-thumbnail {
  text-align: center;
}

/* Button styles */
.btn {
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-success:hover {
  background-color: #218838;
  border-color: #1e7e34;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}

.btn-warning {
  background-color: #ffc107;
  border-color: #ffc107;
  color: #212529;
}

.btn-warning:hover {
  background-color: #e0a800;
  border-color: #d39e00;
  color: #212529;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
  border-color: #bd2130;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #5a6268;
  border-color: #545b62;
}

.btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

/* Pagination styles */
.pagination {
  margin-bottom: 0;
}

.page-item .page-link {
  color: #007bff;
  background-color: #fff;
  border: 1px solid #dee2e6;
  padding: 0.5rem 0.75rem;
  margin-left: -1px;
  line-height: 1.25;
  border-radius: 0;
  transition: all 0.2s ease;
}

.page-item:first-child .page-link {
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}

.page-item:last-child .page-link {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}

.page-item.active .page-link {
  z-index: 3;
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

.page-item:not(.disabled) .page-link:hover {
  z-index: 2;
  color: #0056b3;
  text-decoration: none;
  background-color: #e9ecef;
  border-color: #dee2e6;
}

.page-item.disabled .page-link {
  color: #6c757d;
  pointer-events: none;
  cursor: auto;
  background-color: #fff;
  border-color: #dee2e6;
}

/* Loading spinner */
.spinner-border {
  width: 2rem;
  height: 2rem;
  border: 0.25em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spinner-border 0.75s linear infinite;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
  border-width: 0.125em;
}

@keyframes spinner-border {
  to {
    transform: rotate(360deg);
  }
}

/* Toast notification styles */
.toast-container {
  z-index: 1060;
}

.toast {
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-width: 350px;
  transition: all 0.3s ease;
  transform: translateX(100%);
  opacity: 0;
}

.toast.show {
  transform: translateX(0);
  opacity: 1;
}

.toast-header {
  background-color: transparent;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding: 0.75rem;
}

.toast-body {
  padding: 0.75rem;
  font-weight: 500;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.5;
  cursor: pointer;
}

.btn-close:hover {
  opacity: 0.75;
}

/* Utility classes */
.fw-bold {
  font-weight: 700;
}

.text-success {
  color: #28a745;
}

.text-muted {
  color: #6c757d;
}

.d-block {
  display: block;
}

.d-flex {
  display: flex;
}

.gap-1 {
  gap: 0.25rem;
}

.gap-2 {
  gap: 0.5rem;
}

.justify-content-center {
  justify-content: center;
}

.justify-content-end {
  justify-content: flex-end;
}

.align-items-center {
  align-items: center;
}

.text-center {
  text-align: center;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mb-3 {
  margin-bottom: 1rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.mt-3 {
  margin-top: 1rem;
}

.mt-4 {
  margin-top: 1.5rem;
}

.ms-2 {
  margin-left: 0.5rem;
}

.me-2 {
  margin-right: 0.5rem;
}

.py-4 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.p-3 {
  padding: 1rem;
}

/* Responsive design */
@media (max-width: 768px) {
  .container {
    padding: 1rem 0.5rem;
  }

  .modal-dialog {
    margin: 1rem;
    width: auto;
  }

  .modal-xl {
    max-width: none;
  }

  .table-responsive {
    border: none;
  }

  .d-flex.gap-1 {
    flex-direction: column;
    gap: 0.25rem;
  }

  .btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
  }

  .images-preview {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }

  .image-item {
    width: 100px;
    height: 100px;
  }
}

@media (max-width: 576px) {
  .col-md-3,
  .col-md-6 {
    margin-bottom: 1rem;
  }

  .pagination {
    justify-content: center;
    flex-wrap: wrap;
  }

  .page-item {
    margin: 0.125rem;
  }
}

/* Animation for smooth transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Focus styles for accessibility */
.btn:focus,
.form-control:focus {
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.btn-close:focus {
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  outline: none;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
