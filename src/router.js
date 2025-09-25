import { createRouter, createWebHistory } from "vue-router";
import RealestatePage from "./pages/home/RealestatePage.vue";
import LoginForm from "./pages/auth/Login.vue";
import RegisterForm from "./pages/auth/Register.vue";
import Detail from "./pages/home/detail/Detail.vue";

import AboutUs from "./pages/home/about/AboutUs.vue";
import Information from "./pages/home/information/Information.vue";
import AdminLayout from "./pages/admin/AdminLayout.vue";
import UserManagement from "./pages/admin/user/UserManagement.vue";
import ListPosts from "./pages/home/postnews/ListPosts.vue";
import PostNews from "./pages/home/postnews/PostNews.vue";
import EditProfile from "./pages/home/user/EditProfile.vue";

import store from "./store/index.js";

import CategoryManagement from "./pages/admin/category/CategoryManagement.vue";
import TipTap from "./pages/admin/newpage/TipTap.vue";
import NewDetail from "./pages/home/newview/NewDetail.vue";
import NewPage from "./pages/home/newview/NewPage.vue";

import RentalList from "./pages/home/listing/RentalList.vue";
import UserInfor from "./pages/home/user/UserInfor.vue";
import EditUser from "./pages/admin/user/EditUser.vue";
import PostManager from "./pages/admin/for/PostManager.vue";

import Dashboard from "./pages/admin/dashboard/Dashboard.vue";
import Post from "./pages/admin/for/Post.vue";
import SearchPage from "./pages/home/search-page/SearchPage.vue";
import CityProjects from "./pages/home/project-bycity/CityProjects.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: RealestatePage },
    { path: "/chi-tiet/:slug", component: Detail, props: true },
    // đăng ký đăng nhập
    { path: "/login", component: LoginForm },
    { path: "/register", component: RegisterForm },

    { path: "/danh-sach/:slug", component: RentalList, props: true },

    // tin tức
    { path: "/tin-tuc", component: NewPage },

    { path: "/tin-tuc/:slug", component: NewDetail, props: true },

    { path: "/ve-chung-toi", component: AboutUs },

    { path: "/danh-sach-tinh-thanh", component: CityProjects },

    { path: "/search", component: SearchPage },
    // thông tin ng dùng
    {
      path: "/thong-tin",
      component: Information,
      children: [
        { path: "/dang-tin", component: PostNews },
        { path: "/danh-sach-tin-dang", component: ListPosts },
        { path: "/thong-tin-ca-nhan", component: UserInfor },
        { path: "/sua-thong-tin-ca-nhan", component: EditProfile },
      ],
    },

    // admin
    {
      path: "/admin",
      component: AdminLayout,
      meta: { requiresAuth: true },
      children: [
        { path: "", redirect: "/admin/dashboard" },
        { path: "dashboard", component: Dashboard },
        { path: "users", component: UserManagement },
        { path: "users-user", component: EditUser },
        { path: "quan-ly-loai-tin", component: CategoryManagement },
        { path: "quan-ly-bai-dang", component: Post },
        {
          path: "quan-ly-danh-sach-ban/:id",
          component: PostManager,
          props: true,
        },
        {
          path: "quan-ly-danh-sach-cho-thue/:id",
          component: PostManager,
          props: true,
        },
        { path: "them-tin-tuc", component: TipTap },
      ],
    },
  ],
});

router.beforeEach((to, _, next) => {
  const isAuthenticated = store.getters["auth/isAuthentication"];

  const userRole = parseInt(localStorage.getItem("role"));

  // console.log("kiểm tra truy cập:");
  // console.log("Path:", to.path);
  // console.log("Authenticated:", isAuthenticated);
  // console.log("Role:", userRole);

  if (to.meta.requiresAuth && !isAuthenticated) {
    console.log(" Không xác thực, chuyển đến login");
    next("/login");
  } else if (to.meta.requiresUnauth && isAuthenticated) {
    console.log("Đã đăng nhập nhưng vào trang không cho phép");
    next("/dang-tin");
  } else if (to.path.startsWith("/admin") && userRole !== 0 && userRole !== 1) {
    console.log("Không có quyền truy cập vào trang admin");
    alert("Bạn không có quyền truy cập trang này!");
    next("/");
  } else {
    next();
  }
});

export default router;
