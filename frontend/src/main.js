import { createApp } from "vue";
import { createPinia } from "pinia";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";

import "./assets/tailwind.css";
import "./assets/test123.css";
import "./assets/viewcomment.css";
import "animate.css";
library.add(faTrash)
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);//需理解
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount("#app");
