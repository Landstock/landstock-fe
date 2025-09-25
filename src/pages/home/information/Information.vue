<template>
  <div class="dashboard-container">
    <div class="row g-0">
      <!-- Sidebar bên trái -->
      <nav class="col-lg-3 col-md-4 sidebar-modern">
        <div class="sidebar-content">
          <!-- Profile Card -->
          <div class="profile-card">
            <div class="profile-avatar-wrapper">
              <img
                :src="user.avatar || defaultAvatar"
                alt="Avatar"
                class="profile-avatar"
              />
            </div>
            <h4 class="profile-name">{{ user.username || "Người dùng" }}</h4>
            <p class="profile-email">{{ user.email || "test1@gmail.com" }}</p>
            <div class="profile-stats">
              <div class="stat-item">
                <span class="stat-number">{{ approvedPosts }}</span>
                <span class="stat-label">Tin đăng</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-number">{{ pendingPosts }}</span>
                <span class="stat-label">Đang chờ duyệt</span>
              </div>
            </div>
          </div>

          <!-- Navigation Menu -->
          <nav class="sidebar-nav">
            <div class="nav-section">
              <h6 class="nav-section-title">TỔNG QUAN</h6>
              <ul class="nav-menu">
                <li class="nav-item">
                  <router-link to="/thong-tin" class="nav-link">
                    <div class="nav-icon">
                      <i class="fas fa-chart-pie"></i>
                    </div>
                    <span class="nav-text">Bảng điều khiển</span>
                  </router-link>
                </li>
              </ul>
            </div>

            <div class="nav-section">
              <h6 class="nav-section-title">QUẢN LÝ TIN ĐĂNG</h6>
              <ul class="nav-menu">
                <li class="nav-item">
                  <router-link to="/dang-tin" class="nav-link">
                    <div class="nav-icon">
                      <i class="fas fa-plus-circle"></i>
                    </div>
                    <span class="nav-text">Đăng tin BĐS</span>
                    <span class="nav-badge">Mới</span>
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/danh-sach-tin-dang" class="nav-link">
                    <div class="nav-icon">
                      <i class="fas fa-list-alt"></i>
                    </div>
                    <span class="nav-text">Danh sách tin đăng</span>
                  </router-link>
                </li>
                <!-- <li class="nav-item">
                  <router-link to="/thong-ke" class="nav-link">
                    <div class="nav-icon">
                      <i class="fas fa-chart-bar"></i>
                    </div>
                    <span class="nav-text">Thống kê</span>
                  </router-link>
                </li> -->
              </ul>
            </div>

            <div class="nav-section">
              <h6 class="nav-section-title">TÀI KHOẢN</h6>
              <ul class="nav-menu">
                <li class="nav-item">
                  <router-link to="/thong-tin-ca-nhan" class="nav-link">
                    <div class="nav-icon">
                      <i class="fas fa-user-cog"></i>
                    </div>
                    <span class="nav-text">Thông tin cá nhân</span>
                  </router-link>
                </li>
                <!-- <li class="nav-item">
                  <router-link to="/doi-mat-khau" class="nav-link">
                    <div class="nav-icon">
                      <i class="fas fa-key"></i>
                    </div>
                    <span class="nav-text">Đổi mật khẩu</span>
                  </router-link>
                </li> -->
                <!-- <li class="nav-item">
                  <router-link to="/cai-dat" class="nav-link">
                    <div class="nav-icon">
                      <i class="fas fa-cog"></i>
                    </div>
                    <span class="nav-text">Cài đặt</span>
                  </router-link>
                </li> -->
              </ul>
            </div>

            <!-- Logout Button -->
            <div class="logout-section">
              <button class="logout-btn" @click="logout">
                <div class="nav-icon">
                  <i class="fas fa-sign-out-alt"></i>
                </div>
                <span class="nav-text">Đăng xuất</span>
              </button>
            </div>
          </nav>
        </div>
      </nav>

      <!-- Nội dung bên phải -->
      <main class="col-lg-9 col-md-8 main-content">
        <div class="content-wrapper">
          <!-- Header -->
          <div class="content-header">
            <div class="header-left">
              <button
                v-if="$route.path !== '/thong-tin'"
                class="btn-back"
                @click="$router.push('/thong-tin')"
              >
                <i class="fas fa-arrow-left"></i>
              </button>
              <h2 class="page-title">Thông tin cá nhân</h2>
              <p class="page-subtitle">
                Quản lý thông tin và cài đặt tài khoản của bạn
              </p>
            </div>
            <div class="header-right">
              <router-link
                to="/sua-thong-tin-ca-nhan"
                class="btn-primary text-decoration-none"
              >
                <i class="fas fa-edit"></i>
                Chỉnh sửa thông tin
              </router-link>
            </div>
          </div>

          <!-- Main Content Area -->
          <div class="content-body">
            <!-- Dynamic content based on route -->
            <div v-if="$route.path === '/thong-tin'" class="dashboard-overview">
              <div class="row g-4 mb-4">
                <!-- Stats Cards -->
                <div class="col-lg-3 col-md-6">
                  <div class="stats-card stats-primary">
                    <div class="stats-icon">
                      <i class="fas fa-home"></i>
                    </div>
                    <div class="stats-content">
                      <h3>{{ totalPosts }}</h3>
                      <p>Tổng tin đăng</p>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6">
                  <div class="stats-card stats-warning">
                    <div class="stats-icon">
                      <i class="fas fa-clock"></i>
                    </div>
                    <div class="stats-content">
                      <h3>{{ pendingPosts }}</h3>
                      <p>Đang chờ duyệt</p>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6">
                  <div class="stats-card stats-success">
                    <div class="stats-icon">
                      <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="stats-content">
                      <h3>{{ approvedPosts }}</h3>
                      <p>Đã phê duyệt</p>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 col-md-6">
                  <div class="stats-card stats-danger">
                    <div class="stats-icon">
                      <i class="fas fa-times-circle"></i>
                    </div>
                    <div class="stats-content">
                      <h3>{{ cancelledPosts }}</h3>
                      <p>Bị huỷ</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Quick Actions -->
              <div class="quick-actions mb-4">
                <h4 class="section-title">Thao tác nhanh</h4>
                <div class="row g-3">
                  <div class="col-lg-4 col-md-6">
                    <router-link to="/dang-tin" class="action-card">
                      <div class="action-icon">
                        <i class="fas fa-plus-circle"></i>
                      </div>
                      <h5>Đăng tin mới</h5>
                      <p>Tạo tin đăng BĐS mới</p>
                    </router-link>
                  </div>
                  <div class="col-lg-4 col-md-6">
                    <router-link to="/danh-sach-tin-dang" class="action-card">
                      <div class="action-icon">
                        <i class="fas fa-list"></i>
                      </div>
                      <h5>Quản lý tin</h5>
                      <p>Xem và chỉnh sửa tin</p>
                    </router-link>
                  </div>
                  <div class="col-lg-4 col-md-6">
                    <router-link
                      to="/sua-thong-tin-ca-nhan"
                      class="action-card"
                    >
                      <div class="action-icon">
                        <i class="fas fa-user-edit"></i>
                      </div>
                      <h5>Sửa hồ sơ</h5>
                      <p>Cập nhật thông tin</p>
                    </router-link>
                  </div>
                  <!-- <div class="col-lg-3 col-md-6">
                    <div class="action-card">
                      <div class="action-icon">
                        <i class="fas fa-chart-line"></i>
                      </div>
                      <h5>Thống kê</h5>
                      <p>Xem báo cáo chi tiết</p>
                    </div>
                  </div> -->
                </div>
              </div>

              <!-- Recent Activity -->
              <div class="recent-activity">
                <h4 class="section-title">Hoạt động gần đây</h4>
                <div class="activity-list" v-if="recentActivities.length">
                  <div
                    class="activity-item"
                    v-for="(activity, index) in recentActivities"
                    :key="index"
                  >
                    <div
                      class="activity-icon"
                      :class="{
                        success: activity.status === 'approved',
                        warning: activity.status === 'pending',
                        info: activity.status === 'updated',
                      }"
                    >
                      <i
                        :class="{
                          'fas fa-check': activity.status === 'approved',
                          'fas fa-clock': activity.status === 'pending',
                          'fas fa-edit': activity.status === 'updated',
                        }"
                      ></i>
                    </div>
                    <div class="activity-content">
                      <h6>{{ activity.title }}</h6>
                      <p v-if="activity.status === 'approved'">
                        Đã được phê duyệt
                      </p>
                      <p v-else-if="activity.status === 'pending'">
                        Đang chờ phê duyệt
                      </p>
                      <p v-else>Đã được cập nhật</p>
                      <span class="activity-time">{{ activity.time }}</span>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <p>Chưa có hoạt động nào gần đây.</p>
                </div>
              </div>
            </div>

            <!-- Router View for other pages -->
            <router-view v-else></router-view>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import axiosInstance from "@/services/AxiosServices";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      user: {
        avatar: "",
        username: "",
        email: "",
      },
      totalPosts: 0, // Tổng số tin đăng
      pendingPosts: 0, // Tin đang chờ duyệt
      approvedPosts: 0, // Tin đã duyệt
      cancelledPosts: 0, // Tin bị huỷ
      recentActivities: [], // Hoạt động gần đây
    };
  },
  methods: {
    async fetchUserInfo() {
      try {
        const res = await axiosInstance.get("/user/me");
        this.user = res.data.data;
      } catch (err) {
        console.error("Lỗi lấy thông tin người dùng:", err);
      }
    },

    async fetchStats() {
      try {
        // Lấy tất cả bài đăng của user
        const myPostsRes = await axiosInstance.get("/posts/myPosts");
        const myPosts = myPostsRes.data.data.items;

        this.totalPosts = myPosts.length;
        this.pendingPosts = myPosts.filter(
          (p) => p.status === "pending"
        ).length;
        this.approvedPosts = myPosts.filter(
          (p) => p.status === "approved"
        ).length;
        this.cancelledPosts = myPosts.filter(
          (p) => p.status === "rejected"
        ).length;

        // Lấy hoạt động gần đây
        this.recentActivities = myPosts
          .sort(
            (a, b) =>
              new Date(b.updatedAt || b.createdAt) -
              new Date(a.updatedAt || a.createdAt)
          )
          .slice(0, 5) // Lấy 5 hoạt động gần nhất
          .map((post) => {
            return {
              title: post.title,
              status: post.status,
              time: new Date(
                post.updatedAt || post.createdAt
              ).toLocaleDateString("vi-VN"),
            };
          });
      } catch (err) {
        console.error("Lỗi lấy thống kê bài đăng:", err);
      }
    },

    logout() {
      Swal.fire({
        title: "Đăng xuất?",
        text: "Bạn có chắc chắn muốn đăng xuất?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đăng xuất",
        cancelButtonText: "Huỷ",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("auth/logout");
          this.$router.replace("/login");
          Swal.fire("Đã đăng xuất", "Bạn đã đăng xuất thành công", "success");
        }
      });
    },
  },
  async created() {
    await this.fetchUserInfo();
    await this.fetchStats();
  },
};
</script>

