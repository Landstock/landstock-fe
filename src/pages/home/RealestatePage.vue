<template>
  <section>
    <!-- banner  -->
    <div class="position-relative">
      <img
        class="w-100"
        src="	https://bds49.giaodienwebmau.com/wp-content/uploads/2020/08/slider-2.jpg"
        alt=""
      />
      <div
        class="position-absolute top-50 start-50 translate-middle search-container"
      >
        <div class="text-white text-center text-uppercase pb-3">
          <h2 style="font-size: 40px">Trang tin bất động sản số 1 Việt Nam</h2>
        </div>
        <div class="box-search">
          <search></search>
        </div>
      </div>
    </div>

    <!-- Bất động sản nổi bật -->
    <div class="container">
      <div class="row mb-4">
        <div class="mt-5 tilte text-center">
          <h2>Bất động sản <span>nổi bật</span></h2>
          <img
            src="https://bds49.giaodienwebmau.com/wp-content/uploads/2020/07/bg_title.png"
            alt=""
          />
        </div>
        <outstanding-item></outstanding-item>
      </div>
    </div>

    <!-- Nhà đất nổi bật -->
    <div class="bg-color py-4">
      <div class="container">
        <house-item></house-item>
      </div>
    </div>

    <!-- Tin tức bất động sản -->
    <new-realestate></new-realestate>

    <!-- Dự án nổi bật -->
    <div class="bg-color">
      <div class="container">
        <div class="row">
          <div class="my-4 tilte text-center">
            <h2>Các dự án <span>tại các thành phố</span></h2>
            <img
              src="https://bds49.giaodienwebmau.com/wp-content/uploads/2020/07/bg_title.png"
              alt=""
            />
          </div>
          <div
            class="col-lg-3 col-md-6 col-sm-12 my-4"
            v-for="(property, index) in properties"
            :key="index"
          >
            <div class="image-wrapper">
              <img :src="property.image" alt="" />
              <div class="proper-text">
                <p class="title">{{ property.title }}</p>
                <p class="address">{{ property.address }}</p>
              </div>
            </div>
          </div>

          <div class="col-12 d-flex justify-content-center">
            <router-link to="/danh-sach-du-an">
              <button class="btn-color mb-5 px-4 py-2">Xem tất cả</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Thông tin uy tín -->
    <div>
      <section-content></section-content>
    </div>
  </section>
</template>

<script>
import Search from "@/components/nav/Search.vue";
import OutstandingItem from "@/components/homepage/OutstandingItem.vue";
import NewRealestate from "./realestatenew/NewRealestate.vue";
import SectionContent from "./sectioncontent/SectionContent.vue";
import HouseItem from "@/components/homepage/HouseItem.vue";

export default {
  components: {
    Search,
    OutstandingItem,
    HouseItem,
    NewRealestate,
    SectionContent,
  },
  data() {
    return {
      properties: [
        {
          id: 1,
          image:
            "https://bds49.giaodienwebmau.com/wp-content/uploads/2020/07/img24.jpg",
          title:
            "VinHomes Grand Park Quận 9 - 0979.79.79.69 - Giá Gốc Chủ Đầu Tư ✔️",
          address: "Quận 9 TPHCM",
          price: "2.79 tỷ",
          area: "278.6 m2",
        },
        {
          id: 2,
          image:
            "	https://bds49.giaodienwebmau.com/wp-content/uploads/2020/07/img22.jpg",
          title:
            "VinHomes Grand Park Quận 9 - 0979.79.79.69 - Giá Gốc Chủ Đầu Tư ✔️",
          address: "Quận 9 TPHCM",
          price: "2.79 tỷ",
          area: "278.6 m2",
        },
        {
          id: 3,
          image:
            "	https://bds49.giaodienwebmau.com/wp-content/uploads/2020/07/img14.jpg",
          title:
            "VinHomes Grand Park Quận 9 - 0979.79.79.69 - Giá Gốc Chủ Đầu Tư ✔️",
          address: "Quận 9 TPHCM",
          price: "2.79 tỷ",
          area: "278.6 m2",
        },
        {
          id: 4,
          image:
            "	https://bds49.giaodienwebmau.com/wp-content/uploads/2020/07/img1.jpg",
          title:
            "VinHomes Grand Park Quận 9 - 0979.79.79.69 - Giá Gốc Chủ Đầu Tư ✔️",
          address: "Quận 9 TPHCM",
          price: "2.79 tỷ",
          area: "278.6 m2",
        },
      ],
    };
  },
};
</script>

<style scoped>
.tilte h2 {
  font-size: 30px;
}

.tilte:hover {
  color: red;
}

.tilte span {
  color: #00abb8;
}

.bg-color {
  background-color: #f3f4f7;
}

/* banner */
.search-container {
  width: 80%;
  max-width: 1200px;
}

.box-search {
  /* background: #ffffff20; */
  border-radius: 8px;
  color: #fff;
  padding: 20px;
}

/* nhà đất nổi bật */

/* dự án nổi bật */
.image-wrapper {
  position: relative;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.image-wrapper img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.image-wrapper:hover {
  transform: scale(1.05);
}

.proper-text {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  color: #fff;
  padding: 10px;
}

.proper-text .title {
  font-size: 15px;
  font-weight: bold;
}

.proper-text .address {
  font-size: 13px;
}

.btn-color {
  border: 1px solid #999;
  background-color: #fff;
  border-radius: 6px;
}

.btn-color:hover {
  border: 1px solid #3c9f10;
  background-color: #3c9f10;
  color: #fff;
}
</style>
