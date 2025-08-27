<template>
  <div class="container">
    <div class="pt-5 pb-4">
      <div class="col-lg-11 mx-auto" style="margin-top: 22px">
        <div class="post-form p-4">
          <h3 class="text-center mb-4 text-primary">
            📝 Đăng tin Bất Động Sản
          </h3>

          <form @submit.prevent="submitPost">
            <!-- Tiêu đề -->
            <div class="mb-3">
              <label for="title" class="form-label fw-semibold">Tiêu đề</label>
              <input
                type="text"
                v-model="post.title"
                class="form-control"
                placeholder="Nhập tiêu đề tin đăng"
                id="title"
                required
              />
            </div>

            <!-- Giá - Diện tích - Địa chỉ - Loại tin -->
            <div class="row g-4 mb-4">
              <div class="col-md-3">
                <label for="price" class="form-label fw-semibold"
                  >Giá bán</label
                >
                <input
                  type="text"
                  v-model="post.price"
                  class="form-control"
                  placeholder="VD: 1.2 tỷ"
                  id="price"
                  required
                />
              </div>
              <div class="col-md-3">
                <label for="area" class="form-label fw-semibold"
                  >Diện tích</label
                >
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
                <label class="form-label fw-semibold">Tỉnh/Thành phố</label>
                <select
                  v-model="post.provinceCode"
                  @change="fetchDistricts"
                  class="form-select"
                  required
                >
                  <option value="">-- Chọn tỉnh/thành phố --</option>
                  <option
                    v-for="province in provinces"
                    :key="province.code"
                    :value="province.code"
                  >
                    {{ province.name }}
                  </option>
                </select>
              </div>

              <div class="col-md-3">
                <label class="form-label fw-semibold">Quận/Huyện</label>
                <select
                  v-model="post.districtCode"
                  @change="fetchWards"
                  class="form-select"
                  :disabled="!post.provinceCode"
                  required
                >
                  <option value="">-- Chọn quận/huyện --</option>
                  <option
                    v-for="district in districts"
                    :key="district.code"
                    :value="district.code"
                  >
                    {{ district.name }}
                  </option>
                </select>
              </div>

              <div class="col-md-3">
                <label class="form-label fw-semibold">Phường/Xã</label>
                <select
                  v-model="post.wardCode"
                  @change="updateWardName"
                  class="form-select"
                  :disabled="!post.districtCode"
                  required
                >
                  <option value="">-- Chọn phường/xã --</option>
                  <option
                    v-for="ward in wards"
                    :key="ward.code"
                    :value="ward.code"
                  >
                    {{ ward.name }}
                  </option>
                </select>
              </div>

              <div class="col-md-3">
                <label class="form-label fw-semibold">Tên đường</label>
                <input
                  v-model="post.street"
                  type="text"
                  class="form-control"
                  placeholder="VD: Nguyễn Trãi"
                />
              </div>

              <div class="col-md-3">
                <label for="category" class="form-label fw-semibold"
                  >Loại tin</label
                >
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

            <!-- Mô tả -->
            <div class="mb-3">
              <label for="description" class="form-label fw-semibold"
                >Mô tả chi tiết</label
              >
              <textarea
                v-model="post.description"
                class="form-control"
                placeholder="Nhập nội dung chi tiết"
                id="description"
                rows="4"
                required
              ></textarea>
            </div>

            <!-- Upload ảnh -->
            <div class="mb-3">
              <label for="imageUrls" class="form-label fw-semibold">
                Hình ảnh
                <span class="text-muted">(Bạn cần chọn ít nhất 3 ảnh)</span>
              </label>

              <input
                type="file"
                class="form-control"
                id="imageUrls"
                @change="handleImageUpload"
                accept="image/*"
                multiple
              />

              <div class="mt-3 d-flex flex-wrap gap-3">
                <div
                  v-for="(img, index) in post.imageUrls"
                  :key="index"
                  class="image-preview-box"
                >
                  <img :src="img" alt="preview" />
                  <button
                    type="button"
                    class="btn-close btn-sm btn-remove"
                    @click="removeImage(index)"
                  ></button>
                </div>
              </div>
            </div>

            <!-- Submit -->
            <button
              type="submit"
              class="btn btn-warning w-100 fw-bold d-flex align-items-center justify-content-center gap-2"
            >
              🚀 <span>Đăng tin ngay</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from "@/services/AxiosServices";
import axios from "axios";