<style scoped>
/* Container chính */
.dashboard-container {
  min-height: 100vh;
  background: #f8fafc;
  padding-top: 70px;
}

/* Sidebar hiện đại */
.sidebar-modern {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 0;
  position: relative;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
}

.sidebar-content {
  padding: 2rem 0;
  height: 100%;
}

/* Profile Card */
.profile-card {
  padding-bottom: 10px;
  text-align: center;
  color: white;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
}

.profile-avatar-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.profile-avatar-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.7);
  border: 4px solid rgba(255, 255, 255, 0.2);
}

.avatar-status {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 16px;
  height: 16px;
  background: #10b981;
  border-radius: 50%;
  border: 3px solid white;
}

.profile-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: white;
}

.profile-email {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
}

.profile-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 1.125rem;
  font-weight: 700;
  color: white;
}

.stat-label {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
}

.stat-divider {
  width: 1px;
  height: 30px;
  background: rgba(255, 255, 255, 0.2);
}

/* Navigation */
.sidebar-nav {
  padding: 0 1rem;
}

.nav-section {
  margin-bottom: 2rem;
}

.nav-section-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
  padding: 0 1rem;
}

.nav-menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin-bottom: 0.25rem;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transform: translateX(4px);
}

.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  font-weight: 600;
}

.nav-icon {
  width: 20px;
  display: flex;
  justify-content: center;
  margin-right: 0.75rem;
  font-size: 1rem;
}

