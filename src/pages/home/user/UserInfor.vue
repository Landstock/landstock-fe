<template>
  <div class="container mt-5">
    <div
      class="card shadow-sm mx-auto p-4"
      style="margin-top: 65px; max-width: 700px"
    >
      <h3 class="text-center text-primary mb-4">👤 Thông tin cá nhân</h3>
      <!-- THÔNG BÁO -->
      <ejs-message
        v-if="showMessage"
        :content="messageContent"
        :severity="messageSeverity"
        :cssClass="'custom-message'"
        :visible="true"
        showCloseIcon
      ></ejs-message>

      <!-- Ảnh đại diện -->
      <div class="text-center mb-4">
        <img
          v-if="user.avatar"
          :src="user.avatar"
          alt="Avatar"
          class="rounded-circle shadow-sm"
          style="width: 120px; height: 120px; object-fit: cover"
        />
        <p v-else class="text-muted">Chưa có ảnh đại diện</p>
      </div>

      <!-- Họ tên -->
      <div class="mb-3">
        <label class="form-label fw-semibold">Họ và tên:</label>
        <div class="form-control bg-light">{{ user.username }}</div>
      </div>

      <!-- Email -->
      <div class="mb-3">
        <label class="form-label fw-semibold">Email:</label>
        <div class="form-control bg-light">{{ user.email }}</div>
      </div>

      <!-- Số điện thoại -->
      <div class="mb-3">
        <label class="form-label fw-semibold">Số điện thoại:</label>
        <div class="form-control bg-light">{{ user.phonenumber }}</div>
      </div>
      <router-link
        to="/sua-thong-tin-ca-nhan"
        class="btn btn-outline-primary w-100 mt-3"
      >
        ✏️ Chỉnh sửa thông tin
      </router-link>
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
      messageContent: "",
      messageSeverity: "Info", // "Success", "Error", "Warning", "Info"
    };
  },
  async created() {
    try {
      const response = await axiosInstance.get("/user/me");
      this.user = response.data.data;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng", error);
    }
  },
};
</script>
