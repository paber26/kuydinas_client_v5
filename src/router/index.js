import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../layout/DashboardLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("../views/Dashboard/Dashboard.vue"),
      },
      {
        path: "materiskd",
        name: "materiskd",
        component: () => import("../views/MateriSkd/Materiskd.vue"),
      },
      {
        path: "promotryout",
        name: "promotryout",
        component: () => import("../views/PromoTryout/Promotryout.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("../layout/AuthLayout.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("../views/Auth/Login.vue"),
      },
      {
        path: "register",
        name: "register",
        component: () => import("../views/Auth/Register.vue"),
      },
      {
        path: "auth/google/callback",
        name: "google-callback",
        component: () => import("../views/Auth/GoogleCallback.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// AUTH GUARD
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    next("/login");
  } else {
    next();
  }
});

export default router;