.nav-text {
  flex: 1;
  font-size: 0.9rem;
}

.nav-badge {
  background: #10b981;
  color: white;
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 20px;
  font-weight: 600;
}

/* Logout Button */
.logout-section {
  padding: 0 1rem;
  margin-top: auto;
  position: absolute;
  bottom: 2rem;
  left: 0;
  right: 0;
}

.logout-btn {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(239, 68, 68, 0.1);
  color: #fca5a5;
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.logout-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  color: #fecaca;
  transform: translateY(-2px);
}

/* Main Content */
.main-content {
  background: #f8fafc;
  min-height: 100vh;
}

.content-wrapper {
  padding: 2rem;
  max-width: 1200px;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.btn-back {
  background: none;
  border: none;
  color: #4f46e5;
  font-size: 1.5rem;
  margin-right: 10px;
  cursor: pointer;
  display: none;
}

@media (max-width: 768px) {
  .btn-back {
    display: inline-block;
  }
}

.page-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  color: #6b7280;
  font-size: 1rem;
  margin: 0;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
}

.content-body {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  /* min-height: 500px; */
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar-modern {
    position: fixed;
    z-index: 1;
    width: 280px;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .sidebar-modern.active {
    transform: translateX(0);
  }

  .main-content {
    margin-left: 0;
    margin-top: 20px;
  }

  .content-wrapper {
    padding: 1rem;
  }

  .content-header {
    flex-direction: column;
    gap: 1rem;
  }

  .profile-card {
    padding: 1.5rem;
  }

  .content-body {
    padding: 1.5rem;
  }
}

/* Stats Cards */
.stats-card {
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stats-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--accent-color);
}

