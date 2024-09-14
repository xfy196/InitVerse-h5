import { createWebHistory, createRouter } from "vue-router";
import { useUserStore } from "./stores/user";
import HomeView from "./pages/home.vue";
import Layout from "./layout/index.vue";
import BaseLayout from "./layout/base-layout.vue";
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
      layout: BaseLayout,
    },
  },
  {
    path: "/exchange-records",
    component: () => import("./pages/exchange-records.vue"),
    meta: {
      layout: BaseLayout,
    },
  },
  {
    path: "/recharge",
    component: () => import("./pages/recharge.vue"),
    meta: {
      layout: BaseLayout,
    },
  },
  {
    path: "/invite/:code",
    component: () => import("./pages/invite.vue"),
    meta: {
      layout: BaseLayout,
    },
  },
  {
    path: "/assets-detail",
    component: () => import("./pages/assets-detail.vue"),
    meta: {
      layout: BaseLayout,
    },
  },
  {
    path: "/order-list",
    component: () => import("./pages/order-list.vue"),
    meta: {
      layout: BaseLayout,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
const whiteList = ["/login", "/register", "/forget"];
router.beforeEach(async (to, _from, next) => {
  const userStore = useUserStore();
  if (userStore.token) {
    next();
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      next("/login");
    }
  }
});
export default router;
