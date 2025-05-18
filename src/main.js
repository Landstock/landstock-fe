import { createApp } from "vue";
import App from "./App.vue";

// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Import Bootstrap JS
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import router from "./router";
import store from "./store/index.js";

const app = createApp(App);

app.use(router);
app.use(store);

app.mount("#app");
