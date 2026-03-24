<script setup>
import Navbar from "../components/layout/Navbar.vue";
import Sidebar from "../components/layout/Sidebar.vue";
</script>

<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-30 w-64 bg-white border-r transform -translate-x-full transition-transform duration-300 md:translate-x-0 md:static md:block"
    >
      <Sidebar />
    </aside>

    <!-- Content -->
    <div class="flex-1 flex flex-col w-full">
      <Navbar />

      <main class="p-4 lg:p-6 flex-1">
        <router-view />
      </main>
    </div>
  </div>
</template>
