import { createApp } from "vue";
import { createPinia } from "pinia";//需理解

import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";

import "./assets/tailwind.css";
import "./assets/test123.css";
import "animate.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);//需理解
app.mount("#app");
