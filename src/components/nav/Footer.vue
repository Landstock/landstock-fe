<template>
  <footer>
    <div class="container pt-5">
      <div class="row">
        <!-- Phần giới thiệu -->
        <div class="col-lg-6 col-md-12 col-sm-12 mb-4 footer-text">
          <h5>Kênh đăng tin bất động sản hiệu quả</h5>
          <p>
            Địa chỉ: Tầng 5 - tòa nhà AC, Ngõ 78 Duy Tân, Dịch Vọng, Cầu Giấy,
            Hà Nội
          </p>
          <p><a href="#">AGORA CITY</a></p>
          <p><a href="#">AGORA CITY</a></p>
        </div>

        <!-- Nhà đất nổi bật -->
        <div class="col-lg-2 col-md-4 col-sm-6 mb-4 footer-information">
          <h5 class="highlight">Nhà đất nổi bật</h5>
          <p><a href="#">Bán đất Hòa Bình</a></p>
          <p><a href="#">Bán đất Hải Phòng</a></p>
          <p><a href="#">Bán đất Kỳ Sơn</a></p>
          <p><a href="#">Nhà đất Long An</a></p>
        </div>

        <!-- Quy định -->
        <div class="col-lg-2 col-md-4 col-sm-6 mb-4 footer-information">
          <h5 class="highlight">Quy định</h5>
          <p><a href="#">Liên hệ</a></p>
          <p><a href="#">Chính sách bảo mật</a></p>
          <p><a href="#">Quy chế hoạt động</a></p>
          <p><a href="#">Quy định đăng tin</a></p>
          <p><RouterLink to="/ve-chung-toi">Về chúng tôi</RouterLink></p>
        </div>

        <!-- Mạng xã hội -->
        <div class="col-lg-2 col-md-4 col-sm-12 mb-4">
          <h5 class="highlight">Mạng xã hội</h5>
          <div class="mb-2 icon">
            <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="#"><i class="fa-brands fa-twitter"></i></a>
            <a href="#"><i class="fa-brands fa-google"></i></a>
            <a href="#"><i class="fa-brands fa-youtube"></i></a>
            <a href="#"> <i class="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div class="divider mt-3"></div>

    <!-- Copyright -->
    <div class="text-center py-4">
      <span>Copyright &copy; 2024 Bất Động Sản Hiệu Quả</span>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: #333;
  color: #fff;
  font-weight: bold;
}

footer p,
footer a {
  color: #fff;
  text-decoration: none;
}

footer a:hover {
  color: #00a6bd;
}

footer h5 {
  text-transform: uppercase;
  margin-bottom: 1rem;
}

footer h5.highlight {
  color: #00a6bd;
}

.icon {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.icon a {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  border-radius: 50%;
  background-color: #5a5a5a;
  font-size: 18px;
  color: #fff;
  text-decoration: none;
}

.icon a:hover {
  background-color: #00a6bd;
  color: #fff;
}

.divider {
  width: 100%;
  height: 2px;
  background-color: #ccc;
}

@media screen and (max-width: 992px) {
  .footer-text {
    border-bottom: 1px solid white;
  }
}
@media screen and (max-width: 768px) {
  .footer-information {
    border-bottom: 1px solid white;
  }
}
</style>
