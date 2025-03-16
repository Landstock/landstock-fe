<template>
  <div class="bg-view position-relative overflow-hidden">
    <div class="overlay"></div>
    <img
      class="w-100"
      src="	https://bds59.giaodienwebmau.com/wp-content/uploads/2022/07/ve-chung-toi.jpg"
      alt="Về chúng tôi"
    />
    <div
      class="view-text position-absolute top-50 start-50 translate-middle text-center p-3"
    >
      <h1 class="text-white">VỀ CHÚNG TÔI</h1>
    </div>
  </div>
  <div class="container my-5">
    <!-- giới thiệu  -->
    <div class="row">
      <div class="col-3 text-center">
        <h3>Giới thiệu</h3>
      </div>
      <div class="col-9 mb-4">
        <p>
          Thị trường bất động sản Việt Nam đang phát triển mạnh mẽ với nhiều cơ
          hội và thách thức. Chúng tôi tự hào là một đơn vị uy tín, chuyên cung
          cấp các giải pháp bất động sản toàn diện từ mua bán, cho thuê đến đầu
          tư và phát triển dự án.
        </p>
        <p>
          Với đội ngũ chuyên gia giàu kinh nghiệm và am hiểu thị trường, chúng
          tôi cam kết mang đến những sản phẩm và dịch vụ chất lượng cao, đáp ứng
          nhu cầu của khách hàng một cách chuyên nghiệp và minh bạch. Sứ mệnh
          của chúng tôi là trở thành cầu nối giữa khách hàng và những cơ hội đầu
          tư bất động sản tiềm năng nhất.
        </p>
      </div>
    </div>

    <!-- tầm nhìn  -->
    <div class="row">
      <div class="col-3 text-center">
        <h3>Tầm nhìn</h3>
      </div>
      <div class="col-9 mb-4">
        <p>
          Chúng tôi hướng tới trở thành thương hiệu hàng đầu trong lĩnh vực bất
          động sản, không chỉ trong nước mà còn vươn tầm quốc tế. Với chiến lược
          phát triển bền vững, chúng tôi tập trung vào các dự án có giá trị thực
          tiễn cao, đáp ứng xu hướng sống hiện đại, xanh và thông minh.
        </p>
        <p>
          Tầm nhìn của chúng tôi là kiến tạo không gian sống lý tưởng, đồng thời
          góp phần vào sự phát triển chung của thị trường bất động sản Việt Nam.
          Bằng cách ứng dụng công nghệ và tối ưu hóa dịch vụ, chúng tôi mong
          muốn mang lại trải nghiệm tốt nhất cho khách hàng, giúp họ an tâm khi
          đưa ra quyết định đầu tư.
        </p>
      </div>
    </div>

    <!-- sứ mệnh  -->
    <div class="row">
      <div class="col-3 text-center">
        <h3>Sứ mệnh</h3>
      </div>
      <div class="col-9">
        <p>
          Sứ mệnh của chúng tôi là đem đến những giải pháp bất động sản tối ưu,
          phù hợp với nhu cầu của từng khách hàng. Chúng tôi không chỉ tập trung
          vào việc giao dịch bất động sản, mà còn chú trọng đến giá trị lâu dài,
          mang lại lợi ích bền vững cho khách hàng và cộng đồng.
        </p>
        <p>
          Chúng tôi cam kết xây dựng môi trường làm việc chuyên nghiệp, minh
          bạch và đặt lợi ích của khách hàng lên hàng đầu. Đội ngũ chuyên gia
          của chúng tôi luôn sẵn sàng hỗ trợ và tư vấn những chiến lược đầu tư
          hiệu quả nhất, giúp khách hàng tiếp cận những dự án bất động sản tiềm
          năng với mức lợi nhuận cao.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-view {
  z-index: 0;
}

.bg-view img {
  height: 400px;
  object-fit: cover;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.view-text {
  position: absolute;
  z-index: 2;
}

.container p {
  font-size: 18px;
}
</style>
