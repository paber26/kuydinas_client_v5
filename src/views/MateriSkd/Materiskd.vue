<template>
  <div class="min-h-screen bg-slate-50 font-sans selection:bg-emerald-100 selection:text-emerald-900">
    
    <!-- DISCOVERY GALLERY MODE -->
    <div v-if="viewMode === 'discovery'" class="animate-in fade-in duration-700">
      <!-- Navbar / Top Bar -->
      <nav class="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <div class="flex items-center gap-3">
            <RouterLink to="/dashboard" class="h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-200 hover:scale-105 transition-transform">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </RouterLink>
            <div>
              <h1 class="text-xl font-black text-slate-800 tracking-tight leading-none uppercase">LMS KUYDINAS</h1>
              <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Discovery Library</p>
            </div>
          </div>
          
          <!-- Search Bar -->
          <div class="hidden md:block relative w-96">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Apa yang ingin kamu pelajari hari ini?"
              class="w-full pl-12 pr-4 py-2.5 bg-slate-100 border-none rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500/20 transition-all font-medium"
            >
            <svg class="absolute left-4 top-3 h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div class="flex items-center gap-4">
            <div class="hidden sm:flex flex-col items-end">
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Progress</p>
              <p class="text-sm font-black text-emerald-600">{{ globalProgress }}% Complete</p>
            </div>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <header class="relative overflow-hidden bg-slate-900 px-6 py-16 sm:py-24">
        <div class="absolute inset-0 opacity-20">
          <div class="absolute top-0 -left-4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div class="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div class="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div class="relative max-w-7xl mx-auto text-center">
          <h2 class="text-4xl sm:text-6xl font-black text-white tracking-tighter mb-6 leading-[1.1]">
            Kuasai Materi SKD <br class="hidden sm:block"> dengan <span class="text-emerald-400 underline decoration-emerald-500/30 underline-offset-8">Kurikulum Terbaik</span>
          </h2>
          <p class="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            Pilih modul pembelajaran yang dirancang khusus oleh mentor berpengalaman untuk membantumu lolos seleksi CPNS 2024.
          </p>
        </div>
      </header>

      <!-- Filter Bar -->
      <section class="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
        <div class="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 p-4 border border-slate-100">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex gap-2">
              <button 
                v-for="cat in ['ALL', 'TWK', 'TIU', 'TKP']" 
                :key="cat"
                @click="activeCategory = cat"
                :class="[
                  'px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all',
                  activeCategory === cat ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                ]"
              >
                {{ cat }}
              </button>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Urutkan:</span>
              <select class="bg-slate-50 border-none rounded-xl text-xs font-bold text-slate-700 focus:ring-emerald-500/20 px-4 py-2">
                <option>Terbaru</option>
                <option>Terpopuler</option>
                <option>Durasi Terlama</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <!-- Main Course Grid -->
      <main class="max-w-7xl mx-auto px-6 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="module in filteredModules" 
            :key="module.id"
            class="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-emerald-100/50 hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col"
          >
            <!-- Card Thumbnail -->
            <div class="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <img :src="module.image" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" :alt="module.title">
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              
              <!-- Badges -->
              <div class="absolute top-4 left-4 flex gap-2">
                <span class="px-2.5 py-1 rounded-lg bg-white/20 backdrop-blur-md text-[10px] font-black text-white uppercase tracking-widest border border-white/20">
                  {{ module.category }}
                </span>
                <span 
                  class="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border"
                  :class="module.levelClass"
                >
                  {{ module.level }}
                </span>
              </div>

              <!-- Lesson Count Over Thumbnail -->
              <div class="absolute bottom-4 left-4">
                <p class="text-white text-lg font-black tracking-tight leading-none">{{ module.lessonCount }} Materi</p>
                <p class="text-white/60 text-[10px] font-bold uppercase tracking-widest">Pembelajaran Intensif</p>
              </div>
            </div>

            <!-- Card Body -->
            <div class="p-8 flex-1 flex flex-col">
              <h3 class="text-xl font-black text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors leading-snug">
                {{ module.title }}
              </h3>
              <p class="text-slate-500 text-sm font-medium line-clamp-2 mb-6 leading-relaxed">
                {{ module.description }}
              </p>

              <!-- Stats -->
              <div class="flex items-center gap-6 mb-8 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                <div class="flex items-center gap-2">
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ module.duration }}
                </div>
                <div class="flex items-center gap-2">
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {{ module.learners }}
                </div>
              </div>

              <!-- Actions -->
              <div class="mt-auto flex gap-3">
                <button 
                  @click="startLearning(module)"
                  class="flex-1 px-6 py-4 rounded-2xl bg-emerald-600 text-white font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:shadow-emerald-300 active:scale-[0.98] transition-all"
                >
                  Mulai Belajar
                </button>
                <button class="h-12 w-12 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Footer CTA -->
      <footer class="max-w-7xl mx-auto px-6 py-20">
        <div class="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-[3rem] p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-emerald-200">
          <div class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <h3 class="text-3xl font-black mb-4">Masih bingung mulai dari mana?</h3>
          <p class="text-emerald-50 mb-8 max-w-xl mx-auto font-medium opacity-80">Gunakan fitur rekomendasi belajar kami untuk mendapatkan kurikulum yang dipersonalisasi sesuai kelemahanmu.</p>
          <button class="px-10 py-4 bg-white text-emerald-700 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-transform">
            Dapatkan Rekomendasi
          </button>
        </div>
      </footer>
    </div>

    <!-- CONSOLE MODE (Existing Refactored Console) -->
    <div v-else class="h-screen flex overflow-hidden animate-in slide-in-from-right duration-500">
      <!-- CONSOLE SIDEBAR -->
      <aside class="flex flex-col w-80 bg-white border-r border-slate-200">
        <div class="p-6 border-b border-slate-100 bg-slate-50/50">
          <button 
            @click="viewMode = 'discovery'"
            class="flex items-center gap-2 mb-6 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-emerald-600 transition-colors group"
          >
            <svg class="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Galeri
          </button>

          <div class="flex items-center gap-3">
            <div class="h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg">
               <span class="text-xs font-black">{{ activeCategory }}</span>
            </div>
            <div>
              <h2 class="text-sm font-black text-slate-800 uppercase tracking-tighter">{{ selectedModule?.title || 'Learning Module' }}</h2>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">KONSOLE BELAJAR</p>
            </div>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto custom-scrollbar p-4">
          <div class="space-y-1">
            <div
              v-for="(lesson, index) in filteredMateri"
              :key="lesson.id"
              @click="selectLesson(lesson)"
              class="group p-3 rounded-xl cursor-pointer transition-all border border-transparent"
              :class="[
                selectedMateri?.id === lesson.id ? 'bg-emerald-50 border-emerald-100 shadow-sm' : 'hover:bg-slate-50'
              ]"
            >
              <div class="flex items-start gap-3">
                <div 
                  class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-black transition-all"
                  :class="selectedMateri?.id === lesson.id ? 'bg-emerald-600 text-white scale-110' : 'bg-slate-100 text-slate-400'"
                >
                  <span v-if="!lesson.completed">{{ index + 1 }}</span>
                  <svg v-else class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-bold text-slate-700 truncate leading-tight group-hover:text-emerald-700">
                    {{ lesson.title }}
                  </p>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">{{ lesson.type }}</span>
                    <span class="h-1 w-1 rounded-full bg-slate-300" />
                    <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">{{ lesson.duration }} Min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="p-6 bg-slate-50 border-t border-slate-100 mt-auto">
          <div class="flex items-center justify-between mb-2">
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sesi Progres</p>
            <p class="text-xs font-black text-emerald-600">{{ moduleProgress }}%</p>
          </div>
          <div class="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
            <div class="h-full bg-emerald-500 transition-all duration-700" :style="{ width: moduleProgress + '%' }" />
          </div>
        </div>
      </aside>

      <!-- CONSOLE CONTENT (Same as before but full width) -->
      <main class="flex-1 bg-white overflow-y-auto">
        <div v-if="selectedMateri" class="max-w-[900px] mx-auto p-10 space-y-8 animate-in fade-in duration-500">
          <!-- Lesson Content Header -->
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <nav class="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                 <span>{{ selectedModule?.title }}</span>
                 <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 5l7 7-7 7" /></svg>
                 <span class="text-slate-800">{{ selectedMateri.title }}</span>
              </nav>
              <h1 class="text-4xl font-black text-slate-900 leading-tight tracking-tight">{{ selectedMateri.title }}</h1>
            </div>
            <button 
              @click="toggleComplete(selectedMateri)"
              class="shrink-0 flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-emerald-100"
              :class="selectedMateri.completed ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 border border-slate-200'"
            >
              {{ selectedMateri.completed ? 'Sudah Selesai' : 'Tandai Selesai' }}
            </button>
          </div>

          <!-- Video Player Placeholder -->
          <div v-if="selectedMateri.type === 'Video'" class="group relative aspect-video overflow-hidden rounded-[40px] bg-slate-900 shadow-2xl">
             <div class="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/40 backdrop-blur-sm">
                <button class="h-20 w-20 flex items-center justify-center rounded-full bg-white text-emerald-600 shadow-xl shadow-slate-900/50 hover:scale-110 transition-transform">
                   <svg class="ml-1 h-10 w-10" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>
                </button>
                <p class="mt-6 text-white text-xs font-black uppercase tracking-[0.4em] opacity-80">Video Sesi {{ selectedMateri.id }}</p>
             </div>
          </div>

          <!-- Tabs -->
          <div class="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden">
             <div class="flex border-b border-slate-100 bg-slate-50/30 p-2 gap-2">
                <button v-for="t in ['Materi', 'Pembahasan', 'Referensi']" :key="t" @click="activeTab = t" :class="['px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all', activeTab === t ? 'bg-white text-emerald-600 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-emerald-600']">{{ t }}</button>
             </div>
             <div class="p-10 min-h-[400px]">
                <div v-if="activeTab === 'Materi'" class="prose prose-slate max-w-none animate-in fade-in">
                   <p class="text-xl font-bold text-slate-800 leading-relaxed">{{ selectedMateri.content }}</p>
                   <!-- Content bodies -->
                   <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div v-for="i in 4" :key="i" class="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex gap-4 items-center">
                         <div class="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl bg-white text-emerald-600 text-lg">🔑</div>
                         <p class="text-sm font-bold text-slate-700">Strategi Kunci & Point Penting {{ i }} untuk {{ activeCategory }}</p>
                      </div>
                   </div>
                </div>
                <div v-else-if="activeTab === 'Pembahasan'" class="space-y-6">
                   <div v-for="q in 2" :key="q" class="p-6 rounded-3xl border border-slate-200">
                      <p class="text-lg font-bold text-slate-800 mb-4">Simulasi Pertanyaan #{{ q }}</p>
                      <div class="p-4 rounded-2xl bg-amber-50 border border-amber-100">
                         <p class="text-sm font-medium text-amber-900 leading-relaxed">Analisis: {{ selectedMateri.title }} sering kali berfokus pada penalaran {{ activeCategory === 'TIU' ? 'logika' : 'konteks' }}...</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
          
          <!-- Bottom Navigation -->
          <div class="flex items-center justify-between pb-10">
             <button @click="prevLesson" :disabled="!canPrev" class="px-8 py-4 rounded-3xl border border-slate-200 bg-white text-slate-600 font-black text-[10px] uppercase tracking-widest disabled:opacity-20 transition-all hover:bg-slate-50">← Sebelumnya</button>
             <button @click="nextLesson" :disabled="!canNext" class="px-10 py-4 rounded-3xl bg-emerald-600 text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-emerald-200 disabled:opacity-20 transition-all hover:bg-emerald-700">Selanjutnya →</button>
          </div>
        </div>

        <div v-else class="h-full flex flex-col items-center justify-center text-center p-10">
           <div class="h-32 w-32 bg-emerald-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <svg class="h-16 w-16 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
           </div>
           <h2 class="text-2xl font-black text-slate-800">Sesi Selesai / Belum Dipilih</h2>
           <p class="mt-2 text-slate-400 font-bold uppercase tracking-widest text-[10px]">Silakan pilih sub-materi di samping halaman</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const viewMode = ref('discovery') // 'discovery' or 'learning'
