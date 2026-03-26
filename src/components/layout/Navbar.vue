<template>
  <header
    class="relative flex h-18 items-center justify-between overflow-hidden bg-emerald-600 px-5 text-white shadow-md sm:px-6 z-40"
  >
    <!-- Decoration shapes -->
    <div class="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/5 blur-2xl -z-10"></div>
    <div class="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/5 blur-2xl -z-10"></div>

    <div class="relative z-10 flex items-center gap-4">
      <!-- Mobile Sidebar Toggle -->
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-lg p-2.5 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white md:hidden"
        :aria-expanded="isMobileSidebarOpen"
        aria-label="Buka menu"
        @click="$emit('toggle-sidebar')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- Desktop Sidebar Toggle -->
      <button
        type="button"
        class="hidden items-center rounded-lg p-2 text-sm font-medium transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white md:inline-flex"
        :aria-pressed="isDesktopSidebarVisible"
        :aria-label="isDesktopSidebarVisible ? 'Sembunyikan sidebar' : 'Tampilkan sidebar'"
        @click="$emit('toggle-sidebar')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div class="flex flex-col leading-tight">
        <p class="text-[10px] uppercase font-black tracking-[0.2em] text-emerald-200/80">Website Kuy Dinas</p>
        <h1 class="text-base font-black sm:text-lg md:text-xl tracking-tight leading-none">{{ pageTitle }}</h1>
      </div>
    </div>

    <!-- Right Side: Wallet & User -->
    <div class="relative flex items-center gap-3 sm:gap-6">
      <!-- Dynamic Wallet Section -->
      <RouterLink
        to="/dompet"
        class="group flex items-center gap-2 rounded-2xl bg-white/95 backdrop-blur-sm px-4 py-2 hover:bg-white transition-all shadow-lg shadow-emerald-900/10 active:scale-95 border border-emerald-100"
      >
        <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
          <Wallet class="h-4 w-4" />
        </div>
        <div class="flex flex-col items-start leading-none pr-1">
          <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Saldo Koin</span>
          <span class="text-sm font-black text-slate-800 tracking-tight">
            {{ wallet?.balance?.toLocaleString("id-ID") || "0" }}
          </span>
        </div>
      </RouterLink>

      <!-- User Profile -->
      <RouterLink to="/profil" class="flex items-center gap-3">
        <div class="hidden flex-col items-end leading-tight sm:flex">
          <p class="text-[10px] font-black text-emerald-100 uppercase tracking-widest leading-none mb-1 opacity-70">Selamat Datang,</p>
          <p class="text-sm font-black tracking-tight">{{ user?.name || "User" }}</p>
        </div>

        <div class="group relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border-2 border-white/30 shadow-lg cursor-pointer transition-all hover:border-white">
          <img
            :src="user?.image || '/src/assets/logo-kuydinas.png'"
            alt="Foto profil"
            class="h-full w-full object-cover transition-transform group-hover:scale-110"
          />
        </div>
      </RouterLink>
    </div>
  </header>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, computed } from "vue"
import { useRoute } from "vue-router"
import api from "../../services/api"
import { AUTH_ENDPOINTS, WALLET_ENDPOINTS } from "../../services/endpoints"
import { Wallet } from "lucide-vue-next"

const route = useRoute()

defineProps({
  isMobileSidebarOpen: {
    type: Boolean,
    default: false
  },
  isDesktopSidebarVisible: {
    type: Boolean,
    default: true
  }
})

defineEmits(["toggle-sidebar"])

const user = ref(null)
const wallet = ref(null)

const pageTitle = computed(() => {
  const titles = {
    dashboard: "Beranda Dashboard",
    profil: "Profil Akun",
    pengerjaantryout: "Daftar Paket Tryout",
    "hasil-tryout": "Hasil & Pembahasan",
    peringkat: "Peringkat Nasional",
    dompet: "Dompet & Transaksi",
    promotryout: "Promo & Penawaran",
    materiskd: "Materi SKD & Pembahasan",
  }
  return titles[route.name] || "Dashboard Belajar"
})

const getUser = async () => {
  try {
    const res = await api.get(AUTH_ENDPOINTS.user.me)
    user.value = res.data.data.user
  } catch (err) {
    console.error("Gagal mengambil data user:", err)
  }
}

const getWallet = async () => {
  try {
    const res = await api.get(WALLET_ENDPOINTS.wallet)
    wallet.value = res.data.data
  } catch (err) {
    console.error("Gagal mengambil data wallet:", err)
  }
}

const handleProfileUpdated = (event) => {
  if (event?.detail) {
    user.value = {
      ...user.value,
      ...event.detail,
    }
  } else {
    getUser()
  }
}

onMounted(() => {
  getUser()
  getWallet()
  window.addEventListener("user-profile-updated", handleProfileUpdated)
})

onBeforeUnmount(() => {
  window.removeEventListener("user-profile-updated", handleProfileUpdated)
})
</script>
