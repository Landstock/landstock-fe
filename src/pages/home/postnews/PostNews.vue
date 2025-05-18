<template>
  <div class="container">
    <div class="pt-5">
      <!-- Form đăng tin -->
      <div class="col">
        <div class="post-form">
          <h3 class="text-center">Đăng tin bất động sản</h3>
          <form @submit.prevent="submitPost">
            <div class="mb-3">
              <label for="title" class="form-label">Tiêu đề</label>
              <input
                type="text"
                v-model="post.title"
                class="form-control"
                placeholder="Tiêu đề"
                id="title"
                required
              />
            </div>

            <div class="mb-3 row">
              <div class="col-md-3">
                <label for="price" class="form-label">Giá bán</label>
                <input
                  type="text"
                  v-model="post.price"
                  class="form-control"
                  placeholder="VD: 12 triệu, 1.2 tỷ"
                  id="price"
                  required
                />
              </div>
              <div class="col-md-3">
                <label for="area" class="form-label">Diện tích</label>
                <input
                  type="text"
                  v-model="post.area"
                  class="form-control"
                  placeholder="VD: 120 m²"
                  id="area"
                  required
                />
              </div>

              <div class="col-md-3">
                <label for="address" class="form-label">Địa chỉ</label>
                <input
                  v-model="post.address"
                  class="form-control"
                  placeholder="Địa chỉ"
                  id="address"
                  required
                />
              </div>
              <div class="col-md-3">
                <label for="category" class="form-label">Loại tin</label>
                <select
                  v-model="post.categoryId"
                  class="form-select"
                  id="category"
                  required
                >
                  <option value="">-- Chọn loại tin --</option>
                  <option
                    v-for="category in categories"
                    :key="category._id"
                    :value="category._id"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>
            </div>

            <div class="mb-3">
              <label for="description" class="form-label">Mô tả chi tiết</label>
              <textarea
                v-model="post.description"
                class="form-control"
                placeholder="Thông tin chi tiết"
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

              <!-- Hiển thị ảnh đã chọn -->
              <div class="mt-3 d-flex flex-wrap gap-2">
                <div
                  v-for="(img, index) in post.image"
                  :key="index"
                  class="position-relative"
                >
                  <img
                    :src="img"
                    alt="preview"
                    width="100"
                    height="100"
                    class="preview-img"
                  />
                  <button
                    type="button"
                    class="btn btn-sm btn-danger position-absolute top-0 end-0 p-1"
                    @click="removeImage(index)"
                  >
                    ✖
                  </button>
                </div>
              </div>
            </div>

            <button type="submit" class="btn btn-primary w-100">
              Đăng tin
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from "@/services/AxiosServices";

export default {
  data() {
    return {
      post: {
        title: "",
        price: "",
        area: "",
        address: "",
        categoryId: "",
        description: "",
        image: [],
      },
    };
  },
  computed: {
    // Lấy danh sách danh mục
    categories() {
      const cate = this.$store.getters["category/categories"];
      // eslint-disable-next-line no-debugger
      // debugger;
      console.log("cate day:", cate);
      return cate;
    },
  },
  mounted() {
    this.$store
      .dispatch("category/getCategoryManage")
      .then(() => {
        console.log("Categories sau khi fetch:", this.categories);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh mục:", error);
      });
  },
  watch: {
    categories(val) {
      console.log("Danh mục đã cập nhật:", val);
    },
  },
  methods: {
    async handleImageUpload(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await axiosInstance.post("/s3/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          const imageUrl = response.data.data;
          this.post.image.push(imageUrl);
          console.log("file ảnh: ", imageUrl);
        } catch (error) {
          console.error("Lỗi upload ảnh:", error);
          alert("Không thể upload ảnh. Vui lòng thử lại.");
        }
      }
    },
    async removeImage(index) {
      const imageUrl = this.post.image[index];
      const imageKey = imageUrl.split("/").pop();

      try {
        await axiosInstance.delete(`/s3/delete/${imageKey}`, {
          data: { imageUrl },
        });
        this.post.image.splice(index, 1); // xoá ảnh theo index
      } catch (error) {
        console.error("Lỗi xóa ảnh:", error);
        alert("Không thể xóa ảnh. Vui lòng thử lại.");
      }
    },
    async submitPost() {
      if (!this.post.categoryId) {
        alert("Vui lòng chọn loại tin.");
        return;
      }

      if (!this.post.image.length) {
        alert("Vui lòng chọn ít nhất một hình ảnh.");
        return;
      }

      try {
        await this.$store.dispatch("posts/addPostNew", {
          title: this.post.title,
          price: this.post.price,
          area: this.post.area,
          address: this.post.address,
          categoryId: Number(this.post.categoryId),
          description: this.post.description,
          image: this.post.image,
        });

        alert("Tin đã được đăng thành công!");
        this.$router.push("/danh-sach-tin-dang");
      } catch (error) {
        console.error("Error adding post:", error);
        alert("Có lỗi xảy ra khi đăng tin!");
      }
    },
  },
};
</script>

<style scoped>
.preview-img {
  object-fit: cover;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.position-relative {
  display: inline-block;
}
button.btn-danger {
  font-size: 0.75rem;
  line-height: 1;
  border-radius: 50%;
}
</style>
