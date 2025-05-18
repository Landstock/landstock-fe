<template>
  <div class="container">
    <div class="pt-5">
      <h3 class="mb-3">Danh sách tin đã đăng</h3>
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Tiêu đề</th>
            <th>Giá</th>
            <th>Mô tả</th>
            <th>Ngày đăng</th>
            <th>Loại tin đăng</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(post, index) in postnew" :key="post.id">
            <td>{{ index + 1 }}</td>
            <td>{{ post.title }}</td>
            <td>{{ post.price }}</td>
            <td>{{ post.description }}</td>
            <td>{{ post.createdAt }}</td>
            <td>{{ post.categoryId }}</td>
            <td>
              <span
                :class="{
                  'text-success': post.status === 'đang hiển thị',
                  'text-muted': post.status === 'đã ẩn',
                }"
              >
                {{ post.status }}
              </span>
            </td>
            <td>
              <button
                class="btn btn-sm btn-primary me-1"
                @click="updatePosts(post.id)"
              >
                Sửa
              </button>
              <button
                class="btn btn-sm btn-danger me-1"
                @click="deletePost(post.id)"
              >
                Xoá
              </button>
              <button class="btn btn-sm btn-info">Xem</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    postnew() {
      return this.$store.getters["posts/posts"];
    },
  },
  methods: {
    // formatDate(dateStr) {
    //   const date = new Date(dateStr);
    //   return date.toLocaleDateString("vi-VN");
    // },
    updatePosts(id) {
      this.$router.push(`/thong-tin/sua-tin-dang/${id}`);
    },
    // deletePost(id) {
    //   this.posts = this.posts.filter((post) => post.id !== id);
    // },
  },

  created() {
    this.$store.dispatch("posts/getPost");
  },
};
</script>

<style scoped>
.table th,
.table td {
  vertical-align: middle;
}
</style>
