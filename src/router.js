import { createWebHistory, createRouter } from "vue-router";
import HomeView from "./pages/home.vue";
import Layout from "./layout/index.vue";
import { RouterLink } from "vue-router";
import { RouterView } from "vue-router";
import { h } from "vue";
const LayoutComponent = {
  render(h) {
    // 使用 h 函数创建一个 div 元素
    return h("div", {}, this.$slots.default);
  },
};
const routes = [
  {
    path: "/",
    component: HomeView,
    meta: {
      layout: Layout,
    },
  },
  {
    path: "/login",
    component: () => import("./pages/login.vue"),
    meta: {
      layout: "div",
    },
  },
  {
    path: "/register",
    component: () => import("./pages/register.vue"),
    meta: {
      layout: "div",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
