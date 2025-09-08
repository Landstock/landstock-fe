<template>
  <div class="container">
    <div
      class="card shadow-lg mx-auto p-0"
      style="max-width: 700px; border-radius: 20px; overflow: hidden"
    >
      <!-- Header với gradient background -->
      <div
        class="bg-gradient-primary text-white text-center py-4"
        style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      >
        <div class="d-flex align-items-center justify-content-between px-4">
          <router-link
            to="/thong-tin-ca-nhan"
            class="btn btn-outline-light btn-sm"
            style="border-radius: 10px"
          >
            <i class="fas fa-arrow-left me-2"></i>Quay lại
          </router-link>
          <div>
            <h3 class="mb-1 fw-bold">✏️ Chỉnh sửa thông tin</h3>
            <p class="mb-0 opacity-75">Cập nhật thông tin cá nhân của bạn</p>
          </div>
          <div style="width: 80px"></div>
          <!-- Spacer for centering -->
        </div>
      </div>

      <div class="p-4">
        <!-- THÔNG BÁO -->
        <ejs-message
          v-if="showMessage"
          :content="messageContent"
          :severity="messageSeverity"
          :cssClass="'custom-message'"
          :visible="true"
          showCloseIcon
          @close="showMessage = false"
        ></ejs-message>

        <form @submit.prevent="submitUpdate">
          <!-- Avatar Section -->
          <div class="text-center mb-4">
            <div class="position-relative d-inline-block">
              <img
                :src="formData.avatar || defaultAvatar"
                alt="Avatar"
                class="rounded-circle shadow-lg border border-3 border-primary"
                style="width: 120px; height: 120px; object-fit: cover"
              />

              <!-- Upload overlay -->
              <div
                class="position-absolute top-50 start-50 translate-middle w-100 h-100 rounded-circle bg-dark bg-opacity-50 d-flex align-items-center justify-content-center opacity-0 upload-overlay"
                style="cursor: pointer"
              >
                <i class="fas fa-camera text-white fa-lg"></i>
              </div>
            </div>

            <div class="mt-3">
              <label class="form-label fw-semibold text-primary mb-3">
                <i class="fas fa-image me-2"></i>Ảnh đại diện
              </label>

              <!-- URL Input -->
              <div class="mb-3">
                <div
                  class="input-group"
                  style="border-radius: 15px; overflow: hidden"
                >
                  <span class="input-group-text bg-light border-0">
                    <i class="fas fa-link text-muted"></i>
                  </span>
                  <input
                    type="text"
                    v-model="formData.avatar"
                    class="form-control border-0 bg-light"
                    placeholder="Dán đường dẫn ảnh (URL)"
                  />
                </div>
              </div>

              <!-- File Upload -->
              <div class="mb-3">
                <label
                  class="btn btn-outline-primary w-100"
                  style="border-radius: 15px; padding: 12px"
                >
                  <i class="fas fa-upload me-2"></i>
                  {{ uploadText }}
                  <input
                    type="file"
                    accept="image/*"
                    class="d-none"
                    @change="handleAvatarUpload"
                  />
                </label>
              </div>
            </div>
          </div>

          <!-- Form Fields -->
          <div class="row g-4">
            <!-- Họ và tên -->
            <div class="col-12">
              <div class="form-floating">
                <input
                  type="text"
                  id="username"
                  v-model="formData.username"
                  class="form-control border-0 bg-light"
                  style="border-radius: 15px; height: 60px"
                  placeholder="Nhập họ và tên"
                  required
                />
                <label for="username" class="text-muted">
                  <i class="fas fa-user me-2"></i>Họ và tên *
                </label>
              </div>
            </div>

            <!-- Email -->
            <div class="col-12">
              <div class="form-floating">
                <input
                  type="email"
                  id="email"
                  v-model="formData.email"
                  class="form-control border-0 bg-light"
                  style="border-radius: 15px; height: 60px"
                  placeholder="Nhập email"
                  required
                />
                <label for="email" class="text-muted">
                  <i class="fas fa-envelope me-2"></i>Email *
                </label>
              </div>
            </div>

            <!-- Số điện thoại -->
            <div class="col-12">
              <div class="form-floating">
                <input
                  type="tel"
                  id="phonenumber"
                  v-model="formData.phonenumber"
                  class="form-control border-0 bg-light"
                  style="border-radius: 15px; height: 60px"
                  placeholder="Nhập số điện thoại"
                />
                <label for="phonenumber" class="text-muted">
                  <i class="fas fa-phone me-2"></i>Số điện thoại
                </label>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="d-grid gap-3 mt-5">
            <button
              type="submit"
              class="btn btn-primary btn-lg"
              style="border-radius: 15px; padding: 15px 24px"
              :disabled="isLoading"
            >
              <div
                v-if="isLoading"
                class="spinner-border spinner-border-sm me-2"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
              <i v-else class="fas fa-save me-2"></i>
              {{ isLoading ? "Đang lưu..." : "Lưu thay đổi" }}
            </button>

            <div class="row g-2">
              <div class="col-6">
                <router-link
                  to="/thong-tin"
                  class="btn btn-outline-secondary w-100"
                  style="border-radius: 15px; padding: 12px"
                >
                  <i class="fas fa-times me-2"></i>
                  Hủy bỏ
                </router-link>
              </div>
              <div class="col-6">
                <button
                  type="button"
                  class="btn btn-outline-danger w-100"
                  style="border-radius: 15px; padding: 12px"
                  @click="resetForm"
                >
                  <i class="fas fa-undo me-2"></i>
                  Đặt lại
                </button>
              </div>
            </div>
          </div>

          <!-- Security Notice -->
          <div
            class="alert alert-light border-0 mt-4"
            style="
              border-radius: 15px;
              background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            "
          >
            <div class="d-flex align-items-center">
              <i class="fas fa-shield-alt text-success me-3 fa-lg"></i>
              <div>
                <h6 class="alert-heading mb-1">Bảo mật thông tin</h6>
                <p class="mb-0 small text-muted">
                  Thông tin của bạn được mã hóa và bảo vệ an toàn. Chúng tôi
                  không chia sẻ dữ liệu cá nhân với bên thứ ba.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from "@/services/AxiosServices";
