<template>
  <div class="container">
    <div class="row">
      <div class="fea-text">
        <h2>Danh sách dự án bất động sản</h2>
      </div>
      <router-link
        class="product-list col-lg-3 col-md-4 col-sm-6 mb-4"
        v-for="(property, index) in properties"
        :key="index"
      >
        <div
          class="image-wrapper"
          :class="{ 'special-style': property.special }"
        >
          <img :src="property.image" alt="" />
          <div class="proper-text">
            <p class="title">{{ property.title }}</p>
            <p class="address">{{ property.address }}</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
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
        {
          id: 5,
          image:
            "https://bds.com.vn/images/duan/small/vinhomes-grand-park-quan-9_1710126960.jpg",
          title:
            "VinHomes Grand Park Quận 9 - 0979.79.79.69 - Giá Gốc Chủ Đầu Tư ✔️",
          address: "Quận 9 TPHCM",
        },
        {
          id: 6,
          image:
            "https://bds.com.vn/images/duan/small/vinhomes-grand-park-quan-9_1710126960.jpg",
          title:
            "VinHomes Grand Park Quận 9 - 0979.79.79.69 - Giá Gốc Chủ Đầu Tư ✔️",
          address: "Quận 9 TPHCM",
        },
        {
          id: 7,
          image:
            "https://bds.com.vn/images/duan/small/vinhomes-grand-park-quan-9_1710126960.jpg",
          title:
            "VinHomes Grand Park Quận 9 - 0979.79.79.69 - Giá Gốc Chủ Đầu Tư ✔️",
          address: "Quận 9 TPHCM",
        },
        {
          id: 8,
          image:
            "https://bds.com.vn/images/duan/small/vinhomes-grand-park-quan-9_1710126960.jpg",
          title:
            "VinHomes Grand Park Quận 9 - 0979.79.79.69 - Giá Gốc Chủ Đầu Tư ✔️",
          address: "Quận 9 TPHCM",
        },
        {
          id: 9,
          image:
            "https://bds.com.vn/images/duan/small/vinhomes-grand-park-quan-9_1710126960.jpg",
          title:
            "VinHomes Grand Park Quận 9 - 0979.79.79.69 - Giá Gốc Chủ Đầu Tư ✔️",
          address: "Quận 9 TPHCM",
        },
        {
          id: 10,
          image:
            "https://bds.com.vn/images/duan/small/vinhomes-grand-park-quan-9_1710126960.jpg",
          title:
            "VinHomes Grand Park Quận 9 - 0979.79.79.69 - Giá Gốc Chủ Đầu Tư ✔️",
          address: "Quận 9 TPHCM",
        },
        {
          id: 11,
          image:
            "https://bds.com.vn/images/duan/small/vinhomes-grand-park-quan-9_1710126960.jpg",
          title:
            "VinHomes Grand Park Quận 9 - 0979.79.79.69 - Giá Gốc Chủ Đầu Tư ✔️",
          address: "Quận 9 TPHCM",
        },
        {
          id: 12,
          image:
            "https://bds.com.vn/images/duan/small/vinhomes-grand-park-quan-9_1710126960.jpg",
          title:
            "VinHomes Grand Park Quận 9 - 0979.79.79.69 - Giá Gốc Chủ Đầu Tư ✔️",
          address: "Quận 9 TPHCM",
        },
        {
          id: 13,
          image:
            "https://bds.com.vn/images/duan/small/vinhomes-grand-park-quan-9_1710126960.jpg",
          title: "VinHomes Grand Park Quận 9",
          address: "Quận 9 TPHCM",
          special: true, // Chỉ mục này sẽ có style khác
        },
        {
          id: 14,
          image:
            "https://bds.com.vn/images/duan/small/vinhomes-grand-park-quan-9_1710126960.jpg",
          title: "VinHomes Grand Park Quận 9",
          address: "Quận 9 TPHCM",
          special: true,
        },
        {
          id: 15,
          image:
            "https://bds.com.vn/images/duan/small/vinhomes-grand-park-quan-9_1710126960.jpg",
          title: "VinHomes Grand Park Quận 9",
          address: "Quận 9 TPHCM",
          special: true,
        },
        {
          id: 16,
          image:
            "https://bds.com.vn/images/duan/small/vinhomes-grand-park-quan-9_1710126960.jpg",
          title: "VinHomes Grand Park Quận 9",
          address: "Quận 9 TPHCM",
          special: true,
        },
      ],
    };
  },
};
</script>

<style scoped>
.fea-text {
  margin-top: 80px;
  /* border-bottom: 1px solid #ccc; */
}

.product-list {
  text-decoration: none;
  color: inherit;
}

.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.image-wrapper img {
  width: 100%;
  height: auto;
  display: block;
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

.image-wrapper.special-style {
  height: 350px; /* Hoặc chiều dài bạn muốn */
}

.image-wrapper.special-style img {
  object-fit: cover; /* Để hình ảnh phù hợp với kích thước container */
  height: 100%;
}
</style>
