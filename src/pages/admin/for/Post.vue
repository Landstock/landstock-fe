<template>
  <div class="container mt-4">
    <h3>Quản lý bài đăng chờ duyệt</h3>

    <!-- DEBUG INFO -->
    <!-- <div class="alert alert-info mb-3">
      <strong>Debug Info:</strong><br />
      Pending Posts Length: {{ pendingPosts?.length || 0 }}<br />
      Total Pending: {{ totalPendingPosts || 0 }}<br />
      Current Page: {{ currentPage }}<br />
      Loading: {{ loading }}
    </div> -->

    <!-- Loading -->
    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <!-- Danh sách bài chờ duyệt -->
    <div v-else>
      <div v-if="pendingPosts.length > 0">
        <div class="row">
          <div
            class="col-md-6 col-lg-4 mb-4"
            v-for="post in pendingPosts"
            :key="post.id"
          >
            <div class="card">
              <img
                :src="post.imageUrls?.[0] || '/default-image.jpg'"
                class="card-img-top"
                style="height: 200px; object-fit: cover"
                :alt="post.title"
              />

              <div class="card-body">
                <h5 class="card-title">{{ post.title }}</h5>
                <p class="card-text">
                  <i class="fas fa-user"></i>
                  {{ post.user.fullName || post.user.username }}
                  <br />
                  <i class="fas fa-tag"></i> {{ post.category }}
                  <br />
                  <i class="fas fa-map-marker-alt"></i>
                  {{ getFullAddress(post) }}
                  <br />
                  <strong>{{ post.price }}</strong> - {{ post.area }}m²
                </p>

                <!-- Trạng thái -->
                <div class="mb-3">
                  <span
                    class="badge"
                    :class="{
                      'bg-warning': post.status === 'pending',
                      'bg-success': post.status === 'approved',
                      'bg-danger': post.status === 'rejected',
                    }"
                  >
                    {{ getStatusText(post.status) }}
                  </span>
                </div>

                <!-- Nút duyệt -->
                <div class="d-flex gap-2">
                  <button
                    class="btn btn-success btn-sm"
                    @click="approvePost(post.id)"
                    :disabled="
                      post.status === 'approved' || approving === post.id
                    "
                  >
                    <i class="fas fa-check"></i> Duyệt
                  </button>

                  <button
                    class="btn btn-danger btn-sm"
                    @click="rejectPost(post.id)"
                    :disabled="
                      post.status === 'rejected' || rejecting === post.id
                    "
                  >
                    <i class="fas fa-times"></i> Từ chối
                  </button>

                  <router-link
                    :to="`/chi-tiet/${post.slug}`"
                    class="btn btn-info btn-sm"
                  >
                    <i class="fas fa-eye"></i> Xem
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="d-flex justify-content-center mt-4">
          <nav>
            <ul class="pagination">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <button
                  class="page-link"
                  @click="goToPage(currentPage - 1)"
                  :disabled="currentPage === 1"
                >
                  Trước
                </button>
              </li>

              <li
                class="page-item"
                v-for="pageNum in visiblePages"
                :key="pageNum"
                :class="{ active: pageNum === currentPage }"
              >
                <button class="page-link" @click="goToPage(pageNum)">
                  {{ pageNum }}
                </button>
              </li>

              <li
                class="page-item"
                :class="{ disabled: currentPage === totalPages }"
              >
                <button
                  class="page-link"
                  @click="goToPage(currentPage + 1)"
                  :disabled="currentPage === totalPages"
                >
                  Sau
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <!-- No data -->
      <div v-else class="text-center py-5">
        <p class="text-muted">Không có bài đăng chờ duyệt</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "AdminPostApproval",

  data() {
    return {
      loading: false,
      currentPage: 1,
      limit: 12,
      approving: null, // ID bài đang duyệt
      rejecting: null, // ID bài đang từ chối
    };
  },

  computed: {
    ...mapState("posts", ["pendingPosts", "totalPendingPosts"]),

    // Debug computed
    debugInfo() {
      return {
        pendingPosts: this.pendingPosts,
        totalPendingPosts: this.totalPendingPosts,
        hasPendingPosts: this.pendingPosts && this.pendingPosts.length > 0,
      };
    },

    totalPages() {
      return Math.ceil(this.totalPendingPosts / this.limit);
    },

    visiblePages() {
      const delta = 2;
      const start = Math.max(1, this.currentPage - delta);
      const end = Math.min(this.totalPages, this.currentPage + delta);

      const pages = [];
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    },
  },

  async mounted() {
    await this.fetchPendingPosts();
  },

  methods: {
    ...mapActions("posts", ["updatePostStatus", "getPendingPosts"]),

    async fetchPendingPosts() {
      try {
        this.loading = true;
        console.log(`=== FETCHING PENDING POSTS ===`);
        console.log(`Page: ${this.currentPage}, Limit: ${this.limit}`);

        const result = await this.getPendingPosts({
          page: this.currentPage,
          limit: this.limit,
        });

        console.log("Vuex action result:", result);
        console.log("State after action:", {
          pendingPosts: this.pendingPosts,
          totalPendingPosts: this.totalPendingPosts,
        });
      } catch (error) {
        console.error("Error fetching pending posts:", error);
        this.$toast?.error(error.message);
      } finally {
        this.loading = false;
      }
    },

    async approvePost(postId) {
      try {
        this.approving = postId;

        await this.updatePostStatus({
          postId,
          status: "approved",
        });

        this.$toast.success("Đã duyệt bài đăng thành công!");
        // ❌ Bỏ: await this.fetchPendingPosts();
      } catch (error) {
        this.$toast.error(error.message);
      } finally {
        this.approving = null;
      }
    },
    async rejectPost(postId) {
      if (!confirm("Bạn có chắc muốn từ chối bài đăng này?")) return;

      try {
        this.rejecting = postId;

        await this.updatePostStatus({
          postId,
          status: "rejected",
        });

        this.$toast.success("Đã từ chối bài đăng!");
        // ❌ Bỏ: await this.fetchPendingPosts();
      } catch (error) {
        this.$toast.error(error.message);
      } finally {
        this.rejecting = null;
      }
    },
    async goToPage(page) {
      if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
        this.currentPage = page;
        await this.fetchPendingPosts();
      }
    },

    getStatusText(status) {
      switch (status) {
        case "pending":
          return "Chờ duyệt";
        case "approved":
          return "Đã duyệt";
        case "rejected":
          return "Từ chối";
        default:
          return status;
      }
    },

    getFullAddress(post) {
      const parts = [
        post.street,
        post.wardName,
        post.districtName,
        post.provinceName,
      ];
      return parts.filter((p) => p && p.trim()).join(", ") || "Chưa có địa chỉ";
    },
  },
};
</script>

<style scoped>
.card {
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-2px);
}

.badge {
  font-size: 0.8em;
}

.btn-sm {
  margin: 0 2px;
}
</style>
