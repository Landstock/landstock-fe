<template>
  <div class="mt-4">
    <div class="container">
      <div class="row bg-line g-0">
        <!-- tin tức -->
        <div class="d-flex justify-content-between">
          <h3 style="color: #00abb8">Tin tức</h3>
          <button class="text">Xem thêm ></button>
        </div>
      </div>

      <div class="row mt-3 mb-5">
        <!-- bên trái -->
        <div class="col-6 img-left">
          <img
            src="https://bds59.giaodienwebmau.com/wp-content/uploads/2022/07/nhung-luu-y-quan-trong-trong-phong-thuy-khi-mua-nha-giup-thu-hut-tai-loc_62c495c0645d1.jpeg"
            alt="Main Image"
            class="img-fluid"
          />
          <p>Dịch Vụ Edit Video Bất Động Sản Quang Khoa Land</p>
        </div>

        <!-- bên phải -->
        <div class="col-6">
          <div class="row">
            <div
              class="col-6"
              v-for="(property, index) in properties"
              :key="index"
            >
              <img :src="property.image" alt="" class="img-fluid" />
              <p>{{ property.title }}</p>
            </div>
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
      properties: [
        {
          image:
            "https://bds59.giaodienwebmau.com/wp-content/uploads/2022/07/can-ho-chung-cu-va-nhung-dieu-khach-hang-quan-tam-nhat_62c495b92a5d5.jpeg",
          title: "Chính chủ bán 278.6m² đất tại Phường Phú Khương, Tp Bến Tre ",
        },
        {
          image:
            "https://bds59.giaodienwebmau.com/wp-content/uploads/2022/07/nhung-kieng-ky-chu-y-nen-tranh-khi-chon-mua-nha_62c495b371bde.jpeg",
          title: "Sống tại Vinhomes Grand Park sướng như thế nào?",
        },
        {
          image:
            "https://bds59.giaodienwebmau.com/wp-content/uploads/2022/07/nhung-luu-y-quan-trong-trong-phong-thuy-khi-mua-nha-giup-thu-hut-tai-loc_62c495c0645d1.jpeg",
          title: "Đầu tư bất động sản với lợi nhuận cao",
        },
        {
          image:
            "https://bds59.giaodienwebmau.com/wp-content/uploads/2022/07/nhung-kieng-ky-chu-y-nen-tranh-khi-chon-mua-nha_62c495b371bde.jpeg",
          title: "Căn hộ cao cấp tại trung tâm thành phố",
        },
      ],
    };
  },
};
</script>

<style scoped>
.bg-line {
  border-bottom: 1px solid #ddd;
}

.text {
  width: 100px;
  height: 30px;
  font-size: 14px;
  border-radius: 8px;
  color: #fff;
  border: 1px solid #00abb8;
  background-color: #00abb8;
}

.text:hover {
  background-color: #fff;
  color: #00abb8;
  border: 1px solid #333;
}

.container img {
  width: 100%;
  object-fit: cover;
  border-radius: 4px;
}

/* Giới hạn chiều cao ảnh nhỏ bên phải */
/* .col-6 .img-fluid {
  height: 150px;
  margin-bottom: 12px;
} */

/* Ảnh lớn bên trái cho chiều cao cố định để đồng bộ */
.img-left img {
  height: 100%;
  max-height: 446px;
  object-fit: cover;
  border-radius: 4px;
}
</style>
