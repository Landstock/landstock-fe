<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-xl-12 col-lg-11">
        <div class="post-form-wrapper">
          <!-- Header Section -->
          <div class="form-header text-center mb-4">
            <div class="header-icon">
              <i class="fas fa-home"></i>
            </div>
            <h2 class="form-title">Đăng tin Bất Động Sản</h2>
            <p class="form-subtitle">Đăng tin nhanh chóng và hiệu quả</p>
          </div>

          <form @submit.prevent="submitPost" class="post-form">
            <!-- Thông tin cơ bản -->
            <div class="form-section">
              <h5 class="section-title">
                <i class="fas fa-info-circle me-2"></i>
                Thông tin cơ bản
              </h5>

              <div class="row g-3">
                <!-- Tiêu đề -->
                <div class="col-12">
                  <div class="form-floating">
                    <input
                      type="text"
                      v-model="post.title"
                      class="form-control form-control-lg"
                      placeholder="Nhập tiêu đề tin đăng"
                      id="title"
                      required
                    />
                    <label for="title">Tiêu đề tin đăng *</label>
                  </div>
                </div>

                <!-- Giá, Diện tích, Loại tin -->
                <div class="col-md-4">
                  <div class="form-floating">
                    <input
                      type="text"
                      v-model="post.price"
                      class="form-control"
                      placeholder="VD: 1.2 tỷ"
                      id="price"
                      required
                    />
                    <label for="price">Giá bán *</label>
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="form-floating">
                    <input
                      type="text"
                      v-model="post.area"
                      class="form-control"
                      placeholder="VD: 120 m²"
                      id="area"
                      required
                    />
                    <label for="area">Diện tích *</label>
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="form-floating">
                    <select
                      v-model="post.categoryId"
                      class="form-select"
                      id="category"
                      required
                    >
                      <option value="">Chọn loại tin</option>
                      <option
                        v-for="category in categories"
                        :key="category._id"
                        :value="category._id"
                      >
                        {{ category.name }}
                      </option>
                    </select>
                    <label for="category">Loại tin *</label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Địa chỉ -->
            <div class="form-section">
              <h5 class="section-title">
                <i class="fas fa-map-marker-alt me-2"></i>
                Địa chỉ bất động sản
              </h5>

              <div class="row g-3">
                <div class="col-md-6">
                  <div class="form-floating">
                    <select
                      v-model="post.provinceCode"
                      @change="fetchDistricts"
                      class="form-select"
                      required
                    >
                      <option value="">Chọn tỉnh/thành phố</option>
                      <option
                        v-for="province in provinces"
                        :key="province.code"
                        :value="province.code"
                      >
                        {{ province.name }}
                      </option>
                    </select>
                    <label>Tỉnh/Thành phố *</label>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-floating">
                    <select
                      v-model="post.districtCode"
                      @change="fetchWards"
                      class="form-select"
                      :disabled="!post.provinceCode"
                      required
                    >
                      <option value="">Chọn quận/huyện</option>
                      <option
                        v-for="district in districts"
                        :key="district.code"
                        :value="district.code"
                      >
                        {{ district.name }}
                      </option>
                    </select>
                    <label>Quận/Huyện *</label>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-floating">
                    <select
                      v-model="post.wardCode"
                      @change="updateWardName"
                      class="form-select"
                      :disabled="!post.districtCode"
                      required
                    >
                      <option value="">Chọn phường/xã</option>
                      <option
                        v-for="ward in wards"
                        :key="ward.code"
                        :value="ward.code"
                      >
                        {{ ward.name }}
                      </option>
                    </select>
                    <label>Phường/Xã *</label>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-floating">
                    <input
                      v-model="post.street"
                      type="text"
                      class="form-control"
                      placeholder="VD: Nguyễn Trãi"
                    />
                    <label>Tên đường</label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mô tả chi tiết -->
            <div class="form-section">
              <h5 class="section-title">
                <i class="fas fa-edit me-2"></i>
                Mô tả chi tiết
              </h5>

              <div class="form-floating">
                <textarea
                  v-model="post.description"
                  class="form-control"
                  placeholder="Nhập mô tả chi tiết về bất động sản"
                  id="description"
                  style="height: 120px"
                  required
                ></textarea>
                <label for="description">Mô tả chi tiết *</label>
              </div>
            </div>

            <!-- Hình ảnh -->
            <div class="form-section">
              <h5 class="section-title">
                <i class="fas fa-images me-2"></i>
                Hình ảnh bất động sản
              </h5>

              <div class="upload-area">
                <input
                  type="file"
                  class="form-control d-none"
                  id="imageUrls"
                  @change="handleImageUpload"
                  accept="image/*"
                  multiple
                />

                <label for="imageUrls" class="upload-btn">
                  <i class="fas fa-cloud-upload-alt me-2"></i>
                  Chọn hình ảnh
                  <span class="upload-note">(Tối thiểu 3 ảnh)</span>
                </label>

                <!-- Preview ảnh -->
                <div
                  class="image-preview-grid"
                  v-if="post.imageUrls.length > 0"
                >
                  <div
                    v-for="(img, index) in post.imageUrls"
                    :key="index"
                    class="image-preview-card"
                  >
                    <img :src="img" alt="preview" />
                    <button
                      type="button"
                      class="remove-btn"
                      @click="removeImage(index)"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="form-footer">
              <button type="submit" class="submit-btn">
                <i class="fas fa-rocket me-2"></i>
                <span>Đăng tin ngay</span>
                <div class="btn-shine"></div>
              </button>
            </div>
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
    categories() {
      const cate = this.$store.getters["category/categories"];
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
        this.post.imageUrls.splice(index, 1);
      } catch (error) {
        console.error("Lỗi xóa ảnh:", error);
        alert("Không thể xóa ảnh. Vui lòng thử lại.");
      }
    },

    generateSlug(text) {
      return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
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
          provinceCode: String(this.post.provinceCode),
          provinceName: this.post.provinceName,
          districtCode: String(this.post.districtCode),
          districtName: this.post.districtName,
          wardCode: String(this.post.wardCode),
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
/* Container và Layout */
.post-form-wrapper {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 24px;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.post-form-wrapper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="50" r="0.5" fill="white" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  pointer-events: none;
}

/* Header */
.form-header {
  color: white;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
}

.header-icon {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.header-icon i {
  font-size: 2.5rem;
  color: white;
}

.form-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.form-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
}

/* Form chính */
.post-form {
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  position: relative;
  z-index: 1;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

/* Sections */
.form-section {
  margin-bottom: 2.5rem;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 16px;
  border-left: 4px solid #667eea;
  position: relative;
}

.section-title {
  color: #2d3748;
  font-weight: 600;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
}

.section-title i {
  color: #667eea;
  width: 20px;
}

/* Form Controls */
.form-floating > .form-control,
.form-floating > .form-select {
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 25px 15px 6px 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.form-floating > .form-control:focus,
.form-floating > .form-select:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.15);
  transform: translateY(-2px);
}

.form-floating > label {
  color: #64748b;
  font-weight: 500;
}

.form-control-lg {
  font-size: 1.1rem;
  padding: 1.2rem;
}

/* Upload Area */
.upload-area {
  text-align: center;
}

.upload-btn {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 1.1rem;
  border: none;
  position: relative;
  overflow: hidden;
}

.upload-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
}

