<template>
  <aside
    id="sidebar"
    class="fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 flex flex-col transform -translate-x-full md:translate-x-0 transition-transform duration-200 ease-out"
  >
    <!-- Logo -->
    <div class="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
      <div
        class="h-11 w-11 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xl font-bold"
      >
        KD
      </div>
      <div>
        <p class="text-xs text-slate-500">Tryout SKD CPNS</p>
        <p class="text-base font-semibold text-slate-800">Kuy Dinas</p>
      </div>
    </div>

    <!-- Menu -->
    <nav class="mt-4 flex-1 px-3 space-y-1 text-sm">
      <router-link
        to="/"
        class="w-full flex items-center gap-2 rounded-xl px-3 py-2.5"
        :class="
          isActive('/')
            ? 'bg-amber-300/80 text-slate-900 font-medium'
            : 'text-slate-700 hover:bg-slate-100'
        "
      >
        <span>🏠</span>
        <span>Beranda</span>
      </router-link>

      <router-link
        to="/materiskd"
        class="w-full flex items-center gap-2 rounded-xl px-3 py-2.5"
        :class="
          isActive('/materiskd')
            ? 'bg-amber-300/80 text-slate-900 font-medium'
            : 'text-slate-700 hover:bg-slate-100'
        "
      >
        <span>📚</span>
        <span>Materi SKD</span>
      </router-link>

      <router-link
        to="/promotryout"
        class="w-full flex items-center gap-2 rounded-xl px-3 py-2.5"
        :class="
          isActive('/promotryout')
            ? 'bg-amber-300/80 text-slate-900 font-medium'
            : 'text-slate-700 hover:bg-slate-100'
        "
      >
        <span>🔥</span>
        <span>Promo Try Out</span>
      </router-link>

      <router-link
        to="/pengerjaantryout"
        class="w-full flex items-center gap-2 rounded-xl px-3 py-2.5"
        :class="
          isActive('/pengerjaantryout')
            ? 'bg-amber-300/80 text-slate-900 font-medium'
            : 'text-slate-700 hover:bg-slate-100'
        "
      >
        <span>📝</span>
        <span>Pengerjaan Try Out SKD</span>
      </router-link>

      <router-link
        to="/peringkat"
        class="w-full flex items-center gap-2 rounded-xl px-3 py-2.5"
        :class="
          isActive('/peringkat')
            ? 'bg-amber-300/80 text-slate-900 font-medium'
            : 'text-slate-700 hover:bg-slate-100'
        "
      >
        <span>⭐</span>
        <span>Peringkat SKD</span>
      </router-link>

      <router-link
        to="/dompet"
        class="w-full flex items-center gap-2 rounded-xl px-3 py-2.5"
        :class="
          isActive('/dompet')
            ? 'bg-amber-300/80 text-slate-900 font-medium'
            : 'text-slate-700 hover:bg-slate-100'
        "
      >
        <span>👝</span>
        <span>Dompet</span>
      </router-link>
    </nav>

    <!-- Keluar -->
    <div class="px-3 pb-4 pt-2 border-t border-slate-100">
      <router-link
        to="/login"
        class="w-full flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-rose-600 hover:bg-rose-50"
      >
        <span>↩️</span>
        <span>Keluar</span>
      </router-link>
    </div>
  </aside>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

const isActive = (path) => {
  if (path === "/") {
    return route.path === "/";
  }
  return route.path.startsWith(path);
};
</script>