import { MessageComponent } from "@syncfusion/ej2-vue-notifications";

export default {
  components: {
    "ejs-message": MessageComponent,
  },
  data() {
    return {
      formData: {
        username: "",
        email: "",
        phonenumber: "",
        avatar: "",
      },
      originalData: {}, // Để lưu dữ liệu gốc
      showMessage: false,
      messageContent: "",
      messageSeverity: "Info",
      isLoading: false,
      uploadText: "Chọn ảnh từ máy tính",
      defaultAvatar:
        "https://via.placeholder.com/120x120/e9ecef/6c757d?text=👤", // Avatar mặc định
    };
  },

  async created() {
    await this.loadUserData();
  },

  methods: {
    async loadUserData() {
      try {
        const response = await axiosInstance.get("/user/me");
        const user = response.data.data;
        this.formData = {
          username: user.username || "",
          email: user.email || "",
          phonenumber: user.phonenumber || "",
          avatar: user.avatar || "",
        };
        // Lưu dữ liệu gốc để có thể reset
        this.originalData = { ...this.formData };
      } catch (error) {
        console.error("Lỗi khi tải thông tin:", error);
        this.showFeedback("Không thể tải thông tin người dùng", "Error");
      }
    },

    async handleAvatarUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.showFeedback(
          "Kích thước ảnh quá lớn. Vui lòng chọn ảnh nhỏ hơn 5MB",
          "Warning"
        );
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        this.showFeedback("Vui lòng chọn file ảnh hợp lệ", "Warning");
        return;
      }

      this.uploadText = "Đang tải lên...";
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axiosInstance.post("/s3/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const imageUrl = response?.data?.data;
        if (imageUrl) {
          this.formData.avatar = imageUrl;
          this.showFeedback("Tải ảnh thành công!", "Success");
        } else {
          this.showFeedback("Tải ảnh không thành công", "Warning");
        }
      } catch (err) {
        console.error("Lỗi khi upload avatar:", err);
        this.showFeedback("Không thể tải ảnh lên. Vui lòng thử lại.", "Error");
      } finally {
        this.uploadText = "Chọn ảnh từ máy tính";
        // Reset input file
        event.target.value = "";
      }
    },

    async submitUpdate() {
      // Validate form
      if (!this.formData.username.trim()) {
        this.showFeedback("Vui lòng nhập họ và tên", "Warning");
        return;
      }

      if (!this.formData.email.trim()) {
        this.showFeedback("Vui lòng nhập email", "Warning");
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.formData.email)) {
        this.showFeedback("Email không hợp lệ", "Warning");
        return;
      }

      // Validate phone number (if provided)
      if (
        this.formData.phonenumber &&
        !/^[0-9]{10,11}$/.test(this.formData.phonenumber)
      ) {
        this.showFeedback("Số điện thoại không hợp lệ", "Warning");
        return;
      }

      this.isLoading = true;

      try {
        await this.$store.dispatch("user/updateUser", this.formData);
        this.showFeedback("Cập nhật thông tin thành công!", "Success");

        // Cập nhật originalData
        this.originalData = { ...this.formData };

        // Chuyển về trang thông tin sau 1.5 giây
        setTimeout(() => {
          this.$router.push("/thong-tin-ca-nhan");
        }, 1500);
      } catch (error) {
        console.error("Lỗi khi cập nhật:", error);
        const errorMessage =
          error.response?.data?.message || error.message || "Cập nhật thất bại";
        this.showFeedback(errorMessage, "Error");
      } finally {
        this.isLoading = false;
      }
    },

    resetForm() {
      this.formData = { ...this.originalData };
      this.showFeedback("Đã khôi phục thông tin ban đầu", "Info");
    },

    showFeedback(message, severity) {
      this.messageContent = message;
      this.messageSeverity = severity;
      this.showMessage = true;

      // Tự động ẩn sau 5 giây
      setTimeout(() => {
        this.showMessage = false;
      }, 5000);
    },
  },
};
</script>

<style scoped>
.bg-gradient-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
}

.form-floating > .form-control {
  height: 60px;
  padding-top: 1.625rem;
  padding-bottom: 0.625rem;
}

.form-floating > label {
  padding: 1rem 1rem;
  font-weight: 500;
}

.form-control:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 0.25rem rgba(102, 126, 234, 0.25);
}

.btn {
  transition: all 0.3s ease;
  font-weight: 600;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn:disabled {
  transform: none;
}

.upload-overlay {
  transition: opacity 0.3s ease;
}

.position-relative:hover .upload-overlay {
  opacity: 1 !important;
}

.alert {
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.custom-message {
  margin-bottom: 15px;
  border-radius: 15px;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}

/* Responsive improvements */
@media (max-width: 576px) {
  .container {
    padding: 0 15px;
  }

  .card {
    margin: 15px 0;
    border-radius: 15px !important;
  }

  .bg-gradient-primary .d-flex {
    flex-direction: column;
    text-align: center;
  }

  .bg-gradient-primary .btn {
    margin-bottom: 1rem;
  }
}

/* Animation for loading state */
@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.btn:disabled {
  animation: pulse 2s infinite;
}
</style>
