<template>
  <section>
    <!-- banner  -->
    <div class="position-relative">
      <img
        class="w-100"
        src="	https://bds59.giaodienwebmau.com/wp-content/uploads/2022/07/slider1.jpg"
        alt=""
      />
      <div
        class="position-absolute top-50 start-50 translate-middle search-container"
      >
        <div class="box-search">
          <search></search>
        </div>
      </div>
    </div>
    <!-- noi bat  -->
    <div class="bg-color">
      <div class="container">
        <div class="row">
          <div class="mt-5">
            <h2>bất động sản nổi bật</h2>
          </div>
          <outstanding-item></outstanding-item>
        </div>
      </div>
    </div>
    <!-- new bds  -->

    <new-realestate></new-realestate>

    <!-- dự án nổi bật  -->
    <div class="bg-color">
      <div class="container">
        <div class="row">
          <div class="mt-4">
            <h2>Dự án nổi bật</h2>
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

    <!-- thông tin uy tín  -->
    <section-content></section-content>
  </section>
</template>

<script>
import Search from "@/components/nav/Search.vue";
import OutstandingItem from "@/components/homepage/OutstandingItem.vue";
import NewRealestate from "./realestatenew/NewRealestate.vue";
import SectionContent from "./sectioncontent/SectionContent.vue";

export default {
  components: {
    Search,
    OutstandingItem,
    NewRealestate,
    SectionContent,
  },
  data() {
    return {
      properties: [
        {
          id: 1,
          image:
            "https://bds.com.vn/images/duan/small/vinhomes-grand-park-quan-9_1710126960.jpg",
          title:
            "VinHomes Grand Park Quận 9 - 0979.79.79.69 - Giá Gốc Chủ Đầu Tư ✔️",
          address: "Quận 9 TPHCM",
        },
        {
          id: 2,
          image:
            "https://bds.com.vn/images/duan/small/vinhomes-grand-park-quan-9_1710126960.jpg",
          title:
            "VinHomes Grand Park Quận 9 - 0979.79.79.69 - Giá Gốc Chủ Đầu Tư ✔️",
          address: "Quận 9 TPHCM",
        },
        {
          id: 3,
          image:
            "https://bds.com.vn/images/duan/small/vinhomes-grand-park-quan-9_1710126960.jpg",
          title:
            "VinHomes Grand Park Quận 9 - 0979.79.79.69 - Giá Gốc Chủ Đầu Tư ✔️",
          address: "Quận 9 TPHCM",
        },
        {
          id: 4,
          image:
            "https://bds.com.vn/images/duan/small/vinhomes-grand-park-quan-9_1710126960.jpg",
          title:
            "VinHomes Grand Park Quận 9 - 0979.79.79.69 - Giá Gốc Chủ Đầu Tư ✔️",
          address: "Quận 9 TPHCM",
        },
      ],
    };
  },
};
</script>

<style scoped>
h2 {
  text-transform: uppercase;
}

.bg-color {
  background-color: #f3f4f7;
}

/* banner  */
.search-container {
  width: 80%;
  max-width: 1200px;
}

.box-search {
  background: rgba(0, 0, 0, 0.45);
  border-radius: 8px;
  color: #fff;
  padding: 20px;
}

/* dự án nổi bật  */
.image-wrapper {
  position: relative;
  height: 400px; /* Hoặc chiều dài bạn muốn */
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.image-wrapper img {
  object-fit: cover; /* Để hình ảnh phù hợp với kích thước container */
  height: 100%;
}
.image-wrapper:hover {
  transform: scale(1.05);
}
.proper-text {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  /* background: rgba(0, 0, 0, 0.6); */
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
