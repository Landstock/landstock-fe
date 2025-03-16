<template>
  <div class="mt-4">
    <div class="container">
      <div class="row bg-line g-0">
        <!-- tin tức -->

        <h3>Tin tức bất động sản</h3>
      </div>

      <div class="row mt-3 mb-5">
        <!-- bên trái -->
        <div class="col-6">
          <img
            src="https://bds.com.vn/images/news/2024/10/04/large/dich-vu-edit-bds-chuyen-nghiep_1728048987.jpg"
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
            "https://bds.com.vn/images/news/2024/07/30/resized/can-ho08_1722304228.jpg",
          title: "Chính chủ bán 278.6m² đất tại Phường Phú Khương, Tp Bến Tre ",
        },
        {
          image:
            "https://bds.com.vn/images/news/2024/07/30/resized/gggg_page-0009_1722304144.jpg",
          title: "Sống tại Vinhomes Grand Park sướng như thế nào?",
        },
        {
          image:
            "https://bds.com.vn/images/news/2024/07/30/resized/nha-rieng05_1722304263.jpg",
          title: "Đầu tư bất động sản với lợi nhuận cao",
        },
        {
          image:
            "https://bds.com.vn/images/news/2024/07/30/resized/moi-gioi-va-chi-phi-tim-kiem-data-–-tim-kiem-khach-hang_1722304107.png",
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

.container img {
  width: 100%;
  object-fit: cover;
  border-radius: 4px;
}
</style>
