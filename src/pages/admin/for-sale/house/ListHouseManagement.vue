<template>
  <div class="container">
    <h3 class="text-center">Quản lý danh sách nhà đất bán</h3>

    <div class="card p-3 mb-4">
      <h5>{{ isEdit ? "Chỉnh sửa bài đăng" : "Thêm mới nhà đất bán" }}</h5>
      <form @submit.prevent="submitPost">
        <div class="row">
          <div class="col-md-6 mb-2">
            <input
              type="text"
              class="form-control"
              v-model="newPost.title"
              placeholder="Tiêu đề"
              required
            />
          </div>
          <div class="col-md-3 mb-2">
            <input
              type="text"
              class="form-control"
              v-model="newPost.price"
              placeholder="Giá"
              required
            />
          </div>
          <div class="col-md-3 mb-2">
            <input
              type="text"
              class="form-control"
              v-model="newPost.area"
              placeholder="Diện tích"
              required
            />
          </div>
          <div class="col-md-8 mb-2">
            <input
              type="text"
              class="form-control"
              v-model="newPost.address"
              placeholder="Địa chỉ"
              required
            />
          </div>
          <div class="col-md-4 mb-2">
            <select class="form-select" v-model="newPost.categoryId" required>
              <option disabled value="">Chọn loại tin đăng</option>
              <option value="9">Nhà đất bán</option>
            </select>
          </div>
          <div class="col-md-12 mb-2">
            <textarea
              class="form-control"
              v-model="newPost.description"
              placeholder="Mô tả"
              required
            ></textarea>
          </div>

          <div class="col-md-12 mb-2">
            <input
              type="file"
              class="form-control"
              multiple
              @change="handleFileUpload"
              accept="image/*"
            />
          </div>
        </div>
        <button type="submit" class="btn btn-success">
          {{ isEdit ? "Cập nhật" : "Thêm" }}
        </button>
        <button
          type="button"
          class="btn btn-secondary ms-2"
          @click="resetPost"
          v-if="isEdit"
        >
          Hủy
        </button>
      </form>
    </div>

    <div>
      <table class="table table-bordered">
        <thead class="table-light">
          <tr>
            <th>#</th>
            <th>Tiêu đề</th>
            <th>Giá</th>
            <th>Diện tích</th>
            <th>Mô tả</th>
            <th>Loại tin đăng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(sale, index) in postall" :key="sale.id">
            <td>{{ index + 1 }}</td>
            <td>{{ sale.title }}</td>
            <td>{{ sale.price }}</td>
            <td>{{ sale.area }}</td>
            <td>{{ sale.description }}</td>
            <td>{{ sale.categoryId }}</td>
            <td>
              <button
                class="btn btn-sm btn-warning me-2"
                @click="editPost(sale)"
              >
                Sửa
              </button>
              <button
                class="btn btn-sm btn-danger"
                @click="deletePost(sale.id)"
              >
                Xóa
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axiosInstance from "@/services/AxiosServices";

export default {
  data() {
    return {
      newPost: {
        id: null,
        title: "",
        price: "",
        area: "",
        address: "",
        description: "",
        categoryId: "",
        image: [],
      },
      isEdit: false,
    };
  },

  computed: {
    postall() {
      return this.$store.getters["adminPost/adminPosts"];
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

          const imageUrl = response?.data?.data;
          if (imageUrl) {
            this.newPost.imageUrls.push(imageUrl);
            console.log("Ảnh upload thành công:", imageUrl);
          } else {
            console.error("Response không có imageUrl:", response);
            alert("Không thể upload ảnh. Server trả về kết quả không hợp lệ.");
          }
        } catch (error) {
          console.error("Lỗi upload ảnh:", error);
          alert("Không thể upload ảnh. Vui lòng thử lại.");
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
        this.newPost.imageUrls.splice(index, 1); // xoá ảnh theo index
      } catch (error) {
        console.error("Lỗi xóa ảnh:", error);
        alert("Không thể xóa ảnh. Vui lòng thử lại.");
      }
    },
    async submitPost() {
      try {
        const payload = {
          title: this.newPost.title,
          price: this.newPost.price,
          area: this.newPost.area,
          address: this.newPost.address,
          description: this.newPost.description,
          category: { _id: this.newPost.categoryId },
        };

        if (this.isEdit) {
          // Gọi API cập nhật bài đăng
          await this.$axios.put(`/admin/post/${this.newPost.id}`, payload);
          alert("Cập nhật bài đăng thành công!");
        } else {
          // Gọi API thêm mới bài đăng
          await this.$axios.post(`/admin/post`, payload);
          alert("Thêm bài đăng thành công!");
        }

        this.resetPost();
        this.$store.dispatch("adminPost/getAdPost", 9);
      } catch (err) {
        console.error(err);
        alert("Có lỗi xảy ra, vui lòng thử lại!");
      }
    },

    editPost(sale) {
      this.newPost = {
        id: sale.id,
        title: sale.title,
        price: sale.price,
        area: sale.area,
        address: sale.address,
        description: sale.description,
        categoryId: sale.categoryId,
        image: sale.imageUrls || [],
      };
      this.isEdit = true;
    },

    resetPost() {
      this.newPost = {
        id: null,
        title: "",
        price: "",
        area: "",
        address: "",
        description: "",
        categoryId: "",
        image: [],
      };
      this.isEdit = false;
    },

    async deletePost(id) {
      if (confirm("Bạn có chắc chắn muốn xóa bài đăng này không?")) {
        try {
          await this.$axios.delete(`/admin/post/${id}`);
          alert("Xóa bài đăng thành công!");
          this.$store.dispatch("adminPost/getAdPost", 9);
        } catch (err) {
          console.error(err);
          alert("Xóa thất bại, vui lòng thử lại!");
        }
      }
    },

    handleFileUpload(event) {
      const files = event.target.files;
      this.newPost.image = Array.from(files);
    },
  },

  created() {
    const categoryId = 9;
    this.$store.dispatch("adminPost/getAdPost", categoryId);
  },
};
</script>
