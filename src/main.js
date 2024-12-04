import "./assets/style/main.scss";

import { createApp } from "vue";
import pinia from "./stores";

import App from "./App.vue";
import router from "./router";
import "./router/permission.js";

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");