const activeCategory = ref('ALL')
const activeTab = ref('Materi')
const searchQuery = ref('')
const selectedModule = ref(null)
const selectedMateri = ref(null)

const courseModules = ref([
  {
    id: 1,
    title: "Tes Wawasan Kebangsaan (TWK)",
    category: "TWK",
    description: "Pelajari Pilar Negara, UUD 1945, Nasionalisme, dan Integritas untuk skor TWK maksimal.",
    lessonCount: 12,
    duration: "18 Jam",
    learners: "12,405",
    level: "Intermediate",
    levelClass: "bg-blue-50 text-blue-600 border-blue-100",
    image: "https://images.unsplash.com/photo-1541829070764-84a7d30dee3f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Tes Intelegensia Umum (TIU)",
    category: "TIU",
    description: "Kuasai Silogisme, Analitis, Numerik Cepat, dan Figural dengan metode perbandingan cepat.",
    lessonCount: 25,
    duration: "24 Jam",
    learners: "18,920",
    level: "Advanced",
    levelClass: "bg-orange-50 text-orange-600 border-orange-100",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4821811?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Tes Karakteristik Pribadi (TKP)",
    category: "TKP",
    description: "Analisis studi kasus Pelayanan Publik, Jejaring Kerja, Sosial Budaya, dan Profesionalisme.",
    lessonCount: 15,
    duration: "12 Jam",
    learners: "9,150",
    level: "Beginner",
    levelClass: "bg-purple-50 text-purple-600 border-purple-100",
    image: "https://images.unsplash.com/photo-1454165833767-027ffea9e77b?auto=format&fit=crop&q=80&w=800"
  }
])

