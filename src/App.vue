<template>
  <div class="min-h-screen flex md:pl-64 relative">
    <!-- SIDEBAR -->
    <Sidebar :open="sidebarOpen" />
    <div
      id="sidebar-backdrop"
      class="fixed inset-0 z-20 bg-black/40 md:hidden"
      v-show="sidebarOpen"
      @click="sidebarOpen = false"
    ></div>

    <!-- MAIN AREA -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Navbar -->
      <Navbar @toggleSidebar="sidebarOpen = !sidebarOpen" />

      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Sidebar from "./components/Sidebar.vue";
import Navbar from "./components/Navbar.vue";
// import Footer from "./components/Footer.vue";

const sidebarOpen = ref(false);
</script>
