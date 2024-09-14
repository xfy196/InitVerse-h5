import { createApp } from "vue";
import App from "./App.vue";
import "amfe-flexible"
import router from "./router";
import fastclick from "fastclick";
import { createPinia } from "pinia";
import "./assets/styles/style.css";
import { i18nPlugin } from "./plugins/i18n.plugins";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
fastclick(document.body);
setToastDefaultOptions({
    position: "top",
    wordBreak: "normal",
    forbidClick: true,
  });
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
createApp(App).use(pinia).use(router).use(i18nPlugin).mount("#app");
