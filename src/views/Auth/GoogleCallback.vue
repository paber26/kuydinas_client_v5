<template>
  <div class="flex items-center justify-center h-screen">
    <p class="text-gray-500">Login Google...</p>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  getGoogleCallbackSession,
  saveAuthSession,
  redirectToAdminApp,
} from "../../utils/auth";

const router = useRouter();

onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  const { token, role, user, error } = getGoogleCallbackSession(params);

  if (error) {
    alert("Login gagal: " + error);
    router.push("/login");
    return;
  }

  if (token) {
    if (role === "admin") {
      redirectToAdminApp();
      return;
    }

    saveAuthSession({ token, role, user });
    router.push("/dashboard");
  } else {
    router.push("/login");
  }
});
</script>
