import { createRouter, createWebHistory } from "vue-router";
import RealestatePage from "./pages/home/RealestatePage.vue";
import LoginForm from "./pages/auth/Login.vue";
import RegisterForm from "./pages/auth/Register.vue";
import Detail from "./pages/home/detail/Detail.vue";
import Featured from "./pages/home/Featured.vue";

// import NewView from "./pages/home/newview/NewView.vue";
import AboutUs from "./pages/home/about/AboutUs.vue";
import Information from "./pages/home/information/Information.vue";
import AdminLayout from "./pages/admin/AdminLayout.vue";
import UserManagement from "./pages/admin/user/UserManagement.vue";
import ListPosts from "./pages/home/postnews/ListPosts.vue";
import PostNews from "./pages/home/postnews/PostNews.vue";
import EditProfile from "./pages/home/user/EditProfile.vue";

import store from "./store/index.js";
import EditPost from "@/pages/home/postnews/EditPost.vue";

import CategoryManagement from "./pages/admin/category/CategoryManagement.vue";
// import ListVillas from "./pages/admin/for-sale/villas/ListVillas.vue";
// import ListApartment from "./pages/admin/for-sale/apartments/ListApartment.vue";
// import ListHouseManagement from "./pages/admin/for-sale/house/ListHouseManagement.vue";
// import HouseListRent from "./pages/admin/for-rent/house-rent/HouseListRent.vue";
// import CondosListRent from "./pages/admin/for-rent/condos/CondosListRent.vue";
// import ApartmentListRent from "./pages/admin/for-rent/apartment-rent/ApartmentListRent.vue";
// import HouseList from "./pages/home/listing/listting-for-sale/HouseList.vue";
// import VillasList from "./pages/home/listing/listting-for-sale/VillasList.vue";
// import ApartmentList from "./pages/home/listing/listting-for-sale/ApartmentList.vue";
// import ListHouseRent from "./pages/home/listing/listting-for-rent/ListHouseRent.vue";
// import ListCondosRent from "./pages/home/listing/listting-for-rent/ListCondosRent.vue";
// import ListApartmentRent from "./pages/home/listing/listting-for-rent/ListApartmentRent.vue";
// import AddNew from "./pages/admin/newpage/AddNew.vue";
// import NewPage from "./pages/home/newview/NewPage.vue";
// import NewAdmin from "./pages/admin/newpage/NewAdmin.vue";

// import NewsView from "./pages/home/newview/NewsView.vue";
import TipTap from "./pages/admin/newpage/TipTap.vue";
import NewDetail from "./pages/home/newview/NewDetail.vue";
import NewPage from "./pages/home/newview/NewPage.vue";

import RentalList from "./pages/home/listing/RentalList.vue";
import UserInfor from "./pages/home/user/UserInfor.vue";
import EditUser from "./pages/admin/user/EditUser.vue";
import PostManager from "./pages/admin/for/PostManager.vue";

// import Dashboard from "./pages/admin/dashboard/Dashboard.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: RealestatePage },
    { path: "/chi-tiet/:slug", component: Detail, props: true },
    // đăng ký đăng nhập
    { path: "/login", component: LoginForm },
    { path: "/register", component: RegisterForm },
    { path: "/danh-sach-du-an", component: Featured },

    { path: "/danh-sach/:slug", component: RentalList, props: true },

    // tin tức
    { path: "/tin-tuc", component: NewPage },

    { path: "/tin-tuc/:slug", component: NewDetail, props: true },

    { path: "/ve-chung-toi", component: AboutUs },
    // thông tin ng dùng
    {
      path: "/thong-tin",
      component: Information,
      children: [
        { path: "", component: UserInfor },
        { path: "/dang-tin", component: PostNews },
        { path: "/danh-sach-tin-dang", component: ListPosts },
        { path: "/sua-tin-dang/:id", component: EditPost },
        { path: "/sua-thong-tin-ca-nhan", component: EditProfile },
      ],
    },

    // admin
    {
      path: "/admin",
      component: AdminLayout,
      meta: { requiresAuth: true },
      children: [
        // { path: "", component: Dashboard },
        { path: "users", component: UserManagement },
        { path: "users-user", component: EditUser },
        { path: "quan-ly-loai-tin", component: CategoryManagement },
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
        // { path: "them-tin-tuc-moi", component: AddNew },
        // { path: "them-tin-tuc-new", component: NewAdmin },

        // { path: "add-category", component: AddCategory },
        // { path: "edit-category/:id", component: EditCategory },
        // { path: "add-products", component: AddProduct },
        // { path: "edit-products/:id", component: EditProduct },
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
