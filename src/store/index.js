import { createStore } from "vuex";
import AuthModule from "./modules/auth/index";
import UserModule from "./modules/admin/user/index";
import UserUpdateModule from "./modules/page/user/index";
import PostModule from "./modules/page/post/index";
import CategoryModule from "./modules/admin/category/index";
import AdminPostModule from "@/store/modules/admin/adminpost/index";
// import NewPageModule from "@/store/modules/admin/newpage/index";
// import NewPageModule from "@/store/modules/page/new/index";

const store = createStore({
  modules: {
    // đăng ký, đăng nhập
    auth: AuthModule,

    // admin
    users: UserModule,
    category: CategoryModule,
    adminPost: AdminPostModule,

    // page
    // user
    user: UserUpdateModule,
    // tin tức
    // news: NewPageModule,
    // new: NewPageModule,
    // đăng tin
    posts: PostModule,
  },
});

export default store;
