import { createRouter, createWebHistory } from "vue-router";

// Import halaman yang mau dipakai
import Dashboard from "../components/Dashboard.vue";
import Promotryout from "../components/Promotryout.vue";
import Pengerjaantryout from "../components/Pengerjaantryout.vue";
import Tampilkanhasil from "../components/Tampilkanhasil.vue";
import Peringkat from "../components/Peringkat.vue";
import Dompet from "../components/Dompet.vue";
import Pembayaran from "../components/Pembayaran.vue";
import Login from "../components/Login.vue";

import Tryoutskd from "../components/Tryoutskd.vue";
import DaftarAkun from "../components/Daftarakun.vue";
import Materiskd from "../components/Materiskd.vue";
import Axiostest from "../components/Axiostest.vue";
import Tryoutskdlihat from "../components/Tryoutskdlihat.vue";

// Daftar route
const routes = [
  { path: "/", component: Dashboard },
  { path: "/promotryout", component: Promotryout },
  { path: "/pengerjaantryout", component: Pengerjaantryout },
  { path: "/pengerjaantryout/tampilkanhasil", component: Tampilkanhasil },
  { path: "/peringkat", component: Peringkat },
  { path: "/dompet", component: Dompet },
  { path: "/dompet/pembayaran", component: Pembayaran },
  { path: "/login", component: Login },

  { path: "/tryoutskd", component: Tryoutskd },
  { path: "/daftarakun", component: DaftarAkun },
  { path: "/materiskd", component: Materiskd },
  { path: "/axiostest", component: Axiostest },
  { path: "/tryoutskd/lihat/:eid", component: Tryoutskdlihat },
];

// Buat router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
