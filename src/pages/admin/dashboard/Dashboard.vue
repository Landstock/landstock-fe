<template>
  <div class="dashboard-container">
    <!-- Page Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="page-title">Dashboard</h2>
      <div class="text-muted">
        <i class="fas fa-calendar-day me-2"></i>
        {{ currentDate }}
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="row mb-4">
      <div class="col-lg-8">
        <div class="row">
          <div class="col-lg-6 col-md-6 mb-4">
            <div class="stats-card bg-primary">
              <div class="stats-card-body">
                <div class="stats-icon">
                  <i class="fas fa-users"></i>
                </div>
                <div class="stats-content">
                  <h3 class="stats-number">{{ totalUsers || 0 }}</h3>
                  <p class="stats-label">Tổng người dùng</p>
                </div>
              </div>
              <!-- <div class="stats-footer">
            <span class="text-white">
              {{
                userGrowth.trend === "neutral"
                  ? "Không đổi"
                  : (userGrowth.isPositive ? "+" : "-") +
                    userGrowth.percentage +
                    "% so với tháng trước"
              }}
            </span>
          </div> -->
            </div>
          </div>

          <div class="col-lg-6 col-md-6 mb-4">
            <div class="stats-card bg-success">
              <div class="stats-card-body">
                <div class="stats-icon">
                  <i class="fas fa-home"></i>
                </div>
                <div class="stats-content">
                  <h3 class="stats-number">{{ totalPostsBan || 0 }}</h3>
                  <p class="stats-label">Tổng BĐS Bán</p>
                </div>
              </div>
              <!-- <div class="stats-footer">
            <span class="text-white">
              {{
                postsBanGrowth.trend === "neutral"
                  ? "Không đổi"
                  : (postsBanGrowth.isPositive ? "+" : "-") +
                    postsBanGrowth.percentage +
                    "% so với tháng trước"
              }}
            </span>
          </div> -->
            </div>
          </div>

          <div class="col-lg-6 col-md-6 mb-4">
            <div class="stats-card bg-warning">
              <div class="stats-card-body">
                <div class="stats-icon">
                  <i class="fas fa-key"></i>
                </div>
                <div class="stats-content">
                  <h3 class="stats-number">{{ totalPostsChoThue || 0 }}</h3>
                  <p class="stats-label">Tổng BĐS Cho thuê</p>
                </div>
              </div>
              <!-- <div class="stats-footer">
            <span class="text-white">
              {{
                postsChoThueGrowth.trend === "neutral"
                  ? "Không đổi"
                  : (postsChoThueGrowth.isPositive ? "+" : "-") +
                    postsChoThueGrowth.percentage +
                    "% so với tháng trước"
              }}
            </span>
          </div> -->
            </div>
          </div>

          <div class="col-lg-6 col-md-6 mb-4">
            <div class="stats-card bg-info">
              <div class="stats-card-body">
                <div class="stats-icon">
                  <i class="fas fa-tags"></i>
                </div>
                <div class="stats-content">
                  <h3 class="stats-number">{{ totalCategories || 0 }}</h3>
                  <p class="stats-label">Loại tin</p>
                </div>
              </div>
              <!-- <div class="stats-footer">
            <span class="text-white">
              {{
                categoriesGrowth.trend === "neutral"
                  ? "Không đổi"
                  : (categoriesGrowth.isPositive ? "+" : "-") +
                    categoriesGrowth.percentage +
                    "% so với tháng trước"
              }}
            </span>
          </div> -->
            </div>
          </div>

          <div class="col-lg-6 col-md-6 mb-4">
            <div class="stats-card bg-danger">
              <div class="stats-card-body">
                <div class="stats-icon">
                  <i class="fas fa-clock"></i>
                </div>
                <div class="stats-content">
                  <h3 class="stats-number">{{ totalPendingPosts || 0 }}</h3>
                  <p class="stats-label">Bài đăng chờ duyệt</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 mb-4">
        <div class="chart-card">
          <div class="chart-header">
            <h5 class="card-title">Phân loại bài đăng</h5>
          </div>
          <div class="chart-body">
            <canvas id="categoryChart" width="300" height="300"></canvas>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <!-- <div class="row mb-4"> -->
    <!-- <div class="col-lg-8 mb-4">
        <div class="chart-card">
          <div class="chart-header">
            <h5 class="card-title">Thống kê bài đăng theo tháng</h5>
            <div class="chart-controls">
              <select v-model="selectedYear" class="form-select form-select-sm">
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>
          </div>
          <div class="chart-body">
            <canvas id="postsChart" width="400" height="200"></canvas>
          </div>
        </div>
      </div> -->

    <!-- <div class="col-lg-4 mb-4">
        <div class="chart-card">
          <div class="chart-header">
            <h5 class="card-title">Phân loại bài đăng</h5>
          </div>
          <div class="chart-body">
            <canvas id="categoryChart" width="300" height="300"></canvas>
          </div>
        </div>
      </div> -->
    <!-- </div> -->

    <!-- Recent Activities & Quick Actions -->
    <div class="row">
      <div class="col-lg-8 mb-4">
        <div class="activity-card">
          <div class="activity-header">
            <h5 class="card-title">Hoạt động gần đây</h5>
            <!-- <router-link
              to="/admin/quan-ly-bai-dang"
              class="btn btn-outline-primary btn-sm"
            >
              Xem tất cả
            </router-link> -->
          </div>
          <div class="activity-body">
            <div
              v-if="recentActivities.length === 0"
              class="text-center text-muted py-4"
            >
              <i class="fas fa-inbox fa-3x mb-3"></i>
              <p>Chưa có hoạt động nào</p>
            </div>
            <div v-else>
              <div
                v-for="activity in recentActivities"
                :key="activity.id"
                class="activity-item"
              >
                <div class="activity-icon" :class="activity.iconClass">
                  <i :class="activity.icon"></i>
                </div>
                <div class="activity-content">
                  <p class="activity-title">{{ activity.title }}</p>
                  <small class="text-muted">{{ activity.time }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4 mb-4">
        <div class="quick-actions-card">
          <div class="quick-actions-header">
            <h5 class="card-title">Thao tác nhanh</h5>
          </div>
          <div class="quick-actions-body">
            <router-link to="/admin/them-tin-tuc" class="quick-action-item">
              <div class="quick-action-icon bg-primary">
                <i class="fas fa-plus"></i>
              </div>
              <span>Thêm tin tức</span>
            </router-link>

            <router-link to="/admin/quan-ly-loai-tin" class="quick-action-item">
              <div class="quick-action-icon bg-success">
                <i class="fas fa-tags"></i>
              </div>
              <span>Quản lý loại tin</span>
            </router-link>

            <router-link to="/admin/users" class="quick-action-item">
              <div class="quick-action-icon bg-warning">
                <i class="fas fa-users"></i>
              </div>
              <span>Quản lý người dùng</span>
            </router-link>

            <a href="#" @click.prevent="exportData" class="quick-action-item">
              <div class="quick-action-icon bg-info">
                <i class="fas fa-download"></i>
              </div>
              <span>Xuất báo cáo</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import Swal from "sweetalert2";

Chart.register(...registerables);

export default {
  name: "AdminDashboard",
  data() {
    return {
      // selectedYear: "2024",
      currentDate: new Date().toLocaleDateString("vi-VN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),

      postsChart: null,
      categoryChart: null,
      previousMonthStats: {
        totalUsers: 0,
        totalPostsBan: 0,
        totalPostsChoThue: 0,
        totalCategories: 0,
      },
      currentMonthStats: {
        totalUsers: 0,
        totalPostsBan: 0,
        totalPostsChoThue: 0,
        totalCategories: 0,
      },
    };
  },
  computed: {
    totalUsers() {
      return this.$store.state.users?.total || 0;
    },
    totalCategories() {
      return this.$store.state.category?.category?.length || 0;
    },
    totalPostsBan() {
      return this.$store.getters["posts/totalBanPosts"];
    },

    totalPostsChoThue() {
      return this.$store.getters["posts/totalChoThuePosts"];
    },

    // Tổng bài đăng đã duyệt
    totalApprovedPosts() {
      return this.$store.getters["posts/totalApprovedPosts"];
    },
    //
    // userGrowth() {
    //   if (this.previousMonthStats.totalUsers === 0)
    //     return { percentage: 0, trend: "neutral" };

    //   const growth =
    //     ((this.currentMonthStats.totalUsers -
    //       this.previousMonthStats.totalUsers) /
    //       this.previousMonthStats.totalUsers) *
    //     100;
    //   return {
    //     percentage: Math.abs(growth).toFixed(1),
    //     trend: growth > 0 ? "up" : growth < 0 ? "down" : "neutral",
    //     isPositive: growth > 0,
    //   };
    // },

    // postsBanGrowth() {
    //   if (this.previousMonthStats.totalPostsBan === 0)
    //     return { percentage: 0, trend: "neutral" };

    //   const growth =
    //     ((this.currentMonthStats.totalPostsBan -
    //       this.previousMonthStats.totalPostsBan) /
    //       this.previousMonthStats.totalPostsBan) *
    //     100;
    //   return {
    //     percentage: Math.abs(growth).toFixed(1),
    //     trend: growth > 0 ? "up" : growth < 0 ? "down" : "neutral",
    //     isPositive: growth > 0,
    //   };
    // },

    // postsChoThueGrowth() {
    //   if (this.previousMonthStats.totalPostsChoThue === 0)
    //     return { percentage: 0, trend: "neutral" };

    //   const growth =
    //     ((this.currentMonthStats.totalPostsChoThue -
    //       this.previousMonthStats.totalPostsChoThue) /
    //       this.previousMonthStats.totalPostsChoThue) *
    //     100;
    //   return {
    //     percentage: Math.abs(growth).toFixed(1),
    //     trend: growth > 0 ? "up" : growth < 0 ? "down" : "neutral",
    //     isPositive: growth > 0,
    //   };
    // },

    // categoriesGrowth() {
    //   if (this.previousMonthStats.totalCategories === 0)
    //     return { percentage: 0, trend: "neutral" };

    //   const growth =
    //     ((this.currentMonthStats.totalCategories -
    //       this.previousMonthStats.totalCategories) /
    //       this.previousMonthStats.totalCategories) *
    //     100;
    //   return {
    //     percentage: Math.abs(growth).toFixed(1),
    //     trend: growth > 0 ? "up" : growth < 0 ? "down" : "neutral",
    //     isPositive: growth > 0,
    //   };
    // },
    // tổng bài đăng đang chờ duyệt
    totalPendingPosts() {
      try {
        return this.$store.getters["posts/totalPendingPosts"] || 0;
      } catch (error) {
        console.warn("Lỗi khi lấy totalPendingPosts:", error);
        return 0;
      }
    },
    // hoạt động gần đây
    recentActivities() {
      try {
        return this.$store.state.adminPost?.recentActivities || [];
      } catch (error) {
        console.warn("Lỗi khi lấy recentActivities:", error);
        return [];
      }
    },
  },
  async mounted() {
    // Load dữ liệu cần thiết
    await this.loadDashboardData();
    await this.loadPendingPostsOnly();
    await this.$store.dispatch("posts/getPostsCount");
    await this.loadPostCategory();

    console.log("Danh sách posts trong store:", this.$store.state.posts?.posts);
    console.log(
      "Danh sách type:",
      this.$store.state.posts?.posts.map((p) => p.type)
    );
    // Lấy hoạt động gần đây
    await this.$store.dispatch("adminPost/getRecentActivities");
    // Khởi tạo biểu đồ
    this.$nextTick(() => {
      this.initCharts();
    });
  },
  beforeUnmount() {
    // Cleanup charts
    if (this.postsChart) {
      this.postsChart.destroy();
    }
    if (this.categoryChart) {
      this.categoryChart.destroy();
    }
  },
  methods: {
    // async loadMonthlyStats() {
    //   try {
    //     const currentDate = new Date();
    //     const currentMonth = currentDate.getMonth() + 1;
    //     const currentYear = currentDate.getFullYear();

    //     // Tháng trước
    //     const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    //     const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;

    //     // Call API để lấy dữ liệu tháng hiện tại
    //     const currentStats = await this.fetchStatsForMonth(
    //       currentYear,
    //       currentMonth
    //     );

    //     // Call API để lấy dữ liệu tháng trước
    //     const previousStats = await this.fetchStatsForMonth(
    //       previousYear,
    //       previousMonth
    //     );

    //     this.currentMonthStats = currentStats;
    //     this.previousMonthStats = previousStats;
    //   } catch (error) {
    //     console.error("Lỗi khi tải thống kê theo tháng:", error);
    //   }
    // },

    // async fetchStatsForMonth(year, month) {
    //   // Giả sử bạn có API endpoint như này
    //   // Bạn cần thay đổi theo API thật của mình
    //   const response = await this.$api.get(`/admin/stats`, {
    //     params: { year, month },
    //   });

    //   return {
    //     totalUsers: response.data.users_count,
    //     totalPostsBan: response.data.posts_ban_count,
    //     totalPostsChoThue: response.data.posts_chothue_count,
    //     totalCategories: response.data.categories_count,
    //   };
    // },
    //
    async loadPostCategory() {
      try {
        await this.$store.dispatch("posts/getPosts", { page: 1, limit: 100 });
      } catch (error) {
        console.error("Lỗi khi tải :", error);
      }
    },
    //
    async loadPendingPostsOnly() {
      try {
        await this.$store.dispatch("posts/getPendingPosts", {
          page: 1,
          limit: 1, // Chỉ cần lấy 1 để có total
        });
      } catch (error) {
        console.error("Lỗi khi tải bài đăng chờ duyệt:", error);
        // Không hiển thị error popup cho cái này
      }
    },
    async loadDashboardData() {
      try {
        // Load users data
        await this.$store.dispatch("users/getUsers", { page: 1, limit: 1 });

        // Load categories data
        if (!this.$store.state.category.category.length) {
          await this.$store.dispatch("category/getCategoryManage");
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu dashboard:", error);
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Không thể tải dữ liệu dashboard",
        });
      }
    },
    initCharts() {
      // this.initPostsChart();
      this.initCategoryChart();
    },
    // initPostsChart() {
    //   const ctx = document.getElementById("postsChart");
    //   if (!ctx) return;

    //   // Destroy existing chart if exists
    //   if (this.postsChart) {
    //     this.postsChart.destroy();
    //   }

    //   this.postsChart = new Chart(ctx, {
    //     type: "line",
    //     data: {
    //       labels: [
    //         "Jan",
    //         "Feb",
    //         "Mar",
    //         "Apr",
    //         "May",
    //         "Jun",
    //         "Jul",
    //         "Aug",
    //         "Sep",
    //         "Oct",
    //         "Nov",
    //         "Dec",
    //       ],
    //       datasets: [
    //         {
    //           label: "BĐS Bán",
    //           data: [65, 59, 80, 81, 56, 55, 40, 65, 75, 85, 90, 95],
    //           borderColor: "#007bff",
    //           backgroundColor: "rgba(0, 123, 255, 0.1)",
    //           tension: 0.4,
    //         },
    //         {
    //           label: "BĐS Cho thuê",
    //           data: [28, 48, 40, 19, 86, 27, 90, 55, 65, 70, 80, 85],
    //           borderColor: "#28a745",
    //           backgroundColor: "rgba(40, 167, 69, 0.1)",
    //           tension: 0.4,
    //         },
    //       ],
    //     },
    //     options: {
    //       responsive: true,
    //       maintainAspectRatio: false,
    //       plugins: {
    //         legend: {
    //           position: "top",
    //         },
    //       },
    //       scales: {
    //         y: {
    //           beginAtZero: true,
    //         },
    //       },
    //     },
    //   });
    // },

    initCategoryChart() {
      const ctx = document.getElementById("categoryChart");
      if (!ctx) return;

      if (this.categoryChart) {
        this.categoryChart.destroy();
      }

      this.categoryChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["BĐS Bán", "BĐS Cho thuê"],
          datasets: [
            {
              data: [this.totalPostsBan, this.totalPostsChoThue],
              backgroundColor: ["#28a745", "#007bff"],
              borderColor: "#fff",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "bottom" },
            tooltip: {
              callbacks: {
                label: (context) => {
                  let value = context.raw || 0;
                  let total = this.totalPostsBan + this.totalPostsChoThue || 1;
                  let percentage = ((value / total) * 100).toFixed(1);
                  return `${context.label}: ${value} (${percentage}%)`;
                },
              },
            },
          },
        },
      });
    },
    exportData() {
      Swal.fire({
        title: "Xuất báo cáo",
        text: "Chức năng này đang được phát triển",
        icon: "info",
        confirmButtonText: "Đóng",
      });
    },
  },
  watch: {
    // selectedYear() {
    //   this.initPostsChart();
    // },
    totalPostsBan() {
      this.initCategoryChart();
    },
    totalPostsChoThue() {
      this.initCategoryChart();
    },
  },
};
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
}

