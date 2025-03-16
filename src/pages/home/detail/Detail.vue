<template>
  <!-- tìm kiếm  -->
  <div class="background">
    <div class="container">
      <div class="row">
        <div class="tab-search">
          <Search />
        </div>
      </div>
    </div>
  </div>
  <!-- nội dung  -->
  <div class="container">
    <div class="row mt-4">
      <div class="col-9">
        <div class="information-image">
          <div class="large-image">
            <img
              :src="currentImage"
              alt="Property Image"
              class="large-image-display"
            />
          </div>
          <!-- Danh sách ảnh nhỏ -->
          <div class="thumbnail-images">
            <img
              v-for="(img, index) in property[0].image"
              :key="index"
              :src="img"
              alt="Thumbnail"
              class="thumbnail"
              @click="changeImage(img)"
            />
          </div>
        </div>
        <div class="description">
          <span>thông tin mô tả</span>
          <pre>
Tôi cần bán đất tại Phường Phú Khương, Tp Bến Tre, tỉnh Bến Tre
► Diện tích: 278.6m² (trong đó có 200m² đất ở tại đô thị, 78.6m² đất trồng cây lâu năm)
⚡ Đường trước nhà thông ra đường lớn oto 7 chỗ đi thoải mái.
⚡ Đất ở khu dân cư đông đúc, gần chợ, trường học, bệnh viện, cách Bách Hóa Xanh 200m. Tiện ích đầy đủ.
⭐️ Trên đất đã có nhà kiên cố, có thể dọn về ở luôn.
⭐️ Khu vực thoáng mát, yên tĩnh rất thích hợp để ở.
⚡ Giá bán: 10 triệu/m²
Qúy khách có nhu cầu vui lòng liên hệ chính chủ: Chị Tâm SĐT ☎️ 0898753761
  </pre
          >
          <div>
            <span>Tìm kiếm theo từ khóa</span>
          </div>
        </div>
      </div>
      <!-- Thông tin liên hệ -->
      <div class="col-3 contact-card">
        <h4 class="contact-title">Liên hệ người đăng</h4>
        <div class="avatar-section text-center">
          <img
            class="avatar-img"
            src="https://bds.com.vn/images/avartarmember.png"
            alt="Avatar"
          />
          <p class="name">Nguyễn Văn A</p>
          <p class="status">Đã sẵn sàng tư vấn cho bạn</p>
        </div>
        <div class="contact-info">
          <div class="d-flex justify-content-between">
            <a href="tel:0123456789" class="contact-item call"
              ><i class="fa-solid fa-phone"></i> 0123456789</a
            >
            <a href="" class="contact-item zalo">
              <img
                src="https://bds.com.vn/modules/products/assets/images/zalo.png"
                alt="Chat Zalo"
                class="icon"
              />
              Chat qua Zalo
            </a>
          </div>
          <a href="" class="view-more"
            ><img
              src="https://bds.com.vn/modules/products/assets/images/arrow04.gif"
              alt=""
            />
            Xem tất cả tin đăng của người đăng</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "@/components/nav/Search.vue";

export default {
  components: {
    Search,
  },
  data() {
    return {
      property: [
        {
          id: 1,
          image: [
            "https://bds.com.vn/images/products/2024/12/large/z6095730901769_41a52be28eca70d893b8bc6d0119f1ff.jpg",
            "https://bds.com.vn/images/products/2024/12/large/z6095730868981_8128e4759bfb2984f517d148db7c4552.jpg",
            "https://bds.com.vn/images/products/2024/12/large/z6095730837812_d41bc6afab94cbc2cc4a3cb6e5f4b6e1.jpg",
          ],
          title: "Chính chủ bán 278.6m² đất tại Phường Phú Khương, Tp Bến Tre",
        },
      ],
      currentImage: "", // Ảnh lớn hiện tại
    };
  },
  created() {
    this.currentImage = this.property[0].image[0]; // Mặc định ảnh lớn là ảnh đầu tiên
  },
  methods: {
    changeImage(image) {
      this.currentImage = image; // Thay đổi ảnh lớn khi click vào ảnh nhỏ
    },
  },
};
</script>

<style scoped>
/* Bố cục tổng thể */
.background {
  background-color: #f3f4f7;
  padding: 20px 0;
}

.tab-search {
  margin-top: 40px;
}

/* các thông tin và ảnh  */
.information-image {
  border: 1px solid #f0f2f5;
  border-radius: 10px;
}
.large-image-display {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 16px;
}

.thumbnail-images {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.thumbnail {
  width: 80px;
  height: 80px;
  border: 2px solid #ddd;
  border-radius: 4px;
  object-fit: cover;
  cursor: pointer;
}

.thumbnail:hover {
  border-color: #007bff;
}

/* Card thông tin liên hệ */
.contact-card {
  background-color: #f0f2f5;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  height: 320px;
  top: 75px;
}

.contact-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
  text-align: center;
}

.avatar-section {
  margin-bottom: 20px;
}

.avatar-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 8px;
}

.name {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.status {
  font-size: 14px;
  color: #666;
}

/* Thông tin liên hệ */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.contact-info a {
  padding: 4px 18px;
  border-radius: 6px;
}

.contact-item {
  border: 1px solid #009ba1;
  color: #fff;
  background-color: #009ba1;
  font-size: 14px;
  text-decoration: none;
  align-items: center;
  gap: 6px;
}

.call {
  background-color: #009ba1;
}

.zalo {
  background-color: #28a745;
}

.view-more {
  font-size: 14px;
  text-decoration: none;
}

.contact-item:hover {
  text-decoration: none;
  background-color: #83c8cb;
}

.icon {
  width: 20px;
  height: 20px;
}
</style>