const materiList = ref([
  { id: 1, title: "Pancasilaku: Sejarah & Perumusan", category: "TWK", type: "Video", duration: 15, completed: true, content: "Pancasila merupakan ideologi negara yang lahir dari pemikiran luhur para pendiri bangsa. Sesi ini akan membongkar sejarah Sidang BPUPKI secara mendalam." },
  { id: 2, title: "UUD 1945 & Dinamika Amendemen", category: "TWK", type: "Materi", duration: 25, completed: false, content: "Konstitusi kita telah mengalami 4 kali perubahan. Memahami apa yang berubah dan mengapa adalah kunci menjawab soal integritas." },
  { id: 3, title: "Silogisme: Logika Tanpa Cacat", category: "TIU", type: "Video", duration: 20, completed: false, content: "Trik cepat menarik kesimpulan dari premis mayor dan minor tanpa harus menggali terlalu dalam ke filsafat logika." },
  { id: 4, title: "Aljabar Cepat & Perbandingan", category: "TIU", type: "Video", duration: 15, completed: false, content: "Menghitung persentase dan perbandingan senilai/berbalik nilai dalam hitungan detik tanpa kertas coretan." },
  { id: 5, title: "Etika & Integritas Kerja ASN", category: "TKP", type: "Materi", duration: 18, completed: false, content: "Bagaimana cara seorang ASN bersikap saat menghadapi konflik kepentingan? Kita bahas di modul profesionalisme ini." }
])

