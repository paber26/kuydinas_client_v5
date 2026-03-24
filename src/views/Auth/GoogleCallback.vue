<template>
  <div class="flex items-center justify-center h-screen">
    <p class="text-gray-500">Login Google...</p>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (token) {
    localStorage.setItem("token", token);
    router.push("/dashboard");
  } else {
    router.push("/login");
  }
});
</script>
