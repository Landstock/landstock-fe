<template>
  <div class="container">
    <div class="pt-5" style="margin-top: 22px">
      <div class="card p-3 mb-4">
        <h5 class="text-center">Sửa thông tin bài đăng</h5>
        <form @submit.prevent="submitUpdatePost">
          <div class="row">
            <div class="col-md-6 mb-2">
              <label for="title" class="form-label">Tiêu đề</label>
              <input
                type="text"
                class="form-control"
                v-model="newPost.title"
                placeholder="Tiêu đề"
                required
              />
            </div>
            <div class="col-md-3 mb-2">
              <label for="price" class="form-label">Giá bán</label>
              <input
                type="text"
                v-model="newPost.price"
                class="form-control"
                placeholder="VD: 12 triệu, 1.2 tỷ"
                id="price"
                required
              />
            </div>
            <div class="col-md-3 mb-2">
              <label for="area" class="form-label">Diện tích</label>
              <input
                type="text"
                v-model="newPost.area"
                class="form-control"
                placeholder="VD: 120 m²"
                id="area"
                required
              />
            </div>
            <!-- Dropdown Tỉnh / Thành phố -->
            <div class="form-group">
              <label for="province">Tỉnh / Thành phố</label>
              <select
                id="province"
                v-model="newPost.provinceCode"
                @change="fetchDistricts"
                class="form-select"
                required
              >
                <option value="">-- Chọn tỉnh / thành phố --</option>
                <option
                  v-for="province in provinces"
                  :key="province.code"
                  :value="String(province.code)"
                >
                  {{ province.name }}
                </option>
              </select>
            </div>

            <!-- Dropdown Quận / Huyện -->
            <div class="form-group mt-3">
              <label for="district">Quận / Huyện</label>
              <select
                id="district"
                v-model="newPost.districtCode"
                @change="fetchWards"
                class="form-select"
                :disabled="!newPost.provinceCode"
                required
              >
                <option value="">-- Chọn quận / huyện --</option>
                <option
                  v-for="district in districts"
                  :key="district.code"
                  :value="String(district.code)"
                >
                  {{ district.name }}
                </option>
              </select>
            </div>

            <!-- Dropdown Phường / Xã -->
            <div class="form-group mt-3">
              <label for="ward">Phường / Xã</label>
              <select
                id="ward"
                v-model="newPost.wardCode"
                @change="updateWardName"
                class="form-select"
                :disabled="!newPost.districtCode"
                required
              >
                <option value="">-- Chọn phường / xã --</option>
                <option
                  v-for="ward in wards"
                  :key="ward.code"
                  :value="String(ward.code)"
                >
                  {{ ward.name }}
                </option>
              </select>
            </div>

            <!-- Trường Tên đường -->
            <div class="col-md-3 mt-3">
              <label class="form-label fw-semibold">Tên đường</label>
              <input
                v-model="newPost.street"
                type="text"
                class="form-control"
                placeholder="VD: Nguyễn Trãi"
              />
            </div>

            <div class="col-md-4 mb-2">
              <label for="category" class="form-label">Loại tin</label>
              <select
                class="form-select"
                v-model.number="newPost.categoryId"
                required
              >
                <option value="" :disabled="newPost.categoryId !== null">
                  {{
                    newPost.categoryId
                      ? "Đã chọn loại tin"
                      : "Chọn loại tin đăng"
                  }}
                </option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                  {{ cat.name }}
                </option>
              </select>
            </div>

            <div class="col-md-12 mb-2">
              <label for="description" class="form-label">Mô tả chi tiết</label>
              <textarea
                class="form-control"
                v-model="newPost.description"
                placeholder="Mô tả"
                required
              ></textarea>
            </div>

            <div class="col-md-12 mb-2">
              <div class="d-flex flex-wrap">
                <label for="imageUrls" class="form-label">Hình ảnh</label>
                <input
                  type="file"
                  class="form-control"
                  id="imageUrls"
                  @change="handleImageUpload"
                  accept="image/*"
                  multiple
                />
                <div
                  v-for="(img, index) in newPost.imageUrls"
                  :key="index"
                  class="position-relative me-2 mb-2 mt-2"
                  style="width: 120px; height: 120px"
                >
                  <img
                    :src="img"
                    class="img-fluid rounded border"
                    style="width: 100%; height: 100%; object-fit: cover"
                    alt="Ảnh bài đăng"
                  />
                  <button
                    type="button"
                    class="btn btn-sm btn-danger position-absolute top-0 end-0"
                    @click="removeImage(index)"
                  >
                    &times;
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-success">Sửa bài đăng</button>
        </form>
      </div>
      <!-- danh sách  -->
      <h3 class="mb-3">Danh sách tin đã đăng</h3>
      <div class="table-responsive">
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Tiêu đề</th>
              <th>Giá</th>
              <th>Mô tả</th>
              <th>Ngày đăng</th>
              <th>Loại tin đăng</th>
              <!-- <th>Trạng thái</th> -->
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(post, index) in postnew" :key="post.id">
              <td>{{ index + 1 }}</td>
              <td>{{ post.title }}</td>
              <td>{{ post.price }}</td>
              <td>{{ post.description }}</td>
              <td>{{ post.createdAt }}</td>
              <td>{{ post.category }}</td>
              <!-- <td>
                <span
                  :class="{
                    'text-success': post.status === 'đang hiển thị',
                    'text-muted': post.status === 'đã ẩn',
                  }"
                >
                  {{ post.status }}
                </span>
              </td> -->
              <td>
                <button
                  class="btn btn-sm btn-primary me-1"
                  @click="editPosts(post.id)"
                >
                  Sửa
                </button>
                <button
                  class="btn btn-sm btn-danger me-1"
                  @click="deletePost(post.id)"
                >
                  Xoá
                </button>
                <button class="btn btn-sm btn-info">Xem</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// import axiosInstance from "@/services/AxiosServices";
