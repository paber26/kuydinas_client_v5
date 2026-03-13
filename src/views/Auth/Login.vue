<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
      <h1 class="text-2xl font-bold text-center mb-6">Login</h1>

      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label class="text-sm">Email</label>
          <input
            v-model="email"
            type="email"
            class="w-full border rounded-lg px-3 py-2 mt-1"
            required
          />
        </div>

        <div>
          <label class="text-sm">Password</label>
          <input
            v-model="password"
            type="password"
            class="w-full border rounded-lg px-3 py-2 mt-1"
            required
          />
        </div>

        <button
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      <!-- Divider -->
      <div class="my-5 text-center text-gray-400 text-sm">atau</div>

      <!-- GOOGLE LOGIN -->
      <button
        @click="loginGoogle"
        class="w-full flex items-center justify-center gap-3 border py-2 rounded-lg hover:bg-gray-50"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          class="w-5 h-5"
        />

        Login dengan Google
      </button>

      <p class="text-sm text-center mt-6">
        Belum punya akun?
        <router-link to="/register" class="text-blue-600">
          Register
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../../services/api";

const router = useRouter();
const apiBaseURL =
  import.meta.env.VITE_API_BASE_URL || "https://apili.kuydinas.id/api";

const email = ref("");
const password = ref("");

const login = async () => {
  try {
    const res = await api.post("/user/login", {
      email: email.value,
      password: password.value,
    });

    const token = res.data?.data?.token || res.data?.token;

    if (token) {
      localStorage.setItem("token", token);
      router.push("/dashboard");
    } else {
      console.error("Token tidak ditemukan pada response:", res.data);
      alert("Login gagal: token tidak ditemukan");
    }
  } catch (err) {
    alert("Login gagal");
  }
};

const loginGoogle = () => {
  window.location.href = `${apiBaseURL}/user/auth/google/redirect`;
};
</script>
