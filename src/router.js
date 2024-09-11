import { createWebHistory, createRouter } from "vue-router";
import HomeView from "./pages/home.vue";
import Layout from "./layout/index.vue";
import { RouterLink } from "vue-router";
import { RouterView } from "vue-router";
import { h } from "vue";
const routes = [
  {
    path: "/",
    component: HomeView,
    meta: {
      layout: Layout,
    },
  },
  {
    path: "/rental-power",
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
  {
    path: "/forget",
    component: () => import("./pages/forget.vue"),
    meta: {
      layout: "div",
    },
  },
  {
    path: "/transaction",
    component: () => import("./pages/transaction.vue"),
    meta: {
      layout: Layout,
    },
  },
  {
    path: "/assets",
    component: () => import("./pages/assets.vue"),
    meta: {
      layout: Layout,
    },
  },
  {
    path: "/my",
    component: () => import("./pages/my.vue"),
    meta: {
      layout: Layout,
    },
  },
  {
    path: "/rental-records",
    component: () => import("./pages/rental-records.vue"),
    meta: {
      layout: Layout,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
