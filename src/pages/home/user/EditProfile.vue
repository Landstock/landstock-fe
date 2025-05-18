<template>
  <div class="container mt-5">
    <h2 class="mb-4">Thông tin người dùng</h2>
    <form @submit.prevent="submitUpdate">
      <div class="mb-3">
        <label for="username" class="form-label">Họ và tên</label>
        <input
          type="text"
          id="username"
          v-model="formData.username"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          id="email"
          v-model="formData.email"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label for="phonenumber" class="form-label">Số điện thoại</label>
        <input
          type="text"
          id="phonenumber"
          v-model="formData.phonenumber"
          class="form-control"
        />
      </div>

      <div class="mb-3">
        <label for="avatar" class="form-label">Avatar (URL ảnh)</label>
        <input
          type="text"
          id="avatar"
          v-model="formData.avatar"
          class="form-control"
          placeholder="https://..."
        />
      </div>

      <div class="mb-3 text-center">
        <img
          v-if="formData.avatar"
          :src="formData.avatar"
          alt="Avatar"
          class="rounded-circle"
          style="width: 100px; height: 100px; object-fit: cover"
        />
      </div>

      <button type="submit" class="btn btn-success">Lưu thay đổi</button>
    </form>
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
      console.error("Lỗi khi lấy thông tin người dùng", error);
    }
  },
  methods: {
    async submitUpdate() {
      try {
        await this.$store.dispatch("user/updateUser", this.formData);
        alert("Cập nhật thành công!");
        // this.$router.push("/dang-tin");
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>