.page-title {
  color: #2c3e50;
  font-weight: 600;
  margin: 0;
}

/* Statistics Cards */
.stats-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  color: white;
}

.stats-card:hover {
  transform: translateY(-2px);
}

.stats-card-body {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.stats-icon {
  font-size: 2.5rem;
  opacity: 0.8;
}

.stats-content {
  text-align: right;
}

.stats-number {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  line-height: 1;
}

.stats-label {
  font-size: 0.95rem;
  margin: 0.25rem 0 0 0;
  opacity: 0.9;
}

.stats-footer {
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  font-size: 0.85rem;
}

/* Chart Cards */
.chart-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.chart-header {
  padding: 1.5rem 1.5rem 1rem;
  display: flex;
  justify-content: between;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.chart-header .card-title {
  margin: 0;
  color: #2c3e50;
  font-weight: 600;
}

.chart-body {
  padding: 1.5rem;
  position: relative;
  height: 300px;
}

/* Activity Card */
.activity-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.activity-header {
  padding: 1.5rem 1.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.activity-header .card-title {
  margin: 0;
  color: #2c3e50;
  font-weight: 600;
}

.activity-body {
  padding: 1rem;
  max-height: 400px;
  overflow-y: auto;
}

.activity-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  transition: background 0.2s;
}

.activity-item:hover {
  background: #f8f9fa;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: white;
}

.activity-content {
  flex: 1;
}

.activity-title {
  margin: 0;
  font-weight: 500;
  color: #2c3e50;
}

/* Quick Actions Card */
.quick-actions-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.quick-actions-header {
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid #eee;
}

.quick-actions-header .card-title {
  margin: 0;
  color: #2c3e50;
  font-weight: 600;
}

.quick-actions-body {
  padding: 1rem;
}

.quick-action-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  text-decoration: none;
  color: #2c3e50;
  transition: all 0.2s;
}

.quick-action-item:hover {
  background: #f8f9fa;
  color: #007bff;
  text-decoration: none;
  transform: translateX(4px);
}

.quick-action-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: white;
}

/* Background colors */
.bg-primary {
  background: linear-gradient(135deg, #007bff, #0056b3) !important;
}

.bg-success {
  background: linear-gradient(135deg, #28a745, #1e7e34) !important;
}

.bg-warning {
  background: linear-gradient(135deg, #ffc107, #d39e00) !important;
}

.bg-info {
  background: linear-gradient(135deg, #17a2b8, #117a8b) !important;
}

/* Responsive */
@media (max-width: 768px) {
  .stats-card-body {
    padding: 1rem;
  }

  .stats-number {
    font-size: 1.5rem;
  }

  .chart-body {
    height: 250px;
  }

  .activity-body {
    max-height: 300px;
  }
}
</style>
