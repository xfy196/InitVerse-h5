import { createApp } from "vue";
import App from "./App.vue";
import "amfe-flexible"
import router from "./router";
import fastclick from "fastclick";
import { createPinia } from "pinia";
import "./assets/styles/style.css";
import { i18nPlugin } from "./plugins/i18n.plugins";
const pinia = createPinia();
fastclick(document.body);

createApp(App).use(router).use(pinia).use(i18nPlugin).mount("#app");
