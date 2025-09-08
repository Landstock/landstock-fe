<template>
  <div class="container">
    <div
      class="card shadow-lg mx-auto p-0"
      style="max-width: 600px; border-radius: 20px; overflow: hidden"
    >
      <!-- Header với gradient background -->
      <div
        class="bg-gradient-primary text-white text-center py-4"
        style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      >
        <h3 class="mb-2 fw-bold">👤 Thông tin cá nhân</h3>
        <p class="mb-0 opacity-75">
          Quản lý thông tin và cài đặt tài khoản của bạn
        </p>
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
        ></ejs-message>

        <!-- Avatar và thông tin chính -->
        <div class="text-center mb-4">
          <div class="position-relative d-inline-block">
            <img
              :src="user.avatar || defaultAvatar"
              alt="Avatar"
              class="rounded-circle shadow-lg border border-3 border-white"
              style="width: 120px; height: 120px; object-fit: cover"
            />
            <!-- Online status indicator -->
            <div
              class="position-absolute bg-success rounded-circle border border-3 border-white"
              style="width: 25px; height: 25px; bottom: 5px; right: 5px"
            ></div>
          </div>
          <h4 class="mt-3 mb-1 fw-bold text-dark">
            {{ user.username || "Chưa cập nhật" }}
          </h4>
          <p class="text-muted mb-0">
            <i class="fas fa-circle text-success" style="font-size: 8px"></i>
            Đang hoạt động
          </p>
        </div>

        <!-- Thông tin chi tiết -->
        <div class="row g-3">
          <!-- Họ và tên -->
          <div class="col-12">
            <div
              class="card border-0 bg-light h-100"
              style="border-radius: 15px"
            >
              <div class="card-body py-3">
                <div class="d-flex align-items-center">
                  <div class="icon-wrapper me-3">
                    <i
                      class="fas fa-user text-primary"
                      style="font-size: 20px; width: 24px"
                    ></i>
                  </div>
                  <div class="flex-grow-1">
                    <label class="text-muted small mb-1">Họ và tên</label>
                    <div class="fw-semibold text-dark">
                      {{ user.username || "Chưa cập nhật" }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Email -->
          <div class="col-12">
            <div
              class="card border-0 bg-light h-100"
              style="border-radius: 15px"
            >
              <div class="card-body py-3">
                <div class="d-flex align-items-center">
                  <div class="icon-wrapper me-3">
                    <i
                      class="fas fa-envelope text-primary"
                      style="font-size: 20px; width: 24px"
                    ></i>
                  </div>
                  <div class="flex-grow-1">
                    <label class="text-muted small mb-1">Email</label>
                    <div class="fw-semibold text-dark">
                      {{ user.email || "Chưa cập nhật" }}
                    </div>
                  </div>
                  <div class="ms-2">
                    <span class="badge bg-success-subtle text-success">
                      <i class="fas fa-check-circle me-1"></i>Đã xác thực
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Số điện thoại -->
          <div class="col-12">
            <div
              class="card border-0 bg-light h-100"
              style="border-radius: 15px"
            >
              <div class="card-body py-3">
                <div class="d-flex align-items-center">
                  <div class="icon-wrapper me-3">
                    <i
                      class="fas fa-phone text-primary"
                      style="font-size: 20px; width: 24px"
                    ></i>
                  </div>
                  <div class="flex-grow-1">
                    <label class="text-muted small mb-1">Số điện thoại</label>
                    <div class="fw-semibold text-dark">
                      {{ user.phonenumber || "Chưa cập nhật" }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="d-grid gap-2 mt-4">
          <router-link
            to="/sua-thong-tin-ca-nhan"
            class="btn btn-primary btn-lg"
            style="border-radius: 15px; padding: 12px 24px"
          >
            <i class="fas fa-edit me-2"></i>
            Chỉnh sửa thông tin
          </router-link>

          <div class="row g-2 mt-2">
            <div class="col-6">
              <button
                class="btn btn-outline-secondary w-100"
                style="border-radius: 15px"
              >
                <i class="fas fa-key me-2"></i>
                Đổi mật khẩu
              </button>
            </div>
            <div class="col-6">
              <button
                class="btn btn-outline-secondary w-100"
                style="border-radius: 15px"
              >
                <i class="fas fa-cog me-2"></i>
                Cài đặt
              </button>
            </div>
          </div>
        </div>

        <!-- Stats Section -->
        <div class="row g-3 mt-3">
          <div class="col-6">
            <div class="text-center p-3 bg-light rounded-3">
              <h5 class="text-primary mb-1">4</h5>
              <small class="text-muted">Tin đăng</small>
            </div>
          </div>
          <div class="col-6">
            <div class="text-center p-3 bg-light rounded-3">
              <h5 class="text-primary mb-1">10</h5>
              <small class="text-muted">Đang chờ duyệt</small>
            </div>
          </div>
        </div>
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
      user: {
        username: "",
        email: "",
        phonenumber: "",
        avatar: "",
      },
      showMessage: false,
      messageContent: "",
      messageSeverity: "Info", // "Success", "Error", "Warning", "Info"
      defaultAvatar:
        "https://via.placeholder.com/120x120/e9ecef/6c757d?text=👤", // Avatar mặc định
    };
  },
  async created() {
    try {
      const response = await axiosInstance.get("/user/me");
      this.user = response.data.data;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng", error);
      this.showFeedback("Không thể tải thông tin người dùng", "Error");
    }
  },
  methods: {
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

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(13, 110, 253, 0.1);
  border-radius: 10px;
}

.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
}

.btn {
  transition: all 0.3s ease;
  font-weight: 600;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.badge {
  font-size: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 10px;
}

.bg-success-subtle {
  background-color: rgba(25, 135, 84, 0.1) !important;
}

.text-success {
  color: #198754 !important;
}

/* Custom message styles */
.custom-message {
  margin-bottom: 15px;
  border-radius: 15px;
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

  .bg-gradient-primary {
    padding: 2rem 1rem !important;
  }
}
</style>
