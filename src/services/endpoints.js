export const API_BASE_PATH = "/api";

export const AUTH_ENDPOINTS = {
  user: {
    register: "/user/register",
    login: "/user/login",
    me: "/user/me",
    logout: "/user/logout",
    googleRedirect: "/user/auth/google/redirect",
    googleCallback: "/user/auth/google/callback",
  },
  admin: {
    login: "/admin/login",
    me: "/admin/me",
    logout: "/admin/logout",
    googleRedirect: "/admin/auth/google/redirect",
    googleCallback: "/admin/auth/google/callback",
  },
};

export const TRYOUT_ENDPOINTS = {
  list: "/tryouts",
  history: "/history",
  detail: (id) => `/tryouts/${id}`,
  register: (id) => `/tryouts/${id}/register`,
  start: (id) => `/tryouts/${id}/start`,
  autosave: (id) => `/tryouts/${id}/autosave`,
  submit: (id) => `/tryouts/${id}/submit`,
  remainingTime: (id) => `/tryouts/${id}/remaining-time`,
  result: (id) => `/tryouts/${id}/result`,
  ranking: (id) => `/tryouts/${id}/ranking`,
  myRank: (id) => `/tryouts/${id}/my-rank`,
};

export const DASHBOARD_ENDPOINTS = {
  summary: "/dashboard/summary",
};

export const WALLET_ENDPOINTS = {
  wallet: "/wallet",
  topupPackages: "/wallet/topup-packages",
  createTopup: "/wallet/topup/create",
  topupDetail: (id) => `/wallet/topup/${id}`,
  redeemableTryouts: "/wallet/redeemable-tryouts",
  redeemTryout: (id) => `/wallet/redeem-tryout/${id}`,
};

export const ADMIN_ENDPOINTS = {
  soal: {
    list: "/admin/soal",
    create: "/admin/soal",
    detail: (id) => `/admin/soal/${id}`,
    update: (id) => `/admin/soal/${id}`,
    remove: (id) => `/admin/soal/${id}`,
  },
  tryouts: {
    list: "/admin/tryouts",
    detail: (id) => `/admin/tryouts/${id}`,
    create: "/admin/tryouts",
    update: (id) => `/admin/tryouts/${id}`,
    remove: (id) => `/admin/tryouts/${id}`,
    attach: (id) => `/admin/tryouts/${id}/attach`,
    detach: (id, soalId) => `/admin/tryouts/${id}/detach/${soalId}`,
    reorder: (id) => `/admin/tryouts/${id}/reorder`,
    publish: (id) => `/admin/tryouts/${id}/publish`,
  },
};

export const joinApiUrl = (baseUrl, endpoint) =>
  `${String(baseUrl || "").replace(/\/$/, "")}${endpoint}`;