.upload-note {
  display: block;
  font-size: 0.9rem;
  opacity: 0.8;
  margin-top: 0.25rem;
}

/* Image Preview Grid */
.image-preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.image-preview-card {
  position: relative;
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.image-preview-card:hover {
  transform: scale(1.05);
}

.image-preview-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #ef4444;
  color: white;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.8rem;
}

.remove-btn:hover {
  background: #dc2626;
  transform: scale(1.1);
}

/* Submit Button */
.form-footer {
  text-align: center;
  margin-top: 2rem;
}

.submit-btn {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  border: none;
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  padding: 1rem 3rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-width: 200px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.submit-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(245, 158, 11, 0.4);
}

.btn-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  transition: left 0.5s ease;
}

.submit-btn:hover .btn-shine {
  left: 100%;
}

/* Responsive */
@media (max-width: 768px) {
  .post-form-wrapper {
    margin: 1rem;
    padding: 1.5rem;
  }

  .post-form {
    padding: 2rem 1.5rem;
  }

  .form-section {
    padding: 1rem;
    margin-bottom: 2rem;
  }

  .form-title {
    font-size: 2rem;
  }

  .image-preview-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .submit-btn {
    width: 100%;
    padding: 1rem 2rem;
  }
}

@media (max-width: 576px) {
  .form-title {
    font-size: 1.75rem;
  }

  .header-icon {
    width: 60px;
    height: 60px;
  }

  .header-icon i {
    font-size: 2rem;
  }

  .image-preview-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
}

/* Animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-section {
  animation: fadeInUp 0.6s ease-out;
}

.form-section:nth-child(2) {
  animation-delay: 0.1s;
}
.form-section:nth-child(3) {
  animation-delay: 0.2s;
}
.form-section:nth-child(4) {
  animation-delay: 0.3s;
}
.form-section:nth-child(5) {
  animation-delay: 0.4s;
}
</style>
