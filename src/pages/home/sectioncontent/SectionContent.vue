<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-12">
        <h2 class="mb-4">Tại sao chọn chúng tôi?</h2>
      </div>
    </div>
    <div class="row text-center">
      <div
        v-for="(item, index) in infoList"
        :key="index"
        class="col-md-4 col-sm-12 mb-4"
      >
        <div class="card p-4 text-center h-100 shadow-sm">
          <div class="information-icon mb-3">
            <img :src="item.icon" alt="icon" class="img-fluid" />
          </div>
          <div class="information-text">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row text-center py-3 justify-content-center">
      <div class="col-lg-3 col-md-3 col-sm-3 mb-4">
        <h2 class="fw-bold">12,200</h2>
        <p class="text-muted">Sản phẩm</p>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-3 mb-4">
        <h2 class="fw-bold">63</h2>
        <p class="text-muted">Tỉnh/Thành phố</p>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-3 mb-4">
        <h2 class="fw-bold">1,200</h2>
        <p class="text-muted">Khách hàng</p>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-3 mb-4">
        <h2 class="fw-bold">663</h2>
        <p class="text-muted">Đối tác</p>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-6 col-md-10 mx-auto text-center">
        <p>
          Chúng tôi luôn cam kết mang đến cho khách hàng những sản phẩm chất
          lượng cao, đảm bảo uy tín trong từng giao dịch. Mọi giấy tờ, hồ sơ đều
          minh bạch, rõ ràng, giúp khách hàng an tâm khi lựa chọn.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      infoList: [
        {
          icon: "https://bds59.giaodienwebmau.com/wp-content/uploads/2022/07/icon01.png",
          title: "Uy tín chất lượng",
          description:
            "Cam kết sản phẩm chất lượng, giao dịch uy tín, đặt lợi ích khách hàng lên hàng đầu.",
        },
        {
          icon: "https://bds59.giaodienwebmau.com/wp-content/uploads/2022/07/33.png",
          title: "Thông tin minh bạch",
          description:
            "Cung cấp thông tin minh bạch. Giấy tờ sổ sách đầy đủ để khách hàng an tâm.",
        },
        {
          icon: "https://bds59.giaodienwebmau.com/wp-content/uploads/2022/07/icon03.png",
          title: "Giá tốt",
          description:
            "Mức giá tốt nhất thị trường, không phí ẩn. Báo giá rõ ràng, cụ thể. Lợi nhuận cao cho nhà đầu tư.",
        },
      ],
    };
  },
};
</script>

<style scoped>
.card img {
  max-width: 60px;
}

.fw-bold {
  color: #f2994a;
}

.text-muted {
  font-weight: bold;
}
</style>
