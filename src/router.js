import { createRouter, createWebHistory } from "vue-router";
import RealestatePage from "./pages/home/RealestatePage.vue";
import LoginForm from "./pages/auth/Login.vue";
import RegisterForm from "./pages/auth/Register.vue";
import Detail from "./pages/home/detail/Detail.vue";
import Featured from "./pages/home/Featured.vue";
import HouseList from "./pages/home/listing/HouseList.vue";
import LandList from "./pages/home/listing/LandList.vue";
import RentalList from "./pages/home/listing/RentalList.vue";
import NewView from "./pages/home/newview/NewView.vue";
import AboutUs from "./pages/home/about/AboutUs.vue";
import Information from "./pages/home/information/Information.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: RealestatePage },
    { path: "/home/:id", component: Detail, props: true },
    { path: "/login", component: LoginForm },
    { path: "/register", component: RegisterForm },
    { path: "/danh-sach-du-an", component: Featured },
    { path: "/mua-ban-nha-dat", component: HouseList },
    { path: "/mua-ban-dat", component: LandList },
    { path: "/cho-thue-nha-dat", component: RentalList },
    { path: "/tin-tuc", component: NewView },
    { path: "/ve-chung-toi", component: AboutUs },
    { path: "/dang-tin", component: Information },
  ],
});

export default router;
