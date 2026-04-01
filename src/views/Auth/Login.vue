<template>
  <div class="min-h-screen flex w-full bg-white relative overflow-hidden text-gray-800">
    
    <!-- Left Section: Branding / Image (Tablet/Desktop Only) -->
    <div class="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-900 relative items-center justify-center p-12 overflow-hidden">
      <!-- Animated background elements -->
      <div class="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob animation-delay-4000"></div>
      
      <!-- Content -->
      <div class="relative z-10 text-white max-w-lg animate-fade-in-up">
        <div class="w-16 h-16 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center mb-8 border border-white/20 shadow-xl">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>
        </div>
        <h1 class="text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight">Mulai Perjalanan<br/><span class="text-blue-300">Sukses Anda</span></h1>
        <p class="text-lg text-indigo-100/90 leading-relaxed mb-8">
          Masuk ke portal Kuydinas untuk mengakses tryout, materi pembelajaran, dan simulasi ujian persiapan masa depan Anda.
        </p>
        
        <!-- Floating Glassmorphism Card for aesthetic -->
        <div class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl transform transition hover:-translate-y-2 duration-500">
           <div class="flex items-center gap-4">
             <div class="w-12 h-12 bg-gradient-to-tr from-green-400 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
               <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
               </svg>
             </div>
             <div>
               <h3 class="text-white font-bold text-lg">Sistem Terintegrasi</h3>
               <p class="text-indigo-100 text-sm">Simulasi ujian secara real-time</p>
             </div>
           </div>
        </div>
      </div>
    </div>

    <!-- Right Section: Login Form (Mobile/Tablet/Desktop) -->
    <div class="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-16 lg:p-20 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 md:bg-none md:bg-white relative">
      
      <!-- Mobile animated blobs (hidden on md/desktop to keep it clean) -->
      <div class="absolute top-[-10%] left-[-10%] w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob md:hidden"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 md:hidden"></div>

      <div class="w-full max-w-md bg-white/80 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none shadow-2xl md:shadow-none border border-white/50 md:border-none rounded-3xl p-8 md:p-0 relative z-10 animate-fade-in-up">
        
        <div class="text-center md:text-left mb-10 animate-fade-in-up opacity-0 delay-100" style="animation-fill-mode: forwards;">
          <!-- Logo for mobile only (since desktop has it on left) -->
          <div class="md:hidden w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
            <img
              :src="logoKuydinas"
              alt="KuyDinas"
              class="w-12 h-12 object-contain"
            />
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Selamat Datang 👋</h2>
          <p class="text-gray-500 mt-3 text-base">Silakan masuk ke akun Anda untuk melanjutkan</p>
        </div>

        <form @submit.prevent="login" class="space-y-6">
          <div class="animate-fade-in-up opacity-0 delay-200" style="animation-fill-mode: forwards;">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                v-model="email"
                type="email"
                class="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-gray-50/50 hover:bg-white transition-all duration-300 text-gray-900 shadow-sm"
                placeholder="nama@email.com"
                required
              />
            </div>
          </div>

          <div class="animate-fade-in-up opacity-0 delay-300" style="animation-fill-mode: forwards;">
            <label class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                v-model="password"
                type="password"
                class="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-gray-50/50 hover:bg-white transition-all duration-300 text-gray-900 shadow-sm"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div class="flex items-center justify-between animate-fade-in-up opacity-0 delay-400" style="animation-fill-mode: forwards;">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded cursor-pointer transition-colors">
              <label for="remember-me" class="ml-2 block text-sm text-gray-700 cursor-pointer select-none">Ingat saya</label>
            </div>
            <div class="text-sm">
              <a href="#" class="font-semibold text-blue-600 hover:text-blue-700 transition-colors">Lupa passowrd?</a>
            </div>
          </div>

          <div class="animate-fade-in-up opacity-0 delay-500" style="animation-fill-mode: forwards;">
            <button
              :disabled="loading"
              class="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-600/20 text-sm font-bold text-white bg-blue-600 bg-gradient-to-r from-blue-600 to-indigo-600 hover:bg-blue-700 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transform transition-all active:scale-[0.98] duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {{ loading ? 'Memproses...' : 'Masuk Sekarang' }}
            </button>
          </div>
        </form>

        <div class="mt-8 animate-fade-in-up opacity-0 delay-600" style="animation-fill-mode: forwards;">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-4 bg-white md:bg-transparent text-gray-500 rounded-full font-medium">atau masuk dengan</span>
            </div>
          </div>

          <div class="mt-8">
            <button
              @click="loginGoogle"
              class="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 py-3.5 px-4 rounded-xl shadow-sm text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                class="w-5 h-5"
                alt="Google Logo"
              />
              Lanjutkan dengan Google
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../../services/api";
import { AUTH_ENDPOINTS } from "../../services/endpoints";
import { buildUserGoogleLoginUrl, saveAuthSession } from "../../utils/auth";
import logoKuydinas from "../../assets/logo-kuydinas.png";

const router = useRouter();

const email = ref("");
const password = ref("");
const loading = ref(false);

const login = async () => {
  if (!email.value || !password.value) {
    alert("Email dan password wajib diisi");
    return;
  }

  loading.value = true;
  try {
    const res = await api.post(AUTH_ENDPOINTS.user.login, {
      email: email.value,
      password: password.value,
    });

    const payload = res.data;
    const token = payload?.data?.token || payload?.token;
    const user = payload?.data?.user || payload?.user;

    if (!token || !user) {
      alert("Login gagal: token atau user tidak ditemukan");
      return;
    }

    if (user.role === "admin") {
      alert("Akun ini terdaftar sebagai admin. Mohon login melalui portal admin.");
      return;
    }

    saveAuthSession({ token, role: user.role, user });
    router.push("/dashboard");
  } catch (err) {
    alert(err.response?.data?.message || err.message || "Login gagal");
  } finally {
    loading.value = false;
  }
};

const loginGoogle = () => {
  window.location.href = buildUserGoogleLoginUrl();
};
</script>

<style scoped>
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }
.delay-400 { animation-delay: 400ms; }
.delay-500 { animation-delay: 500ms; }
.delay-600 { animation-delay: 600ms; }
.delay-700 { animation-delay: 700ms; }
</style>
