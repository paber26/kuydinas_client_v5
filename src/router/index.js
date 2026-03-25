import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../layout/DashboardLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        redirect: "/dashboard",
      },
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
        path: "dompet",
        name: "dompet",
        component: () => import("../views/Dompet/Dompet.vue"),
      },
      {
        path: "promotryout",
        name: "promotryout",
        component: () => import("../views/PromoTryout/Promotryout.vue"),
      },
      {
        path: "promotryout/:id/panduan",
        name: "panduan-tryout",
        component: () => import("../views/PromoTryout/TryoutGuide.vue"),
      },
      {
        path: "pengerjaantryout",
        name: "pengerjaantryout",
        component: () =>
          import("../views/PengerjaanTryout/PengerjaanTryout.vue"),
      },
      // {
      //   path: "tryoutSkd",
      //   name: "tryoutskd",
      //   component: () => import("../views/TryoutSkd/TryoutSkd.vue"),
      // },
    ],
  },
  {
    path: "/pengerjaantryout/:id",
    component: () => import("../layout/TryoutLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "persiapan",
        name: "tryout-persiapan",
        component: () =>
          import("../views/PengerjaanTryout/TryoutPreparation.vue"),
      },
      {
        path: "",
        name: "sesi-tryout",
        component: () =>
          import("../views/PengerjaanTryout/TryoutSession.vue"),
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
  {
    path: "/:pathMatch(.*)*",
    redirect: "/dashboard",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// AUTH GUARD
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  // if route requires auth but user not logged in
  if (to.meta.requiresAuth && !token) {
    return next("/login");
  }

  // if already logged in but accessing login/register
  if (token && (to.path === "/login" || to.path === "/register")) {
    return next("/dashboard");
  }

  next();
});

export default router;
