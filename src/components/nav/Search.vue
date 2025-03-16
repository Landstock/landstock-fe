<template>
  <form class="navbar-search-form">
    <!-- Loại nhà đất -->
    <!-- <div class="group-local">
      <ul class="list-type">
        <li>Nhà đất bán</li>
        <li>Nhà đất cho thuê</li>
      </ul>
    </div> -->

    <!-- Tìm kiếm từ khóa -->
    <div class="search-bar">
      <div class="input-wrapper">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input
          class="keyword-search"
          type="text"
          placeholder="Nhập từ khóa, khu vực tìm kiếm. Ví dụ: Hà Đông"
        />
      </div>
    </div>

    <!-- Nhãn hướng dẫn -->
    <div class="search-label">
      <span class="label-search">Hoặc chọn thuộc tính tìm kiếm dưới đây</span>
    </div>

    <!-- Lựa chọn tìm kiếm -->
    <div class="box-search-select">
      <div class="left-box-search-select">
        <select class="form-select">
          <option value="0">Danh mục BĐS</option>
          <option value="1">Mua bán căn hộ chung cư</option>
          <option value="2">Mua bán nhà riêng</option>
        </select>

        <select class="form-select">
          <option value="0">Tỉnh/Thành phố</option>
          <option value="1">Hà Nội</option>
          <option value="2">Hải Phòng</option>
        </select>

        <!-- <select class="form-select">
          <option value="0">Quận / Huyện</option>
        </select>

        <select class="form-select">
          <option value="0">Xã / Phường</option>
        </select>

        <select class="form-select">
          <option value="0">Chọn dự án</option>
        </select> -->

        <select class="form-select">
          <option value="0">Diện tích</option>
        </select>

        <select class="form-select">
          <option value="0">Mức giá</option>
        </select>
        <!-- 
        <select class="form-select">
          <option value="0">Số phòng ngủ</option>
        </select> -->

        <select class="form-select">
          <option value="0">Hướng</option>
        </select>
      </div>
      <div class="right-box-search-select">
        <button type="submit" class="btn btn-danger">Tìm kiếm</button>
      </div>
    </div>
  </form>
</template>

<style scoped>
.group-local {
  margin-bottom: 10px;
}

.list-type {
  display: flex;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 16px;
}

.search-bar {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0 8px;
  background-color: #fff;
}

.input-wrapper i {
  color: #aaa;
  margin-right: 8px;
}

.keyword-search {
  border: none;
  flex: 1;
  padding: 8px 4px;
  font-size: 14px;
  outline: none;
}

.search-label {
  margin-bottom: 10px;
  font-size: 14px;
}

.box-search-select {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 10px;
}

.left-box-search-select {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}

.form-select {
  width: 100%;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #333;
  font-size: 14px;
}

.right-box-search-select {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.btn-danger {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #dc3545;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.btn-danger:hover {
  background-color: #c82333;
}
</style>
