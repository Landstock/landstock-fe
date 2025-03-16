<template>
  <div class="container">
    <div class="row">
      <div class="information d-flex">
        <!-- Sidebar -->
        <div class="col-md-4 contact-card">
          <h5 class="mb-3">Hau</h5>
          <ul class="list-unstyled">
            <li><a href="#">Đăng tin BĐS</a></li>
            <li><a href="#">Danh sách tin đăng</a></li>
            <li><a href="#">Sửa thông tin cá nhân</a></li>
            <li><a href="#">Thoát</a></li>
          </ul>
        </div>
        <!-- Form đăng tin -->
        <div class="col-md-8">
          <div class="post-form">
            <h3 class="text-center">Đăng tin bất động sản</h3>
            <form @submit.prevent="submitPost">
              <div class="mb-3">
                <label for="title" class="form-label">Tiêu đề</label>
                <input
                  type="text"
                  v-model="post.title"
                  class="form-control"
                  id="title"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="type" class="form-label">Loại bất động sản</label>
                <select
                  v-model="post.type"
                  class="form-select"
                  id="type"
                  required
                >
                  <option value="Căn hộ">Căn hộ</option>
                  <option value="Nhà phố">Nhà phố</option>
                  <option value="Biệt thự">Biệt thự</option>
                  <option value="Đất nền">Đất nền</option>
                  <option value="Shophouse">Shophouse</option>
                </select>
              </div>

              <div class="mb-3 row">
                <div class="col-md-6">
                  <label for="area" class="form-label">Diện tích (m²)</label>
                  <input
                    type="number"
                    v-model="post.area"
                    class="form-control"
                    id="area"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label for="price" class="form-label">Giá bán (VNĐ)</label>
                  <input
                    type="number"
                    v-model="post.price"
                    class="form-control"
                    id="price"
                    required
                  />
                </div>
              </div>

              <div class="mb-3">
                <label for="description" class="form-label"
                  >Mô tả chi tiết</label
                >
                <textarea
                  v-model="post.description"
                  class="form-control"
                  id="description"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div class="mb-3">
                <label for="image" class="form-label">Hình ảnh</label>
                <input
                  type="file"
                  class="form-control"
                  id="image"
                  @change="handleImageUpload"
                  accept="image/*"
                  multiple
                />
              </div>

              <div class="mb-3">
                <label for="contact" class="form-label"
                  >Số điện thoại liên hệ</label
                >
                <input
                  type="text"
                  v-model="post.contact"
                  class="form-control"
                  id="contact"
                  required
                />
              </div>

              <button type="submit" class="btn btn-primary w-100">
                Đăng tin
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: "",
        type: "",
        area: "",
        price: "",
        description: "",
        images: [],
        contact: "",
      },
    };
  },
  methods: {
    handleImageUpload(event) {
      const files = event.target.files;
      this.post.images = Array.from(files);
    },
    submitPost() {
      console.log("Thông tin đăng tin:", this.post);
      alert("Tin đã được đăng thành công!");
    },
  },
};
</script>

<style scoped>
.information {
  margin-top: 80px;
}
.information {
  display: flex;
  gap: 20px;
}
.contact-card {
  background-color: #f0f2f5;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: fit-content;
}
.contact-card ul li {
  margin-bottom: 10px;
}
.contact-card ul li a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}
.contact-card ul li a:hover {
  color: #f1c150;
}
.post-form {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.btn-primary {
  background-color: #f1c150;
  border: none;
  font-size: 16px;
  font-weight: bold;
}
.btn-primary:hover {
  background-color: #e0a800;
}
</style>
