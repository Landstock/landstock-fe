import { createStore } from "vuex";
import AuthModule from "./modules/auth/index";
import UserModule from "./modules/admin/user/index";
import UserUpdateModule from "./modules/user/index";
import PostModule from "./modules/post/index";
import CategoryModule from "./modules/admin/category/index";
import SaleModule from "./modules/admin/sale/list-sale/index";
import AdminPostModule from "@/store/modules/admin/adminpost/index";

const store = createStore({
  modules: {
    auth: AuthModule,

    // user
    user: UserUpdateModule,

    // admin
    users: UserModule,
    category: CategoryModule,

    adminPost: AdminPostModule,
    // danh sách bán
    sale: SaleModule,

    // đăng tin
    posts: PostModule,
  },
});

export default store;