// Filter Logic for Gallery
const filteredModules = computed(() => {
  return courseModules.value.filter(mod => {
    const matchCat = activeCategory.value === 'ALL' || mod.category === activeCategory.value
    const matchSearch = mod.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                      mod.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchCat && matchSearch
  })
})

// Filter Logic for Console Sidebar
const filteredMateri = computed(() => {
  if (!selectedModule.value) return []
  return materiList.value.filter(item => item.category === selectedModule.value.category)
})

const globalProgress = computed(() => {
  const completed = materiList.value.filter(m => m.completed).length
  return Math.round((completed / materiList.value.length) * 100)
})

const moduleProgress = computed(() => {
  const list = filteredMateri.value
  if (list.length === 0) return 0
  const completed = list.filter(m => m.completed).length
  return Math.round((completed / list.length) * 100)
})

const canNext = computed(() => {
  const idx = filteredMateri.value.findIndex(m => m.id === selectedMateri.value?.id)
  return idx < filteredMateri.value.length - 1
})

const canPrev = computed(() => {
  const idx = filteredMateri.value.findIndex(m => m.id === selectedMateri.value?.id)
  return idx > 0
})

onMounted(() => {
  const modParam = route.query.module
  if (modParam) {
    const found = courseModules.value.find(m => m.category === modParam.toUpperCase())
    if (found) startLearning(found)
  }
})

function startLearning(mod) {
  selectedModule.value = mod
  activeCategory.value = mod.category
  selectedMateri.value = filteredMateri.value[0] || null
  viewMode.value = 'learning'
}

function selectLesson(lesson) {
  selectedMateri.value = lesson
  activeTab.value = 'Materi'
}

function nextLesson() {
  const idx = filteredMateri.value.findIndex(m => m.id === selectedMateri.value?.id)
  if (idx < filteredMateri.value.length - 1) selectLesson(filteredMateri.value[idx + 1])
}

function prevLesson() {
  const idx = filteredMateri.value.findIndex(m => m.id === selectedMateri.value?.id)
  if (idx > 0) selectLesson(filteredMateri.value[idx - 1])
}

function toggleComplete(lesson) {
  lesson.completed = !lesson.completed
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }

@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob { animation: blob 7s infinite; }
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }

.animate-in { animation-fill-mode: both; }
.fade-in { animation-name: fade-in; animation-duration: 0.5s; }
.slide-in-from-right { animation-name: slide-in-from-right; animation-duration: 0.5s; }

@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes slide-in-from-right { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style>
