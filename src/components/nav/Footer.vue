<template>
  <footer>
    <div class="container pt-5">
      <div class="row">
        <!-- Phần giới thiệu -->
        <div class="col-lg-5 col-md-12 col-sm-12 mb-4">
          <div class="footer-logo-wrapper">
            <!-- <img
              src="../../assets/image/logo.png"
              alt="Logo"
              class="footer-logo"
            /> -->

            <div class="footer-contact">
              <p>
                Địa chỉ: Tầng 5 - tòa nhà AC, Ngõ 78 Duy Tân, Dịch Vọng, Cầu
                Giấy, Hà Nội
              </p>
              <p>
                <a href="tel:0123456789">
                  <i class="fa-solid fa-phone"></i> Điện thoại: 0123456789
                </a>
              </p>
              <p>
                <a href="mailto:example@gmail.com">
                  <i class="fa-solid fa-envelope"></i> Email: example@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <!-- Nhà đất nổi bật -->
        <div class="col-lg-2 col-md-4 col-sm-6 mb-4 footer-information">
          <h5 class="highlight">Giới thiệu</h5>
          <p><a href="#">Trang chủ</a></p>
          <p><a href="#">Tin tức</a></p>
          <p><a href="#">Liên hệ</a></p>
          <p><RouterLink to="/ve-chung-toi">Về chúng tôi</RouterLink></p>
        </div>

        <!-- Quy định -->
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4 footer-information">
          <h5 class="highlight">Chính sách & Quy định</h5>
          <p><a href="#">Chính sách bảo mật</a></p>
          <p><a href="#">Quy chế hoạt động</a></p>
          <p><a href="#">Quy định đăng tin</a></p>
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
    <!-- <div class="text-center py-4">
      <span>Copyright &copy; Bất Động Sản Hiệu Quả</span>
    </div> -->
  </footer>
</template>

<style scoped>
footer {
  background-color: #f2f2f2;
  color: #333;
  font-weight: bold;
}

footer p,
footer a {
  color: #333;
  text-decoration: none;
}

.footer-logo-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 20px;
}

.footer-contact {
  flex: 1;
}

.footer-logo {
  max-width: 100px;
  height: auto;
  margin-top: 4px;
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