// Thêm import axios vào đầu file
import axios from "axios";

export default {
  data() {
    return {
      newPost: {
        title: "",
        price: "",
        area: "",
        provinceCode: "",
        provinceName: "",
        districtCode: "",
        districtName: "",
        wardCode: "",
        wardName: "",
        street: "",
        project: "",
        description: "",
        categoryId: null,
        imageUrls: [],
        id: null,
      },
      provinces: [], // ✅ Danh sách tỉnh/thành
      districts: [], // ✅ Danh sách quận/huyện
      wards: [], // ✅ Danh sách phường/xã
    };
  },

  computed: {
    postnew() {
      const postnewall = this.$store.getters["posts/posts"];
      console.log("postnew:", postnewall);
      return postnewall;
    },
    categories() {
      const cate = this.$store.getters["category/categories"];
      console.log("cate day:", cate);
      return cate.map((c) => ({
        ...c,
        id: c._id || c.id,
      }));
    },
  },

  methods: {
    // Thêm các method này vào methods object
    async fetchProvinces() {
      try {
        const res = await axios.get(
          "https://provinces.open-api.vn/api/?depth=1"
        );
        this.provinces = res.data;
        console.log("Danh sách tỉnh:", this.provinces);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tỉnh/thành:", error);
        this.provinces = [];
      }
    },

    async fetchDistricts() {
      if (!this.newPost.provinceCode) {
        this.districts = [];
        this.wards = [];
        return;
      }

      try {
        const res = await axios.get(
          `https://provinces.open-api.vn/api/p/${this.newPost.provinceCode}?depth=2`
        );
        this.districts = res.data.districts;

        // Gán tên tỉnh
        const selectedProvince = this.provinces.find(
          (p) => p.code == this.newPost.provinceCode
        );
        this.newPost.provinceName = selectedProvince
          ? selectedProvince.name
          : "";

        // Reset quận/huyện nếu không tìm thấy
        if (!this.districts.find((d) => d.code === this.newPost.districtCode)) {
          this.newPost.districtCode = "";
          this.newPost.districtName = "";
          this.wards = [];
        }

        console.log("Danh sách quận:", this.districts);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách quận/huyện:", error);
        this.districts = [];
      }
    },

    async fetchWards() {
      if (!this.newPost.districtCode) {
        this.wards = [];
        return;
      }

      try {
        const res = await axios.get(
          `https://provinces.open-api.vn/api/d/${this.newPost.districtCode}?depth=2`
        );
        this.wards = res.data.wards;

        // Gán tên quận
        const selectedDistrict = this.districts.find(
          (d) => d.code == this.newPost.districtCode
        );
        this.newPost.districtName = selectedDistrict
          ? selectedDistrict.name
          : "";

        // Reset phường/xã nếu không tìm thấy
        if (!this.wards.find((w) => w.code === this.newPost.wardCode)) {
          this.newPost.wardCode = "";
          this.newPost.wardName = "";
        }

        console.log("Danh sách phường:", this.wards);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách phường/xã:", error);
        this.wards = [];
      }
    },

    updateWardName() {
      const selectedWard = this.wards.find(
        (ward) => ward.code == this.newPost.wardCode
      );
      this.newPost.wardName = selectedWard ? selectedWard.name : "";
    },

    // Sửa lại method editPosts
    async editPosts(id) {
      const post = this.postnew.find((p) => p.id === id);
      console.log("POST được chọn:", post);

      if (post) {
        // ✅ Load lại danh sách tỉnh trước khi fill dữ liệu
        await this.fetchProvinces();

        this.newPost = {
          title: post.title,
          price: post.price,
          area: post.area,
          // ✅ Xử lý dữ liệu địa chỉ - có thể là object hoặc code trực tiếp
          provinceCode: String(post.province?.code || post.provinceCode || ""),
          provinceName: post.province?.name || post.provinceName || "",
          districtCode: String(post.district?.code || post.districtCode || ""),
          districtName: post.district?.name || post.districtName || "",
          wardCode: String(post.ward?.code || post.wardCode || ""),
          wardName: post.ward?.name || post.wardName || "",
          street: post.street || "",
          project: post.project || "",
          description: post.description,
          categoryId: post.category
            ? Number(post.category._id || post.category.id || post.categoryId)
            : post.categoryId
            ? Number(post.categoryId)
            : null,
          imageUrls: post.imageUrls ? [...post.imageUrls] : [],
          id: post.id,
        };

        console.log("Dữ liệu edit:", {
          provinceCode: this.newPost.provinceCode,
          districtCode: this.newPost.districtCode,
          wardCode: this.newPost.wardCode,
          categoryId: this.newPost.categoryId,
          categoryData: post.category,
        });

        console.log(
          "Available categories:",
          this.categories.map((c) => ({ id: c.id, name: c.name }))
        );

        // ✅ Gọi API để fill quận, phường theo tỉnh
        if (this.newPost.provinceCode) {
          await this.fetchDistricts();
          if (this.newPost.districtCode) {
            await this.fetchWards();
          }
        }
      }
    },
    async submitUpdatePost() {
      try {
        console.log("=== SUBMIT UPDATE POST ===");
        console.log("newPost trước khi submit:", this.newPost);

        // Kiểm tra dữ liệu trước khi gửi
        if (!this.newPost.id) {
          alert("Vui lòng chọn một bài đăng để sửa!");
          return;
        }

        // Kiểm tra các trường bắt buộc
        if (!this.newPost.title) {
          alert("Vui lòng nhập tiêu đề!");
          return;
        }

        if (!this.newPost.price) {
          alert("Vui lòng nhập giá!");
          return;
        }

        // Tạo payload sạch
        const payload = {
          id: this.newPost.id,
          title: this.newPost.title,
          price: this.newPost.price,
          area: this.newPost.area,
          provinceCode: this.newPost.provinceCode,
          provinceName: this.newPost.provinceName,
          districtCode: this.newPost.districtCode,
          districtName: this.newPost.districtName,
          wardCode: this.newPost.wardCode,
          wardName: this.newPost.wardName,
          street: this.newPost.street,
          project: this.newPost.project,
          description: this.newPost.description,
          categoryId: this.newPost.categoryId,
          imageUrls: this.newPost.imageUrls,
        };

        console.log("Payload gửi đi để update:", payload);

        // Gọi action update post từ store
        await this.$store.dispatch("posts/updatePost", payload);

        alert("Sửa bài đăng thành công!");

        // Reset form sau khi update thành công
        this.resetForm();

        // Reload lại danh sách posts
        await this.$store.dispatch("posts/getPost");
      } catch (error) {
        console.error("Lỗi khi sửa bài đăng:", error);
        alert("Có lỗi xảy ra khi sửa bài đăng: " + (error.message || error));
      }
    },

    handleImageUpload(event) {
      const files = event.target.files;
      if (files && files.length > 0) {
        // Xử lý upload ảnh - có thể gọi API upload hoặc convert to base64
        Array.from(files).forEach((file) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.newPost.imageUrls.push(e.target.result);
          };
          reader.readAsDataURL(file);
        });
      }
    },

    removeImage(index) {
      this.newPost.imageUrls.splice(index, 1);
    },

    resetForm() {
      this.newPost = {
        title: "",
        price: "",
        area: "",
        provinceCode: "",
        provinceName: "",
        districtCode: "",
        districtName: "",
        wardCode: "",
        wardName: "",
        street: "",
        project: "",
        description: "",
        categoryId: null,
        imageUrls: [],
        id: null,
      };
      this.districts = [];
      this.wards = [];
    },

    async deletePost(id) {
      if (confirm("Bạn có chắc muốn xóa tin này không?")) {
        try {
          await this.$store.dispatch("posts/deletePost", id);
          alert("Xóa thành công!");
        } catch (err) {
          alert("Xoá không thành công!");
        }
      }
    },
  },

  async mounted() {
    await this.$store.dispatch("posts/getPost");
    await this.$store.dispatch("category/getCategoryManage");
    // this.categories = this.$store.getters["category/categories"];

    // ✅ Load danh sách tỉnh khi component mount
    await this.fetchProvinces();
  },
};
</script>

<style scoped>
.table th,
.table td {
  vertical-align: middle;
}

.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
