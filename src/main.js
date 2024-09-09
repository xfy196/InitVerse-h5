import { createApp } from "vue";
import App from "./App.vue";
import "amfe-flexible"
import router from "./router";
import "./style.css";
import fastclick from "fastclick";
import { createPinia } from "pinia";
const pinia = createPinia();
fastclick(document.body);

createApp(App).use(router).use(pinia).mount("#app");
