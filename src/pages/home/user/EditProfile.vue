<template>
  <div class="container mt-5">
    <div class="card shadow-sm mx-auto p-4" style="margin-top: 65px">
      <h3 class="text-center text-primary mb-4">
        👤 Cập nhật thông tin cá nhân
      </h3>

      <form @submit.prevent="submitUpdate">
        <!-- Họ và tên -->
        <div class="mb-3">
          <label for="username" class="form-label fw-semibold">Họ và tên</label>
          <input
            type="text"
            id="username"
            v-model="formData.username"
            class="form-control"
            required
          />
        </div>

        <!-- Email -->
        <div class="mb-3">
          <label for="email" class="form-label fw-semibold">Email</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            class="form-control"
            required
          />
        </div>

        <!-- Số điện thoại -->
        <div class="mb-3">
          <label for="phonenumber" class="form-label fw-semibold"
            >Số điện thoại</label
          >
          <input
            type="text"
            id="phonenumber"
            v-model="formData.phonenumber"
            class="form-control"
            placeholder="VD: 0901234567"
          />
        </div>

        <!-- Avatar -->
        <div class="mb-3">
          <label class="form-label fw-semibold">Ảnh đại diện</label>

          <!-- Nhập URL -->
          <input
            type="text"
            v-model="formData.avatar"
            class="form-control mb-2"
            placeholder="Dán đường dẫn ảnh (URL) nếu có"
          />

          <!-- Chọn ảnh từ máy -->
          <input
            type="file"
            accept="image/*"
            class="form-control"
            @change="handleAvatarUpload"
          />
        </div>

        <!-- Hiển thị ảnh xem trước -->
        <div class="mb-4 text-center">
          <img
            v-if="formData.avatar"
            :src="formData.avatar"
            alt="Avatar"
            class="rounded-circle shadow-sm"
            style="width: 100px; height: 100px; object-fit: cover"
          />
          <p v-else class="text-muted">Chưa có ảnh đại diện</p>
        </div>

        <!-- Nút lưu -->
        <button type="submit" class="btn btn-warning w-100 fw-bold">
          💾 Lưu thay đổi
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axiosInstance from "@/services/AxiosServices";

export default {
  data() {
    return {
      formData: {
        username: "",
        email: "",
        phonenumber: "",
        avatar: "",
      },
      // showMessage: false,
      // messageContent: "",
      // messageSeverity: "Info", // "Success", "Error", "Warning", "Info"
    };
  },

  async created() {
    try {
      const response = await axiosInstance.get("/user/me");
      const user = response.data.data;
      this.formData = {
        username: user.username || "",
        email: user.email || "",
        phonenumber: user.phonenumber || "",
        avatar: user.avatar || "",
      };
    } catch (error) {
      console.log(error);
      // this.showFeedback("Không thể tải thông tin người dùng", "Error");
    }
  },

  methods: {
    async handleAvatarUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

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
          // this.showFeedback("Tải ảnh thành công", "Success");
        } else {
          alert("Tải ảnh không thành công");
          // this.showFeedback("Tải ảnh không thành công", "Warning");
        }
      } catch (err) {
        console.error("Lỗi khi upload avatar:", err);
        alert("Không thể upload ảnh. Vui lòng thử lại.", err);
        // this.showFeedback("Không thể upload ảnh. Vui lòng thử lại.", "Error");
      }
    },

    async submitUpdate() {
      try {
        await this.$store.dispatch("user/updateUser", this.formData);
        // this.showFeedback("Cập nhật thành công!", "Success");

        // Đợi 1 chút trước khi chuyển trang
        setTimeout(() => this.$router.push("/thong-tin"), 1500);
      } catch (error) {
        alert("Lỗi khi cập nhật thông tin người dùng:", error);
        // this.showFeedback(error.message || "Cập nhật thất bại.", "Error");
      }
    },

    showFeedback(message, severity) {
      this.messageContent = message;
      this.messageSeverity = severity;
      this.showMessage = true;

      // Tự động ẩn sau 3 giây
      setTimeout(() => {
        this.showMessage = false;
      }, 10000);
    },
  },
};
</script>

<style>
/*
@import "@syncfusion/ej2-base/styles/material.css";
@import "@syncfusion/ej2-vue-notifications/styles/message/material.css";
*/
.custom-message {
  margin-bottom: 15px;
}
</style>