.stats-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.stats-primary {
  --accent-color: #667eea;
}

.stats-warning {
  --accent-color: #f59e0b;
}

.stats-success {
  --accent-color: #10b981;
}

.stats-danger {
  --accent-color: #ef4444;
}

.stats-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  background: var(--accent-color);
  color: white;
}

.stats-content h3 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  color: #1f2937;
}

.stats-content p {
  color: #6b7280;
  margin: 0;
  font-size: 0.9rem;
}

/* Quick Actions */
.quick-actions,
.recent-activity {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f3f4f6;
}

.action-card {
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  text-decoration: none;
  color: inherit;
  display: block;
  transition: all 0.3s ease;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.action-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.1) 0%,
    rgba(118, 75, 162, 0.1) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.action-card:hover::before {
  opacity: 1;
}

.action-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
}

.action-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  margin: 0 auto 1rem;
  position: relative;
  z-index: 1;
}

.action-card h5 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 1;
}

.action-card p {
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0;
  position: relative;
  z-index: 1;
}

/* Recent Activity */
.activity-list {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.activity-item {
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  border-bottom: 1px solid #f3f4f6;
  transition: background-color 0.3s ease;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-item:hover {
  background: #f9fafb;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}

.activity-icon.success {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.activity-icon.warning {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.activity-icon.info {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.activity-content h6 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #1f2937;
}

.activity-content p {
  color: #6b7280;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.activity-time {
  font-size: 0.8rem;
  color: #9ca3af;
}

/* Dashboard Overview */
.dashboard-overview {
  animation: slideIn 0.5s ease-out;
}
@media (prefers-color-scheme: dark) {
  .main-content {
    background: #111827;
  }

  .page-title {
    color: #f9fafb;
  }

  .page-subtitle {
    color: #9ca3af;
  }

  .content-body {
    background: #1f2937;
    color: #f9fafb;
  }

  .content-header {
    border-color: #374151;
  }
}

/* Animations */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.content-body {
  animation: slideIn 0.5s ease-out;
}
</style>
