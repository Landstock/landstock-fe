import { createApp } from "vue";
import App from "./App.vue";

// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Import Bootstrap JS
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import router from "./router";
import store from "./store/index.js";

import { registerLicense } from "@syncfusion/ej2-base";
import { ToastPlugin } from "@syncfusion/ej2-vue-notifications";

// import "@syncfusion/ej2-base/styles/material.css";
// import "@syncfusion/ej2-buttons/styles/material.css";
// import "@syncfusion/ej2-popups/styles/material.css";
// import "@syncfusion/ej2-vue-notifications/styles/material.css";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1JEaF5cXmRCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdmWXdecXRWQ2hcUEx+XUVWYEk="
);

const app = createApp(App);

// Đảm bảo autoLogin chạy xong rồi mới render app
store.dispatch("auth/autoLogin");

app.use(store);
app.use(router);
app.use(ToastPlugin);
app.mount("#app");

const roFix = () => {
  const observer = new ResizeObserver(() => {});
  observer.observe(document.body);
};
roFix();

window.addEventListener("error", (e) => {
  if (
    e.message &&
    e.message.includes(
      "ResizeObserver loop completed with undelivered notifications"
    )
  ) {
    e.stopImmediatePropagation();
  }
});

window.addEventListener("unhandledrejection", (e) => {
  const msg = e?.reason?.message || "";
  if (
    msg.includes("ResizeObserver loop completed with undelivered notifications")
  ) {
    e.stopImmediatePropagation();
  }
});
