<template>
  <div class="container">
    <div class="d-flex justify-content-between">
      <h3>Danh sách {{ title }}</h3>

      <!-- Nút mở form thêm -->
      <div>
        <button class="btn btn-success" @click="openForm(null)">
          ➕ Thêm Loại Tin
        </button>
      </div>
    </div>

    <!-- Modal Thêm/Sửa Loại Tin -->
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
              <div class="mb-3">
                <label>Tiêu đề</label>
                <input v-model="newPost.title" class="form-control" required />
              </div>
              <div class="mb-3">
                <label>Giá</label>
                <input v-model="newPost.price" class="form-control" required />
              </div>
              <div class="mb-3">
                <label>Diện tích</label>
                <input v-model="newPost.area" class="form-control" required />
              </div>
              <div class="mb-3">
                <label>Địa chỉ</label>
                <input
                  v-model="newPost.address"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label>Mô tả</label>
                <textarea
                  v-model="newPost.description"
                  class="form-control"
                  required
                ></textarea>
              </div>
              <!-- Upload ảnh -->
              <div class="mb-3">
                <label>Hình ảnh</label>
                <input
                  type="file"
                  multiple
                  @change="handleImageUpload"
                  class="form-control"
                />
                <div class="mt-2 d-flex flex-wrap gap-2">
                  <div
                    v-for="(img, idx) in imagePreviews"
                    :key="idx"
                    class="position-relative"
                  >
                    <img
                      :src="img"
                      class="img-thumbnail"
                      style="width: 100px; height: 100px; object-fit: cover"
                    />
                    <button
                      type="button"
                      class="btn btn-sm btn-danger position-absolute top-0 end-0"
                      @click="removeImage(idx)"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
              <button type="submit" class="btn btn-primary">
                {{ isEdit ? "Cập nhật" : "Thêm mới" }}
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                @click="closeForm"
              >
                Hủy
              </button>
            </form>
          </div>
        </div>
      </div>
      <!-- Overlay -->
      <div class="modal-backdrop fade show" @click="closeForm"></div>
    </div>
    <!-- Table -->
    <table class="table table-bordered">
      <thead class="table-light">
        <tr>
          <th>#</th>
          <th>Tiêu đề</th>
          <th>Giá</th>
          <th>Diện tích</th>
          <th>Mô tả</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody v-if="posts && posts.length">
        <tr v-for="(post, index) in posts" :key="post.id">
          <td>{{ index + 1 }}</td>
          <td>{{ post.title }}</td>
          <td>{{ post.price }}</td>
          <td>{{ post.area }}</td>
          <td>{{ post.description }}</td>

          <td>
            <button class="btn btn-warning btn-sm" @click="editPost(post)">
              Sửa
            </button>
            <button class="btn btn-danger btn-sm" @click="deletePost(post.id)">
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="7" class="text-center">⏳ Đang tải dữ liệu...</td>
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
        @click="goToPage(currentPage - 1)"
      >
        <a class="page-link" href="#"><i class="fas fa-chevron-left"></i></a>
      </li>

      <li
        v-for="page in totalPages"
        :key="page"
        class="page-item"
        :class="{ active: currentPage === page }"
        @click="goToPage(page)"
      >
        <a class="page-link" href="#">{{ page }}</a>
      </li>

      <li
        class="page-item"
        :class="{ disabled: currentPage === totalPages }"
        v-if="currentPage < totalPages"
        @click="goToPage(currentPage + 1)"
      >
        <a class="page-link" href="#"><i class="fas fa-chevron-right"></i></a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      title: "Bài đăng", // Add missing title
      newPost: {
        id: null,
        title: "",
        price: "",
        area: "",
        address: "",
        description: "",
        categoryId: this.id, // Use this.id instead of this.categoryId
        image: [],
      },
      imagePreviews: [],
      currentPage: 1,
      limit: 20,
      isEdit: false,
      showModal: false,
    };
  },

  computed: {
    posts() {
      return this.$store.getters["adminPost/adminPosts"] || [];
    },
    totalPages() {
      const total = this.$store.state.adminPost.total || 0;
      const pages = Math.ceil(total / this.limit);
      console.log("Tổng user:", total, "Số trang:", pages);
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

    handleImageUpload(event) {
      const files = Array.from(event.target.files);
      this.newPost.image.push(...files);
      files.forEach((file) => {
        this.imagePreviews.push(URL.createObjectURL(file));
      });
    },

    removeImage(index) {
      this.newPost.image.splice(index, 1);
      this.imagePreviews.splice(index, 1);
    },

    async submitPost() {
      try {
        const formData = new FormData();
        for (const key in this.newPost) {
          if (key === "image") {
            this.newPost.image.forEach((file) =>
              formData.append("image", file)
            );
          } else {
            formData.append(key, this.newPost[key]);
          }
        }

        if (this.isEdit) {
          await this.$store.dispatch("adminPost/updateAdPost", {
            id: this.newPost.id,
            updateData: formData,
          });
        } else {
          await this.$store.dispatch("adminPost/addPost", formData);
        }

        this.closeModal();
        // Reload data after successful submission
        if (this.id) {
          await this.$store.dispatch("adminPost/getAdPost", {
            categoryId: this.id,
            page: this.currentPage,
            limit: this.limit,
          });
        }
      } catch (error) {
        console.error("Error submitting post:", error);
        // You can add error handling UI here
      }
    },

    editPost(post) {
      this.isEdit = true;
      this.newPost = {
        ...post,
        image: [],
        categoryId: this.id,
      };
      this.imagePreviews = post.imageUrls || [];
      this.showModal = true;
    },

    async deletePost(id) {
      if (confirm("Bạn có chắc chắn muốn xóa bài đăng này?")) {
        try {
          await this.$store.dispatch("adminPost/deletePost", id);
          // Reload data after successful deletion
          if (this.id) {
            await this.$store.dispatch("adminPost/getAdPost", {
              categoryId: this.id,
              page: this.currentPage,
              limit: this.limit,
            });
          }
        } catch (error) {
          console.error("Error deleting post:", error);
          // You can add error handling UI here
        }
      }
    },

    resetForm() {
      this.newPost = {
        id: null,
        title: "",
        price: "",
        area: "",
        address: "",
        description: "",
        categoryId: this.id,
        image: [],
      };
      this.imagePreviews = [];
      this.isEdit = false;
    },

    async goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        await this.$store.dispatch("adminPost/getAdPost", {
          categoryId: this.id,
          page: this.currentPage,
          limit: this.limit,
        });
      }
    },
  },

  watch: {
    id: {
      immediate: true, // Chạy ngay lần đầu
      handler(newVal) {
        if (newVal) {
          // Kiểm tra có giá trị không
          this.$store.dispatch("adminPost/getAdPost", {
            categoryId: newVal,
            page: this.currentPage,
            limit: this.limit,
          });
        }
      },
    },
  },
};
</script>

<style scoped>
.modal-dialog {
  margin: 1.75rem auto;
}

.modal-content {
  z-index: 2;
  background-color: #fff;
  border-radius: 8px;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