export default {
  data() {
    return {
      provinces: [],
      districts: [],
      wards: [],
      post: {
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
        categoryId: "",
        description: "",
        imageUrls: [],
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
    this.fetchProvinces();
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
    async fetchProvinces() {
      try {
        const res = await axios.get(
          "https://provinces.open-api.vn/api/?depth=1"
        );
        this.provinces = res.data;
      } catch (err) {
        console.error("Lỗi khi lấy danh sách tỉnh:", err);
      }
    },
    async fetchDistricts() {
      try {
        const res = await axios.get(
          `https://provinces.open-api.vn/api/p/${this.post.provinceCode}?depth=2`
        );
        this.districts = res.data.districts;
        // Gán tên tỉnh
        const selectedProvince = this.provinces.find(
          (p) => p.code == this.post.provinceCode
        );
        this.post.provinceName = selectedProvince ? selectedProvince.name : "";
      } catch (err) {
        console.error("Lỗi khi lấy danh sách quận:", err);
      }
    },
    async fetchWards() {
      try {
        const res = await axios.get(
          `https://provinces.open-api.vn/api/d/${this.post.districtCode}?depth=2`
        );
        this.wards = res.data.wards;
        // Gán tên quận
        const selectedDistrict = this.districts.find(
          (d) => d.code == this.post.districtCode
        );
        this.post.districtName = selectedDistrict ? selectedDistrict.name : "";
      } catch (err) {
        console.error("Lỗi khi lấy danh sách phường:", err);
      }
    },
    updateWardName() {
      const selectedWard = this.wards.find(
        (ward) => ward.code == this.post.wardCode
      );
      this.post.wardName = selectedWard ? selectedWard.name : "";
    },
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
          this.post.imageUrls.push(imageUrl);
          console.log("file ảnh: ", imageUrl);
        } catch (error) {
          console.error("Lỗi upload ảnh:", error);
          alert("Không thể upload ảnh. Vui lòng thử lại.");
        }
      }
    },
    async removeImage(index) {
      const imageUrl = this.post.imageUrls[index];
      const imageKey = imageUrl.split("/").pop();

      try {
        await axiosInstance.delete(`/s3/delete/${imageKey}`, {
          data: { imageUrl },
        });
        this.post.imageUrls.splice(index, 1); // xoá ảnh theo index
      } catch (error) {
        console.error("Lỗi xóa ảnh:", error);
        alert("Không thể xóa ảnh. Vui lòng thử lại.");
      }
    },
    generateSlug(text) {
      return text
        .toLowerCase() // chuyển thành chữ thường
        .normalize("NFD") // chuyển dấu thành ký tự gốc + dấu
        .replace(/[\u0300-\u036f]/g, "") // xoá dấu
        .replace(/[^a-z0-9\s-]/g, "") // xoá ký tự đặc biệt
        .trim() // xoá khoảng trắng 2 đầu
        .replace(/\s+/g, "-"); // thay khoảng trắng bằng dấu -
    },
    async submitPost() {
      const slug = this.generateSlug(this.post.title);

      if (!this.post.categoryId) {
        alert("Vui lòng chọn loại tin.");
        return;
      }

      if (this.post.imageUrls.length < 3) {
        alert("Vui lòng chọn ít nhất 3 hình ảnh.");
        return;
      }

      try {
        await this.$store.dispatch("posts/addPostNew", {
          title: this.post.title,
          price: this.post.price,
          area: this.post.area,
          provinceCode: String(this.post.provinceCode), // ép thành string
          provinceName: this.post.provinceName,
          districtCode: String(this.post.districtCode), // ép thành string
          districtName: this.post.districtName,
          wardCode: String(this.post.wardCode), // ép thành string
          wardName: this.post.wardName,
          street: this.post.street,
          project: this.post.project,
          categoryId: Number(this.post.categoryId),
          description: this.post.description,
          imageUrls: this.post.imageUrls,
          slug: slug,
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
.post-form {
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
  padding: 40px;
  margin-bottom: 40px;
}

.post-form .form-control,
.post-form .form-select {
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 15px;
}

/* nút đăng tin  */
.btn-warning {
  background-color: #f1c150;
  border: none;
  font-size: 1.1rem;
  padding: 14px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(241, 193, 80, 0.5);
}

.btn-warning:hover {
  background-color: #e3b13e;
}

.image-preview-box {
  position: relative;
  width: 110px;
  height: 110px;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  background-color: #f9f9f9;
}

.image-preview-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

/* nút xóa  */
.btn-remove {
  position: absolute;
  top: 4px;
  right: 4px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  padding: 0;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
</style>
