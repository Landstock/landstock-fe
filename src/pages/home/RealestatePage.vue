<template>
  <section>
    <!-- banner  -->
    <div class="position-relative">
      <img
        class="banner-img"
        src="	https://bds49.giaodienwebmau.com/wp-content/uploads/2020/08/slider-2.jpg"
        alt=""
      />
      <div
        class="position-absolute top-50 start-50 translate-middle search-container"
      >
        <div class="text-white text-center text-uppercase">
          <h2 class="banner-title">Tìm kiếm bất động sản dự án</h2>
          <h6>Tìm dự án nhà đất phù hợp với nhu cầu của bạn</h6>
        </div>

        <div class="box-search">
          <search></search>
        </div>
        <!-- Category Icons -->
        <div
          class="category-icons d-flex justify-content-evenly text-center flex-wrap gap-3"
        >
          <router-link
            v-for="item in categories"
            :key="item.slug"
            :to="`/danh-sach/${item.slug}`"
            class="category-item text-decoration-none"
          >
            <img
              v-if="item.icon"
              :src="item.icon"
              alt="icon"
              class="img-fluid"
              style="margin-bottom: 10px"
            />
            <h3>{{ item.name }}</h3>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Bất động sản mới nhất -->
    <div class="container">
      <div class="row mb-4">
        <div class="mt-5 tilte text-center">
          <h2>Bất động sản <span>mới nhất</span></h2>

          <img
            src="https://bds49.giaodienwebmau.com/wp-content/uploads/2020/07/bg_title.png"
            alt=""
          />
        </div>
        <new-item></new-item>
      </div>
    </div>

    <!-- Bất động sản nổi bật -->
    <div class="bg-color py-4">
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
    </div>

    <!-- Tin tức bất động sản -->
    <new-realestate></new-realestate>

    <!-- Các dự án triển khai tại 1 số thành phố -->
    <div class="bg-color">
      <projects-by-city></projects-by-city>
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
import ProjectsByCity from "./project-bycity/ProjectsByCity.vue";
import NewItem from "@/components/homepage/NewItem.vue";

export default {
  components: {
    Search,
    OutstandingItem,
    // HouseItem,
    NewRealestate,
    SectionContent,
    ProjectsByCity,
    NewItem,
  },
  data() {
    return {
      categories: [
        {
          name: "Căn hộ",
          slug: "can-ho",
          icon: "https://bizweb.dktcdn.net/100/393/384/themes/894826/assets/collection_1.png?1753167401033",
        },
        {
          name: "Biệt thự",
          slug: "biet-thu-ban",
          icon: "https://bizweb.dktcdn.net/100/393/384/themes/894826/assets/collection_2.png?1753167401033",
        },
        {
          name: "Chung cư",
          slug: "chung-cu",
          icon: "https://bizweb.dktcdn.net/100/393/384/themes/894826/assets/collection_3.png?1753167401033",
        },
        {
          name: "Nhà",
          slug: "nha-dat-ban",
          icon: "https://bizweb.dktcdn.net/100/393/384/themes/894826/assets/collection_4.png?1753167401033",
        },
      ],

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
/* Ảnh banner mặc định */
.banner-img {
  width: 100%;
  height: auto;
  display: block;
}

/* Tiêu đề mặc định */
.banner-title {
  font-size: 40px;
  margin-top: 70px;
}

/* Tablet: từ 768px đến 991px */
@media (min-width: 768px) and (max-width: 991px) {
  .banner-img {
    width: auto;
    max-width: 100%;
    height: 610px;
    margin: 0 auto;
    display: block;
  }

  .banner-title {
    margin-top: 0;
  }
}

/* Mobile: dưới 768px */
@media (max-width: 767px) {
  .banner-img {
    width: 100%;
    height: 700px;
  }

  .banner-title {
    font-size: 24px;
    margin-top: 145px;
  }
}

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

.category-item {
  width: 80px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}
.category-item:hover {
  transform: scale(1.2);
}
.category-item .img {
  /* font-size: 15px; */
  color: white;
}
.category-item h3 {
  font-size: 15px;
  color: white;
}
.category-item:hover h3 {
  color: #2f80ed;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
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
